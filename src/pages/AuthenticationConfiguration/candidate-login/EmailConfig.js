// src/pages/organizations/components/candidate-login/EmailConfig.js

import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import {
  FiMail,
  FiShield,
  FiKey,
  FiCheckCircle,
  FiAlertCircle,
  FiLock,
} from "react-icons/fi";

const EmailConfig = ({ data, onChange }) => {
  return (
    <>

      {/* ==========================================================
          Email Login Configuration
      ========================================================== */}

      <div className="candidate-config-card mt-4">

        <div className="candidate-config-header">

          <h5>
            <FiMail className="me-2" />
            Email Login Configuration
          </h5>

          <p>
            Configure email based authentication and verification
            settings for candidates.
          </p>

        </div>

        <Row className="g-3">

          <Col lg={6}>

            <Form.Group>

              <Form.Label>Email Validation Mode</Form.Label>

              <Form.Select
                value={data.emailValidation || "OTP"}
                onChange={(e) =>
                  onChange(
                    "emailValidation",
                    e.target.value
                  )
                }
              >
                <option value="OTP">
                  Email OTP Verification
                </option>

                <option value="LINK">
                  Verification Link
                </option>

                <option value="NONE">
                  No Verification
                </option>

              </Form.Select>

            </Form.Group>

          </Col>

          <Col lg={6}>

            <Form.Group>

              <Form.Label>

                Allowed Email Domain

              </Form.Label>

              <Form.Control
                placeholder="example.com"
                value={data.allowedDomain || ""}
                onChange={(e) =>
                  onChange(
                    "allowedDomain",
                    e.target.value
                  )
                }
              />

            </Form.Group>

          </Col>

        </Row>

      </div>

      {/* ==========================================================
          Email Verification
      ========================================================== */}

      <h5 className="candidate-section-title mt-4">

        Email Verification

      </h5>

      <Row className="g-3">

        <Col lg={6}>

          <div className="candidate-option-card">

            <div className="candidate-option-left">

              <div className="candidate-option-icon">
                <FiCheckCircle />
              </div>

              <div>

                <h6>Email OTP Verification</h6>

                <small>

                  Verify candidate email using OTP.

                </small>

              </div>

            </div>

            <Form.Check
              type="switch"
              checked={data.emailOtp || false}
              onChange={(e) =>
                onChange(
                  "emailOtp",
                  e.target.checked
                )
              }
            />

          </div>

        </Col>

        <Col lg={6}>

          <div className="candidate-option-card">

            <div className="candidate-option-left">

              <div className="candidate-option-icon">
                <FiMail />
              </div>

              <div>

                <h6>Email Verification Link</h6>

                <small>

                  Send verification link during registration.

                </small>

              </div>

            </div>

            <Form.Check
              type="switch"
              checked={data.emailLink || false}
              onChange={(e) =>
                onChange(
                  "emailLink",
                  e.target.checked
                )
              }
            />

          </div>

        </Col>

      </Row>

      {/* ==========================================================
          Email Security
      ========================================================== */}

      <h5 className="candidate-section-title mt-4">

        Email Security

      </h5>

      <Row className="g-3">

        <Col lg={6}>

          <div className="candidate-option-card">

            <div className="candidate-option-left">

              <div className="candidate-option-icon">
                <FiShield />
              </div>

              <div>

                <h6>Block Disposable Emails</h6>

                <small>

                  Prevent temporary email services.

                </small>

              </div>

            </div>

            <Form.Check
              type="switch"
              checked={data.blockDisposable || false}
              onChange={(e) =>
                onChange(
                  "blockDisposable",
                  e.target.checked
                )
              }
            />

          </div>

        </Col>

        <Col lg={6}>

          <div className="candidate-option-card">

            <div className="candidate-option-left">

              <div className="candidate-option-icon">
                <FiAlertCircle />
              </div>

              <div>

                <h6>Allow Duplicate Email</h6>

                <small>

                  Multiple candidates can use same email.

                </small>

              </div>

            </div>

            <Form.Check
              type="switch"
              checked={data.allowDuplicateEmail || false}
              onChange={(e) =>
                onChange(
                  "allowDuplicateEmail",
                  e.target.checked
                )
              }
            />

          </div>

        </Col>

      </Row>

      {/* ==========================================================
          Authentication
      ========================================================== */}

      <h5 className="candidate-section-title mt-4">

        Authentication

      </h5>

      <Row className="g-3">

        <Col lg={6}>

          <div className="candidate-option-card">

            <div className="candidate-option-left">

              <div className="candidate-option-icon">
                <FiKey />
              </div>

              <div>

                <h6>Password Required</h6>

                <small>

                  Email login requires password.

                </small>

              </div>

            </div>

            <Form.Check
              type="switch"
              checked={data.passwordRequired ?? true}
              onChange={(e) =>
                onChange(
                  "passwordRequired",
                  e.target.checked
                )
              }
            />

          </div>

        </Col>

        <Col lg={6}>

          <div className="candidate-option-card">

            <div className="candidate-option-left">

              <div className="candidate-option-icon">
                <FiLock />
              </div>

              <div>

                <h6>Remember Email</h6>

                <small>

                  Remember email on trusted devices.

                </small>

              </div>

            </div>

            <Form.Check
              type="switch"
              checked={data.rememberEmail || false}
              onChange={(e) =>
                onChange(
                  "rememberEmail",
                  e.target.checked
                )
              }
            />

          </div>

        </Col>

      </Row>

    </>
  );
};

export default EmailConfig;