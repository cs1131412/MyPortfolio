// Sign In page: email + password form. On success, returns to the page the user
// was trying to reach (or Home).
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import FormField from '../components/FormField.jsx'

function SignIn() {
  const { signin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setValues((previous) => ({ ...previous, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!values.email.trim()) nextErrors.email = 'Please enter your email.'
    if (!values.password) nextErrors.password = 'Please enter your password.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    setServerError('')
    try {
      const user = await signin(values.email.trim(), values.password)
      navigate(location.state?.from || '/', { replace: true, state: { welcome: user.name } })
    } catch (err) {
      setServerError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <section className="auth-page">
      <form className="panel auth-form" onSubmit={handleSubmit} noValidate>
        <h1>Sign In</h1>
        {location.state?.from && <p className="notice info">Please sign in to continue.</p>}
        {serverError && (
          <p className="notice error" role="alert">
            {serverError}
          </p>
        )}

        <FormField name="email" label="Email" type="email" autoComplete="email"
          value={values.email} onChange={handleChange} error={errors.email} />
        <FormField name="password" label="Password" type="password" autoComplete="current-password"
          value={values.password} onChange={handleChange} error={errors.password} />

        <button type="submit" className="button full-width" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign In'}
        </button>
        <p className="auth-switch">
          No account yet? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </section>
  )
}

export default SignIn
