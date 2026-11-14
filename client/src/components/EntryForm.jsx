// Add/edit form for a portfolio entry: a Project or a Qualification (both have the
// same fields: title, completion date, description and the owner's name/email).
// Pass `entry` to edit an existing record, or leave it out to add a new one.
import { useState } from 'react'
import FormField from './FormField.jsx'
import profile from '../data/profile.js'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const [defaultFirstname, ...rest] = profile.legalName.split(' ')
const defaultOwner = { firstname: defaultFirstname, lastname: rest.join(' '), email: profile.contact.email }

// Dates come from the API as ISO strings; <input type="date"> wants YYYY-MM-DD.
const toDateInput = (value) => (value ? String(value).slice(0, 10) : '')

function initialValues(entry) {
  if (!entry) return { title: '', completion: '', description: '', ...defaultOwner }
  return {
    title: entry.title ?? '',
    completion: toDateInput(entry.completion),
    description: entry.description ?? '',
    firstname: entry.firstname ?? '',
    lastname: entry.lastname ?? '',
    email: entry.email ?? '',
  }
}

function validate(values) {
  const errors = {}
  if (!values.title.trim()) errors.title = 'Please enter a title.'
  if (values.email.trim() && !emailPattern.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  return errors
}

// kind: "Project" or "Qualification" (used in headings and labels)
// onSave(data) returns a promise; onCancel closes the form.
function EntryForm({ kind, entry, onSave, onCancel }) {
  const [values, setValues] = useState(() => initialValues(entry))
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [saving, setSaving] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setValues((previous) => ({ ...previous, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSaving(true)
    setServerError('')
    try {
      // Trim text; send an empty date as null so the field is cleared.
      const data = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value.trim()]))
      data.completion = data.completion || null
      await onSave(data)
    } catch (err) {
      setServerError(err.message)
      setSaving(false)
    }
  }

  const prefix = kind.toLowerCase() // unique input ids if two forms are ever on one page
  return (
    <form className="panel entry-form" onSubmit={handleSubmit} noValidate>
      <h2>{entry ? `Edit ${kind}` : `Add ${kind}`}</h2>
      {serverError && (
        <p className="notice error" role="alert">
          {serverError}
        </p>
      )}

      <div className="form-row">
        <FormField id={`${prefix}-title`} name="title" label="Title *" value={values.title}
          onChange={handleChange} error={errors.title} />
        <FormField id={`${prefix}-completion`} name="completion" label="Completion date" type="date" value={values.completion}
          onChange={handleChange} />
      </div>
      <FormField id={`${prefix}-description`} name="description" label="Description" as="textarea" rows="4" value={values.description}
        onChange={handleChange} />
      <div className="form-row three">
        <FormField id={`${prefix}-firstname`} name="firstname" label="First name" value={values.firstname}
          onChange={handleChange} />
        <FormField id={`${prefix}-lastname`} name="lastname" label="Last name" value={values.lastname}
          onChange={handleChange} />
        <FormField id={`${prefix}-email`} name="email" label="Email" type="email" value={values.email}
          onChange={handleChange} error={errors.email} />
      </div>

      <p className="form-note">* Required</p>
      <div className="button-row">
        <button type="submit" className="button" disabled={saving}>
          {saving ? 'Saving…' : entry ? 'Save Changes' : `Add ${kind}`}
        </button>
        <button type="button" className="button button-secondary" onClick={onCancel} disabled={saving}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default EntryForm
