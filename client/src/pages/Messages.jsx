// Messages page (signed-in users only): messages sent through the Contact form.
// Users can read them; the admin can also edit and delete them.
import { useState } from 'react'
import FormField from '../components/FormField.jsx'
import Notice from '../components/Notice.jsx'
import useCollection from '../hooks/useCollection.js'
import { useAuth } from '../auth/AuthContext.jsx'
import { contactsApi } from '../api/api.js'

const newestFirst = (items) => [...items].reverse() // MongoDB returns oldest first

// Inline edit form for one message (admin only).
function MessageEditForm({ message, onSave, onCancel }) {
  const [values, setValues] = useState({
    firstname: message.firstname ?? '',
    lastname: message.lastname ?? '',
    email: message.email ?? '',
    contactNumber: message.contactNumber ?? '',
    message: message.message ?? '',
  })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const handleChange = (event) => setValues((v) => ({ ...v, [event.target.name]: event.target.value }))

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    setError('')
    try {
      await onSave(Object.fromEntries(Object.entries(values).map(([k, v]) => [k, v.trim()])))
    } catch (err) {
      setError(err.message) // e.g. "Please fill a valid email address"
      setSaving(false)
    }
  }

  const id = (field) => `${message._id}-${field}`
  return (
    <form className="message-edit" onSubmit={handleSubmit} noValidate>
      <Notice notice={error ? { type: 'error', text: error } : null} />
      <div className="form-row">
        <FormField id={id('firstname')} name="firstname" label="First name" value={values.firstname} onChange={handleChange} />
        <FormField id={id('lastname')} name="lastname" label="Last name" value={values.lastname} onChange={handleChange} />
      </div>
      <div className="form-row">
        <FormField id={id('email')} name="email" label="Email" type="email" value={values.email} onChange={handleChange} />
        <FormField id={id('contactNumber')} name="contactNumber" label="Contact number" value={values.contactNumber} onChange={handleChange} />
      </div>
      <FormField id={id('message')} name="message" label="Message" as="textarea" rows="4" value={values.message} onChange={handleChange} />
      <div className="button-row">
        <button type="submit" className="button small" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
        <button type="button" className="button small button-secondary" onClick={onCancel} disabled={saving}>Cancel</button>
      </div>
    </form>
  )
}

function Messages() {
  const { isAdmin } = useAuth()
  const { items: messages, loading, loadError, update, remove, removeAll } = useCollection(contactsApi, {
    requiresAuth: true,
    sortItems: newestFirst,
  })
  const [editingId, setEditingId] = useState(null)
  const [notice, setNotice] = useState(null)

  async function handleSave(id, data) {
    const updated = await update(id, data)
    setEditingId(null)
    setNotice({ type: 'success', text: `Saved the message from ${updated.firstname} ${updated.lastname}.` })
  }

  async function handleDelete(message) {
    if (!window.confirm(`Delete the message from ${message.firstname} ${message.lastname}?`)) return
    try {
      await remove(message._id)
      setNotice({ type: 'success', text: `Deleted the message from ${message.firstname} ${message.lastname}.` })
    } catch (err) {
      setNotice({ type: 'error', text: err.message })
    }
  }

  async function handleDeleteAll() {
    if (!window.confirm(`Delete all ${messages.length} messages? This cannot be undone.`)) return
    try {
      const result = await removeAll()
      setNotice({ type: 'success', text: `Deleted ${result.deletedCount} message(s).` })
    } catch (err) {
      setNotice({ type: 'error', text: err.message })
    }
  }

  return (
    <section>
      <div className="page-heading">
        <div>
          <h1>Messages</h1>
          <p className="page-intro">
            Messages sent through the Contact page.{' '}
            {isAdmin ? 'As the admin, you can edit and delete them.' : 'You can read them; only the admin can change them.'}
          </p>
        </div>
        {isAdmin && messages.length > 0 && (
          <button type="button" className="button danger" onClick={handleDeleteAll}>
            Delete All
          </button>
        )}
      </div>

      <Notice notice={notice} onDismiss={() => setNotice(null)} />
      {loading && <p className="status">Loading messages…</p>}
      {loadError && <Notice notice={{ type: 'error', text: loadError }} />}
      {!loading && !loadError && messages.length === 0 && <p className="status">No messages yet.</p>}

      <ul className="message-list">
        {messages.map((message) => (
          <li key={message._id} className="panel message">
            {editingId === message._id ? (
              <MessageEditForm
                message={message}
                onSave={(data) => handleSave(message._id, data)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <>
                <div className="message-header">
                  <h2>
                    {message.firstname} {message.lastname}
                  </h2>
                  <p className="message-contact">
                    <a href={`mailto:${message.email}`}>{message.email}</a>
                    {message.contactNumber && <> · {message.contactNumber}</>}
                  </p>
                </div>
                <p className="message-body">{message.message}</p>
                {isAdmin && (
                  <div className="admin-actions">
                    <button type="button" className="button small" onClick={() => setEditingId(message._id)}>
                      Edit
                    </button>
                    <button type="button" className="button small danger" onClick={() => handleDelete(message)}>
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Messages
