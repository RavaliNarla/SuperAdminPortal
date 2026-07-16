import React, { useEffect, useState } from "react";
import "../../../css/CategoryModal.css";

const CategoryModal = ({
    show,
    onClose,
    onCreate,
    category,
    isViewMode,
}) => {
    const [formData, setFormData] = useState({
        name: "",
        categoryType: "",
        ageRelaxation: "",
        documents: "",
        description: "",
    });

    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name || "",
                categoryType:
                    category.type === "Horizontal"
                        ? "Horizontal Category"
                        : "Vertical Category",
                ageRelaxation:
                    category.ageRelaxation?.replace(" Years", "") || "",
                documents: category.documents || "",
                description: category.description || "",
            });
        } else {
            setFormData({
                name: "",
                categoryType: "",
                ageRelaxation: "",
                documents: "",
                description: "",
            });
        }
    }, [category, show]);
    if (!show) return null;

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleCreate = () => {
        const category = {
            id: Date.now(),
            name: formData.name,
            ageRelaxation: `${formData.ageRelaxation} Years`,
            type: formData.categoryType.includes("Vertical")
                ? "Vertical"
                : "Horizontal",
            documents: formData.documents,
            description: formData.description,
            status: "Active",
        };
        onCreate(category);
        onClose();
    };
    return (
        <div className="category-modal-backdrop">

            <div className="category-modal">

                {/* Header */}

                <div className="category-modal-header">

                    <div>

                        <h4>Create Category</h4>

                        <p>
                            This will be saved permanently once created
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

                    <div className="warning-box">

                        <i className="bi bi-lock-fill"></i>

                        Once saved, this rule is permanent and cannot be edited.
                        To correct it later, disable it and create a revised version.

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Name
                        </label>

                        <input
                            className="form-control modern-input"
                            value={formData.name}
                            placeholder="Enter Category Name"
                            disabled={isViewMode}
                            onChange={(e) =>
                                handleChange("name", e.target.value)
                            }
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Category Type
                        </label>

                        <select
                            className="form-select modern-input"
                            value={formData.categoryType}
                            disabled={isViewMode}
                            onChange={(e) =>
                                handleChange("categoryType", e.target.value)
                            }
                        >
                            <option value="">Select Category Type</option>
                            <option value="Vertical Category">Vertical Category</option>
                            <option value="Horizontal Category">Horizontal Category</option>
                        </select>

                        <small className="text-muted">

                            Mutually exclusive per candidate
                            (e.g. General, SC, ST, OBC, EWS)

                        </small>

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Age Relaxation (Years)
                        </label>

                        <input
                            type="number"
                            className="form-control modern-input"
                            disabled={isViewMode}
                            placeholder="Enter Age Relaxation"
                            value={formData.ageRelaxation}
                            onChange={(e) =>
                                handleChange(
                                    "ageRelaxation",
                                    e.target.value
                                )
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
                                handleChange(
                                    "documents",
                                    e.target.value
                                )
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
                            Create
                        </button>
                    )}

                </div>

            </div>

        </div>
    );
};

export default CategoryModal;