// Display helpers shared by several pages.

// "2024-08-31T00:00:00.000Z" -> "Aug 2024" (read in UTC so the month doesn't shift by time zone)
export function formatMonthYear(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-CA', { month: 'short', year: 'numeric', timeZone: 'UTC' })
}

// Newest completion date first; entries without a date go last.
export const byCompletionDesc = (items) =>
  [...items].sort((a, b) => new Date(b.completion || 0) - new Date(a.completion || 0))
