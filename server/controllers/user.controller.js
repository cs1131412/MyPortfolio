// User controller: CRUD handlers for the /api/users routes (based on the course
// skeleton). Password hashes and salts are never sent back in responses.
import User from '../models/user.model.js'
import extend from 'lodash/extend.js'
import pick from 'lodash/pick.js'
import errorHandler from '../helpers/dbErrorHandler.js'

// Clients may only set these; "password" is a virtual that hashes itself
// (see user.model.js), so hashed_password and salt can't be set directly.
const editableFields = ['name', 'email', 'password']

// Copy of a user document without the password hash and salt.
const withoutSecrets = (user) => {
  const { hashed_password, salt, ...safeUser } = user.toObject() // eslint-disable-line no-unused-vars
  return safeUser
}

// POST /api/users — add a new user (sign up)
const create = async (req, res) => {
  const user = new User(pick(req.body, editableFields))
  try {
    await user.save()
    return res.status(200).json({ message: 'Successfully signed up!' })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// GET /api/users — get all users (public fields only)
const list = async (req, res) => {
  try {
    const users = await User.find().select('name email updated created')
    res.json(users)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// Middleware: loads the user named by :userId into req.profile
// (hasAuthorization in auth.controller.js compares it with the signed-in user).
const userByID = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    if (!user) return res.status(404).json({ error: 'User not found' })
    req.profile = user
    next()
  } catch (err) {
    // A malformed id (not a valid ObjectId) throws a CastError.
    return res.status(400).json({ error: 'Invalid user id' })
  }
}

// GET /api/users/:userId — get a user by id
const read = (req, res) => {
  return res.json(withoutSecrets(req.profile))
}

// PUT /api/users/:userId — update a user by id
const update = async (req, res) => {
  try {
    const user = extend(req.profile, pick(req.body, editableFields))
    user.updated = Date.now()
    await user.save()
    res.json(withoutSecrets(user))
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// DELETE /api/users/:userId — remove a user by id
const remove = async (req, res) => {
  try {
    await req.profile.deleteOne()
    res.json({ message: 'User deleted', user: withoutSecrets(req.profile) })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// DELETE /api/users — remove all users
const removeAll = async (req, res) => {
  try {
    const result = await User.deleteMany({})
    res.json({ message: 'All users deleted', deletedCount: result.deletedCount })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

export default { create, list, userByID, read, update, remove, removeAll }
