import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { FiShield, FiMail, FiSmartphone } from "react-icons/fi";

import "../../../css/TwoFactorSection.css";

const twoFactorMethods = [
  {
    value: "EMAIL_OTP",
    label: "Email OTP",
    icon: <FiMail />,
    description: "Send a one-time code to the user's email.",
  },
  {
    value: "SMS_OTP",
    label: "SMS OTP",
    icon: <FiSmartphone />,
    description: "Send a one-time code to the user's mobile.",
  },
];

const TwoFactorSection = ({ data, onChange }) => {
  const toggleMethod = (value, checked) => {
    onChange(value, checked);
  };

  return (
    <div className="recruitment-login-card mb-4">
      <div className="card-body">
        {/* Header */}
        <div className="recruitment-login-header">
          <div>
            <h5 className="recruitment-login-title">
              <FiShield className="me-2" />
              Two-Factor Authentication
            </h5>

            <p className="recruitment-login-subtitle">
              Configure additional security for organization users.
            </p>
          </div>
        </div>

        {/* Enable 2FA */}
        <div className="recruitment-method-card mb-4">
          <div className="recruitment-method-left">
            <div className="recruitment-method-icon">
              <FiShield />
            </div>

            <div>
              <h6>Enable Two-Factor Authentication</h6>
              <small>
                Require an additional verification step during login.
              </small>
            </div>
          </div>

          <Form.Check
            className="setting-switch"
            type="switch"
            checked={!!data?.enabled}
            onChange={(e) => onChange("enabled", e.target.checked)}
          />
        </div>

        {data?.enabled && (
          <>
            <h6 className="section-sub-heading mb-3">
              <FiShield className="me-2" />
              Authentication Methods
            </h6>

            <Row className="g-3">
              {twoFactorMethods.map((item) => (
                <Col lg={6} md={6} key={item.value}>
                  <div className="recruitment-method-card h-100">
                    <div className="recruitment-method-left">
                      <div className="recruitment-method-icon">{item.icon}</div>

                      <div>
                        <h6>{item.label}</h6>
                        <small>{item.description}</small>
                      </div>
                    </div>

                    <Form.Check
                      className="setting-switch"
                      type="switch"
                      checked={!!data?.[item.value]}
                      onChange={(e) =>
                        toggleMethod(item.value, e.target.checked)
                      }
                    />
                  </div>
                </Col>
              ))}
            </Row>

            <div className="alert alert-light border mt-4 mb-0">
              <small className="text-muted">
                OTP expiry time and resend limits are configured in the{" "}
                <strong>OTP Settings</strong> section below. These settings
                apply to login verification, password reset, and two-factor
                authentication OTPs.
              </small>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TwoFactorSection;
