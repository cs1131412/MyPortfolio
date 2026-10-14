// Shown for any URL that doesn't match a route.
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section>
      <h1>Page not found</h1>
      <p>Sorry, that page doesn&apos;t exist.</p>
      <Link to="/" className="button">Back to Home</Link>
    </section>
  )
}

export default NotFound
