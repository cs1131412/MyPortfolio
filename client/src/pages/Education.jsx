// Education page: qualifications loaded from the database. Everyone can view
// them; the admin can add, edit and delete qualifications on this page.
import { useState } from 'react'
import EntryForm from '../components/EntryForm.jsx'
import Notice from '../components/Notice.jsx'
import useCollection from '../hooks/useCollection.js'
import { useAuth } from '../auth/AuthContext.jsx'
import { qualificationsApi } from '../api/api.js'
import { byCompletionDesc, formatMonthYear } from '../utils/format.js'

// One qualification: title, completion date, description (+ admin buttons).
function QualificationEntry({ qualification, isAdmin, onEdit, onDelete }) {
  return (
    <li className="panel qualification">
      <div className="qualification-header">
        <h3>{qualification.title}</h3>
        {qualification.completion && (
          <p className="qualification-dates">{formatMonthYear(qualification.completion)}</p>
        )}
      </div>
      {qualification.description && <p className="qualification-institution">{qualification.description}</p>}
      {isAdmin && (
        <div className="admin-actions">
          <button type="button" className="button small" onClick={() => onEdit(qualification)}>
            Edit
          </button>
          <button type="button" className="button small danger" onClick={() => onDelete(qualification)}>
            Delete
          </button>
        </div>
      )}
    </li>
  )
}

function Education() {
  const { isAdmin } = useAuth()
  const { items: qualifications, loading, loadError, create, update, remove } = useCollection(qualificationsApi, {
    sortItems: byCompletionDesc,
  })
  const [editing, setEditing] = useState(null) // null, 'new', or the qualification being edited
  const [notice, setNotice] = useState(null)

  async function handleSave(data) {
    if (editing === 'new') {
      const created = await create(data)
      setNotice({ type: 'success', text: `Added “${created.title}”.` })
    } else {
      const updated = await update(editing._id, data)
      setNotice({ type: 'success', text: `Saved “${updated.title}”.` })
    }
    setEditing(null)
  }

  async function handleDelete(qualification) {
    if (!window.confirm(`Delete the qualification “${qualification.title}”?`)) return
    try {
      await remove(qualification._id)
      if (editing?._id === qualification._id) setEditing(null)
      setNotice({ type: 'success', text: `Deleted “${qualification.title}”.` })
    } catch (err) {
      setNotice({ type: 'error', text: err.message })
    }
  }

  function startEditing(entry) {
    setEditing(entry)
    setNotice(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section>
      <div className="page-heading">
        <div>
          <h1>Education</h1>
          <p className="page-intro">My academic and professional qualifications.</p>
        </div>
        {isAdmin && !editing && (
          <button type="button" className="button" onClick={() => startEditing('new')}>
            + Add Qualification
          </button>
        )}
      </div>

      <Notice notice={notice} onDismiss={() => setNotice(null)} />

      {isAdmin && editing && (
        <EntryForm
          key={editing === 'new' ? 'new' : editing._id}
          kind="Qualification"
          entry={editing === 'new' ? null : editing}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}

      {loading && <p className="status">Loading qualifications…</p>}
      {loadError && <Notice notice={{ type: 'error', text: loadError }} />}
      {!loading && !loadError && qualifications.length === 0 && <p className="status">No qualifications yet.</p>}

      <ul className="qualification-list">
        {qualifications.map((qualification) => (
          <QualificationEntry
            key={qualification._id}
            qualification={qualification}
            isAdmin={isAdmin}
            onEdit={startEditing}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </section>
  )
}

export default Education
