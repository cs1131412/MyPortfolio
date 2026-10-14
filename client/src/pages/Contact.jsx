// Contact page: a panel with my contact information beside the contact form.
import ContactForm from '../components/ContactForm.jsx'
import profile from '../data/profile.js'

function Contact() {
  const { contact } = profile

  return (
    <section>
      <h1>Contact Me</h1>
      <p className="page-intro">Have a question or an opportunity? Send me a message.</p>

      <div className="contact-layout">
        <aside className="panel contact-panel" aria-labelledby="contact-info-heading">
          <h2 id="contact-info-heading">Contact Information</h2>
          <dl className="contact-details">
            <dt>Email</dt>
            <dd>
              {/* <wbr> lets a long address wrap neatly after the @ */}
              <a href={`mailto:${contact.email}`}>
                {contact.email.split('@')[0]}@<wbr />{contact.email.split('@')[1]}
              </a>
            </dd>

            <dt>LinkedIn</dt>
            <dd>
              <a href={contact.linkedInUrl} target="_blank" rel="noopener noreferrer">
                linkedin.com/in/colby-smith
              </a>
            </dd>

            <dt>Location</dt>
            <dd>{contact.location}</dd>

            <dt>Availability</dt>
            <dd>{contact.availability}</dd>
          </dl>
        </aside>

        <ContactForm />
      </div>
    </section>
  )
}

export default Contact
