// Express app setup: middleware first, then the API routes, then the error handler.
import express from 'express'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import contactRoutes from './routes/contact.routes.js'
import projectRoutes from './routes/project.routes.js'
import qualificationRoutes from './routes/qualification.routes.js'

const app = express()

// Middleware must be registered before the routes, or it never runs for them.
app.use(express.json()) // parse JSON request bodies
app.use(express.urlencoded({ extended: true })) // parse form-encoded bodies
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

// API routes
app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/', contactRoutes)
app.use('/', projectRoutes)
app.use('/', qualificationRoutes)

// Unknown API paths get a JSON 404 instead of Express's default HTML page.
app.use('/api', (req, res) => {
  res.status(404).json({ error: `No route for ${req.method} ${req.originalUrl}` })
})

// Error handler: invalid or missing JWTs become 401s, anything else a 400.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: err.name + ': ' + err.message })
  } else if (err) {
    res.status(400).json({ error: err.name + ': ' + err.message })
    console.log(err)
  }
})

export default app
