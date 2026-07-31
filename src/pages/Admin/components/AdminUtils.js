import React from "react";
import {
  Badge,
  Button,
} from "react-bootstrap";

import {
  FiInbox,
  FiEdit2,
  FiTrash2,
  FiShield,
} from "react-icons/fi";

/* ===========================================================
   Status Chip
=========================================================== */

export const StatusChip = ({ status }) => {

  const variant =
    status === "ACTIVE"
      ? "success"
      : "secondary";

  return (
    <Badge bg={variant}>
      {status}
    </Badge>
  );

};

/* ===========================================================
   Empty State
=========================================================== */

export const EmptyState = ({
  title = "No Records Found",
  description = "There are no records available.",
}) => {

  return (

    <div className="text-center py-5">

      <FiInbox
        size={50}
        className="text-muted mb-3"
      />

      <h5>{title}</h5>

      <p className="text-muted mb-0">
        {description}
      </p>

    </div>

  );

};

/* ===========================================================
   Action Button
=========================================================== */

export const ActionButton = ({
  icon,
  label,
  variant = "light",
  onClick,
}) => (

  <Button
    variant={variant}
    size="sm"
    className="me-2"
    onClick={onClick}
  >
    {icon}
    <span className="ms-2">
      {label}
    </span>
  </Button>

);

/* ===========================================================
   Action Icons
=========================================================== */

export const EditButton = ({ onClick }) => (

  <Button
    variant="outline-primary"
    size="sm"
    className="me-2"
    onClick={onClick}
  >
    <FiEdit2 />
  </Button>

);

export const PermissionButton = ({ onClick }) => (

  <Button
    variant="outline-success"
    size="sm"
    className="me-2"
    onClick={onClick}
  >
    <FiShield />
  </Button>

);

export const DeleteButton = ({ onClick }) => (

  <Button
    variant="outline-danger"
    size="sm"
    onClick={onClick}
  >
    <FiTrash2 />
  </Button>

);
/* ===========================================================
   Format Date
=========================================================== */

export const formatDate = (date) => {

  if (!date) return "-";

  try {

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  } catch {

    return date;

  }

};

/* ===========================================================
   Sort Data
=========================================================== */

export const sortData = (
  data,
  field,
  direction = "asc"
) => {

  if (!field) return data;

  const sorted = [...data].sort((a, b) => {

    const valueA = a[field];
    const valueB = b[field];

    if (typeof valueA === "string") {

      return valueA.localeCompare(valueB);

    }

    if (valueA > valueB) return 1;

    if (valueA < valueB) return -1;

    return 0;

  });

  return direction === "desc"
    ? sorted.reverse()
    : sorted;

};

/* ===========================================================
   Generate Role Id
=========================================================== */

export const generateRoleId = (roles = []) => {

  if (!roles.length) return 1;

  return (
    Math.max(...roles.map((role) => role.id)) + 1
  );

};

/* ===========================================================
   Initial Permissions
=========================================================== */

export const getInitialPermissions = (
  moduleGroups = []
) => {

  const permissions = {};

  moduleGroups.forEach((group) => {

    group.modules.forEach((module) => {

      permissions[module.key] = false;

    });

  });

  return permissions;

};

/* ===========================================================
   Count Enabled Permissions
=========================================================== */

export const getPermissionCount = (
  permissions = {}
) => {

  return Object.values(permissions).filter(Boolean)
    .length;

};

/* ===========================================================
   Search Roles
=========================================================== */

export const filterRoles = (
  roles = [],
  searchText = "",
  status = "ALL"
) => {

  return roles.filter((role) => {

    const matchesSearch =
      role.roleName
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      role.description
        .toLowerCase()
        .includes(searchText.toLowerCase());

    const matchesStatus =
      status === "ALL" ||
      role.status === status;

    return matchesSearch && matchesStatus;

  });

};

/* ===========================================================
   Default Role Object
=========================================================== */

export const createEmptyRole = (
  moduleGroups = []
) => ({

  roleName: "",

  description: "",

  status: "ACTIVE",

  permissions: getInitialPermissions(
    moduleGroups
  ),

});

/* ===========================================================
   Pagination
=========================================================== */

export const paginate = (
  data = [],
  page = 1,
  pageSize = 10
) => {

  const start = (page - 1) * pageSize;

  return data.slice(start, start + pageSize);

};