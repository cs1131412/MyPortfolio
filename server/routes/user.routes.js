// User routes: users REST API (based on the course skeleton).
// Anyone can sign up (POST). Admins can list and remove users; a signed-in user
// can read, update and delete their own account (admins can do this for any account).
import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router
  .route('/api/users')
  .get(authCtrl.requireSignin, authCtrl.requireAdmin, userCtrl.list) // get all users
  .post(userCtrl.create) // add new user (sign up)
  .delete(authCtrl.requireSignin, authCtrl.requireAdmin, userCtrl.removeAll) // remove all non-admin users

// Sign-in is checked before the user is loaded, so signed-out requests get 401.
router
  .route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.userByID, authCtrl.hasAuthorization, userCtrl.read) // get user by id
  .put(authCtrl.requireSignin, userCtrl.userByID, authCtrl.hasAuthorization, userCtrl.update) // update user by id
  .delete(authCtrl.requireSignin, userCtrl.userByID, authCtrl.hasAuthorization, userCtrl.remove) // delete user by id

export default router
