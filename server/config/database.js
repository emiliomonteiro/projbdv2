// server/config/database.js
// NO dotenv.config() here! loadEnv.js (imported by server.js) handles it.

import { Pool } from 'pg';
import { MongoClient } from 'mongodb';

console.log(
  '[database.js] Top of module. MONGO_URI:',
  process.env.MONGO_URI
); // Debug

// PostgreSQL connection
const pgPool = new Pool({
  user: process.env.POSTGRES_USER, // Should now be loaded
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
});

// MongoDB connection
const mongoFullUri = process.env.MONGO_URI; // Should now be loaded

if (!mongoFullUri) {
  // This error means .env loading failed upstream despite our efforts
  throw new Error(
    'CRITICAL: MongoDB URI (MONGO_URI) is not defined in environment variables. Check .env loading in loadEnv.js and server.js.'
  );
}
console.log('[database.js] Will use MongoDB URI:', mongoFullUri);

const mongoClient = new MongoClient(mongoFullUri);
let mongoDbInstance;

// ... (rest of your connectMongoDB, getMongoDb, testPostgresConnection, exports)
export const connectMongoDB = async () => {
  if (mongoDbInstance) {
    console.log('MongoDB is already connected.');
    return mongoDbInstance;
  }
  try {
    await mongoClient.connect();
    mongoDbInstance = mongoClient.db();
    console.log(
      'Connected to MongoDB. Using database:',
      mongoDbInstance.databaseName
    );
    return mongoDbInstance;
  } catch (error) {
    console.error('MongoDB connection error in connectMongoDB:', error);
    console.error('Attempted to connect with URI:', mongoFullUri);
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

export { pgPool };
