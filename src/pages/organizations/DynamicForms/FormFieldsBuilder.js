import { useEffect, useState } from 'react';
import { fetchFormSchema, saveFormSchema } from '../../../services/formSchemaService';
import FieldListEditor from './FieldListEditor';

// Reserved field id used to carry a section title through the `fields` JSONB
// array without a backend schema change. The save endpoint's body is shared
// by every Dynamic Forms screen and only accepts a `fields` array (see
// docs/dynamic-forms-backend-spec.md) — there's no dedicated `title` column
// yet. Storing it as an ordinary `type: 'text'` field passes the backend's
// existing validation verbatim; it's filtered out of the editable list here
// and consumed as `schema.title` by every renderer instead of being shown as
// a real input. Recruitment Portal's `orgFormSchemaService.js` and Candidate
// Portal's `useOrgScreenSchema.js` must use this exact same id to recognize it.
export const SECTION_TITLE_FIELD_ID = '__section_title__';

function splitSectionTitle(fields) {
  const titleField = fields.find((field) => field.id === SECTION_TITLE_FIELD_ID);
  const rest = fields.filter((field) => field.id !== SECTION_TITLE_FIELD_ID);
  return { title: titleField?.label || '', fields: rest };
}

function withSectionTitle(title, fields) {
  const trimmed = title.trim();
  if (!trimmed) return fields;
  return [{ id: SECTION_TITLE_FIELD_ID, type: 'text', label: trimmed, required: false }, ...fields];
}

export default function FormFieldsBuilder({ organizationKey, portal, formKey, screenId }) {
  const [sectionTitle, setSectionTitle] = useState('');
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedAt, setSavedAt] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setSavedAt(null);
    fetchFormSchema(organizationKey, portal, formKey, screenId).then((schema) => {
      if (cancelled) return;
      const { title, fields: restFields } = splitSectionTitle(schema?.fields || []);
      setSectionTitle(title);
      setFields(restFields);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationKey, portal, formKey, screenId]);

  const handleSave = async () => {
    const schema = { fields: withSectionTitle(sectionTitle, fields) };
    await saveFormSchema(organizationKey, portal, formKey, schema, screenId);
    setSavedAt(new Date());
  };

  if (loading) {
    return <p className="text-muted">Loading form fields…</p>;
  }

  return (
    <div>
      <div className="mb-4">
        <label className="form-label">Section Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. Additional Details"
          value={sectionTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
        />
        <div className="form-text">
          Shown as a heading above these fields on the Recruitment/Candidate portal.
        </div>
      </div>

      <FieldListEditor fields={fields} onChange={setFields} />

      <div className="d-flex align-items-center gap-3 mt-3">
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
        {savedAt && <span className="text-muted">Saved</span>}
      </div>
    </div>
  );
}
