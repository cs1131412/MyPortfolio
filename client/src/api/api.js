// API client for the Express backend. Paths are relative ("/api/...", "/auth/..."):
// the Vite dev server forwards them to the API (see vite.config.js).

// Error with the HTTP status, so callers can tell e.g. 401 (signed out) from 403 (not allowed).
export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

// Called when the server rejects our token (expired or invalid); set by AuthContext.
let onUnauthorized = () => {}
export const setUnauthorizedHandler = (handler) => {
  onUnauthorized = handler
}

// Sends a JSON request and returns the parsed body, or throws an ApiError
// carrying the server's error message.
export async function request(path, { method = 'GET', body, token } = {}) {
  const headers = {}
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = `Bearer ${token}`

  let response
  try {
    response = await fetch(path, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) })
  } catch {
    throw new ApiError('Cannot reach the server. Is the API running?', 0)
  }

  const data = await response.json().catch(() => null)
  if (!response.ok) {
    if (response.status === 401 && token) onUnauthorized()
    throw new ApiError(data?.error || `Request failed (${response.status})`, response.status)
  }
  return data
}

// --- Authentication
export const signin = (email, password) => request('/auth/signin', { method: 'POST', body: { email, password } })
export const signout = () => request('/auth/signout')
export const signup = (name, email, password) => request('/api/users', { method: 'POST', body: { name, email, password } })

// --- CRUD helpers for a resource: list, read, create, update, remove, removeAll
function resource(name) {
  const base = `/api/${name}`
  return {
    list: (token) => request(base, { token }),
    read: (id, token) => request(`${base}/${id}`, { token }),
    create: (data, token) => request(base, { method: 'POST', body: data, token }),
    update: (id, data, token) => request(`${base}/${id}`, { method: 'PUT', body: data, token }),
    remove: (id, token) => request(`${base}/${id}`, { method: 'DELETE', token }),
    removeAll: (token) => request(base, { method: 'DELETE', token }),
  }
}

export const contactsApi = resource('contacts')
export const projectsApi = resource('projects')
export const qualificationsApi = resource('qualifications')
