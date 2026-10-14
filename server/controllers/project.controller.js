// Project controller: CRUD handlers for the /api/projects routes.
import Project from '../models/project.model.js'
import extend from 'lodash/extend.js'
import pick from 'lodash/pick.js'
import errorHandler from '../helpers/dbErrorHandler.js'

// Only these fields may be set from a request body (stops clients overwriting _id etc.).
const editableFields = ['title', 'firstname', 'lastname', 'email', 'completion', 'description']

// POST /api/projects — add a new project
const create = async (req, res) => {
  const project = new Project(pick(req.body, editableFields))
  try {
    await project.save()
    return res.status(201).json(project)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// GET /api/projects — get all projects
const list = async (req, res) => {
  try {
    const projects = await Project.find()
    res.json(projects)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// Middleware: loads the project named by :projectId into req.project.
const projectByID = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.projectId)
    if (!project) return res.status(404).json({ error: 'Project not found' })
    req.project = project
    next()
  } catch (err) {
    // A malformed id (not a valid ObjectId) throws a CastError.
    return res.status(400).json({ error: 'Invalid project id' })
  }
}

// GET /api/projects/:projectId — get a project by id
const read = (req, res) => {
  return res.json(req.project)
}

// PUT /api/projects/:projectId — update a project by id
const update = async (req, res) => {
  try {
    const project = extend(req.project, pick(req.body, editableFields))
    await project.save()
    res.json(project)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// DELETE /api/projects/:projectId — remove a project by id
const remove = async (req, res) => {
  try {
    await req.project.deleteOne()
    res.json({ message: 'Project deleted', project: req.project })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// DELETE /api/projects — remove all projects
const removeAll = async (req, res) => {
  try {
    const result = await Project.deleteMany({})
    res.json({ message: 'All projects deleted', deletedCount: result.deletedCount })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

export default { create, list, projectByID, read, update, remove, removeAll }
