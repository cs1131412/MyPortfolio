// Project routes: projects REST API.
// Anyone can read projects; only admins can add, change or delete them.
import express from 'express'
import projectCtrl from '../controllers/project.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

// Shorthand for "signed in AND an admin"
const adminOnly = [authCtrl.requireSignin, authCtrl.requireAdmin]

router
  .route('/api/projects')
  .get(projectCtrl.list) // get all projects
  .post(...adminOnly, projectCtrl.create) // add new project
  .delete(...adminOnly, projectCtrl.removeAll) // remove all projects

// Permissions are checked before the project is loaded, so unauthorized requests get 401/403.
router
  .route('/api/projects/:projectId')
  .get(projectCtrl.projectByID, projectCtrl.read) // get project by id
  .put(...adminOnly, projectCtrl.projectByID, projectCtrl.update) // update project by id
  .delete(...adminOnly, projectCtrl.projectByID, projectCtrl.remove) // remove project by id

export default router
