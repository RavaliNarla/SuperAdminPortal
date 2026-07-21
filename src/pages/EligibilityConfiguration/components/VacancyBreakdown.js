import React, { useState } from "react";
import "../../../css/VacancyBreakdown.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  fetchVacancyAndMarksReservation,
  createVacancyAndMarksReservation,
  updateVacancyAndMarksReservation,
} from "../Thunk/eligibilityThunk";

const VacancyBreakdown = () => {
  const [categoryDistribution, setCategoryDistribution] = useState(true);
  const [stateDistribution, setStateDistribution] = useState(true);

  const [examReservation, setExamReservation] = useState(true);
  const [interviewReservation, setInterviewReservation] = useState(true);
  const [interviewTotalMarks, setInterviewTotalMarks] = useState("");

  const [examCutOffs, setExamCutOffs] = useState([
    { category: "General", marks: "" },
    { category: "ST", marks: "" },
    { category: "OBC", marks: "" },
    { category: "EWS", marks: "" },
    { category: "Women", marks: "" },
    { category: "PWD", marks: "" },
    { category: "Ex-Servicemen", marks: "" },
  ]);

  const [categoryCutOffs, setCategoryCutOffs] = useState([
    {
      category: "General",
      marks: "",
    },
    {
      category: "ST",
      marks: "",
    },
    {
      category: "OBC",
      marks: "",
    },
    {
      category: "EWS",
      marks: "",
    },
    {
      category: "Women",
      marks: "",
    },
    {
      category: "PWD",
      marks: "",
    },
    {
      category: "Ex-Servicemen",
      marks: "",
    },
  ]);

  const dispatch = useDispatch();

  const organizationId = useSelector(
    (state) => state.eligibility.selectedOrganization,
  );

  const vacancyReservation = useSelector(
    (state) => state.eligibility.vacancyReservation,
  );

  const loading = useSelector((state) => state.eligibility.loading);
  const handleCategoryCutOffChange = (index, value) => {
    if (interviewTotalMarks && Number(value) > Number(interviewTotalMarks)) {
      alert(
        `Cut-off marks cannot exceed Total Interview Marks (${interviewTotalMarks})`,
      );
      return;
    }

    const updated = [...categoryCutOffs];
    updated[index].marks = value;
    setCategoryCutOffs(updated);
  };

  const handleExamCutOffChange = (index, value) => {
    const updated = [...examCutOffs];
    updated[index].marks = value;
    setExamCutOffs(updated);
  };

  useEffect(() => {
    if (organizationId) {
      dispatch(fetchVacancyAndMarksReservation(organizationId));
    }
  }, [dispatch, organizationId]);

  useEffect(() => {
    if (!vacancyReservation?.data) return;

    const data = vacancyReservation.data;

    setCategoryDistribution(data.categoryDistribution ?? true);
    setStateDistribution(data.stateDistribution ?? true);
    setExamReservation(data.examReservation ?? true);
    setInterviewReservation(data.interviewReservation ?? true);
    setInterviewTotalMarks(data.interviewTotalMarks ?? "");

    if (Array.isArray(data.examCutOffs)) {
      setExamCutOffs(data.examCutOffs);
    }

    if (Array.isArray(data.categoryCutOffs)) {
      setCategoryCutOffs(data.categoryCutOffs);
    }
  }, [vacancyReservation]);

  const handleSave = () => {
    const payload = {
      categoryDistribution,
      stateDistribution,
      examReservation,
      interviewReservation,
      interviewTotalMarks,
      examCutOffs,
      categoryCutOffs,
    };

    if (vacancyReservation?.data?.id) {
      dispatch(
        updateVacancyAndMarksReservation({
          organizationId,
          payload,
        }),
      );
    } else {
      dispatch(
        createVacancyAndMarksReservation({
          organizationId,
          payload,
        }),
      );
    }
  };

  return (
    <div className="vacancy-page">
      {/* Header */}

      <div className="vacancy-header">
        <div>
          <h3 className="page-title">Vacancy Breakdown</h3>
        </div>
      </div>

      {/* Vacancy Distribution */}

      <div className="card organization-card mb-4">
        <div className="card-body">
          <h6
            className="text-uppercase mb-4"
            style={{
              color: "#5b6b82",
              fontWeight: 600,
              letterSpacing: ".6px",
            }}
          >
            Vacancy Distribution
          </h6>

          <div className="setting-item mb-3">
            <div>
              <h6>Category-wise distribution of vacancies exists</h6>

              <small>Enable if vacancies are allocated category wise.</small>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={categoryDistribution}
                onChange={() => setCategoryDistribution(!categoryDistribution)}
              />
            </div>
          </div>

          <div className="setting-item">
            <div>
              <h6>State-wise distribution of vacancies exists</h6>

              <small>Enable if vacancies are allocated state wise.</small>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={stateDistribution}
                onChange={() => setStateDistribution(!stateDistribution)}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Reservation in Exam & Interview Marks */}

      <div className="card organization-card">
        <div className="card-body">
          <h6
            className="text-uppercase mb-4"
            style={{
              color: "#5b6b82",
              fontWeight: 600,
              letterSpacing: ".6px",
            }}
          >
            Reservation in Exam & Interview Marks
          </h6>

          {/* Exam Reservation */}

          <div className="setting-item">
            <div>
              <h6>Allow reservation in exam marks</h6>

              <small>
                Enable category-wise reservation while calculating exam cut-off
                marks.
              </small>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={examReservation}
                onChange={() => setExamReservation(!examReservation)}
              />
            </div>
          </div>

          <hr className="my-4" />

          {/* Interview Reservation */}

          <div className="setting-item">
            <div>
              <h6>Allow reservation in interview marks</h6>

              <small>
                Configure interview cut-off marks separately for each
                reservation category.
              </small>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={interviewReservation}
                onChange={() => setInterviewReservation(!interviewReservation)}
              />
            </div>
          </div>

          <div className="mt-4 ms-5">
            <div className="row mb-4">
              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  Total Interview Marks
                </label>

                <input
                  type="number"
                  className="form-control modern-input"
                  placeholder="Enter Total Marks"
                  value={interviewTotalMarks}
                  onChange={(e) => setInterviewTotalMarks(e.target.value)}
                />
              </div>
            </div>
            {interviewReservation && (
              <div className="table-responsive">
                <table className="table category-cutoff-table">
                  <thead>
                    <tr>
                      <th style={{ width: "250px" }}>Category</th>
                      <th style={{ width: "220px" }}>Cut-off Marks</th>
                    </tr>
                  </thead>

                  <tbody>
                    {categoryCutOffs.map((item, index) => (
                      <tr key={item.category}>
                        <td>
                          <strong>{item.category}</strong>
                        </td>

                        <td>
                          <input
                            type="number"
                            className="form-control modern-input"
                            placeholder="Enter Marks"
                            value={item.marks}
                            onChange={(e) =>
                              handleCategoryCutOffChange(index, e.target.value)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}

      <div className="d-flex justify-content-end gap-3 mt-4">
        <button
          className="btn btn-cancel"
          type="button"
          onClick={() =>
            dispatch(fetchVacancyAndMarksReservation(organizationId))
          }
        >
          Discard
        </button>

        <button
          className="btn btn-save"
          type="button"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
};

export default VacancyBreakdown;
