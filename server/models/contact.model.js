// Contact model ("contacts" collection): messages sent through the portfolio's
// contact form. firstname, lastname and email are required by the assignment;
// contactNumber and message match the extra fields on the Assignment 1 form.
import mongoose from 'mongoose'

const ContactSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    required: 'First name is required',
  },
  lastname: {
    type: String,
    trim: true,
    required: 'Last name is required',
  },
  email: {
    type: String,
    trim: true,
    match: [/.+@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required',
  },
  contactNumber: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    trim: true,
  },
})

export default mongoose.model('Contact', ContactSchema)
