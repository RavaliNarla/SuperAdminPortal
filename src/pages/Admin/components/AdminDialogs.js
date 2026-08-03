import React, { useState, useEffect, useMemo } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Card,
  Badge,
  InputGroup,
} from "react-bootstrap";

import {
  FiShield,
  FiSave,
  FiTrash2,
  FiX,
  FiSearch,
  FiCheckCircle,
  FiRefreshCw,
  FiEye,
} from "react-icons/fi";

import toast from "react-hot-toast";

const STATUS_OPTIONS = [
  {
    value: "ACTIVE",
    label: "Active",
  },
  {
    value: "INACTIVE",
    label: "Inactive",
  },
];

/* ===========================================================
   Helper
=========================================================== */

const createDefaultPermissions = (moduleGroups = []) => {
  const permissions = {};

  moduleGroups.forEach((group) => {
    group.modules.forEach((module) => {
      permissions[module.key] = false;
    });
  });

  return permissions;
};

/* ===========================================================
   Create / Edit Role Dialog
=========================================================== */

export const RoleDialog = ({
  show,
  onHide,
  role,
  onSave,
  moduleGroups = [],
}) => {
  /* =======================================================
      Form State
  ======================================================= */

  const [formData, setFormData] = useState({
    roleName: "",
    description: "",
    status: "ACTIVE",
    permissions: {},
  });

  const [errors, setErrors] = useState({});

  /* =======================================================
      UI State
  ======================================================= */

  const [searchText, setSearchText] = useState("");

  const [expandedGroups, setExpandedGroups] = useState({});

  const [saving, setSaving] = useState(false);

  /* =======================================================
      Load Data
  ======================================================= */

  useEffect(() => {
    if (role) {
      setFormData({
        roleName: role.roleName || "",
        description: role.description || "",
        status: role.status || "ACTIVE",
        permissions:
          Object.keys(role.permissions || {}).length > 0
            ? role.permissions
            : createDefaultPermissions(moduleGroups),
      });
    } else {
      setFormData({
        roleName: "",
        description: "",
        status: "ACTIVE",
        permissions: createDefaultPermissions(moduleGroups),
      });
    }

    const expand = {};

    moduleGroups.forEach((group) => {
      expand[group.title] = true;
    });

    setExpandedGroups(expand);

    setSearchText("");

    setErrors({});
  }, [role, moduleGroups, show]);

  /* =======================================================
      Filtered Groups
  ======================================================= */

  const filteredGroups = useMemo(() => {
    if (!searchText.trim()) return moduleGroups;

    return moduleGroups
      .map((group) => ({
        ...group,
        modules: group.modules.filter((module) =>
          module.name.toLowerCase().includes(searchText.toLowerCase()),
        ),
      }))
      .filter((group) => group.modules.length > 0);
  }, [moduleGroups, searchText]);

  /* =======================================================
      Permission Count
  ======================================================= */

  const totalPermissions = Object.keys(formData.permissions).length;

  const selectedPermissions = Object.values(formData.permissions).filter(
    Boolean,
  ).length;

  /* =======================================================
      Input Change
  ======================================================= */

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  /* =======================================================
      Permission Toggle
  ======================================================= */

  const handlePermissionChange = (key) => {
    setFormData((previous) => ({
      ...previous,
      permissions: {
        ...previous.permissions,
        [key]: !previous.permissions[key],
      },
    }));
  };

  /* =======================================================
      Select All
  ======================================================= */

  const handleSelectAll = () => {
    const updated = {};

    Object.keys(formData.permissions).forEach((key) => {
      updated[key] = true;
    });

    setFormData((previous) => ({
      ...previous,
      permissions: updated,
    }));
  };

  /* =======================================================
      Clear All
  ======================================================= */

  const handleClearAll = () => {
    const updated = {};

    Object.keys(formData.permissions).forEach((key) => {
      updated[key] = false;
    });

    setFormData((previous) => ({
      ...previous,
      permissions: updated,
    }));
  };

  /* =======================================================
      Toggle Group
  ======================================================= */

  const handleToggleGroup = (title) => {
    setExpandedGroups((previous) => ({
      ...previous,
      [title]: !previous[title],
    }));
  };

  /* =======================================================
      Validation
  ======================================================= */

  const validate = () => {
    const validationErrors = {};

    if (!formData.roleName.trim()) {
      validationErrors.roleName = "Role Name is required.";
    }

    if (!formData.description.trim()) {
      validationErrors.description = "Description is required.";
    }

    if (selectedPermissions === 0) {
      toast.error("Please select at least one permission.");
    }

    setErrors(validationErrors);

    return (
      Object.keys(validationErrors).length === 0 && selectedPermissions > 0
    );
  };

  /* =======================================================
      Save
  ======================================================= */

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setSaving(true);

      await onSave(formData);

      toast.success(
        role ? "Role updated successfully." : "Role created successfully.",
      );
    } catch (error) {
      toast.error("Unable to save role.");
    } finally {
      setSaving(false);
    }
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="xl"
      backdrop="static"
      dialogClassName="role-dialog-modal"
    >
      {/* =====================================================
          Premium Header
      ====================================================== */}

      <Modal.Header className="role-dialog-header border-0">
        <div className="d-flex align-items-center w-100">
          <div className="role-dialog-icon">
            <FiShield size={28} />
          </div>

          <div className="ms-3 flex-grow-1">
            <h4 className="mb-1 fw-bold">
              {role ? "Edit Role" : "Create New Role"}
            </h4>

            <p className="text-muted mb-0">
              Configure role details and assign module permissions.
            </p>
          </div>

          <Button
            variant="light"
            className="rounded-circle border-0 shadow-sm"
            onClick={onHide}
          >
            <FiX size={20} />
          </Button>
        </div>
      </Modal.Header>

      {/* =====================================================
          Body
      ====================================================== */}

      <Modal.Body className="p-4">
        {/* ==========================================
            Top Statistics
        ========================================== */}

        <Row className="g-3 mb-4">
          <Col lg={4} md={6}>
            <Card className="role-stat-card h-100 border-0">
              <Card.Body>
                <small className="text-muted">Total Permissions</small>

                <h2 className="fw-bold mt-2 mb-0">{totalPermissions}</h2>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6}>
            <Card className="role-stat-card h-100 border-0">
              <Card.Body>
                <small className="text-muted">Selected</small>

                <h2 className="fw-bold text-success mt-2 mb-0">
                  {selectedPermissions}
                </h2>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="role-stat-card h-100 border-0">
              <Card.Body className="d-flex align-items-center justify-content-between">
                <div>
                  <small className="text-muted">Status</small>

                  <div className="mt-2">
                    <Badge
                      bg={
                        formData.status === "ACTIVE" ? "success" : "secondary"
                      }
                    >
                      {formData.status}
                    </Badge>
                  </div>
                </div>

                <FiCheckCircle size={32} className="text-success" />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* ==========================================
            Main Form
        ========================================== */}

        <Card className="border-0 shadow-sm">
          <Card.Body>
            <Row className="g-4">
              <Col lg={8} md={12}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Role Name</Form.Label>

                  <Form.Control
                    size="lg"
                    type="text"
                    name="roleName"
                    placeholder="Enter role name"
                    value={formData.roleName}
                    onChange={handleChange}
                    isInvalid={!!errors.roleName}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.roleName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col lg={4} md={12}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Status</Form.Label>

                  <Form.Select
                    size="lg"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Description</Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    placeholder="Describe this role..."
                    value={formData.description}
                    onChange={handleChange}
                    isInvalid={!!errors.description}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* ==========================================
            Permission Toolbar
        ========================================== */}

        <Card className="border-0 shadow-sm mt-4">
          <Card.Body>
            <Row className="align-items-center g-3">
              <Col lg={6}>
                <InputGroup>
                  <InputGroup.Text>
                    <FiSearch />
                  </InputGroup.Text>

                  <Form.Control
                    placeholder="Search permissions..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </InputGroup>
              </Col>

              <Col lg={6}>
                <div className="d-flex justify-content-lg-end flex-wrap gap-2">
                  <Button variant="outline-success" onClick={handleSelectAll}>
                    <FiCheckCircle className="me-2" />
                    Select All
                  </Button>

                  <Button variant="outline-secondary" onClick={handleClearAll}>
                    <FiRefreshCw className="me-2" />
                    Clear All
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* =====================================================
            Module Permissions
        ====================================================== */}

        <div className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
            <div>
              <h5 className="fw-bold mb-1">Module Permissions</h5>

              <p className="text-muted mb-0">
                Enable or disable access for each module.
              </p>
            </div>

            <Badge bg="primary" pill className="px-3 py-2">
              {selectedPermissions} / {totalPermissions} Selected
            </Badge>
          </div>

          {filteredGroups.length === 0 && (
            <Card className="border-0 shadow-sm">
              <Card.Body className="text-center py-5">
                <FiSearch size={42} className="text-muted mb-3" />

                <h6>No permissions found</h6>

                <p className="text-muted mb-0">Try another search keyword.</p>
              </Card.Body>
            </Card>
          )}

          {filteredGroups.map((group) => {
            const enabledCount = group.modules.filter(
              (module) => formData.permissions[module.key],
            ).length;

            return (
              <Card
                key={group.title}
                className="permission-card border-0 shadow-sm mb-4"
              >
                {/* =====================================
                    Group Header
                ====================================== */}

                <Card.Header
                  className="permission-header bg-white"
                  onClick={() => handleToggleGroup(group.title)}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="fw-bold mb-1">{group.title}</h6>

                      <small className="text-muted">
                        {enabledCount} of {group.modules.length} enabled
                      </small>
                    </div>

                    <Button size="sm" variant="light">
                      {expandedGroups[group.title] ? "−" : "+"}
                    </Button>
                  </div>
                </Card.Header>

                {/* =====================================
                    Group Body
                ====================================== */}

                {expandedGroups[group.title] && (
                  <Card.Body>
                    <Row className="g-3">
                      {group.modules.map((module) => (
                        <Col xl={4} lg={6} md={6} xs={12} key={module.key}>
                          <Card
                            className={`permission-item h-100 border ${
                              formData.permissions[module.key]
                                ? "border-primary"
                                : ""
                            }`}
                          >
                            <Card.Body>
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="flex-grow-1 pe-3">
                                  <div className="fw-semibold">
                                    {module.name}
                                  </div>

                                  <small className="text-muted">
                                    Permission
                                  </small>
                                </div>

                                <Form.Check
                                  type="switch"
                                  id={module.key}
                                  checked={formData.permissions[module.key]}
                                  onChange={() =>
                                    handlePermissionChange(module.key)
                                  }
                                />
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                )}
              </Card>
            );
          })}
        </div>
      </Modal.Body>
      {/* =====================================================
          Premium Footer
      ====================================================== */}

      <Modal.Footer className="role-dialog-footer border-0">
        <div className="d-flex justify-content-between align-items-center w-100 flex-wrap gap-3">
          {/* Left */}

          <div className="text-muted small">
            <strong>{selectedPermissions}</strong> of{" "}
            <strong>{totalPermissions}</strong> permissions selected
          </div>

          {/* Right */}

          <div className="d-flex gap-2">
            <Button
              variant="light"
              className="px-4"
              onClick={onHide}
              disabled={saving}
            >
              <FiX className="me-2" />
              Cancel
            </Button>

            <Button
              variant="primary"
              className="px-4 shadow-sm"
              onClick={handleSubmit}
              disabled={saving}
            >
              {saving ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  />
                  Saving...
                </>
              ) : (
                <>
                  <FiSave className="me-2" />

                  {role ? "Update Role" : "Create Role"}
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

/* ===========================================================
   Premium Delete Dialog
=========================================================== */

export const DeleteDialog = ({ show, onHide, role, onConfirm }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await onConfirm();
      toast.success("Role deleted successfully.");
    } catch (error) {
      toast.error("Unable to delete role.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      dialogClassName="delete-role-modal"
    >
      {/* Header */}

      <Modal.Header className="delete-role-header border-0">
        <div className="d-flex align-items-center w-100">
          <div className="header-icon danger">
            <FiTrash2 size={22} />
          </div>

          <div className="ms-3 flex-grow-1">
            <h4 className="mb-1 fw-bold">Delete Role</h4>

            <p className="text-muted mb-0">
              Confirm before removing this role.
            </p>
          </div>

          <Button variant="light" className="icon-button" onClick={onHide}>
            <FiX />
          </Button>
        </div>
      </Modal.Header>

      {/* Body */}

      <Modal.Body className="p-4">
        <div className="text-center mb-4">
          <div className="delete-role-avatar">
            <FiTrash2 size={34} />
          </div>

          <h4 className="fw-bold mt-3">Delete this Role?</h4>

          <p className="text-muted">This action cannot be undone.</p>
        </div>

        {/* Role Details */}

        <Card className="delete-details-card mb-4">
          <Card.Body>
            <Row className="g-4">
              <Col md={6}>
                <label className="field-label">Role Name</label>

                <div className="field-box">{role?.roleName || "-"}</div>
              </Col>

              <Col md={6}>
                <label className="field-label">Status</label>

                <div className="field-box">
                  <Badge
                    bg={role?.status === "ACTIVE" ? "success" : "secondary"}
                  >
                    {role?.status}
                  </Badge>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Warning */}

        <div className="delete-warning-box">
          <FiTrash2 className="text-danger mt-1 me-3" size={22} />

          <div>
            <div className="fw-bold text-danger mb-1">Warning</div>

            <small className="text-muted">
              Deleting this role permanently removes all permissions assigned to
              it. Users currently assigned to this role may immediately lose
              access to the associated modules.
            </small>
          </div>
        </div>
      </Modal.Body>

      {/* Footer */}

      <Modal.Footer className="border-0 pt-0 px-4 pb-4">
        <Button
          variant="light"
          className="btn-cancel"
          onClick={onHide}
          disabled={loading}
        >
          <FiX className="me-2" />
          Cancel
        </Button>

        <Button
          variant="danger"
          className="btn-delete"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              Deleting...
            </>
          ) : (
            <>
              <FiTrash2 className="me-2" />
              Delete Role
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

/* ===========================================================
   Premium Module Access Dialog
=========================================================== */

export const ModuleAccessDialog = ({
  show,
  onHide,
  role,
  moduleGroups = [],
  onSave,
}) => {
  const [permissions, setPermissions] = useState({});
  const [searchText, setSearchText] = useState("");
  const [expandedGroups, setExpandedGroups] = useState({});
  const [saving, setSaving] = useState(false);

  /* =======================================================
      Load Permissions
  ======================================================= */

  useEffect(() => {
    const initialPermissions = {};

    moduleGroups.forEach((group) => {
      group.modules.forEach((module) => {
        initialPermissions[module.key] =
          role?.permissions?.[module.key] || false;
      });
    });

    setPermissions(initialPermissions);

    const expanded = {};

    moduleGroups.forEach((group) => {
      expanded[group.title] = true;
    });

    setExpandedGroups(expanded);

    setSearchText("");
  }, [role, moduleGroups, show]);

  /* =======================================================
      Search
  ======================================================= */

  const filteredGroups = useMemo(() => {
    if (!searchText.trim()) return moduleGroups;

    return moduleGroups
      .map((group) => ({
        ...group,
        modules: group.modules.filter((module) =>
          module.name.toLowerCase().includes(searchText.toLowerCase()),
        ),
      }))
      .filter((group) => group.modules.length);
  }, [moduleGroups, searchText]);

  /* =======================================================
      Statistics
  ======================================================= */

  const totalPermissions = Object.keys(permissions).length;

  const enabledPermissions = Object.values(permissions).filter(Boolean).length;

  /* =======================================================
      Toggle Permission
  ======================================================= */

  const handleToggle = (key) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  /* =======================================================
      Select All
  ======================================================= */

  const handleSelectAll = () => {
    const updated = {};

    Object.keys(permissions).forEach((key) => {
      updated[key] = true;
    });

    setPermissions(updated);
  };

  /* =======================================================
      Clear All
  ======================================================= */

  const handleClearAll = () => {
    const updated = {};

    Object.keys(permissions).forEach((key) => {
      updated[key] = false;
    });

    setPermissions(updated);
  };

  /* =======================================================
      Expand / Collapse
  ======================================================= */

  const handleToggleGroup = (title) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  /* =======================================================
      Save
  ======================================================= */

  const handleSave = async () => {
    try {
      setSaving(true);

      await onSave(permissions);

      toast.success("Permissions updated.");
    } catch (error) {
      toast.error("Unable to update permissions.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="xl"
      backdrop="static"
      dialogClassName="module-access-modal"
    >
      {/* ==========================================
          Header
      ========================================== */}

      <Modal.Header className="border-0">
        <div className="d-flex align-items-center w-100">
          <div className="role-dialog-icon">
            <FiShield size={28} />
          </div>

          <div className="ms-3 flex-grow-1">
            <h4 className="fw-bold mb-1">Module Access</h4>

            <p className="text-muted mb-0">{role?.roleName}</p>
          </div>

          <Button variant="light" className="rounded-circle" onClick={onHide}>
            <FiX />
          </Button>
        </div>
      </Modal.Header>

      {/* ==========================================
          Body
      ========================================== */}

      <Modal.Body>
        {/* Statistics */}

        <Row className="g-3 mb-4">
          <Col md={4}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <small className="text-muted">Total Permissions</small>

                <h2 className="fw-bold">{totalPermissions}</h2>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <small className="text-muted">Enabled</small>

                <h2 className="text-success fw-bold">{enabledPermissions}</h2>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Badge bg="primary" className="px-3 py-2 mt-4">
              {enabledPermissions} Selected
            </Badge>
          </Col>
        </Row>

        {/* Search */}

        <InputGroup className="mb-4">
          <InputGroup.Text>
            <FiSearch />
          </InputGroup.Text>

          <Form.Control
            placeholder="Search permission..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </InputGroup>

        {/* Buttons */}

        <div className="mb-4 d-flex gap-2 flex-wrap">
          <Button variant="outline-success" onClick={handleSelectAll}>
            Select All
          </Button>

          <Button variant="outline-secondary" onClick={handleClearAll}>
            Clear All
          </Button>
        </div>

        {/* Permission Groups */}

        {filteredGroups.map((group) => (
          <Card key={group.title} className="border-0 shadow-sm mb-4">
            <Card.Header
              className="bg-white"
              style={{
                cursor: "pointer",
              }}
              onClick={() => handleToggleGroup(group.title)}
            >
              <div className="d-flex justify-content-between align-items-center">
                <strong>{group.title}</strong>

                <Button size="sm" variant="light">
                  {expandedGroups[group.title] ? "-" : "+"}
                </Button>
              </div>
            </Card.Header>

            {expandedGroups[group.title] && (
              <Card.Body>
                <Row>
                  {group.modules.map((module) => (
                    <Col
                      lg={4}
                      md={6}
                      xs={12}
                      key={module.key}
                      className="mb-3"
                    >
                      <Card className="border permission-item">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <div className="fw-semibold">{module.name}</div>

                              <small className="text-muted">
                                Module Permission
                              </small>
                            </div>

                            <Form.Check
                              type="switch"
                              checked={permissions[module.key]}
                              onChange={() => handleToggle(module.key)}
                            />
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            )}
          </Card>
        ))}
      </Modal.Body>

      <Modal.Footer className="border-0">
        <Button variant="light" onClick={onHide} disabled={saving}>
          <FiX className="me-2" />
          Cancel
        </Button>

        <Button variant="primary" onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              Saving...
            </>
          ) : (
            <>
              <FiSave className="me-2" />
              Save Permissions
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

/* ===========================================================
   View Role Dialog
=========================================================== */

export const ViewRoleDialog = ({ show, onHide, role, moduleGroups = [] }) => {
  if (!role) return null;

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="xl"
      backdrop="static"
      dialogClassName="view-role-modal"
    >
      <Modal.Header className="border-0 view-role-header">
        <div className="d-flex align-items-center w-100">
          <div className="view-role-icon">
            <FiEye size={28} />
          </div>

          <div className="ms-3 flex-grow-1">
            <h4 className="mb-1">View Role</h4>
            <p className="mb-0 text-muted">
              View role information and assigned permissions
            </p>
          </div>

          <Button variant="light" onClick={onHide}>
            <FiX />
          </Button>
        </div>
      </Modal.Header>

      <Modal.Body className="p-4">
        {/* Information */}

        <Card className="organization-card mb-4">
          <Card.Body>
            <Row className="g-4">
              <Col md={6}>
                <label className="view-label">Role Name</label>

                <div className="view-value">{role.roleName}</div>
              </Col>

              <Col md={6}>
                <label className="view-label">Status</label>

                <div className="view-value">
                  <Badge
                    bg={role.status === "ACTIVE" ? "success" : "secondary"}
                  >
                    {role.status}
                  </Badge>
                </div>
              </Col>

              <Col md={12}>
                <label className="view-label">Description</label>

                <div className="view-value">{role.description}</div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Permissions */}

        {moduleGroups.map((group) => {
          const enabled = group.modules.filter(
            (module) => role?.permissions?.[module.key] === true,
          );
          if (enabled.length === 0) return null;

          return (
            <Card key={group.title} className="organization-card mb-3">
              <Card.Header className="bg-white">
                <div className="d-flex justify-content-between">
                  <strong>{group.title}</strong>

                  <Badge bg="primary">{enabled.length}</Badge>
                </div>
              </Card.Header>

              <Card.Body>
                <Row>
                  {enabled.map((module) => (
                    <Col lg={4} md={6} key={module.key}>
                      <div className="permission-view-item">
                        <FiCheckCircle className="text-success me-2" />

                        {module.name}
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          );
        })}
      </Modal.Body>

      <Modal.Footer className="border-0">
        <Button variant="primary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
