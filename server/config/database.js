// server/config/database.js
// NO dotenv.config() here!

import { Pool } from 'pg';
import { MongoClient } from 'mongodb';

console.log(
  '[database.js] Top of module. process.env.MONGO_URI:',
  process.env.MONGO_URI
);
console.log(
  '[database.js] Top of module. process.env.POSTGRES_USER:',
  process.env.POSTGRES_USER
);

// PostgreSQL connection
const pgPool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
});

// MongoDB connection
const mongoFullUri = process.env.MONGO_URI; // This should now be populated by loadEnv.js via server.js

if (!mongoFullUri) {
  // If this error is thrown, it means loadEnv.js didn't work as expected
  // or MONGO_URI is missing from server/.env
  throw new Error(
    'CRITICAL FAILURE: MONGO_URI is undefined in database.js. Check server/.env and loadEnv.js/server.js import order.'
  );
}
console.log('[database.js] Will attempt to use MongoDB URI:', mongoFullUri);

const mongoClient = new MongoClient(mongoFullUri);
let mongoDbInstance;

export const connectMongoDB = async () => {
  // ... (rest of the function as before, ensuring it uses mongoFullUri)
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
      'MongoDB has not been connected yet. Ensure connectMongoDB() was called.'
    );
  }
  return mongoDbInstance;
};

export const testPostgresConnection = async () => {
  // ... (as before)
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
