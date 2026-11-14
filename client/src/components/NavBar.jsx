// Site header: custom logo (links Home), a link to each page, and the account
// area (Sign In / Sign Up, or the signed-in user's name, role and Sign Out).
// NavLink adds the "active" class to the link for the current page.
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logo from './Logo.jsx'
import { useAuth } from '../auth/AuthContext.jsx'

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
  const { user, isSignedIn, isAdmin, signout } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signout()
    navigate('/', { state: { signedOut: true } })
  }

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
            {isSignedIn && (
              <li>
                <NavLink to="/messages">Messages</NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div className="account">
          {isSignedIn ? (
            <>
              <span className="account-name">
                {user.name}
                <span className={`role-badge ${isAdmin ? 'admin' : ''}`}>{isAdmin ? 'Admin' : 'User'}</span>
              </span>
              <button type="button" className="button small button-secondary" onClick={handleSignOut}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/signin" className="button small button-secondary">
                Sign In
              </NavLink>
              <NavLink to="/signup" className="button small">
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default NavBar
