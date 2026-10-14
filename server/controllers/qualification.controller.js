// Qualification controller: CRUD handlers for the /api/qualifications routes.
import Qualification from '../models/qualification.model.js'
import extend from 'lodash/extend.js'
import pick from 'lodash/pick.js'
import errorHandler from '../helpers/dbErrorHandler.js'

// Only these fields may be set from a request body (stops clients overwriting _id etc.).
const editableFields = ['title', 'firstname', 'lastname', 'email', 'completion', 'description']

// POST /api/qualifications — add a new qualification
const create = async (req, res) => {
  const qualification = new Qualification(pick(req.body, editableFields))
  try {
    await qualification.save()
    return res.status(201).json(qualification)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// GET /api/qualifications — get all qualifications
const list = async (req, res) => {
  try {
    const qualifications = await Qualification.find()
    res.json(qualifications)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// Middleware: loads the qualification named by :qualificationId into req.qualification.
const qualificationByID = async (req, res, next) => {
  try {
    const qualification = await Qualification.findById(req.params.qualificationId)
    if (!qualification) return res.status(404).json({ error: 'Qualification not found' })
    req.qualification = qualification
    next()
  } catch (err) {
    // A malformed id (not a valid ObjectId) throws a CastError.
    return res.status(400).json({ error: 'Invalid qualification id' })
  }
}

// GET /api/qualifications/:qualificationId — get a qualification by id
const read = (req, res) => {
  return res.json(req.qualification)
}

// PUT /api/qualifications/:qualificationId — update a qualification by id
const update = async (req, res) => {
  try {
    const qualification = extend(req.qualification, pick(req.body, editableFields))
    await qualification.save()
    res.json(qualification)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// DELETE /api/qualifications/:qualificationId — remove a qualification by id
const remove = async (req, res) => {
  try {
    await req.qualification.deleteOne()
    res.json({ message: 'Qualification deleted', qualification: req.qualification })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// DELETE /api/qualifications — remove all qualifications
const removeAll = async (req, res) => {
  try {
    const result = await Qualification.deleteMany({})
    res.json({ message: 'All qualifications deleted', deletedCount: result.deletedCount })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

export default { create, list, qualificationByID, read, update, remove, removeAll }
