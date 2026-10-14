// Turns Mongoose/MongoDB errors into short, readable messages for API responses.

// Duplicate key (unique index) errors, e.g. registering an email twice.
const getUniqueErrorMessage = (err) => {
  // Current MongoDB drivers report the offending field(s) in err.keyValue.
  const fieldName = err.keyValue ? Object.keys(err.keyValue)[0] : null
  if (!fieldName) return 'Unique field already exists'
  return fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists'
}

const getErrorMessage = (err) => {
  if (err.code === 11000 || err.code === 11001) {
    return getUniqueErrorMessage(err)
  }
  if (err.code) {
    return 'Something went wrong'
  }
  // Validation errors: report the message of each invalid field.
  if (err.errors) {
    return Object.values(err.errors)
      .map((fieldError) => fieldError.message)
      .join(' ')
  }
  return err.message || 'Something went wrong'
}

export default { getErrorMessage }
