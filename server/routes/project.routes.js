// Project routes: projects REST API.
// Anyone can read projects; changes require sign-in.
import express from 'express'
import projectCtrl from '../controllers/project.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router
  .route('/api/projects')
  .get(projectCtrl.list) // get all projects
  .post(authCtrl.requireSignin, projectCtrl.create) // add new project
  .delete(authCtrl.requireSignin, projectCtrl.removeAll) // remove all projects

// Sign-in is checked before the project is loaded, so signed-out requests get 401.
router
  .route('/api/projects/:projectId')
  .get(projectCtrl.projectByID, projectCtrl.read) // get project by id
  .put(authCtrl.requireSignin, projectCtrl.projectByID, projectCtrl.update) // update project by id
  .delete(authCtrl.requireSignin, projectCtrl.projectByID, projectCtrl.remove) // remove project by id

export default router
