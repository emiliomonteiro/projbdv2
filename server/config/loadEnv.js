// server/config/loadEnv.js
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
// Assuming loadEnv.js is in server/config, __dirname here will be server/config
// We need to go up one level to get to the server directory for server/.env
const __serverDir = path.dirname(path.dirname(__filename));

const envPath = path.resolve(__serverDir, '.env');

// console.log('[loadEnv.js] Attempting to load .env from:', envPath); // Keep for now
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('[loadEnv.js] ERROR loading .env file:', result.error);
  // Optionally, throw the error to halt execution if .env is critical
  // throw result.error;
} else {
  // console.log('[loadEnv.js] .env loaded. MONGO_URI:', process.env.MONGO_URI); // Keep for now
}
