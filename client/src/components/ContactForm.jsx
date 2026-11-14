// Contact form: captures the visitor's details in state, validates them, and on a
// valid submit saves the message to the database (POST /api/contacts), then goes to
// the Home page, which shows a thank-you. Anyone can send a message; no sign-in needed.
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { contactsApi } from '../api/api.js'
import Notice from './Notice.jsx'

const emptyForm = {
  firstName: '',
  lastName: '',
  contactNumber: '',
  email: '',
  message: '',
}

// Simple format checks; good enough to catch typos, not a full RFC validator.
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[0-9+()\-.\s]{7,20}$/

// Returns an object of { fieldName: errorMessage } for every invalid field.
function validateContactForm(formValues) {
  const errors = {}

  if (!formValues.firstName.trim()) errors.firstName = 'Please enter your first name.'
  if (!formValues.lastName.trim()) errors.lastName = 'Please enter your last name.'

  if (!formValues.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!emailPattern.test(formValues.email.trim())) {
    errors.email = 'Please enter a valid email address, like name@example.com.'
  }

  // Contact number is optional, but must look like a phone number if given.
  if (formValues.contactNumber.trim() && !phonePattern.test(formValues.contactNumber.trim())) {
    errors.contactNumber = 'Please enter a valid phone number, or leave this blank.'
  }

  if (!formValues.message.trim()) errors.message = 'Please enter a message.'

  return errors
}

// Error message under a field; its id matches the input's aria-describedby.
function FieldError({ name, errors }) {
  if (!errors[name]) return null
  return (
    <p id={`${name}-error`} className="field-error">
      {errors[name]}
    </p>
  )
}

function ContactForm() {
  const [formValues, setFormValues] = useState(emptyForm)
  const [formErrors, setFormErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [sending, setSending] = useState(false)
  const navigate = useNavigate()

  // One change handler for every input, keyed by the input's "name" attribute.
  function handleInputChange(event) {
    const { name, value } = event.target
    setFormValues((previousValues) => ({ ...previousValues, [name]: value }))
  }

  async function handleContactSubmit(event) {
    event.preventDefault() // stop the browser's default full-page form submission

    const errors = validateContactForm(formValues)
    setFormErrors(errors)
    if (Object.keys(errors).length > 0) return // stay on the page and show the errors

    // Trim whitespace so the saved data is clean.
    const submission = Object.fromEntries(
      Object.entries(formValues).map(([field, value]) => [field, value.trim()]),
    )

    setSending(true)
    setServerError('')
    try {
      // The API uses lowercase field names (firstname/lastname), as in the assignment spec.
      await contactsApi.create({
        firstname: submission.firstName,
        lastname: submission.lastName,
        email: submission.email,
        contactNumber: submission.contactNumber,
        message: submission.message,
      })
      // Redirect to Home, passing the submission along so Home can thank the visitor.
      navigate('/', { state: { contactSubmission: submission } })
    } catch (err) {
      setServerError(`Your message could not be sent: ${err.message}`)
      setSending(false)
    }
  }

  // Shared props for an input: links it to its error message for screen readers.
  function fieldProps(name) {
    return {
      id: name,
      name,
      value: formValues[name],
      onChange: handleInputChange,
      'aria-invalid': formErrors[name] ? true : undefined,
      'aria-describedby': formErrors[name] ? `${name}-error` : undefined,
    }
  }

  return (
    <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
      <Notice notice={serverError ? { type: 'error', text: serverError } : null} />
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="firstName">First name *</label>
          <input type="text" autoComplete="given-name" {...fieldProps('firstName')} />
          <FieldError name="firstName" errors={formErrors} />
        </div>

        <div className="form-field">
          <label htmlFor="lastName">Last name *</label>
          <input type="text" autoComplete="family-name" {...fieldProps('lastName')} />
          <FieldError name="lastName" errors={formErrors} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="email">Email address *</label>
          <input type="email" autoComplete="email" {...fieldProps('email')} />
          <FieldError name="email" errors={formErrors} />
        </div>

        <div className="form-field">
          <label htmlFor="contactNumber">Contact number</label>
          <input type="tel" autoComplete="tel" {...fieldProps('contactNumber')} />
          <FieldError name="contactNumber" errors={formErrors} />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="message">Message *</label>
        <textarea rows="6" {...fieldProps('message')} />
        <FieldError name="message" errors={formErrors} />
      </div>

      <p className="form-note">* Required</p>
      <button type="submit" className="button" disabled={sending}>
        {sending ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}

export default ContactForm
