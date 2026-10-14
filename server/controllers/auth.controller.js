// Authentication controller (Week 6): sign in / sign out with JWTs, plus
// middleware that protects routes.
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { expressjwt } from 'express-jwt'
import config from './../../config/config.js'

const TOKEN_LIFETIME_SECONDS = 24 * 60 * 60 // tokens (and the cookie) last one day

// POST /auth/signin — check email + password, then return a signed JWT
const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(401).json({ error: 'User not found' })

    if (!user.authenticate(req.body.password)) {
      return res.status(401).json({ error: "Email and password don't match." })
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
      expiresIn: TOKEN_LIFETIME_SECONDS,
    })

    // Also store the token in an HTTP-only cookie ("t") so browsers send it automatically.
    res.cookie('t', token, { httpOnly: true, maxAge: TOKEN_LIFETIME_SECONDS * 1000 })

    return res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
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
// the token's payload ({ _id }) is available as req.auth.
const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ['HS256'],
})

// Middleware: only lets a signed-in user change their own account (403 otherwise).
const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && String(req.profile._id) === String(req.auth._id)
  if (!authorized) {
    return res.status(403).json({ error: 'User is not authorized' })
  }
  next()
}

export default { signin, signout, requireSignin, hasAuthorization }
