// Contact controller: CRUD handlers for the /api/contacts routes.
import Contact from '../models/contact.model.js'
import extend from 'lodash/extend.js'
import pick from 'lodash/pick.js'
import errorHandler from '../helpers/dbErrorHandler.js'

// Only these fields may be set from a request body (stops clients overwriting _id etc.).
const editableFields = ['firstname', 'lastname', 'email', 'contactNumber', 'message']

// POST /api/contacts — add a new contact
const create = async (req, res) => {
  const contact = new Contact(pick(req.body, editableFields))
  try {
    await contact.save()
    return res.status(201).json(contact)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// GET /api/contacts — get all contacts
const list = async (req, res) => {
  try {
    const contacts = await Contact.find()
    res.json(contacts)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// Middleware: loads the contact named by :contactId into req.contact.
const contactByID = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.contactId)
    if (!contact) return res.status(404).json({ error: 'Contact not found' })
    req.contact = contact
    next()
  } catch (err) {
    // A malformed id (not a valid ObjectId) throws a CastError.
    return res.status(400).json({ error: 'Invalid contact id' })
  }
}

// GET /api/contacts/:contactId — get a contact by id
const read = (req, res) => {
  return res.json(req.contact)
}

// PUT /api/contacts/:contactId — update a contact by id
const update = async (req, res) => {
  try {
    const contact = extend(req.contact, pick(req.body, editableFields))
    await contact.save()
    res.json(contact)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// DELETE /api/contacts/:contactId — remove a contact by id
const remove = async (req, res) => {
  try {
    await req.contact.deleteOne()
    res.json({ message: 'Contact deleted', contact: req.contact })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// DELETE /api/contacts — remove all contacts
const removeAll = async (req, res) => {
  try {
    const result = await Contact.deleteMany({})
    res.json({ message: 'All contacts deleted', deletedCount: result.deletedCount })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

export default { create, list, contactByID, read, update, remove, removeAll }
