import React from "react";
import { useNavigate } from "react-router-dom";

const OverviewCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div
        className="organization-card h-100"
        style={{
          cursor: "pointer",
          border: "1px solid #edf1f7",
          borderRadius: "16px",
          background: "#fff",
          transition: ".25s",
        }}
        onClick={() => navigate(item.route)}
      >
        <div className="card-body">
          {/* Header */}

          <div className="d-flex align-items-center mb-3">
            <div
              style={{
                width: "46px",
                height: "46px",
                background: "#062b80",
                borderRadius: "12px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
                marginRight: "14px",
              }}
            >
              <i
                className={`bi ${item.icon}`}
                style={{
                  fontSize: "20px",
                }}
              ></i>
            </div>

            <h6
              className="mb-0"
              style={{
                fontWeight: 600,
                color: "#1f2937",
              }}
            >
              {item.title}
            </h6>
          </div>

          {/* Status */}

          <div className="mb-3">
            <span
              className={
                item.type === "active" ? "status-active" : "status-disabled"
              }
            >
              {item.status}
            </span>
          </div>

          {/* Description */}

          <p
            className="mb-0"
            style={{
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
