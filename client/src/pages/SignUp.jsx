// Sign Up page: creates a regular "user" account (view-only), then signs in with it.
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import FormField from '../components/FormField.jsx'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) errors.email = 'Please enter your email.'
  else if (!emailPattern.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (values.password.length < 6) errors.password = 'Password must be at least 6 characters.'
  if (values.confirmPassword !== values.password) errors.confirmPassword = 'Passwords do not match.'
  return errors
}

function SignUp() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [values, setValues] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setValues((previous) => ({ ...previous, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    setServerError('')
    try {
      const user = await signup(values.name.trim(), values.email.trim(), values.password)
      navigate('/', { replace: true, state: { welcome: user.name } })
    } catch (err) {
      setServerError(err.message) // e.g. "Email already exists"
      setSubmitting(false)
    }
  }

  return (
    <section className="auth-page">
      <form className="panel auth-form" onSubmit={handleSubmit} noValidate>
        <h1>Sign Up</h1>
        <p className="form-note">New accounts can view everything on the site; editing is reserved for the site admin.</p>
        {serverError && (
          <p className="notice error" role="alert">
            {serverError}
          </p>
        )}

        <FormField name="name" label="Name" autoComplete="name"
          value={values.name} onChange={handleChange} error={errors.name} />
        <FormField name="email" label="Email" type="email" autoComplete="email"
          value={values.email} onChange={handleChange} error={errors.email} />
        <FormField name="password" label="Password" type="password" autoComplete="new-password"
          value={values.password} onChange={handleChange} error={errors.password} />
        <FormField name="confirmPassword" label="Confirm password" type="password" autoComplete="new-password"
          value={values.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />

        <button type="submit" className="button full-width" disabled={submitting}>
          {submitting ? 'Creating account…' : 'Sign Up'}
        </button>
        <p className="auth-switch">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </form>
    </section>
  )
}

export default SignUp
