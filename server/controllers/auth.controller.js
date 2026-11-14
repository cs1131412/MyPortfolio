// Authentication controller (Week 6): sign in / sign out with JWTs, plus
// middleware that protects routes by sign-in and by role.
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { expressjwt } from 'express-jwt'
import config from './../../config/config.js'

const TOKEN_LIFETIME_SECONDS = 24 * 60 * 60 // tokens (and the cookie) last one day

// POST /auth/signin — check email + password, then return a signed JWT
const signin = async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase()
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ error: 'User not found' })

    if (!user.authenticate(req.body.password)) {
      return res.status(401).json({ error: "Email and password don't match." })
    }

    const token = jwt.sign({ _id: user._id, role: user.role }, config.jwtSecret, {
      expiresIn: TOKEN_LIFETIME_SECONDS,
    })

    // Also store the token in an HTTP-only cookie ("t") so browsers send it automatically.
    res.cookie('t', token, { httpOnly: true, maxAge: TOKEN_LIFETIME_SECONDS * 1000 })

    return res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    })
  } catch (err) {
    return res.status(401).json({ error: 'Could not sign in' })
  }
}

// GET /auth/signout — clear the token cookie
const signout = (req, res) => {
  res.clearCookie('t')
  return res.status(200).json({ message: 'signed out' })
}

// Middleware: rejects the request with 401 unless it carries a valid JWT in the
// "Authorization: Bearer <token>" header (as in the course material). On success
// the token's payload ({ _id, role }) is available as req.auth.
const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ['HS256'],
})

// The signed-in user's current role, read from the database rather than the token,
// so a role change (or a deleted account) takes effect immediately.
const currentRole = async (req) => {
  if (!req.auth?._id) return null
  const user = await User.findById(req.auth._id).select('role')
  return user?.role ?? null
}

// Middleware (use after requireSignin): only admins may continue (403 otherwise).
const requireAdmin = async (req, res, next) => {
  try {
    if ((await currentRole(req)) !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' })
    }
    next()
  } catch (err) {
    return res.status(400).json({ error: 'Could not check permissions' })
  }
}

// Middleware: lets a signed-in user access their own account, and admins access any (403 otherwise).
const hasAuthorization = async (req, res, next) => {
  try {
    const isOwner = req.profile && req.auth && String(req.profile._id) === String(req.auth._id)
    if (isOwner || (await currentRole(req)) === 'admin') return next()
    return res.status(403).json({ error: 'User is not authorized' })
  } catch (err) {
    return res.status(400).json({ error: 'Could not check permissions' })
  }
}

export default { signin, signout, requireSignin, requireAdmin, hasAuthorization }
