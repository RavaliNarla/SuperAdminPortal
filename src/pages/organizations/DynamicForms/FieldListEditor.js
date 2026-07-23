export const DEFAULT_FIELD_TYPES = [
  { label: 'Text', value: 'text' },
  { label: 'Dropdown', value: 'dropdown' },
  { label: 'Multi-select Dropdown', value: 'multiselect' },
  { label: 'Date', value: 'date' },
  { label: 'Checkbox', value: 'checkbox' },
];

export function emptyField(type) {
  const field = {
    id: crypto.randomUUID(),
    type,
    label: '',
    required: false,
  };
  if (type === 'text') {
    field.placeholder = '';
    field.maxLength = 100;
  }
  if (type === 'dropdown' || type === 'multiselect') {
    field.options = [''];
  }
  return field;
}

// Reusable field-list editor. Shared by every place an admin defines a set
// of fields to collect: Dynamic Forms screens (FormFieldsBuilder.js) and
// per-Inclusion candidate schemas (InclusionModal.js). Fully controlled —
// the caller owns the `fields` array and persists it however it needs to.
export default function FieldListEditor({
  fields,
  onChange,
  fieldTypes = DEFAULT_FIELD_TYPES,
  disabled = false,
}) {
  const addField = (type) => {
    onChange([...fields, emptyField(type)]);
  };

  const updateField = (id, key, value) => {
    onChange(fields.map((field) => (field.id === id ? { ...field, [key]: value } : field)));
  };

  const removeField = (id) => {
    onChange(fields.filter((field) => field.id !== id));
  };

  const addOption = (fieldId) => {
    onChange(
      fields.map((field) =>
        field.id === fieldId ? { ...field, options: [...field.options, ''] } : field
      )
    );
  };

  const updateOption = (fieldId, index, value) => {
    onChange(
      fields.map((field) => {
        if (field.id !== fieldId) return field;
        const options = [...field.options];
        options[index] = value;
        return { ...field, options };
      })
    );
  };

  const removeOption = (fieldId, index) => {
    onChange(
      fields.map((field) =>
        field.id === fieldId
          ? { ...field, options: field.options.filter((_, i) => i !== index) }
          : field
      )
    );
  };

  return (
    <div>
      {!disabled && (
        <div className="d-flex gap-2 mb-3">
          {fieldTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={() => addField(type.value)}
            >
              + {type.label}
            </button>
          ))}
        </div>
      )}

      {fields.length === 0 && <p className="text-muted">No fields configured yet.</p>}

      {fields.map((field) => (
        <div className="card-bg card-body mb-3" key={field.id}>
          <div className="row gy-3 align-items-center">
            <div className="col-lg-5">
              <label className="form-label">
                Label <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                value={field.label}
                disabled={disabled}
                onChange={(e) => updateField(field.id, 'label', e.target.value)}
              />
            </div>
            <div className="col-lg-3 form-check form-switch">
              <label className="form-label d-block">Required</label>
              <input
                className="form-check-input"
                type="checkbox"
                checked={field.required}
                disabled={disabled}
                onChange={(e) => updateField(field.id, 'required', e.target.checked)}
              />
            </div>
            {!disabled && (
              <div className="col-lg-4 text-end">
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => removeField(field.id)}
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {field.type === 'text' && (
            <div className="row gy-3 mt-1">
              <div className="col-lg-6">
                <label className="form-label">Placeholder</label>
                <input
                  className="form-control"
                  value={field.placeholder}
                  disabled={disabled}
                  onChange={(e) => updateField(field.id, 'placeholder', e.target.value)}
                />
              </div>
              <div className="col-lg-6">
                <label className="form-label">Character Limit</label>
                <input
                  type="number"
                  min={1}
                  className="form-control"
                  value={field.maxLength}
                  disabled={disabled}
                  onChange={(e) => updateField(field.id, 'maxLength', Number(e.target.value))}
                />
              </div>
            </div>
          )}

          {(field.type === 'dropdown' || field.type === 'multiselect') && (
            <div className="mt-3">
              <label className="form-label">Options</label>
              {field.options.map((option, index) => (
                <div className="d-flex gap-2 mb-2" key={index}>
                  <input
                    className="form-control"
                    value={option}
                    placeholder={`Option ${index + 1}`}
                    disabled={disabled}
                    onChange={(e) => updateOption(field.id, index, e.target.value)}
                  />
                  {!disabled && (
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeOption(field.id, index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              {!disabled && (
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => addOption(field.id)}
                >
                  + Add Option
                </button>
              )}
            </div>
          )}

          {field.type === 'date' && (
            <p className="text-muted mt-2 mb-0">Renders as a date picker on the target form.</p>
          )}

          {field.type === 'checkbox' && (
            <p className="text-muted mt-2 mb-0">Renders as a single checkbox on the target form.</p>
          )}

          {field.type === 'file' && (
            <p className="text-muted mt-2 mb-0">Renders as a file upload on the target form.</p>
          )}
        </div>
      ))}
    </div>
  );
}
