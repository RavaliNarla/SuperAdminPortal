import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiEdit2, FiEye, FiSettings } from "react-icons/fi";
import "../../../css/OrganizationList.css";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
// import { toggleOrganizationStatus } from "../../features/organizations/orgSlice";
import { fetchOrganizations } from "../hooks/organizationThunk";

export default function OrganizationList() {
  const organizations = useAppSelector((state) => state.organizations.items);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchOrganizations());
  }, [dispatch]);

  return (
    <div className="card-bg card-body">
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h2 className="page-title mb-1">Organization Management</h2>

          <p className="text-muted mb-0">
            Overview of active and inactive tenants.
          </p>
        </div>

        <Link to="/organizations/new" className="add-org-btn">
          <FiPlus size={18} />
          <span>Add Organization</span>
        </Link>
      </div>

      {/* Table */}

      <div className="table-responsive">
        <table className="table align-middle table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Domain</th>
              <th>Timezone</th>
              <th>Status</th>
              <th width="170">Actions</th>
            </tr>
          </thead>

          <tbody>
            {organizations.map((org) => {
              const domainValue = org.domain || org.code || "—";

              const timezoneValue =
                org.timeZone || org.regional?.timezone || "";

              const statusValue =
                org.status || org.subscription?.status || "Not Configured";

              return (
                <tr key={org.id}>
                  <td>{org.name}</td>

                  <td>{domainValue}</td>

                  <td>{timezoneValue}</td>

                  <td>
                    <span
                      className={`status-badge-table ${
                        statusValue === "Configured"
                          ? "configured"
                          : statusValue === "Partially Configured"
                            ? "partially_configured"
                            : "not_configured"
                      }`}
                    >
                      {statusValue}
                    </span>
                  </td>

                  <td>
                    <div className="action-buttons">
                      <Link
                        to={`/organizations/${org.id}`}
                        className="action-btn view-btn"
                        title="View"
                      >
                        <FiEye />
                      </Link>

                      <Link
                        to={`/organizations/${org.id}/edit`}
                        className="action-btn edit-btn"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </Link>

                      <Link
                        to={`/eligibility-configuration/categories?orgId=${org.id}`}
                        className="action-btn edit-btn"
                        title="Eligibility Configuration"
                      >
                        <FiSettings />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
