import { useEffect, useState } from 'react';
import { fetchFormSchema, saveFormSchema } from '../../../services/formSchemaService';

const FIELD_TYPES = [
  { label: 'Text', value: 'text' },
  { label: 'Dropdown', value: 'dropdown' },
  { label: 'Date', value: 'date' },
];

function emptyField(type) {
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
  if (type === 'dropdown') {
    field.options = [''];
  }
  return field;
}

export default function FormFieldsBuilder({ organizationKey, portal, formKey }) {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedAt, setSavedAt] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setSavedAt(null);
    fetchFormSchema(organizationKey, portal, formKey).then((schema) => {
      if (cancelled) return;
      setFields(schema?.fields || []);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationKey, portal, formKey]);

  const addField = (type) => {
    setFields((prev) => [...prev, emptyField(type)]);
  };

  const updateField = (id, key, value) => {
    setFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, [key]: value } : field))
    );
  };

  const removeField = (id) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  };

  const addOption = (fieldId) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === fieldId ? { ...field, options: [...field.options, ''] } : field
      )
    );
  };

  const updateOption = (fieldId, index, value) => {
    setFields((prev) =>
      prev.map((field) => {
        if (field.id !== fieldId) return field;
        const options = [...field.options];
        options[index] = value;
        return { ...field, options };
      })
    );
  };

  const removeOption = (fieldId, index) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === fieldId
          ? { ...field, options: field.options.filter((_, i) => i !== index) }
          : field
      )
    );
  };

  const handleSave = async () => {
    const schema = { fields };
    console.log("organizationKey:", organizationKey, "portal:", portal, "formKey:", formKey);
    console.log('Saving schema:', schema);
    await saveFormSchema(organizationKey, portal, formKey, schema);
    setSavedAt(new Date());
  };

  if (loading) {
    return <p className="text-muted">Loading form fields…</p>;
  }

  return (
    <div>
      <div className="d-flex gap-2 mb-3">
        {FIELD_TYPES.map((type) => (
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

      {fields.length === 0 && <p className="text-muted">No extra fields configured yet.</p>}

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
                onChange={(e) => updateField(field.id, 'label', e.target.value)}
              />
            </div>
            <div className="col-lg-3 form-check form-switch">
              <label className="form-label d-block">Required</label>
              <input
                className="form-check-input"
                type="checkbox"
                checked={field.required}
                onChange={(e) => updateField(field.id, 'required', e.target.checked)}
              />
            </div>
            <div className="col-lg-4 text-end">
              <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => removeField(field.id)}>
                Remove
              </button>
            </div>
          </div>

          {field.type === 'text' && (
            <div className="row gy-3 mt-1">
              <div className="col-lg-6">
                <label className="form-label">Placeholder</label>
                <input
                  className="form-control"
                  value={field.placeholder}
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
                  onChange={(e) => updateField(field.id, 'maxLength', Number(e.target.value))}
                />
              </div>
            </div>
          )}

          {field.type === 'dropdown' && (
            <div className="mt-3">
              <label className="form-label">Options</label>
              {field.options.map((option, index) => (
                <div className="d-flex gap-2 mb-2" key={index}>
                  <input
                    className="form-control"
                    value={option}
                    placeholder={`Option ${index + 1}`}
                    onChange={(e) => updateOption(field.id, index, e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeOption(field.id, index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => addOption(field.id)}>
                + Add Option
              </button>
            </div>
          )}

          {field.type === 'date' && (
            <p className="text-muted mt-2 mb-0">Renders as a date picker on the target form.</p>
          )}
        </div>
      ))}

      <div className="d-flex align-items-center gap-3">
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
        {savedAt && <span className="text-muted">Saved at {savedAt.toLocaleTimeString()}</span>}
      </div>
    </div>
  );
}
