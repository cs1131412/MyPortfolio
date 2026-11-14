// Loads a list of records from the API (projects, qualifications, contacts) and
// keeps it in React state as records are created, updated and deleted, so the
// page updates immediately without reloading.
import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthContext.jsx'

// sortItems: optional function to order the list (e.g. newest first)
export default function useCollection(api, { requiresAuth = false, sortItems = (items) => items } = {}) {
  const { token } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  // Load (or reload) when the page opens, or when the user signs in/out.
  useEffect(() => {
    if (requiresAuth && !token) return
    let cancelled = false
    api
      .list(token)
      .then((data) => !cancelled && setItems(sortItems(data)))
      .catch((err) => !cancelled && setLoadError(err.message))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true // ignore a late response if the page has been left
    }
    // sortItems is a stable module-level function in every caller
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, token, requiresAuth])

  const create = useCallback(
    async (data) => {
      const created = await api.create(data, token)
      setItems((list) => sortItems([created, ...list]))
      return created
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [api, token],
  )

  const update = useCallback(
    async (id, data) => {
      const updated = await api.update(id, data, token)
      setItems((list) => sortItems(list.map((item) => (item._id === id ? updated : item))))
      return updated
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [api, token],
  )

  const remove = useCallback(
    async (id) => {
      await api.remove(id, token)
      setItems((list) => list.filter((item) => item._id !== id))
    },
    [api, token],
  )

  const removeAll = useCallback(async () => {
    const result = await api.removeAll(token)
    setItems([])
    return result
  }, [api, token])

  return { items, loading, loadError, create, update, remove, removeAll }
}
