// User routes: users REST API (based on the course skeleton).
// Anyone can sign up (POST) and list users; reading, updating and deleting a
// specific account requires signing in as that user.
import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router
  .route('/api/users')
  .get(userCtrl.list) // get all users (name/email only)
  .post(userCtrl.create) // add new user (sign up)
  .delete(authCtrl.requireSignin, userCtrl.removeAll) // remove all users

// Sign-in is checked before the user is loaded, so signed-out requests get 401.
router
  .route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.userByID, userCtrl.read) // get user by id
  .put(authCtrl.requireSignin, userCtrl.userByID, authCtrl.hasAuthorization, userCtrl.update) // update own account
  .delete(authCtrl.requireSignin, userCtrl.userByID, authCtrl.hasAuthorization, userCtrl.remove) // delete own account

export default router
