// Services page: the services I offer, each with an icon and short description.
import { Link } from 'react-router-dom'
import services from '../data/services.js'

function Services() {
  return (
    <section>
      <h1>Services</h1>
      <p className="page-intro">Here&apos;s how I can help with your next project.</p>

      <ul className="card-grid service-grid">
        {services.map((service) => (
          <li key={service.id} className="card service-card">
            {/* Decorative icon: the title already says what the service is */}
            <img src={service.icon} alt="" className="service-icon" width="56" height="56" />
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </li>
        ))}
      </ul>

      <p className="services-cta">
        Interested in working together? <Link to="/contact">Get in touch</Link>.
      </p>
    </section>
  )
}

export default Services
