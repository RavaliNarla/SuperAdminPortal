import React, { useEffect, useState } from "react";
import "../../../css/Inclusions.css";
import InclusionModal from "./InclusionModal";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchInclusions, createInclusion } from "../Thunk/eligibilityThunk";

const Inclusions = () => {
  const [search, setSearch] = useState("");

  //  const [inclusions, setInclusions] = useState([]);

  const dispatch = useAppDispatch();

  const organizationId = useAppSelector(
    (state) => state.eligibility.selectedOrganization,
  );

  useEffect(() => {
    if (organizationId) {
      dispatch(fetchInclusions(organizationId));
    }
  }, [dispatch, organizationId]);

  const inclusions = useAppSelector(
    (state) => state.eligibility.inclusions || [],
  );
  const loading = useAppSelector((state) => state.eligibility.loading);

  const [showModal, setShowModal] = useState(false);
  const [viewInclusion, setViewInclusion] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);

  const [showDisableModal, setShowDisableModal] = useState(false);
  const [selectedInclusionId, setSelectedInclusionId] = useState(null);

  const filteredData = (Array.isArray(inclusions) ? inclusions : []).filter(
    (item) => (item.name || "").toLowerCase().includes(search.toLowerCase()),
  );

  const handleCreateInclusion = (inclusion) => {
    dispatch(
      createInclusion({
        organizationId,
        payload: inclusion,
      }),
    );
    // setInclusions((prev) => [...prev, inclusion]);
  };

  const confirmDisable = () => {
    // setInclusions((prev) =>
    //   prev.map((item) =>
    //     item.id === selectedInclusionId
    //       ? {
    //           ...item,
    //           status: "Disabled",
    //         }
    //       : item,
    //   ),
    // );

    setShowDisableModal(false);
    setSelectedInclusionId(null);
  };

  return (
    <div className="inclusion-page">
      {/* Header */}

      <div className="inclusion-header">
        <div>
          <h3 className="page-title">Inclusions</h3>

          <p className="page-subtitle">
            Configure inclusion rules like Freedom Fighter, Border Area
            Candidate and other non-reservation benefits.
          </p>
        </div>

        <button
          className="btn btn-save"
          onClick={() => {
            setViewInclusion(null);
            setIsViewMode(false);
            setShowModal(true);
          }}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add Inclusion
        </button>
      </div>

      {/* Info Card */}

      <div className="info-card mb-4">
        <i className="bi bi-info-circle-fill"></i>

        <span>
          No reservation slot consumed — relaxation and/or documents only (e.g.
          Freedom Fighter). Locked once created.
        </span>
      </div>

      {/* Search */}

      <div className="search-wrapper mb-4">
        <i className="bi bi-search"></i>

        <input
          type="text"
          className="form-control search-input"
          placeholder="Search Inclusion..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}

      <div className="table-card">
        <div className="table-responsive">
          <table className="table inclusion-table align-middle mb-0">
            <thead>
              <tr>
                <th>Name</th>

                <th>Age Relaxation</th>

                <th>Status</th>

                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id}>
                    <td className="fw-semibold">{item.name}</td>

                    <td>
                      <span className="age-pill">{item.ageRelaxation}</span>
                    </td>

                    <td>
                      <span
                        className={
                          item.status === "Active"
                            ? "status-active"
                            : "status-disabled"
                        }
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          type="button"
                          className="btn btn-light p-0"
                          style={{
                            width: "40px",
                            height: "40px",
                            minWidth: "40px",
                            minHeight: "40px",
                          }}
                          onClick={() => {
                            setViewInclusion(item);
                            setIsViewMode(true);
                            setShowModal(true);
                          }}
                        >
                          <i className="bi bi-eye text-primary"></i>
                        </button>

                        <button
                          type="button"
                          className="btn btn-light p-0"
                          style={{
                            width: "40px",
                            height: "40px",
                            minWidth: "40px",
                            minHeight: "40px",
                          }}
                          onClick={() => {
                            setViewInclusion(item);
                            setIsViewMode(false);
                            setShowModal(true);
                          }}
                        >
                          <i className="bi bi-pencil-square text-success"></i>
                        </button>

                        <button
                          type="button"
                          className="btn btn-light p-0"
                          style={{
                            width: "40px",
                            height: "40px",
                            minWidth: "40px",
                            minHeight: "40px",
                          }}
                          onClick={() => {
                            setSelectedInclusionId(item.id);
                            setShowDisableModal(true);
                          }}
                        >
                          <i className="bi bi-trash text-danger"></i>{" "}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-5">
                    <i
                      className="bi bi-folder2-open"
                      style={{
                        fontSize: 45,
                        color: "#cbd5e1",
                      }}
                    ></i>

                    <h6 className="mt-3">No Records Found</h6>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Disable Confirmation Modal */}

      {showDisableModal && (
        <div className="category-modal-backdrop">
          <div className="category-modal" style={{ maxWidth: "450px" }}>
            <div className="category-modal-header">
              <h5>Disable Inclusion</h5>
            </div>

            <div className="category-modal-body">
              <p>Are you sure you want to disable this inclusion?</p>

              <p className="text-muted mb-0">
                Disabled inclusions cannot be assigned to new candidates.
              </p>
            </div>

            <div className="category-modal-footer">
              <button
                className="btn btn-cancel"
                onClick={() => {
                  setShowDisableModal(false);
                  setSelectedInclusionId(null);
                }}
              >
                Cancel
              </button>

              <button className="btn btn-danger" onClick={confirmDisable}>
                Disable
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inclusion Modal */}

      <InclusionModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setViewInclusion(null);
          setIsViewMode(false);
        }}
        onCreate={handleCreateInclusion}
        inclusion={viewInclusion}
        isViewMode={isViewMode}
      />
    </div>
  );
};

export default Inclusions;
