// Projects page: projects loaded from the database. Everyone can view them;
// the admin can add, edit and delete projects right on this page.
import { useState } from 'react'
import ProjectCard from '../components/ProjectCard.jsx'
import EntryForm from '../components/EntryForm.jsx'
import Notice from '../components/Notice.jsx'
import useCollection from '../hooks/useCollection.js'
import { useAuth } from '../auth/AuthContext.jsx'
import { projectsApi } from '../api/api.js'
import { byCompletionDesc } from '../utils/format.js'

function Projects() {
  const { isAdmin } = useAuth()
  const { items: projects, loading, loadError, create, update, remove } = useCollection(projectsApi, {
    sortItems: byCompletionDesc,
  })
  const [editing, setEditing] = useState(null) // null (no form), 'new', or the project being edited
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

  async function handleDelete(project) {
    if (!window.confirm(`Delete the project “${project.title}”?`)) return
    try {
      await remove(project._id)
      if (editing?._id === project._id) setEditing(null)
      setNotice({ type: 'success', text: `Deleted “${project.title}”.` })
    } catch (err) {
      setNotice({ type: 'error', text: err.message })
    }
  }

  function startEditing(entry) {
    setEditing(entry)
    setNotice(null)
    window.scrollTo({ top: 0, behavior: 'smooth' }) // the form is at the top of the page
  }

  return (
    <section>
      <div className="page-heading">
        <div>
          <h1>Projects</h1>
          <p className="page-intro">A selection of work and academic projects I&apos;ve contributed to.</p>
        </div>
        {isAdmin && !editing && (
          <button type="button" className="button" onClick={() => startEditing('new')}>
            + Add Project
          </button>
        )}
      </div>

      <Notice notice={notice} onDismiss={() => setNotice(null)} />

      {isAdmin && editing && (
        <EntryForm
          key={editing === 'new' ? 'new' : editing._id} // fresh form for each project
          kind="Project"
          entry={editing === 'new' ? null : editing}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}

      {loading && <p className="status">Loading projects…</p>}
      {loadError && <Notice notice={{ type: 'error', text: loadError }} />}
      {!loading && !loadError && projects.length === 0 && <p className="status">No projects yet.</p>}

      <div className="card-grid project-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            isAdmin={isAdmin}
            onEdit={startEditing}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  )
}

export default Projects
