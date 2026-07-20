import React, { useEffect, useState } from "react";
import "../../../css/CategoryModal.css";

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
        documents: "",
        description: "",
    });

    useEffect(() => {
        if (inclusion) {
            setFormData({
                name: inclusion.name || "",
                ageRelaxation:
                    inclusion.ageRelaxation?.replace(" Years", "") || "",
                documents: inclusion.documents || "",
                description: inclusion.description || "",
            });
        } else {
            setFormData({
                name: "",
                ageRelaxation: "",
                documents: "",
                description: "",
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
            documents: formData.documents,
            description: formData.description,
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
                            Required Documents
                        </label>

                        <input
                            className="form-control modern-input"
                            value={formData.documents}
                            placeholder="Enter Required Documents"
                            disabled={isViewMode}
                            onChange={(e) =>
                                handleChange("documents", e.target.value)
                            }
                        />

                    </div>

                    <div>

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