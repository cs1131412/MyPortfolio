// Qualification routes: qualifications REST API.
// Anyone can read qualifications; only admins can add, change or delete them.
import express from 'express'
import qualificationCtrl from '../controllers/qualification.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

// Shorthand for "signed in AND an admin"
const adminOnly = [authCtrl.requireSignin, authCtrl.requireAdmin]

router
  .route('/api/qualifications')
  .get(qualificationCtrl.list) // get all qualifications
  .post(...adminOnly, qualificationCtrl.create) // add new qualification
  .delete(...adminOnly, qualificationCtrl.removeAll) // remove all qualifications

// Permissions are checked before the qualification is loaded, so unauthorized requests get 401/403.
router
  .route('/api/qualifications/:qualificationId')
  .get(qualificationCtrl.qualificationByID, qualificationCtrl.read) // get qualification by id
  .put(...adminOnly, qualificationCtrl.qualificationByID, qualificationCtrl.update) // update qualification by id
  .delete(...adminOnly, qualificationCtrl.qualificationByID, qualificationCtrl.remove) // remove qualification by id

export default router
