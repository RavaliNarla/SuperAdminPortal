import React, { useEffect, useState } from "react";
import "../../../css/Inclusions.css";
import ExclusionModal from "./ExclusionModal";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  fetchExclusions,
  createExclusion,
  updateExclusions,
} from "../Thunk/eligibilityThunk";

const Exclusions = () => {
  const [search, setSearch] = useState("");

  const dispatch = useAppDispatch();

  const organizationId = useAppSelector(
    (state) => state.eligibility.selectedOrganization,
  );

  const exclusions = useAppSelector(
    (state) => state.eligibility.exclusions || [],
  );

  useEffect(() => {
    if (organizationId) {
      dispatch(fetchExclusions(organizationId));
    }
  }, [dispatch, organizationId]);

  const [showModal, setShowModal] = useState(false);
  const [viewExclusion, setViewExclusion] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);

  const [showDisableModal, setShowDisableModal] = useState(false);
  const [selectedExclusionId, setSelectedExclusionId] = useState(null);

const filteredData = exclusions.filter((item) =>
  (item?.name || "")
    .toLowerCase()
    .includes((search || "").toLowerCase())
);

  const handleCreateExclusion = async (newExclusion) => {
    if (!viewExclusion) {
      if (exclusions.length === 0) {
        await dispatch(
          createExclusion({
            organizationId,
            payload: newExclusion,
          }),
        );
      } else {
        await dispatch(
          updateExclusions({
            organizationId,
            payload: [...exclusions, newExclusion],
          }),
        );
      }
    } else {
      const updatedExclusions = exclusions.map((item) =>
        item.id === viewExclusion.id
          ? {
              ...item,
              ...newExclusion,
              id: viewExclusion.id,
            }
          : item,
      );

      await dispatch(
        updateExclusions({
          organizationId,
          payload: updatedExclusions,
        }),
      );
    }

    // dispatch(fetchExclusions(organizationId));

    setShowModal(false);
    setViewExclusion(null);
    setIsViewMode(false);
  };
  const confirmDisable = async () => {
    const updatedExclusions = exclusions.map((item) =>
      item.id === selectedExclusionId
        ? {
            ...item,
            status: item.status === "Active" ? "Inactive" : "Active",
          }
        : item,
    );

    await dispatch(
      updateExclusions({
        organizationId,
        payload: updatedExclusions,
      }),
    );

    dispatch(fetchExclusions(organizationId));

    setShowDisableModal(false);
    setSelectedExclusionId(null);
  };

  const getActionBadge = (type) => {
    return (
      <span
        className="badge"
        style={{
          background: type === "Reject Immediately" ? "#FDECEC" : "#FFF3CD",
          color: type === "Reject Immediately" ? "#C0392B" : "#8A6D3B",
          padding: "8px 12px",
          borderRadius: "20px",
          fontWeight: 600,
        }}
      >
        {type}
      </span>
    );
  };

  return (
    <div className="inclusion-page">
      {/* Header */}

      <div className="inclusion-header">
        <div>
          <h3 className="page-title">Exclusions</h3>

          <p className="page-subtitle">
            Configure exclusion rules like Blacklisted, Medical Unfit, Criminal
            Cases and other rejection rules.
          </p>
        </div>

        <button
          className="btn btn-save"
          onClick={() => {
            setViewExclusion(null);
            setIsViewMode(false);
            setShowModal(true);
          }}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add Exclusion
        </button>
      </div>

      {/* Info Card */}

      <div className="info-card mb-4">
        <i className="bi bi-info-circle-fill"></i>

        <span>
          Exclusion rules are evaluated before eligibility validation. Once
          published, these rules become version controlled.
        </span>
      </div>

      {/* Search */}

      <div className="search-wrapper mb-4">
        <i className="bi bi-search"></i>

        <input
          type="text"
          className="form-control search-input"
          placeholder="Search Exclusion..."
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
                <th>Exclusion Name</th>

                <th>Action Type</th>

                <th>Status</th>

                <th className="text-center">Actions</th>
              </tr>
            </thead>

               <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id}>
                     <td className="fw-semibold">{item.name}</td>

                    <td>{getActionBadge(item.actionType)}</td>

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
                           setViewExclusion(item);
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
                             setViewExclusion(item);
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
                              setSelectedExclusionId(item.id);
                            setShowDisableModal(true);
                          }}
                        >
                          <i
                            className={
                              item.status === "Active"
                                ? "bi bi-slash-circle text-danger"
                                : "bi bi-check-circle text-success"
                            }
                          />
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
              <h5>
                {exclusions.find((x) => x.id === selectedExclusionId)
                  ?.status === "Active"
                  ? "Disable Exclusion"
                  : "Enable Exclusion"}
              </h5>
            </div>

            <div className="category-modal-body">
              <p>
                Are you sure you want to{" "}
                {exclusions.find((x) => x.id === selectedExclusionId)
                  ?.status === "Active"
                  ? "disable"
                  : "enable"}{" "}
                this exclusion?
              </p>
            </div>

            <div className="category-modal-footer">
              <button
                className="btn btn-cancel"
                onClick={() => {
                  setShowDisableModal(false);
                  setSelectedExclusionId(null);
                }}
              >
                Cancel
              </button>

              <button
                className={
                  exclusions.find((x) => x.id === selectedExclusionId)
                    ?.status === "Active"
                    ? "btn btn-danger"
                    : "btn btn-success"
                }
                onClick={confirmDisable}
              >
                {exclusions.find((x) => x.id === selectedExclusionId)
                  ?.status === "Active"
                  ? "Disable"
                  : "Enable"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exclusion Modal */}

      <ExclusionModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setViewExclusion(null);
          setIsViewMode(false);
        }}
        onCreate={handleCreateExclusion}
        exclusion={viewExclusion}
        isViewMode={isViewMode}
      />
    </div>
  );
};

export default Exclusions;
