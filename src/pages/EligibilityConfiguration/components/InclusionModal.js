import React, { useEffect, useState } from "react";
import "../../../css/CategoryModal.css";
import FieldListEditor from "../../organizations/DynamicForms/FieldListEditor";

const INCLUSION_FIELD_TYPES = [
    { label: "Text", value: "text" },
    { label: "Date", value: "date" },
    { label: "File Upload", value: "file" },
    { label: "Dropdown", value: "dropdown" },
];

const InclusionModal = ({
    show,
    onClose,
    onCreate,
    inclusion,
    isViewMode,
}) => {
    const [formData, setFormData] = useState({
        name: "",
        ageRelaxation: "",
        description: "",
        fields: [],
    });

    useEffect(() => {
        if (inclusion) {
            setFormData({
                name: inclusion.name || "",
                ageRelaxation:
                    inclusion.ageRelaxation?.replace(" Years", "") || "",
                description: inclusion.description || "",
                fields: inclusion.fields || [],
            });
        } else {
            setFormData({
                name: "",
                ageRelaxation: "",
                description: "",
                fields: [],
            });
        }
    }, [inclusion, show]);

    if (!show) return null;

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleCreate = () => {
        const newInclusion = {
            id: Date.now(),
            name: formData.name,
            ageRelaxation: `${formData.ageRelaxation} Years`,
            description: formData.description,
            fields: formData.fields,
            status: "Active",
        };

        onCreate(newInclusion);
        onClose();
    };

    return (
        <div className="category-modal-backdrop">
            <div className="category-modal">

                {/* Header */}

                <div className="category-modal-header">

                    <div>

                        <h4>
                            {isViewMode
                                ? "View Inclusion"
                                : inclusion
                                    ? "Edit Inclusion"
                                    : "Create Inclusion"}
                        </h4>

                        <p>
                            {isViewMode
                                ? "View inclusion details."
                                : "This will be saved permanently once created."}
                        </p>

                    </div>

                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>

                </div>

                {/* Body */}

                <div className="category-modal-body">

                    {!isViewMode && (
                        <div className="warning-box">
                            <i className="bi bi-lock-fill"></i>
                            Once saved, this rule is permanent and cannot be edited.
                            To correct it later, disable it and create a revised version.
                        </div>
                    )}

                    <div className="mb-3">

                        <label className="form-label">
                            Inclusion Name
                        </label>

                        <input
                            className="form-control modern-input"
                            value={formData.name}
                            placeholder="Enter Inclusion Name"
                            disabled={isViewMode}
                            onChange={(e) =>
                                handleChange("name", e.target.value)
                            }
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Age Relaxation (Years)
                        </label>

                        <input
                            type="number"
                            className="form-control modern-input"
                            value={formData.ageRelaxation}
                            disabled={isViewMode}
                            placeholder="Enter Age Relaxation"
                            onChange={(e) =>
                                handleChange("ageRelaxation", e.target.value)
                            }
                        />

                    </div>
                    <div className="mb-3">

                        <label className="form-label">
                            Description
                        </label>

                        <textarea
                            rows="4"
                            className="form-control modern-textarea"
                            value={formData.description}
                            placeholder="Enter Description"
                            disabled={isViewMode}
                            onChange={(e) =>
                                handleChange("description", e.target.value)
                            }
                        />

                    </div>

                    {/* Fields to collect from the candidate when they claim this inclusion.
                        Reuses the same field-list editor as Dynamic Forms screens
                        (FormFieldsBuilder.js) instead of a separate implementation. */}
                    <div>
                        <label className="form-label">
                            Fields to Collect from Candidate
                        </label>
                        <p className="text-muted small mb-2">
                            Shown only in the Candidate Portal, only after a candidate checks this
                            inclusion on their application. The Recruiter Portal never sees these.
                        </p>

                        <FieldListEditor
                            fields={formData.fields}
                            onChange={(fields) => setFormData((prev) => ({ ...prev, fields }))}
                            fieldTypes={INCLUSION_FIELD_TYPES}
                            disabled={isViewMode}
                        />
                    </div>

                </div>

                {/* Footer */}

                <div className="category-modal-footer">

                    <button
                        className="btn btn-cancel"
                        onClick={onClose}
                    >
                        {isViewMode ? "Close" : "Cancel"}
                    </button>

                    {!isViewMode && (

                        <button
                            className="btn btn-save"
                            disabled={
                                !formData.name ||
                                !formData.ageRelaxation
                            }
                            onClick={handleCreate}
                        >
                            {inclusion
                                ? "Save Revised Version"
                                : "Create"}
                        </button>

                    )}

                </div>

            </div>

        </div>
    );
};

export default InclusionModal;
