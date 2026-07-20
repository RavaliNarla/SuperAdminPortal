import "../../../css/CategoriesAgeRelaxation.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import {
  fetchEducationExperienceValidation,
  createEducationExperienceValidation,
  updateEducationExperienceValidation,
} from "../Thunk/eligibilityThunk";

const EducationExperience = () => {
  const dispatch = useAppDispatch();

  const organizationId = useAppSelector(
    (state) => state.eligibility.selectedOrganization,
  );

  const validation = useAppSelector(
    (state) => state.eligibility.educationExperienceValidation,
  );

  const loading = useAppSelector((state) => state.eligibility.loading);

  const [educationEnabled, setEducationEnabled] = useState(false);
  const [experienceEnabled, setExperienceEnabled] = useState(false);

  // ================= Fetch =================
  useEffect(() => {
    if (organizationId) {
      dispatch(fetchEducationExperienceValidation(organizationId));
    }
  }, [dispatch, organizationId]);

  // ================= Populate =================
  useEffect(() => {
    if (!validation) return;

    setEducationEnabled(validation.educationValidation ?? false);

    setExperienceEnabled(validation.experienceValidation ?? false);
  }, [validation]);

  // ================= Cancel =================
  const handleCancel = () => {
    if (validation) {
      setEducationEnabled(validation.educationValidation ?? false);

      setExperienceEnabled(validation.experienceValidation ?? false);
    } else {
      setEducationEnabled(false);
      setExperienceEnabled(false);
    }
  };

  // ================= Save =================
  const handleSave = async () => {
    const payload = {
      educationValidation: educationEnabled,
      experienceValidation: experienceEnabled,
    };

    try {
      if (validation) {
        await dispatch(
          updateEducationExperienceValidation({
            organizationId,
            payload,
          }),
        );
      } else {
        await dispatch(
          createEducationExperienceValidation({
            organizationId,
            payload,
          }),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="category-page">
      {/* Header */}
      <div className="category-header">
        <div>
          <h5 className="section-title">Education & Experience Validation</h5>

          <p className="section-subtitle">
            Configure organization level education and experience validation
            policies.
          </p>
        </div>
      </div>

      {/* Card */}
      <div className="organization-card">
        <div className="card-body">
          <div className="row g-4">
            {/* Education */}
            <div className="col-lg-6">
              <div className="setting-item">
                <div className="d-flex align-items-center">
                  <div
                    className="me-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: "#eef6fc",
                      color: "#1891d0",
                      fontSize: 22,
                    }}
                  >
                    <i className="bi bi-mortarboard-fill"></i>
                  </div>

                  <div>
                    <h6>Education Validation</h6>

                    <small>
                      Enable validation of candidate educational qualifications.
                    </small>
                  </div>
                </div>

                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={educationEnabled}
                    onChange={() => setEducationEnabled((prev) => !prev)}
                  />
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="col-lg-6">
              <div className="setting-item">
                <div className="d-flex align-items-center">
                  <div
                    className="me-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: "#eef6fc",
                      color: "#1891d0",
                      fontSize: 22,
                    }}
                  >
                    <i className="bi bi-briefcase-fill"></i>
                  </div>

                  <div>
                    <h6>Experience Validation</h6>

                    <small>
                      Enable validation of previous employment and work
                      experience.
                    </small>
                  </div>
                </div>

                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={experienceEnabled}
                    onChange={() => setExperienceEnabled((prev) => !prev)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              className="btn btn-cancel"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              className="btn btn-save"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationExperience;
