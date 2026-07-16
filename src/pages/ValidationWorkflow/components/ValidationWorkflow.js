import React, { useState } from "react";

const ValidationWorkflow = () => {
  const [phaseTwo, setPhaseTwo] = useState([
    "Reservation Assignment",
    "Education Validation",
    "Experience Validation",
    "Inclusion Assignment",
  ]);

  const moveUp = (index) => {
    if (index === 0) return;

    const data = [...phaseTwo];
    [data[index - 1], data[index]] = [data[index], data[index - 1]];
    setPhaseTwo(data);
  };

  const moveDown = (index) => {
    if (index === phaseTwo.length - 1) return;

    const data = [...phaseTwo];
    [data[index + 1], data[index]] = [data[index], data[index + 1]];
    setPhaseTwo(data);
  };

  return (
    <div className="container-fluid">

      <h2 className="fw-bold mb-2">
        Validation Workflow
      </h2>

      <p className="text-muted mb-4">
        Disqualifiers always run first and cannot be reordered.
        Only Phase 2 (Qualification) order can be adjusted.
      </p>

      {/* Phase 1 */}

      <div className="mb-4">

        <div className="d-flex align-items-center mb-3">

          <small className="text-uppercase text-secondary me-2">
            Phase 1 — Disqualifiers
          </small>

          <span className="badge bg-warning text-dark">
            🔒 Fixed Order
          </span>

        </div>

        <div className="card mb-2">
          <div className="card-body d-flex align-items-center">

            <i className="bi bi-lock me-3"></i>

            <strong className="me-3">1.</strong>

            Exclusion Check

          </div>
        </div>

        <div className="card">
          <div className="card-body d-flex align-items-center">

            <i className="bi bi-lock me-3"></i>

            <strong className="me-3">2.</strong>

            Age Boundary Check

          </div>
        </div>

      </div>

      <div className="text-center fs-3 mb-4">
        ↓
      </div>

      {/* Phase 2 */}

      <div className="mb-4">

        <small className="text-uppercase text-secondary">
          Phase 2 — Qualification
        </small>

        {phaseTwo.map((item, index) => (

          <div className="card mt-2" key={item}>

            <div className="card-body d-flex justify-content-between align-items-center">

              <div>

                <i className="bi bi-grip-vertical me-3"></i>

                <strong>{index + 3}.</strong>

                <span className="ms-3">
                  {item}
                </span>

              </div>

              <div>

                <button
                  className="btn btn-sm btn-outline-secondary me-2"
                  onClick={() => moveUp(index)}
                >
                  ↑
                </button>

                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => moveDown(index)}
                >
                  ↓
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      <div className="text-center fs-3 mb-4">
        ↓
      </div>

      {/* Decision */}

      <button className="btn btn-primary w-100 mb-5">
        Eligibility Decision
      </button>

      <hr />

      {/* Preview */}

      <h6 className="text-uppercase mt-4">
        Preview With Sample Candidate
      </h6>

      <p className="text-muted">
        Test a hypothetical candidate against the current
        workflow before publishing.
      </p>

      <div className="card">

        <div className="card-body">

          <div className="row">

            <div className="col-md-2">

              <label className="form-label">
                Age
              </label>

              <input
                className="form-control"
                defaultValue={28}
              />

            </div>

            <div className="col-md-3">

              <label className="form-label">
                Category
              </label>

              <select className="form-select">

                <option>General</option>
                <option>SC</option>
                <option>ST</option>
                <option>OBC</option>

              </select>

            </div>

            <div className="col-md-3">

              <label className="form-label">
                Exclusion Match
              </label>

              <select className="form-select">

                <option>None</option>
                <option>Medical Unfit</option>
                <option>Blacklisted</option>

              </select>

            </div>

            <div className="col-md-2 d-flex align-items-end">

              <button className="btn btn-outline-primary w-100">
                ▶ Run
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ValidationWorkflow;