import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { FiShield, FiMail, FiSmartphone } from "react-icons/fi";

import "../../../css/TwoFactorSection.css";

// 2FA Methods — Email OTP and SMS OTP only for now (Google Authenticator/TOTP
// removed by deliberate product decision).
const twoFactorMethods = [
  {
    value: "EMAIL_OTP",
    label: "Email OTP",
    icon: <FiMail />,
    description: "Send a one-time code to the user's email",
  },
  {
    value: "SMS_OTP",
    label: "SMS OTP",
    icon: <FiSmartphone />,
    description: "Send a one-time code to the user's mobile",
  },
];

const TwoFactorSection = ({ data, onChange }) => {
  const methods = data?.methods || {};

  const toggleMethod = (value, checked) => {
    onChange("methods", { ...methods, [value]: checked });
  };

  return (
    <div className="organization-card mb-4">
      <div className="card-body">
        <div className="section-header mb-4">
          <div>
            <h5 className="section-title">
              <FiShield className="me-2" />
              Two-Factor Authentication
            </h5>

            <p className="section-subtitle">
              Configure additional security for organization users.
            </p>
          </div>
        </div>

        {/* Enable */}

        <div className="twofa-enable-card mb-4">
          <div>
            <h6 className="mb-1">Enable Two-Factor Authentication</h6>

            <small className="text-muted">
              Require an additional verification step during login.
            </small>
          </div>

          <Form.Check
            type="switch"
            checked={data?.enabled || false}
            onChange={(e) => onChange("enabled", e.target.checked)}
          />
        </div>

        {data?.enabled && (
          <>
            {/* Methods */}

            <Row className="g-3 mb-4">
              {twoFactorMethods.map((item) => (
                <Col lg={4} md={6} key={item.value}>
                  <div className="setting-card h-100">
                    <div className="setting-card-content">
                      <div className="setting-icon">{item.icon}</div>

                      <div>
                        <h6>{item.label}</h6>

                        <p>{item.description}</p>
                      </div>
                    </div>

                    <Form.Check
                      className="setting-switch"
                      type="switch"
                      checked={!!methods[item.value]}
                      onChange={(e) =>
                        toggleMethod(item.value, e.target.checked)
                      }
                    />
                  </div>
                </Col>
              ))}
            </Row>

            <p className="text-muted small mb-0">
              OTP expiry and resend limits for 2FA codes are governed by the
              OTP Settings section below, so the same policy applies to every
              OTP sent — login, password reset, and 2FA alike.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default TwoFactorSection;
