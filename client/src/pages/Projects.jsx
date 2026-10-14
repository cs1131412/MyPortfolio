// Projects page: a grid of project cards generated from src/data/projects.js.
import ProjectCard from '../components/ProjectCard.jsx'
import projects from '../data/projects.js'

function Projects() {
  return (
    <section>
      <h1>Projects</h1>
      <p className="page-intro">A selection of work and academic projects I&apos;ve contributed to.</p>

      <div className="card-grid project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}

export default Projects
