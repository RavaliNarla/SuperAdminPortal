import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Form,
  Button,
  Dropdown,
  InputGroup,
  Pagination,
} from "react-bootstrap";

import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiFilter,
} from "react-icons/fi";

import toast from "react-hot-toast";

import {
  RoleDialog,
  DeleteDialog,
  ModuleAccessDialog,
  ViewRoleDialog,
} from "../Admin/components/AdminDialogs";

import { StatusChip, EmptyState } from "../Admin/components/AdminUtils";

import "../../css/AdminManagement.css";

/* ===========================================================
   Dummy Organizations
=========================================================== */

const ORGANIZATIONS = [
  {
    id: 1,
    name: "Bank of Baroda",
  },
  {
    id: 2,
    name: "State Bank of India",
  },
  {
    id: 3,
    name: "Canara Bank",
  },
];

/* ===========================================================
   Module Groups
=========================================================== */

const MODULE_GROUPS = [
  {
    title: "Recruitment",
    modules: [
      {
        key: "job_posting",
        name: "Job Posting",
      },
      {
        key: "candidate_pool",
        name: "Candidate Pool",
      },
      {
        key: "schedule_pool",
        name: "Schedule Pool",
      },
      {
        key: "interview_pool",
        name: "Interview Pool",
      },
    ],
  },

  {
    title: "Hiring",
    modules: [
      {
        key: "offer_pool",
        name: "Offer Pool",
      },
      {
        key: "compensation_pool",
        name: "Compensation Pool",
      },
    ],
  },

  {
    title: "Administration",
    modules: [
      {
        key: "verification",
        name: "Verification",
      },
      {
        key: "messages",
        name: "Messages",
      },
    ],
  },

  {
    title: "Authentication",
    modules: [
      {
        key: "user_management",
        name: "User Management",
      },
      {
        key: "role_assignment",
        name: "Role Assignment",
      },
    ],
  },
];

/* ===========================================================
   Helpers
=========================================================== */

const ALL_MODULE_KEYS = MODULE_GROUPS.flatMap((group) =>
  group.modules.map((module) => module.key),
);

const getPermissionObject = (modules = []) => {
  const permissions = {};

  ALL_MODULE_KEYS.forEach((key) => {
    permissions[key] = modules.includes(key);
  });

  return permissions;
};

/* ===========================================================
   Dummy Roles
=========================================================== */

const INITIAL_ROLES = [
  {
    id: 1,
    organizationId: 1,
    roleName: "Recruiter",
    description: "Manage recruitment activities",
    status: "ACTIVE",
    createdDate: "31-07-2026",
    permissions: getPermissionObject([
      "job_posting",
      "candidate_pool",
      "schedule_pool",
    ]),
  },

  {
    id: 2,
    organizationId: 1,
    roleName: "HR Admin",
    description: "Complete HR Administration",
    status: "ACTIVE",
    createdDate: "30-07-2026",
    permissions: getPermissionObject(ALL_MODULE_KEYS),
  },

  {
    id: 3,
    organizationId: 2,
    roleName: "Interviewer",
    description: "Conduct Interviews",
    status: "INACTIVE",
    createdDate: "28-07-2026",
    permissions: getPermissionObject(["interview_pool", "candidate_pool"]),
  },
];

/* ===========================================================
   Component
=========================================================== */

const AdminManagement = () => {
  /* ==========================
      States
  ========================== */

  const [roles, setRoles] = useState(INITIAL_ROLES);

  const [selectedOrganization, setSelectedOrganization] = useState(1);

  const [searchText, setSearchText] = useState("");

  const [statusFilter, setStatusFilter] = useState("ALL");

  const [pageSize, setPageSize] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });

  /* ==========================
      Dialog States
  ========================== */
  const [showViewDialog, setShowViewDialog] = useState(false);

  const [showRoleDialog, setShowRoleDialog] = useState(false);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [showModuleDialog, setShowModuleDialog] = useState(false);

  const [selectedRole, setSelectedRole] = useState(null);
  /* ===========================================================
      Effects
  =========================================================== */

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, statusFilter, selectedOrganization]);

  /* ===========================================================
      Organization Roles
  =========================================================== */

  const organizationRoles = useMemo(() => {
    return roles.filter((role) => role.organizationId === selectedOrganization);
  }, [roles, selectedOrganization]);

  /* ===========================================================
      Filter Roles
  =========================================================== */

  const filteredRoles = useMemo(() => {
    let data = [...organizationRoles];

    /* Search */

    if (searchText.trim()) {
      const keyword = searchText.toLowerCase();

      data = data.filter(
        (role) =>
          role.roleName.toLowerCase().includes(keyword) ||
          role.description.toLowerCase().includes(keyword),
      );
    }

    /* Status */

    if (statusFilter !== "ALL") {
      data = data.filter((role) => role.status === statusFilter);
    }

    /* Sorting */

    if (sortConfig.key) {
      data.sort((a, b) => {
        let valueA = a[sortConfig.key];
        let valueB = b[sortConfig.key];

        if (typeof valueA === "string") {
          valueA = valueA.toLowerCase();
          valueB = valueB.toLowerCase();
        }

        if (valueA < valueB) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }

        if (valueA > valueB) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }

        return 0;
      });
    }

    return data;
  }, [organizationRoles, searchText, statusFilter, sortConfig]);

  /* ===========================================================
      Pagination
  =========================================================== */

  const totalPages = Math.ceil(filteredRoles.length / pageSize);

  const paginatedRoles = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;

    return filteredRoles.slice(startIndex, startIndex + pageSize);
  }, [filteredRoles, currentPage, pageSize]);

  /* ===========================================================
      Sorting
  =========================================================== */

  const handleSort = (column) => {
    setSortConfig((previous) => ({
      key: column,

      direction:
        previous.key === column && previous.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  /* ===========================================================
      Dialog Handlers
  =========================================================== */

  const handleCreateRole = () => {
    setSelectedRole(null);

    setShowRoleDialog(true);
  };

  const handleEditRole = (role) => {
    setSelectedRole(role);

    setShowRoleDialog(true);
  };

  const handleDeleteRole = (role) => {
    setSelectedRole(role);

    setShowDeleteDialog(true);
  };

  const handleModuleAccess = (role) => {
    setSelectedRole(role);

    setShowModuleDialog(true);
  };

  /* ===========================================================
      Save Role
  =========================================================== */

  const handleSaveRole = (payload) => {
    if (selectedRole) {
      /* Edit */

      const updatedRoles = roles.map((role) =>
        role.id === selectedRole.id
          ? {
              ...role,
              ...payload,
            }
          : role,
      );

      setRoles(updatedRoles);

      toast.success("Role Updated Successfully");
    } else {
      /* Create */

      const newRole = {
        id: Date.now(),

        organizationId: selectedOrganization,

        roleName: payload.roleName,

        description: payload.description,

        status: payload.status,

        permissions: payload.permissions || getPermissionObject([]),

        createdDate: new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
      };

      setRoles([newRole, ...roles]);

      toast.success("Role Created Successfully");
    }

    setShowRoleDialog(false);
  };

  /* ===========================================================
      Delete
  =========================================================== */

  const confirmDelete = () => {
    setRoles(roles.filter((role) => role.id !== selectedRole.id));

    setShowDeleteDialog(false);

    toast.success("Role Deleted Successfully");
  };

  /* ===========================================================
      Module Permissions
  =========================================================== */

  const handleViewRole = (role) => {
    setSelectedRole(role);
    setShowViewDialog(true);
  };
  const handleSavePermissions = (permissions) => {
    const updatedRoles = roles.map((role) =>
      role.id === selectedRole.id
        ? {
            ...role,
            permissions,
          }
        : role,
    );

    setRoles(updatedRoles);

    setShowModuleDialog(false);

    toast.success("Module Permissions Updated");
  };
  return (
    <Container fluid className="admin-management-page">
      {/* =======================================================
        Header
    ======================================================= */}

      <Row className="align-items-center mb-4">
        <Col md={6}>
          <h3 className="page-title mb-1">Admin Management</h3>

          <p className="page-subtitle mb-0">
            Create, update and manage organization roles & module permissions.
          </p>
        </Col>

        <Col md={6} className="text-md-end mt-3 mt-md-0">
          <Button className="btn-primary-custom" onClick={handleCreateRole}>
            <FiPlus className="me-2" />
            Create Role
          </Button>
        </Col>
      </Row>

      {/* =======================================================
        Main Card
    ======================================================= */}

      <Card className="organization-card shadow-sm">
        <Card.Body>
          {/* ===================================================
            Toolbar
        =================================================== */}

          <Row className="g-3 align-items-center mb-4">
            {/* Organization */}

            <Col lg={3}>
              <Form.Select
                value={selectedOrganization}
                onChange={(e) =>
                  setSelectedOrganization(Number(e.target.value))
                }
              >
                {ORGANIZATIONS.map((organization) => (
                  <option key={organization.id} value={organization.id}>
                    {organization.name}
                  </option>
                ))}
              </Form.Select>
            </Col>

            {/* Search */}

            <Col lg={4}>
              <InputGroup>
                <InputGroup.Text>
                  <FiSearch />
                </InputGroup.Text>

                <Form.Control
                  placeholder="Search Role..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </InputGroup>
            </Col>

            {/* Status */}

            <Col lg={3}>
              <Form.Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="ALL">All Status</option>

                <option value="ACTIVE">Active</option>

                <option value="INACTIVE">Inactive</option>
              </Form.Select>
            </Col>

            {/* Filter Button */}

            <Col lg={2} className="text-lg-end">
              <Button variant="light" className="border">
                <FiFilter className="me-2" />
                Filter
              </Button>
            </Col>
          </Row>

          {/* ===================================================
            Table
        =================================================== */}

          <div className="table-responsive">
            <Table
              hover
              bordered={false}
              className="align-middle category-table"
            >
              <thead>
                <tr>
                  <th
                    onClick={() => handleSort("roleName")}
                    style={{ cursor: "pointer" }}
                  >
                    Role Name
                  </th>

                  <th
                    onClick={() => handleSort("description")}
                    style={{ cursor: "pointer" }}
                  >
                    Description
                  </th>

                  <th>Status</th>

                  <th
                    onClick={() => handleSort("createdDate")}
                    style={{ cursor: "pointer" }}
                  >
                    Created Date
                  </th>

                  <th
                    style={{
                      width: "170px",
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedRoles.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-5">
                      <EmptyState />
                    </td>
                  </tr>
                ) : (
                  paginatedRoles.map((role) => (
                    <tr key={role.id}>
                      <td>
                        <strong>{role.roleName}</strong>
                      </td>

                      <td>{role.description}</td>

                      <td>
                        <StatusChip status={role.status} />
                      </td>

                      <td>{role.createdDate}</td>

                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          {/* View */}

                          <button
                            type="button"
                            className="action-icon-btn"
                            title="View"
                            onClick={() => handleViewRole(role)}
                          >
                            <FiEye color="#1891d0" />
                          </button>

                          {/* Edit */}

                          <button
                            type="button"
                            className="action-icon-btn"
                            title="Edit"
                            onClick={() => handleEditRole(role)}
                          >
                            <FiEdit2 color="#16a34a" />
                          </button>

                          {/* Delete */}

                          <button
                            type="button"
                            className="action-icon-btn"
                            title="Delete"
                            onClick={() => handleDeleteRole(role)}
                          >
                            <FiTrash2 color="#dc2626" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>

          {/* ===================================================
            Pagination
        =================================================== */}

          {filteredRoles.length > 0 && (
            <Row className="align-items-center mt-4">
              <Col md={6}>
                <small className="text-muted">
                  Showing {(currentPage - 1) * pageSize + 1} to{" "}
                  {Math.min(currentPage * pageSize, filteredRoles.length)} of{" "}
                  {filteredRoles.length} records
                </small>
              </Col>

              <Col
                md={6}
                className="d-flex justify-content-md-end mt-3 mt-md-0"
              >
                <Pagination className="mb-0">
                  <Pagination.Prev
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  />

                  {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                      key={index}
                      active={currentPage === index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}

                  <Pagination.Next
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  />
                </Pagination>
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>

      {/* =======================================================
        Dialogs
    ======================================================= */}

      <RoleDialog
        show={showRoleDialog}
        onHide={() => {
          setShowRoleDialog(false);

          setSelectedRole(null);
        }}
        role={selectedRole}
        onSave={handleSaveRole}
        moduleGroups={MODULE_GROUPS}
      />

      <DeleteDialog
        show={showDeleteDialog}
        onHide={() => setShowDeleteDialog(false)}
        role={selectedRole}
        onConfirm={confirmDelete}
      />

      <ModuleAccessDialog
        show={showModuleDialog}
        onHide={() => setShowModuleDialog(false)}
        role={selectedRole}
        moduleGroups={MODULE_GROUPS}
        onSave={handleSavePermissions}
      />
      <ViewRoleDialog
        show={showViewDialog}
        onHide={() => setShowViewDialog(false)}
        role={selectedRole}
        moduleGroups={MODULE_GROUPS}
      />
    </Container>
  );
};

export default AdminManagement;
