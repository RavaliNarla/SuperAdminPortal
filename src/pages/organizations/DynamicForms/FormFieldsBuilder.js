import { useEffect, useState } from 'react';
import { fetchFormSchema, saveFormSchema } from '../../../services/formSchemaService';
import FieldListEditor from './FieldListEditor';

export default function FormFieldsBuilder({ organizationKey, portal, formKey, screenId }) {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedAt, setSavedAt] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setSavedAt(null);
    fetchFormSchema(organizationKey, portal, formKey, screenId).then((schema) => {
      if (cancelled) return;
      setFields(schema?.fields || []);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationKey, portal, formKey, screenId]);

  const handleSave = async () => {
    const schema = { fields };
    await saveFormSchema(organizationKey, portal, formKey, schema, screenId);
    setSavedAt(new Date());
  };

  if (loading) {
    return <p className="text-muted">Loading form fields…</p>;
  }

  return (
    <div>
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
