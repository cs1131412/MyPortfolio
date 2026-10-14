// Contact routes: contacts REST API.
// Anyone can send a message (POST); reading and managing messages requires sign-in.
import express from 'express'
import contactCtrl from '../controllers/contact.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router
  .route('/api/contacts')
  .get(authCtrl.requireSignin, contactCtrl.list) // get all contacts
  .post(contactCtrl.create) // add new contact
  .delete(authCtrl.requireSignin, contactCtrl.removeAll) // remove all contacts

// Sign-in is checked before the contact is loaded, so signed-out requests get 401.
router
  .route('/api/contacts/:contactId')
  .get(authCtrl.requireSignin, contactCtrl.contactByID, contactCtrl.read) // get contact by id
  .put(authCtrl.requireSignin, contactCtrl.contactByID, contactCtrl.update) // update contact by id
  .delete(authCtrl.requireSignin, contactCtrl.contactByID, contactCtrl.remove) // remove contact by id

export default router
