// Mock data controllers for development
// In production, these would connect to PostgreSQL and MongoDB

import { pgPool } from '../config/database.js';
import { connectMongoDB } from '../config/database.js';

// Product-related controllers
export const getProducts = async (req, res) => {
  try {
    const result = await pgPool.query(`
      SELECT 
        p.id,
        p.name as title,
        pc.name as category,
        pg.name as genre,
        p.release_year,
        p.duration,
        COALESCE(ph.price, 0) as price,
        COALESCE(ih.quantity, 0) as stock
      FROM product_dim p
      LEFT JOIN product_category_dim pc ON p.category_id = pc.id
      LEFT JOIN product_genre_dim pg ON p.genre_id = pg.id
      LEFT JOIN (
        SELECT product_id, price 
        FROM product_price_history 
        WHERE effective_to IS NULL
      ) ph ON p.id = ph.product_id
      LEFT JOIN (
        SELECT product_id, quantity 
        FROM inventory_history 
        WHERE effective_to IS NULL
      ) ih ON p.id = ih.product_id
      ORDER BY p.id
    `);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pgPool.query(`
      SELECT 
        p.*,
        pc.name as category,
        pg.name as genre,
        COALESCE(ph.price, 0) as price,
        COALESCE(ih.quantity, 0) as stock
      FROM product_dim p
      LEFT JOIN product_category_dim pc ON p.category_id = pc.id
      LEFT JOIN product_genre_dim pg ON p.genre_id = pg.id
      LEFT JOIN (
        SELECT product_id, price 
        FROM product_price_history 
        WHERE effective_to IS NULL
      ) ph ON p.id = ph.product_id
      LEFT JOIN (
        SELECT product_id, quantity 
        FROM inventory_history 
        WHERE effective_to IS NULL
      ) ih ON p.id = ih.product_id
      WHERE p.id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Get product images from MongoDB
    const mongoDb = await connectMongoDB();
    const images = await mongoDb.collection('product_images')
      .find({ productId: id })
      .toArray();
    
    res.json({
      ...result.rows[0],
      images
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// Customer-related controllers
export const getCustomers = async (req, res) => {
  try {
    const result = await pgPool.query(`
      SELECT 
        c.id,
        c.name,
        c.email,
        cs.name as segment,
        c.join_date,
        COUNT(DISTINCT sf.id) as total_rentals,
        SUM(sf.amount) as total_spent
      FROM customer_dim c
      LEFT JOIN customer_segment_dim cs ON c.segment_id = cs.id
      LEFT JOIN sales_fact sf ON c.id = sf.customer_id
      GROUP BY c.id, c.name, c.email, cs.name, c.join_date
      ORDER BY c.id
    `);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pgPool.query(`
      SELECT 
        c.*,
        cs.name as segment,
        COUNT(DISTINCT sf.id) as total_rentals,
        SUM(sf.amount) as total_spent,
        AVG(sf.rental_duration) as avg_rental_duration
      FROM customer_dim c
      LEFT JOIN customer_segment_dim cs ON c.segment_id = cs.id
      LEFT JOIN sales_fact sf ON c.id = sf.customer_id
      WHERE c.id = $1
      GROUP BY c.id, c.name, c.email, cs.name, c.join_date
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    
    // Get customer comments and browsing history from MongoDB
    const mongoDb = await connectMongoDB();
    const [comments, browsingHistory] = await Promise.all([
      mongoDb.collection('customer_comments')
        .find({ customerId: id })
        .toArray(),
      mongoDb.collection('customer_browsing_history')
        .find({ customerId: id })
        .sort({ createdAt: -1 })
        .limit(10)
        .toArray()
    ]);
    
    res.json({
      ...result.rows[0],
      comments,
      recentBrowsingHistory: browsingHistory
    });
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({ error: 'Failed to fetch customer' });
  }
};

// Rental-related controllers
export const getRentals = async (req, res) => {
  try {
    const result = await pgPool.query(`
      SELECT 
        sf.id,
        sf.amount,
        sf.rental_duration,
        sf.created_at,
        c.name as customer_name,
        p.name as product_name,
        l.city as location
      FROM sales_fact sf
      JOIN customer_dim c ON sf.customer_id = c.id
      JOIN product_dim p ON sf.product_id = p.id
      JOIN location_dim l ON sf.location_id = l.id
      ORDER BY sf.created_at DESC
    `);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching rentals:', error);
    res.status(500).json({ error: 'Failed to fetch rentals' });
  }
};

export const getRentalById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pgPool.query(`
      SELECT 
        sf.*,
        c.name as customer_name,
        c.email as customer_email,
        p.name as product_name,
        p.description as product_description,
        l.city as location,
        l.store_id
      FROM sales_fact sf
      JOIN customer_dim c ON sf.customer_id = c.id
      JOIN product_dim p ON sf.product_id = p.id
      JOIN location_dim l ON sf.location_id = l.id
      WHERE sf.id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Rental not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching rental:', error);
    res.status(500).json({ error: 'Failed to fetch rental' });
  }
};