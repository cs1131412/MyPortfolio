// Creates the admin account directly in MongoDB (or updates it if it already exists).
// The credentials come from .env (ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD), so they
// are stored in the database but never committed to GitHub.
// Run with: npm run seed:admin
import config from '../config/config.js'
import mongoose from 'mongoose'
import User from '../server/models/user.model.js'

const name = process.env.ADMIN_NAME || 'Administrator'
const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase()
const password = process.env.ADMIN_PASSWORD || ''

if (!config.mongoUri || !email || password.length < 6) {
  console.error('Set MONGODB_URI, ADMIN_EMAIL and ADMIN_PASSWORD (6+ characters) in .env first.')
  process.exit(1)
}

try {
  await mongoose.connect(config.mongoUri)
  let admin = await User.findOne({ email })
  const existed = Boolean(admin)
  if (!admin) admin = new User({ email })
  admin.name = name
  admin.password = password // virtual: stores a salted hash, never the plain password
  admin.role = 'admin'
  admin.updated = Date.now()
  await admin.save()
  console.log(`${existed ? 'Updated' : 'Created'} admin account: ${admin.email} (role: ${admin.role})`)
} catch (err) {
  console.error('Could not seed the admin account:', err.message)
  process.exitCode = 1
} finally {
  await mongoose.disconnect()
}
