// server/config/database.js
// NO dotenv.config() here! server.js handles loading server/.env

import { Pool } from 'pg';
import { MongoClient } from 'mongodb';

// Default configuration (useful for fallbacks or if .env is truly missing)
const defaultConfig = {
  postgres: {
    user: 'postgres_default_user', // Consider different defaults
    host: 'localhost',
    database: 'video_rental_default_pg_db',
    password: 'default_pg_password',
    port: 5432,
  },
  mongodb: {
    uri: 'mongodb://localhost:27017/video_rental_default_mongo_db', // Default URI with DB
    // dbName: 'video_rental_default_mongo_db' // Can be extracted from URI or set separately
  }
};

// PostgreSQL connection
// Variables like process.env.POSTGRES_USER should be populated by server.js
const pgPool = new Pool({
  user: process.env.POSTGRES_USER || defaultConfig.postgres.user,
  host: process.env.POSTGRES_HOST || defaultConfig.postgres.host,
  database: process.env.POSTGRES_DB || defaultConfig.postgres.database,
  password: process.env.POSTGRES_PASSWORD || defaultConfig.postgres.password,
  port: parseInt(process.env.POSTGRES_PORT, 10) || defaultConfig.postgres.port,
});

// MongoDB connection
// Ensure your server/.env uses MONGO_URI
const mongoFullUri = process.env.MONGO_URI || defaultConfig.mongodb.uri;

console.log('[database.js] Using MongoDB URI:', mongoFullUri); // For debugging

if (!mongoFullUri) {
  // This should ideally not be hit if server.js loads .env or defaults are present
  throw new Error(
    'MongoDB URI is not defined. Check .env configuration and defaults.'
  );
}

const mongoClient = new MongoClient(mongoFullUri);
let mongoDbInstance; // To store the connected db instance

export const connectMongoDB = async () => {
  if (mongoDbInstance) {
    console.log('MongoDB is already connected.');
    return mongoDbInstance;
  }
  try {
    await mongoClient.connect();
    // If MONGO_URI includes the database name, mongoClient.db() will use it.
    // Otherwise, you'd need a separate MONGODB_DB_NAME env var.
    mongoDbInstance = mongoClient.db(); // Gets the DB from the connection string
    console.log(
      'Connected to MongoDB. Using database:',
      mongoDbInstance.databaseName
    );
    return mongoDbInstance;
  } catch (error) {
    console.error('MongoDB connection error in connectMongoDB:', error);
    console.error('Attempted to connect with URI:', mongoFullUri); // Log the URI on error
    throw error;
  }
};

export const getMongoDb = () => {
  if (!mongoDbInstance) {
    throw new Error(
      'MongoDB has not been connected yet. Ensure connectMongoDB() was called and awaited successfully at server startup.'
    );
  }
  return mongoDbInstance;
};

export const testPostgresConnection = async () => {
  let client;
  try {
    client = await pgPool.connect();
    console.log('Connected to PostgreSQL');
    return true;
  } catch (error) {
    console.error('PostgreSQL connection error:', error);
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
};

// Export pgPool if it's used directly elsewhere, otherwise it's just used internally here.
export { pgPool /*, mongoClient */ }; // mongoClient usually isn't exported directly if connectMongoDB handles it
