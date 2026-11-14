// Coloured message banner: { type: 'success' | 'error' | 'info', text }.
// Errors are announced to screen readers immediately (role="alert").
function Notice({ notice, onDismiss }) {
  if (!notice) return null
  return (
    <div className={`notice ${notice.type}`} role={notice.type === 'error' ? 'alert' : 'status'}>
      <span>{notice.text}</span>
      {onDismiss && (
        <button type="button" className="notice-close" aria-label="Dismiss" onClick={onDismiss}>
          ×
        </button>
      )}
    </div>
  )
}

export default Notice
