// Education page: academic qualifications and professional certifications,
// each rendered as a list of entries from src/data/education.js.
import { education, certifications } from '../data/education.js'

// One qualification: credential, institution, dates, and optional detail lines.
function QualificationEntry({ qualification }) {
  return (
    <li className="panel qualification">
      <div className="qualification-header">
        <h3>{qualification.credential}</h3>
        <p className="qualification-dates">{qualification.dates}</p>
      </div>
      <p className="qualification-institution">{qualification.institution}</p>

      {qualification.details.length > 0 && (
        <ul className="qualification-details">
          {qualification.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      )}
    </li>
  )
}

function Education() {
  return (
    <section>
      <h1>Education</h1>

      <h2>Academic</h2>
      <ul className="qualification-list">
        {education.map((qualification) => (
          <QualificationEntry key={qualification.id} qualification={qualification} />
        ))}
      </ul>

      <h2>Certifications</h2>
      <ul className="qualification-list">
        {certifications.map((qualification) => (
          <QualificationEntry key={qualification.id} qualification={qualification} />
        ))}
      </ul>
    </section>
  )
}

export default Education
