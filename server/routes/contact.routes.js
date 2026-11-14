// Contact routes: contacts REST API.
// Anyone can send a message (POST); signed-in users can read messages; only admins can change or delete them.
import express from 'express'
import contactCtrl from '../controllers/contact.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

// Shorthand for "signed in AND an admin"
const adminOnly = [authCtrl.requireSignin, authCtrl.requireAdmin]

router
  .route('/api/contacts')
  .get(authCtrl.requireSignin, contactCtrl.list) // get all contacts
  .post(contactCtrl.create) // add new contact
  .delete(...adminOnly, contactCtrl.removeAll) // remove all contacts

// Permissions are checked before the contact is loaded, so unauthorized requests get 401/403.
router
  .route('/api/contacts/:contactId')
  .get(authCtrl.requireSignin, contactCtrl.contactByID, contactCtrl.read) // get contact by id
  .put(...adminOnly, contactCtrl.contactByID, contactCtrl.update) // update contact by id
  .delete(...adminOnly, contactCtrl.contactByID, contactCtrl.remove) // remove contact by id

export default router
