// Entry point for the backend: connects to MongoDB and starts the Express server.
// Environment variables (.env) are loaded by config/config.js, imported first.
import config from './config/config.js'
import dns from 'dns'
import mongoose from 'mongoose'
import app from './server/express.js'

// Some systems (Node 24.14+) can't resolve Atlas "mongodb+srv" addresses with the
// system DNS; the course skeleton forces 8.8.8.8 for that. It's opt-in here because
// networks that block outside DNS servers (e.g. VPNs) then can't connect at all.
if (process.env.DNS_SERVER) {
  dns.setServers([process.env.DNS_SERVER])
}

if (!config.mongoUri || !config.jwtSecret) {
  console.error('Missing MONGODB_URI or JWT_SECRET. Copy .env.example to .env and fill it in.')
  process.exit(1)
}

mongoose
  .connect(config.mongoUri)
  .then(() => {
    console.log('Connected to the database!')
  })
  .catch((err) => {
    // Log the reason only, never the connection string (it contains the password).
    console.error('Unable to connect to the database:', err.message)
  })

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to My Portfolio application.' })
})

app.listen(config.port, (err) => {
  if (err) {
    // e.g. the port is already in use or reserved by Windows
    console.error(`Could not start server on port ${config.port}:`, err.message)
    process.exit(1)
  }
  console.info('Server started on port %s.', config.port)
})
