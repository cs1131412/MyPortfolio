// Home page: welcome message, mission statement, and buttons leading to other pages.
// After a contact form submission, also shows a thank-you message (data arrives
// through React Router's location state — see ContactForm.jsx).
import { Link, useLocation } from 'react-router-dom'
import profile from '../data/profile.js'

function Home() {
  const location = useLocation()
  const contactSubmission = location.state?.contactSubmission

  return (
    <>
      {contactSubmission && (
        <div className="confirmation" role="status">
          <strong>Thanks, {contactSubmission.firstName}!</strong> Your message was received.
          I&apos;ll get back to you at {contactSubmission.email}.
        </div>
      )}

      <section className="hero">
        <p className="eyebrow">{profile.headline}</p>
        <h1>Hi, I&apos;m {profile.legalName}</h1>
        <p className="lead">{profile.welcomeMessage}</p>

        <div className="button-row">
          <Link to="/about" className="button">About Me</Link>
          <Link to="/projects" className="button button-secondary">View My Projects</Link>
        </div>
      </section>

      <section className="panel">
        <h2>Mission Statement</h2>
        <p>{profile.missionStatement}</p>
      </section>
    </>
  )
}

export default Home
