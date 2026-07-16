import React from "react";

const PhaseTwo = ({ phaseTwo, moveUp, moveDown, isPublished }) => {
  return (
    <div className="workflow-card mt-4">
      {/* Header */}

      <div className="workflow-card-header">
        <div>
          <h5>Phase 2 — Qualification</h5>

          <p>
            Reorder qualification validations using the arrow buttons. The order
            determines the sequence in which validations execute.
          </p>
        </div>

        <span className={isPublished ? "fixed-badge" : "editable-badge"}>
          <i
            className={`bi ${
              isPublished ? "bi-lock-fill" : "bi-arrow-down-up"
            } me-1`}
          ></i>

          {isPublished ? "Published" : "Reorder Allowed"}
        </span>
      </div>

      {/* Body */}

      <div className="workflow-card-body">
        {phaseTwo.map((item, index) => (
          <div key={item} className="workflow-item">
            <div className="workflow-left">
              <i
                className={`bi ${
                  isPublished ? "bi-lock-fill" : "bi-grip-vertical"
                } workflow-drag`}
              ></i>

              <span className="workflow-number">{index + 3}</span>

              <span className="workflow-title">{item}</span>
            </div>

            <div className="workflow-actions">
              <button
                type="button"
                className="btn workflow-btn"
                disabled={index === 0 || isPublished}
                onClick={() => moveUp(index)}
              >
                <i className="bi bi-arrow-up"></i>
              </button>

              <button
                type="button"
                className="btn workflow-btn"
                disabled={index === phaseTwo.length - 1 || isPublished}
                onClick={() => moveDown(index)}
              >
                <i className="bi bi-arrow-down"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}

      <div className="workflow-card-body border-top">
        <small className="text-muted">
          {isPublished
            ? "Workflow is published. Create a new version to modify the execution order."
            : "Use the arrow buttons to reorder the workflow before publishing."}
        </small>
      </div>
    </div>
  );
};

export default PhaseTwo;
