// server/server.js
import './config/loadEnv.js'; // <<<< MUST BE THE VERY FIRST IMPORT AND LINE OF CODE

// --- Debugging right after loadEnv import ---
console.log(
  '[Server.js] AFTER loadEnv import - process.env.MONGO_URI:',
  process.env.MONGO_URI
);
console.log(
  '[Server.js] AFTER loadEnv import - process.env.PORT:',
  process.env.PORT
);
// --- End Debugging ---

import express from 'express';
import cors from 'cors';
// DO NOT import dotenv again here or call dotenv.config()
import { fileURLToPath } from 'url';
import path, { dirname, join } from 'path';

// Now import your other modules
console.log('[Server.js] About to import database.js...');
import {
  testPostgresConnection,
  connectMongoDB,
  getMongoDb, // Assuming you have this
  pgPool,     // Assuming you export and need this
} from './config/database.js'; // database.js should NOT call dotenv.config()
console.log('[Server.js] Imported database.js.');

import dataRoutes from './routes/dataRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001; // Should pick up from .env now

// ... (rest of your server.js: middleware, routes, initializeDatabases, startServer)
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/data', dataRoutes);
app.use('/api/analytics', analyticsRoutes);

// Initialize database connections
const initializeDatabases = async () => {
  try {
    console.log('[Server.js] Initializing databases...');
    await testPostgresConnection();
    await connectMongoDB(); // This will now use the MONGO_URI from .env
    console.log('All database connections established successfully');
  } catch (error) {
    console.error('Failed to initialize database connections:', error);
    process.exit(1);
  }
};

// Mock data endpoint for development
app.get('/api/dashboard', (req, res) => {
  res.json({
    kpis: {
      totalRevenue: '$245,670',
      revenueChange: 12.5,
      activeRentals: '1,234',
      rentalsChange: 7.8,
      newCustomers: '256',
      customersChange: 15.3,
      avgRentalDuration: '4.2 days',
      durationChange: -2.1,
    },
    salesTrend: [
      { month: 'Jan', revenue: 18500 },
      { month: 'Feb', revenue: 17200 },
      { month: 'Mar', revenue: 19800 },
      { month: 'Apr', revenue: 21500 },
      { month: 'May', revenue: 20300 },
      { month: 'Jun', revenue: 22800 },
      { month: 'Jul', revenue: 24100 },
      { month: 'Aug', revenue: 23700 },
      { month: 'Sep', revenue: 25900 },
      { month: 'Oct', revenue: 27300 },
      { month: 'Nov', revenue: 26800 },
      { month: 'Dec', revenue: 28100 },
    ],
    topProducts: [
      { name: 'Action Movie Collection', rentals: 324, revenue: 4860 },
      { name: 'Sci-Fi Classics', rentals: 286, revenue: 4290 },
      { name: 'New Releases Bundle', rentals: 253, revenue: 5060 },
      { name: 'Family Movies Pack', rentals: 215, revenue: 3225 },
      { name: 'Documentary Series', rentals: 198, revenue: 2970 },
    ],
    customerSegments: [
      { name: 'Frequent Renters', percentage: 35 },
      { name: 'Occasional Viewers', percentage: 42 },
      { name: 'New Customers', percentage: 15 },
      { name: 'Premium Subscribers', percentage: 8 },
    ],
    revenueByLocation: [
      { city: 'New York', revenue: 68540 },
      { city: 'Los Angeles', revenue: 52370 },
      { city: 'Chicago', revenue: 37920 },
      { city: 'Houston', revenue: 31580 },
      { city: 'Phoenix', revenue: 28140 },
      { city: 'Other', revenue: 27120 },
    ],
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
  });
}

// Start server
const startServer = async () => {
  console.log('[Server.js] Calling initializeDatabases...');
  await initializeDatabases();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

console.log('[Server.js] Calling startServer()...');
startServer().catch((err) => {
  console.error('[Server.js] Error during server startup:', err);
  process.exit(1);
});

export default app; // Though for a server entry point, this export isn't typically used.
