import React from "react";

const PreviewCandidate = ({
  previewData,
  previewResult,
  handlePreviewChange,
  runPreview,
  isPublished,
}) => {
  return (
    <div className="workflow-card mt-4">
      {/* Header */}

      <div className="workflow-card-header">
        <div>
          <h5>Preview With Sample Candidate</h5>

          <p>Test the configured validation workflow before publishing.</p>
        </div>

        <span className="editable-badge">
          <i className="bi bi-person-check-fill me-1"></i>
          Preview
        </span>
      </div>

      {/* Body */}

      <div className="workflow-card-body">
        <div className="row g-3">
          {/* Age */}

          <div className="col-lg-2">
            <label className="form-label">Age</label>

            <input
              type="number"
              className="form-control modern-input"
              value={previewData.age}
              disabled={isPublished}
              onChange={(e) => handlePreviewChange("age", e.target.value)}
            />
          </div>

          {/* Category */}

          <div className="col-lg-2">
            <label className="form-label">Category</label>

            <select
              className="form-select modern-input"
              value={previewData.category}
              disabled={isPublished}
              onChange={(e) => handlePreviewChange("category", e.target.value)}
            >
              <option>General</option>
              <option>SC</option>
              <option>ST</option>
              <option>OBC</option>
              <option>EWS</option>
            </select>
          </div>

          {/* Education */}

          <div className="col-lg-2">
            <label className="form-label">Education</label>

            <select
              className="form-select modern-input"
              value={previewData.education}
              disabled={isPublished}
              onChange={(e) => handlePreviewChange("education", e.target.value)}
            >
              <option>Graduate</option>
              <option>Post Graduate</option>
              <option>Diploma</option>
            </select>
          </div>

          {/* Experience */}

          <div className="col-lg-2">
            <label className="form-label">Experience</label>

            <input
              type="number"
              className="form-control modern-input"
              value={previewData.experience}
              disabled={isPublished}
              onChange={(e) =>
                handlePreviewChange("experience", e.target.value)
              }
            />
          </div>

          {/* Exclusion */}

          <div className="col-lg-2">
            <label className="form-label">Exclusion Match</label>

            <select
              className="form-select modern-input"
              value={previewData.exclusion}
              disabled={isPublished}
              onChange={(e) => handlePreviewChange("exclusion", e.target.value)}
            >
              <option>None</option>
              <option>Medical Unfit</option>
              <option>Blacklisted</option>
              <option>Already Employed</option>
            </select>
          </div>

          {/* Run */}

          <div className="col-lg-2 d-flex align-items-end">
            <button
              className="btn btn-save w-100"
              disabled={isPublished}
              onClick={runPreview}
            >
              <i className="bi bi-play-fill me-2"></i>
              Run
            </button>
          </div>
        </div>

        {/* Result */}

        {previewResult && (
          <div className="preview-result mt-4">
            <div
              className={`alert ${
                previewResult.status === "Eligible"
                  ? "alert-success"
                  : "alert-danger"
              }`}
            >
              <h6 className="mb-2">{previewResult.phase}</h6>

              <strong>{previewResult.status}</strong>

              <p className="mb-0 mt-2">{previewResult.reason}</p>
            </div>
          </div>
        )}

        {/* Information */}

        <div className="mt-4">
          <small className="text-muted">
            <i className="bi bi-info-circle me-2"></i>
            Preview simulates the configured validation workflow using sample
            candidate information.
          </small>
        </div>
      </div>
    </div>
  );
};

export default PreviewCandidate;
