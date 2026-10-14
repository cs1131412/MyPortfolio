// Card for one project: image, title, context line, my role, the outcome, and tools used.
function ProjectCard({ project }) {
  return (
    <article className="card project-card">
      <img
        src={project.image}
        alt={`Illustration for ${project.title}`}
        className="card-image"
        width="640"
        height="360"
      />
      <div className="card-body">
        <h2>{project.title}</h2>
        <p className="card-context">{project.context}</p>

        <h3>My role</h3>
        <p>{project.role}</p>

        <h3>Outcome</h3>
        <p>{project.outcome}</p>

        <ul className="tag-list" aria-label="Tools and skills used">
          {project.tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default ProjectCard
