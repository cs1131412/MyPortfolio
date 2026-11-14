// Authentication state for the whole app: the signed-in user and their JWT.
// Saved in localStorage so a page refresh keeps you signed in until the token expires.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import * as api from '../api/api.js'

const STORAGE_KEY = 'portfolio-auth'
const AuthContext = createContext(null)

// Seconds since 1970 when the JWT expires (read from its payload), or 0 if unreadable.
function tokenExpiry(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))
    return payload.exp || 0
  } catch {
    return 0
  }
}

// Restore a saved session, ignoring it if the token has expired.
function loadSession() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (saved?.token && tokenExpiry(saved.token) * 1000 > Date.now()) return saved
  } catch {
    /* no saved session */
  }
  return { token: null, user: null }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(loadSession)

  const saveSession = useCallback((next) => {
    setSession(next)
    if (next.token) localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    else localStorage.removeItem(STORAGE_KEY)
  }, [])

  const signin = useCallback(
    async (email, password) => {
      const { token, user } = await api.signin(email, password)
      saveSession({ token, user })
      return user
    },
    [saveSession],
  )

  // Creates the account, then signs straight in with it.
  const signup = useCallback(
    async (name, email, password) => {
      await api.signup(name, email, password)
      return signin(email, password)
    },
    [signin],
  )

  const signout = useCallback(async () => {
    saveSession({ token: null, user: null })
    await api.signout().catch(() => {}) // clears the server's cookie; fine if it fails
  }, [saveSession])

  // If the server ever rejects our token (e.g. it expired), sign out locally.
  useEffect(() => {
    api.setUnauthorizedHandler(() => saveSession({ token: null, user: null }))
  }, [saveSession])

  const value = useMemo(
    () => ({
      user: session.user,
      token: session.token,
      isSignedIn: Boolean(session.token),
      isAdmin: session.user?.role === 'admin',
      signin,
      signup,
      signout,
    }),
    [session, signin, signup, signout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook used by components: const { user, isAdmin, signin, ... } = useAuth()
// eslint-disable-next-line react/only-export-components -- the hook belongs with its provider
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>')
  return context
}
