// Card for one project from the database: image, title, completion date and
// description. Admins also see Edit and Delete buttons.
import { imageForProject } from '../data/projectImages.js'
import { formatMonthYear } from '../utils/format.js'

function ProjectCard({ project, isAdmin, onEdit, onDelete }) {
  return (
    <article className="card project-card">
      <img
        src={imageForProject(project.title)}
        alt={`Illustration for ${project.title}`}
        className="card-image"
        width="640"
        height="360"
      />
      <div className="card-body">
        <h2>{project.title}</h2>
        {project.completion && <p className="card-context">Completed {formatMonthYear(project.completion)}</p>}
        {project.description && <p>{project.description}</p>}

        {isAdmin && (
          <div className="admin-actions">
            <button type="button" className="button small" onClick={() => onEdit(project)}>
              Edit
            </button>
            <button type="button" className="button small danger" onClick={() => onDelete(project)}>
              Delete
            </button>
          </div>
        )}
      </div>
    </article>
  )
}

export default ProjectCard
