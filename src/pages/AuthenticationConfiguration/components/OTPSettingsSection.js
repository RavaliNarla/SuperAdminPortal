import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import {
  FiMessageSquare,
  FiClock,
  FiRepeat,
  FiLogIn,
  FiRefreshCw,
  FiSmartphone,
  FiMail
} from "react-icons/fi";
import "../../../css/Section.css";


const OTPSettingsSection = ({ data, onChange }) => {
  return (
    <div className="organization-card mb-4">

      <div className="card-body">

        <div className="section-header mb-4">
          <div>
            <h5 className="section-title">
              <FiMessageSquare className="me-2" />
              OTP Settings
            </h5>

            <p className="section-subtitle">
              Configure one-time password delivery and security options.
            </p>
          </div>
        </div>

        <Row className="g-4">

          {/* Delivery Method */}

          <Col lg={6}>
            <label className="form-label">
              <FiMessageSquare className="me-2" />
              OTP Delivery Method
            </label>

            <Form.Select
              className="modern-input"
              value={data.method || ""}
              onChange={(e) =>
                onChange("method", e.target.value)
              }
            >
              <option value="">
                Select Method
              </option>

              <option value="SMS">
                SMS
              </option>

              <option value="EMAIL">
                Email
              </option>

              <option value="BOTH">
                SMS + Email
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
              value={data.expiry || ""}
              onChange={(e) =>
                onChange("expiry", e.target.value)
              }
            />
          </Col>

          {/* Resend Count */}

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
              value={data.resendCount || ""}
              onChange={(e) =>
                onChange("resendCount", e.target.value)
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
              value={data.cooldown || ""}
              onChange={(e) =>
                onChange("cooldown", e.target.value)
              }
            />
          </Col>

        </Row>

        {/* Switch Cards */}

        <div className="row g-3 mt-2">

          <div className="col-lg-6">

            <div className="setting-switch-card">

              <div>

                <h6>
                  <FiLogIn className="me-2" />
                  Login OTP
                </h6>

                <small>
                  Require OTP verification during user login.
                </small>

              </div>

              <Form.Check
                type="switch"
                checked={data.loginOtp || false}
                onChange={(e) =>
                  onChange(
                    "loginOtp",
                    e.target.checked
                  )
                }
              />

            </div>

          </div>

          <div className="col-lg-6">

            <div className="setting-switch-card">

              <div>

                <h6>
                  <FiRefreshCw className="me-2" />
                  Password Reset OTP
                </h6>

                <small>
                  Verify users before resetting passwords.
                </small>

              </div>

              <Form.Check
                type="switch"
                checked={
                  data.passwordResetOtp || false
                }
                onChange={(e) =>
                  onChange(
                    "passwordResetOtp",
                    e.target.checked
                  )
                }
              />

            </div>

          </div>

          <div className="col-lg-6">

            <div className="setting-switch-card">

              <div>

                <h6>
                  <FiSmartphone className="me-2" />
                  Mask Mobile Number
                </h6>

                <small>
                  Hide part of the mobile number while sending OTP.
                </small>

              </div>

              <Form.Check
                type="switch"
                checked={data.maskMobile || false}
                onChange={(e) =>
                  onChange(
                    "maskMobile",
                    e.target.checked
                  )
                }
              />

            </div>

          </div>

          <div className="col-lg-6">

            <div className="setting-switch-card">

              <div>

                <h6>
                  <FiMail className="me-2" />
                  Mask Email Address
                </h6>

                <small>
                  Hide part of the email address while sending OTP.
                </small>

              </div>

              <Form.Check
                type="switch"
                checked={data.maskEmail || false}
                onChange={(e) =>
                  onChange(
                    "maskEmail",
                    e.target.checked
                  )
                }
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default OTPSettingsSection;