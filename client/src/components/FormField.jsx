// One labelled form input (or textarea) with its validation message underneath.
// The message is linked to the input with aria-describedby for screen readers.
// `id` defaults to `name`; pass a different id when two forms on a page share field names.
function FormField({ name, id = name, label, value, onChange, error, as = 'input', ...inputProps }) {
  const Input = as // 'input' or 'textarea'
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <Input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...inputProps}
      />
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField
