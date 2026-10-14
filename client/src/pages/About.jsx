// About Me page: legal name, photo, short bio, and a link to my resume PDF.
import profile from '../data/profile.js'
import profilePhoto from '../assets/profile.jpg'

function About() {
  return (
    <section className="about">
      <img
        src={profilePhoto}
        alt={`Head and shoulders photo of ${profile.legalName}`}
        className="about-photo"
        width="300"
        height="400"
      />

      <div className="about-text">
        <h1>About Me</h1>
        <h2 className="about-name">{profile.legalName}</h2>
        <p className="eyebrow">{profile.headline} · {profile.studentSummary}</p>

        {profile.bioParagraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        {/* Opens the PDF in a new tab; noopener stops the new tab accessing this page */}
        <a href={profile.resumeUrl} className="button" target="_blank" rel="noopener noreferrer">
          View My Resume (PDF)
        </a>
      </div>
    </section>
  )
}

export default About
