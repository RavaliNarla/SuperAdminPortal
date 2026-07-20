import React, { useState } from "react";
import "../../../css/CategoriesAgeRelaxation.css";
import CategoryModal from "./CategoryModal";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchCategoriesAndAgeRelaxations } from "../Thunk/eligibilityThunk";

const CategoriesAgeRelaxation = () => {
  const [settings, setSettings] = useState({
    applyRelaxation: true,
    reservedVacancyOnly: false,
    allowMultipleRelaxation: true,
    maximumRelaxation: 10,
  });
  const [activeTab, setActiveTab] = useState("vertical");
  const handleToggle = (field) => {
    setSettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const dispatch = useAppDispatch();

  const organizationId = useAppSelector(
    (state) => state.eligibility.selectedOrganization,
  );

  const categories = useAppSelector((state) => {
    const value = state.eligibility.categoriesAndAgeRelaxations;
    return Array.isArray(value) ? value : [];
  });

  const loading = useAppSelector((state) => state.eligibility.loading);

  useEffect(() => {
    if (!organizationId) return;

    dispatch(fetchCategoriesAndAgeRelaxations(organizationId));
  }, [dispatch, organizationId]);

  const [showModal, setShowModal] = useState(false);
  //   const [categories, setCategories] = useState([]);
  const [viewCategory, setViewCategory] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [search, setSearch] = useState("");
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const filteredCategories = categories.filter((item) => {
    const matchesTab =
      activeTab === "vertical"
        ? item.type === "Vertical"
        : item.type === "Horizontal";

    const matchesSearch = (item.name || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesTab && matchesSearch;
  });
  const handleCreateCategory = () => {
    // Call Create Category API
  };

  const handleDisable = () => {
    // Call Disable Category API
  };

  const confirmDisable = () => {
    // Call Disable API
    setShowDisableModal(false);
    setSelectedCategoryId(null);
  };

  //   const handleCreateCategory = (category) => {
  //     setCategories((prev) => [...prev, category]);
  //   };

  //   const handleDisable = (id) => {
  //     setCategories((prev) =>
  //       prev.map((item) =>
  //         item.id === id
  //           ? {
  //               ...item,
  //               status: item.status === "Active" ? "Inactive" : "Active",
  //             }
  //           : item,
  //       ),
  //     );
  //   };
  //   const confirmDisable = () => {
  //     setCategories((prev) =>
  //       prev.map((category) =>
  //         category.id === selectedCategoryId
  //           ? {
  //               ...category,
  //               status: "Disabled",
  //             }
  //           : category,
  //       ),
  //     );

  //     setShowDisableModal(false);
  //     setSelectedCategoryId(null);
  //   };
  return (
    <div className="category-page">
      {/* ================= Header ================= */}
      <div className="category-header">
        <div>
          <h5 className="section-title">Categories & Age Relaxation</h5>
          <p className="section-subtitle">
            Configure vertical & horizontal reservation categories and age
            relaxation rules.
          </p>
        </div>
        <button className="btn btn-save" onClick={() => setShowModal(true)}>
          <i className="bi bi-plus-lg me-2"></i>
          Add Category
        </button>
      </div>
      {/* =============== Global Settings =============== */}
      <div className="organization-card">
        <div className="card-body">
          <div className="section-header mb-4">
            <div>
              <h5 className="section-title">Global Age Relaxation Settings</h5>
              <p className="section-subtitle">
                Configure organization level age relaxation policies.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="setting-item">
                <div>
                  <h6>Apply Age Relaxation</h6>
                  <small>Enable age relaxation rules.</small>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={settings.applyRelaxation}
                    onChange={() => handleToggle("applyRelaxation")}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="setting-item">
                <div>
                  <h6>Reserved Vacancy Required</h6>
                  <small>
                    Apply relaxation only when reserved vacancies exist.
                  </small>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={settings.reservedVacancyOnly}
                    onChange={() => handleToggle("reservedVacancyOnly")}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 mt-4">
              <div className="setting-item">
                <div>
                  <h6>Allow Multiple Relaxations</h6>
                  <small>
                    Candidate can avail multiple relaxations together.
                  </small>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={settings.allowMultipleRelaxation}
                    onChange={() => handleToggle("allowMultipleRelaxation")}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 mt-4">
              <label className="form-label">Maximum Relaxation (Years)</label>
              <input
                type="number"
                className="form-control modern-input"
                value={settings.maximumRelaxation}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    maximumRelaxation: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
      {/* ================= Category Tabs ================= */}
      <div className="organization-card mt-4">
        <div className="card-body">
          <div className="category-tab-wrapper">
            <button
              className={
                activeTab === "vertical"
                  ? "category-tab active"
                  : "category-tab"
              }
              onClick={() => setActiveTab("vertical")}
            >
              <i className="bi bi-diagram-3-fill me-2"></i>
              Vertical Reservation
            </button>
            <button
              className={
                activeTab === "horizontal"
                  ? "category-tab active"
                  : "category-tab"
              }
              onClick={() => setActiveTab("horizontal")}
            >
              <i className="bi bi-grid-3x3-gap-fill me-2"></i>
              Horizontal Reservation
            </button>
          </div>
        </div>
      </div>
      {/* ================= Search ================= */}
      <div className="organization-card mt-4">
        <div className="card-body">
          <div className="table-toolbar">
            <div className="search-box">
              <i className="bi bi-search"></i>
              <input
                type="text"
                className="form-control modern-input"
                placeholder="Search Category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          {/* ================= Table ================= */}
          <div className="table-responsive mt-4">
            <table className="table category-table align-middle">
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th>Reservation Type</th>
                  <th>Age Relaxation</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="fw-semibold">{item.name}</div>
                      </td>
                      <td>
                        <span className="reservation-pill">{item.type}</span>
                      </td>
                      <td>{item.ageRelaxation}</td>
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
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            className="btn btn-sm btn-light"
                            title="View"
                            onClick={() => {
                              setViewCategory(item);
                              setIsViewMode(true);
                              setShowModal(true);
                            }}
                          >
                            <i className="bi bi-eye text-primary"></i>
                          </button>
                          {item.status !== "Disabled" && (
                            <button
                              className="btn btn-sm btn-light"
                              title="Disable"
                              onClick={() => {
                                setSelectedCategoryId(item.id);
                                setShowDisableModal(true);
                              }}
                            >
                              <i className="bi bi-slash-circle text-warning"></i>
                            </button>
                          )}
                          <button
                            className="btn btn-sm btn-light"
                            title="Create Revised Version"
                            onClick={() => {
                              setShowModal(true);
                            }}
                          >
                            <i className="bi bi-file-earmark-plus text-success"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <i
                        className="bi bi-search"
                        style={{
                          fontSize: "45px",
                          color: "#c5cdd8",
                        }}
                      ></i>
                      <h6 className="mt-3">No Categories Found</h6>
                      <p className="text-muted mb-0">
                        Try changing your search.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showDisableModal && (
        <div className="category-modal-backdrop">
          <div className="category-modal" style={{ maxWidth: "450px" }}>
            <div className="category-modal-header">
              <h5>Disable Category</h5>
            </div>

            <div className="category-modal-body">
              <p>Are you sure you want to disable this category?</p>

              <p className="text-muted mb-0">
                Disabled categories cannot be assigned to new candidates.
              </p>
            </div>

            <div className="category-modal-footer">
              <button
                className="btn btn-cancel"
                onClick={() => setShowDisableModal(false)}
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
      {/* Category Modal */}

      <CategoryModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setViewCategory(null);
          setIsViewMode(false);
        }}
        onCreate={handleCreateCategory}
        category={viewCategory}
        isViewMode={isViewMode}
      />
    </div>
  );
};
export default CategoriesAgeRelaxation;
