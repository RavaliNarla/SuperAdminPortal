import React, { useState } from "react";
import "../../../css/EducationExperience.css";

const EducationExperience = () => {
  const [educationEnabled, setEducationEnabled] = useState(false);
  const [experienceEnabled, setExperienceEnabled] = useState(false);

  const [educationPublished, setEducationPublished] = useState(true);
  const [experiencePublished, setExperiencePublished] = useState(true);

  return (
    <div className="education-page">

      {/* Header */}

      <div className="education-header">

        <div>

          <h3 className="page-title">
            Education & Experience Validation
          </h3>

          <p className="page-subtitle">
            Configure organization level education and experience validation
            policies. Every published configuration is version controlled and
            cannot be modified.
          </p>

        </div>

      </div>

      {/* Information */}

      <div className="education-info">

        <i className="bi bi-info-circle-fill"></i>

        <div>

          <strong>Version Controlled Configuration</strong>

          <p className="mb-0 mt-1">
            Only one version can remain active at a time. Creating a new
            version preserves previous configurations for audit history.
          </p>

        </div>

      </div>

      {/* ================= Education Validation ================= */}

      <div className="validation-card">
        <div className="card-body">

          <div className="validation-header">
            <div className="validation-title">
              <h5>
                <i className="bi bi-mortarboard-fill me-2 text-primary"></i>
                Education Validation
              </h5>
            </div>

            <span className="version-pill">
              {educationPublished ? "Version 1" : "Version 2 (Draft)"}
            </span>
          </div>

          {educationPublished && (
            <div className="lock-box">
              <i className="bi bi-lock-fill"></i>

              <div>
                <strong>Published Version</strong>

                <p className="mb-0">
                  This configuration is currently published and cannot be edited.
                  Create a new version whenever changes are required.
                </p>
              </div>
            </div>
          )}

          <div className="setting-row">
            <div>
              <h6>Enable Education Validation</h6>

              <p>
                Validate educational qualifications during onboarding and
                document verification.
              </p>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={educationEnabled}
                disabled={educationPublished}
                onChange={() =>
                  setEducationEnabled(!educationEnabled)
                }
              />
            </div>
          </div>

          <div className="validation-footer">

            {educationPublished ? (

              <button
                className="btn btn-save"
                onClick={() => setEducationPublished(false)}
              >
                <i className="bi bi-file-earmark-plus me-2"></i>
                Create New Version
              </button>

            ) : (

              <div className="d-flex gap-3">

                <button
                  className="btn btn-save"
                  onClick={() => setEducationPublished(true)}
                >
                  Publish New Version
                </button>

                <button
                  className="btn btn-link"
                  onClick={() => setEducationPublished(true)}
                >
                  Cancel
                </button>

              </div>

            )}

          </div>

        </div>
      </div>

      {/* Experience Validation */}

      {/* ================= Experience Validation ================= */}

      <div className="validation-card mt-4">
        <div className="card-body">

          <div className="validation-header">

            <div className="validation-title">
              <h5>
                <i className="bi bi-briefcase-fill me-2 text-success"></i>
                Experience Validation
              </h5>
            </div>

            <span className="version-pill">
              {experiencePublished ? "Version 1" : "Version 2 (Draft)"}
            </span>

          </div>

          {experiencePublished && (

            <div className="lock-box">

              <i className="bi bi-lock-fill"></i>

              <div>

                <strong>Published Version</strong>

                <p className="mb-0">
                  This configuration is currently published and cannot be edited.
                  Create a new version whenever changes are required.
                </p>

              </div>

            </div>

          )}

          <div className="setting-row">

            <div>

              <h6>Enable Experience Validation</h6>

              <p>
                Validate previous employment, work experience and supporting
                documents before onboarding.
              </p>

            </div>

            <div className="form-check form-switch">

              <input
                className="form-check-input"
                type="checkbox"
                checked={experienceEnabled}
                disabled={experiencePublished}
                onChange={() =>
                  setExperienceEnabled(!experienceEnabled)
                }
              />

            </div>

          </div>

          <div className="validation-footer">

            {experiencePublished ? (

              <button
                className="btn btn-save"
                onClick={() => setExperiencePublished(false)}
              >
                <i className="bi bi-file-earmark-plus me-2"></i>
                Create New Version
              </button>

            ) : (

              <div className="d-flex gap-3">

                <button
                  className="btn btn-save"
                  onClick={() => setExperiencePublished(true)}
                >
                  Publish New Version
                </button>

                <button
                  className="btn btn-link"
                  onClick={() => setExperiencePublished(true)}
                >
                  Cancel
                </button>

              </div>

            )}

          </div>

        </div>
      </div>

    </div>
  );
};

export default EducationExperience;