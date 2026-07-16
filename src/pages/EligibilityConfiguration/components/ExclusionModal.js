import React, { useEffect, useState } from "react";
import "../../../css/CategoryModal.css";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const ExclusionModal = ({
    show,
    onClose,
    onCreate,
    exclusion,
    isViewMode,
}) => {

    const documentOptions = [
        "Medical Fitness Certificate",
        "Character Certificate",
        "Police Verification",
        "Self Declaration",
        "Court Clearance Certificate",
    ];

    const [formData, setFormData] = useState({
        name: "",
        actionType: "Reject Immediately",
        requiredDocuments: [],
        description: "",
    });

    useEffect(() => {

        if (exclusion) {

            setFormData({
                name: exclusion.name || "",
                actionType:
                    exclusion.actionType || "Reject Immediately",
                requiredDocuments:
                    exclusion.requiredDocuments || [],
                description:
                    exclusion.description || "",
            });

        } else {

            setFormData({
                name: "",
                actionType: "Reject Immediately",
                requiredDocuments: [],
                description: "",
            });

        }

    }, [exclusion, show]);

    if (!show) return null;

    const handleChange = (field, value) => {

        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

    };

    const handleCreate = () => {

        onCreate({
            id: Date.now(),
            ...formData,
            status: "Active",
        });

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
                                ? "View Exclusion"
                                : exclusion
                                    ? "Create Revised Version"
                                    : "Create Exclusion"}

                        </h4>

                        <p>

                            {isViewMode
                                ? "View exclusion details."
                                : "This rule will be saved permanently once created."}

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

                            Once saved, this rule cannot be edited.
                            Disable it and create a revised version.

                        </div>

                    )}

                    {/* Exclusion Name */}

                    <div className="mb-3">

                        <label className="form-label">

                            Exclusion Name

                        </label>

                        <input
                            className="form-control modern-input"
                            placeholder="Enter Exclusion Name"
                            value={formData.name}
                            disabled={isViewMode}
                            onChange={(e) =>
                                handleChange(
                                    "name",
                                    e.target.value
                                )
                            }
                        />

                    </div>
                    {/* Action Type */}

                    <div className="mb-3">

                        <label className="form-label">
                            Action Type
                        </label>

                        <div className="d-flex gap-3 mt-2">

                            <button
                                type="button"
                                className={`btn ${formData.actionType === "Reject Immediately"
                                        ? "btn-save"
                                        : "btn-outline-secondary"
                                    }`}
                                disabled={isViewMode}
                                onClick={() =>
                                    handleChange(
                                        "actionType",
                                        "Reject Immediately"
                                    )
                                }
                            >
                                Reject Immediately
                            </button>

                            <button
                                type="button"
                                className={`btn ${formData.actionType === "Warning"
                                        ? "btn-save"
                                        : "btn-outline-secondary"
                                    }`}
                                disabled={isViewMode}
                                onClick={() =>
                                    handleChange(
                                        "actionType",
                                        "Warning"
                                    )
                                }
                            >
                                Warning
                            </button>

                        </div>

                        <small className="text-muted d-block mt-2">

                            {formData.actionType === "Reject Immediately"
                                ? "Reject candidates immediately if this rule matches."
                                : "Candidates matching this rule require manual verification before rejection."}

                        </small>

                    </div>

                    {/* Required Documents */}

                    {formData.actionType === "Warning" && (

                        <div className="mb-3">

                            <label className="form-label">
                                Required Documents
                            </label>

                            <Autocomplete
                                multiple
                                options={documentOptions}
                                value={formData.requiredDocuments}
                                disabled={isViewMode}
                                onChange={(event, value) =>
                                    handleChange(
                                        "requiredDocuments",
                                        value
                                    )
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Search Documents"
                                        size="small"
                                    />
                                )}
                            />

                            <small className="text-muted mt-2 d-block">
                                Select documents required for manual verification.
                            </small>

                        </div>

                    )}

                    {/* Description */}

                    <div className="mb-3">

                        <label className="form-label">
                            Description
                        </label>

                        <textarea
                            rows="4"
                            className="form-control modern-textarea"
                            placeholder="Enter Description"
                            value={formData.description}
                            disabled={isViewMode}
                            onChange={(e) =>
                                handleChange(
                                    "description",
                                    e.target.value
                                )
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
                            disabled={!formData.name}
                            onClick={handleCreate}
                        >
                            {exclusion
                                ? "Save Revised Version"
                                : "Create"}
                        </button>

                    )}

                </div>

            </div>

        </div>

    );
};

export default ExclusionModal;