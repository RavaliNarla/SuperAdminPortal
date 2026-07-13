import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import {
  FiShield,
  FiSmartphone,
  FiClock,
  FiRepeat,
  FiMonitor
} from "react-icons/fi";

import "../../../css/Section.css";

const TwoFactorSection = ({ data, onChange }) => {
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

            <h6 className="mb-1">
              Enable Two-Factor Authentication
            </h6>

            <small className="text-muted">
              Require an additional verification step during login.
            </small>

          </div>

          <Form.Check
            type="switch"
            checked={data.enabled}
            onChange={(e) =>
              onChange("enabled", e.target.checked)
            }
          />

        </div>

        {data.enabled && (

          <Row className="g-4">

            {/* Method */}

            <Col lg={6}>

              <label className="form-label">
                <FiSmartphone className="me-2" />
                Authentication Method
              </label>

              <Form.Select
                className="modern-input"
                value={data.type}
                onChange={(e) =>
                  onChange("type", e.target.value)
                }
              >
                <option value="">
                  Select Method
                </option>

                <option value="OTP_SMS">
                  OTP via SMS
                </option>

                <option value="OTP_EMAIL">
                  OTP via Email
                </option>

                <option value="SMS_EMAIL">
                  SMS + Email OTP
                </option>

                <option value="AUTHENTICATOR">
                  Authenticator App
                </option>

              </Form.Select>

            </Col>

            {/* Expiry */}

            <Col lg={6}>

              <label className="form-label">
                <FiClock className="me-2" />
                OTP Expiry (Minutes)
              </label>

              <Form.Control
                type="number"
                className="modern-input"
                min="1"
                max="30"
                value={data.expiry || 5}
                onChange={(e) =>
                  onChange("expiry", e.target.value)
                }
              />

            </Col>

            {/* Resend */}

            <Col lg={6}>

              <label className="form-label">
                <FiRepeat className="me-2" />
                Maximum Resend Count
              </label>

              <Form.Control
                type="number"
                className="modern-input"
                min="1"
                max="10"
                value={data.resendCount || 3}
                onChange={(e) =>
                  onChange(
                    "resendCount",
                    e.target.value
                  )
                }
              />

            </Col>

            {/* Cooldown */}

            <Col lg={6}>

              <label className="form-label">
                <FiClock className="me-2" />
                Resend Cooldown (Seconds)
              </label>

              <Form.Control
                type="number"
                className="modern-input"
                min="0"
                value={data.cooldown || 30}
                onChange={(e) =>
                  onChange("cooldown", e.target.value)
                }
              />

            </Col>

            {/* Remember */}

            <Col lg={12}>

              <div className="remember-device-card">

                <div>

                  <h6>
                    <FiMonitor className="me-2" />
                    Remember Trusted Device
                  </h6>

                  <small>
                    Skip OTP verification for previously trusted devices.
                  </small>

                </div>

                <Form.Check
                  type="switch"
                  checked={
                    data.rememberDevice || false
                  }
                  onChange={(e) =>
                    onChange(
                      "rememberDevice",
                      e.target.checked
                    )
                  }
                />

              </div>

            </Col>

          </Row>

        )}

      </div>

    </div>
  );
};

export default TwoFactorSection;