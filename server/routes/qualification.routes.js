// Qualification routes: qualifications REST API.
// Anyone can read qualifications; changes require sign-in.
import express from 'express'
import qualificationCtrl from '../controllers/qualification.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router
  .route('/api/qualifications')
  .get(qualificationCtrl.list) // get all qualifications
  .post(authCtrl.requireSignin, qualificationCtrl.create) // add new qualification
  .delete(authCtrl.requireSignin, qualificationCtrl.removeAll) // remove all qualifications

// Sign-in is checked before the qualification is loaded, so signed-out requests get 401.
router
  .route('/api/qualifications/:qualificationId')
  .get(qualificationCtrl.qualificationByID, qualificationCtrl.read) // get qualification by id
  .put(authCtrl.requireSignin, qualificationCtrl.qualificationByID, qualificationCtrl.update) // update qualification by id
  .delete(authCtrl.requireSignin, qualificationCtrl.qualificationByID, qualificationCtrl.remove) // remove qualification by id

export default router
