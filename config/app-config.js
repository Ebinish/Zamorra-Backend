import dotenv from 'dotenv';

const environment = process.env.NODE_ENV || 'development';

if (environment !== "prod") {
  const configFile = `./.env.${environment}`;
  dotenv.config({ path: configFile });
} else {
  dotenv.config();
}

export const DB_URL = process.env.MONGODB_URI;
export const PORT = process.env.PORT;
export const APP_SECRET = process.env.APP_SECRET;

export default { DB_URL, PORT, APP_SECRET };





