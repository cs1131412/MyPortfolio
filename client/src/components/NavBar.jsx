// Site header: custom logo (links Home) plus a link to each page.
// NavLink adds the "active" class to the link for the current page.
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo.jsx'

// Single source of truth for the navigation order and labels.
const navigationLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/education', label: 'Education' },
  { path: '/services', label: 'Services' },
  { path: '/contact', label: 'Contact' },
]

function NavBar() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand" aria-label="Colby Smith — Home">
          <Logo />
          <span className="brand-name">Colby Smith</span>
        </Link>

        <nav aria-label="Main navigation">
          <ul className="nav-links">
            {navigationLinks.map((link) => (
              <li key={link.path}>
                {/* "end" stops Home ("/") from matching every page as active */}
                <NavLink to={link.path} end={link.path === '/'}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default NavBar
