import React from "react";

const DecisionCard = ({
  version,
  isPublished,
  isDirty,
  saveWorkflow,
  createNewVersion,
  publishWorkflow,
  discardChanges,
  resetWorkflow,
}) => {
  return (
    <div className="workflow-card mt-4">
      {/* Header */}

      <div className="workflow-card-header">
        <div>
          <h5>Eligibility Decision</h5>

          <p>
            Final workflow decision after all validation phases are completed.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <span className="editable-badge">Version {version}</span>

          <span className={isPublished ? "status-active" : "status-disabled"}>
            {isPublished ? "Published" : "Draft"}
          </span>
        </div>
      </div>

      {/* Body */}

      <div className="workflow-card-body">
        <div className="decision-box">
          <div className="decision-icon">
            <i className="bi bi-diagram-3-fill"></i>
          </div>

          <div className="decision-content">
            <h6>Eligibility Evaluation</h6>

            <p className="mb-0">
              The candidate will be marked as
              <strong> Eligible </strong>
              or
              <strong> Not Eligible </strong>
              based on the configured validation workflow. Once published, this
              workflow becomes read-only.
            </p>
          </div>
        </div>

        {/* Footer Buttons */}

        <div className="workflow-footer mt-4">
          {isPublished ? (
            <button className="btn btn-save" onClick={createNewVersion}>
              <i className="bi bi-file-earmark-plus me-2"></i>
              Create New Version
            </button>
          ) : (
            <>
              <button className="btn btn-cancel" onClick={discardChanges}>
                Cancel
              </button>

              <button
                className="btn btn-outline-secondary"
                onClick={resetWorkflow}
              >
                Reset
              </button>

              {isDirty && (
                <button
                  className="btn btn-outline-primary"
                  onClick={saveWorkflow}
                >
                  Save Draft
                </button>
              )}

              <button className="btn btn-save" onClick={publishWorkflow}>
                <i className="bi bi-check-circle me-2"></i>
                Publish Workflow
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DecisionCard;
