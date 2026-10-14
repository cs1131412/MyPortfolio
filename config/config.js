// App configuration, read from environment variables in the root .env file.
// No secrets are written here: the database URI and JWT secret must come from .env.
import path from 'path'
import dotenv from 'dotenv'

// Load .env here, not in server.js: ES module imports run before the importing
// file's own code, so this file must load .env before anything reads the config.
// The path is relative to this file, so it works no matter which folder the
// server is started from (e.g. client/ when using `npm run dev`).
dotenv.config({ path: path.join(import.meta.dirname, '..', '.env'), quiet: true })

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET,
  mongoUri: process.env.MONGODB_URI,
}

export default config
