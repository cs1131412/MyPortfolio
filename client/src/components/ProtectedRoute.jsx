// Wraps pages that need a signed-in user; anyone else is sent to Sign In, which
// returns them to the page they wanted afterwards.
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'

function ProtectedRoute({ children }) {
  const { isSignedIn } = useAuth()
  const location = useLocation()

  if (!isSignedIn) {
    return <Navigate to="/signin" replace state={{ from: location.pathname }} />
  }
  return children
}

export default ProtectedRoute
