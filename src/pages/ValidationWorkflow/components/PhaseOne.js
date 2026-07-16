import React from "react";

const PhaseOne = ({ isPublished = true }) => {
  const phaseOneItems = ["Exclusion Check", "Age Boundary Check"];

  return (
    <div className="workflow-card">
      {/* Header */}

      <div className="workflow-card-header">
        <div>
          <h5>Phase 1 — Disqualifiers</h5>

          <p>These validations always execute first and cannot be reordered.</p>
        </div>

        <span className="fixed-badge">
          <i className="bi bi-lock-fill me-2"></i>
          Fixed Order
        </span>
      </div>

      {/* Body */}

      <div className="workflow-card-body">
        {phaseOneItems.map((item, index) => (
          <div key={item} className="workflow-item">
            <div className="workflow-left">
              <span className="workflow-number">{index + 1}</span>

              <i className="bi bi-lock-fill workflow-icon"></i>

              <span className="workflow-title">{item}</span>
            </div>

            <div>
              <span className="fixed-badge">
                <i className="bi bi-lock-fill me-1"></i>

                {isPublished ? "Locked" : "Fixed"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhaseOne;
