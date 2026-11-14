// Home page: welcome message, mission statement, and buttons leading to other pages.
// Also shows a short banner after a contact form submission, sign-in/sign-up or
// sign-out (passed through React Router's location state).
import { Link, useLocation } from 'react-router-dom'
import profile from '../data/profile.js'

function Home() {
  const location = useLocation()
  const contactSubmission = location.state?.contactSubmission
  const welcomeName = location.state?.welcome
  const signedOut = location.state?.signedOut

  return (
    <>
      {contactSubmission && (
        <div className="confirmation" role="status">
          <strong>Thanks, {contactSubmission.firstName}!</strong> Your message was received.
          I&apos;ll get back to you at {contactSubmission.email}.
        </div>
      )}
      {welcomeName && (
        <div className="confirmation" role="status">
          <strong>Welcome, {welcomeName}!</strong> You&apos;re signed in.
        </div>
      )}
      {signedOut && (
        <div className="confirmation" role="status">
          You&apos;ve been signed out.
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
