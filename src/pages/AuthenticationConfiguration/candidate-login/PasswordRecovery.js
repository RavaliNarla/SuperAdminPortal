// src/pages/organizations/components/candidate-login/PasswordRecovery.js

import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import {
  FiMail,
  FiSmartphone,
  FiHelpCircle,
  FiRefreshCw,
  FiClock,
  FiKey,
} from "react-icons/fi";

const PasswordRecovery = ({ data, onChange }) => {
  return (
    <>

      {/* ==========================================================
          Password Recovery
      ========================================================== */}

      <h5 className="candidate-section-title mt-5">
        Password Recovery
      </h5>

      <Row className="g-3">

        {/* Email OTP */}

        <Col lg={6}>

          <div className="candidate-option-card">

            <div className="candidate-option-left">

              <div className="candidate-option-icon">
                <FiMail />
              </div>

              <div>

                <h6>Email OTP Recovery</h6>

                <small>
                  Recover password using registered email OTP.
                </small>

              </div>

            </div>

            <Form.Check
              type="switch"
              checked={data.recoveryEmailOtp || false}
              onChange={(e) =>
                onChange(
                  "recoveryEmailOtp",
                  e.target.checked
                )
              }
            />

          </div>

        </Col>

        {/* Mobile OTP */}

        <Col lg={6}>

          <div className="candidate-option-card">

            <div className="candidate-option-left">

              <div className="candidate-option-icon">
                <FiSmartphone />
              </div>

              <div>

                <h6>Mobile OTP Recovery</h6>

                <small>
                  Recover password using registered mobile OTP.
                </small>

              </div>

            </div>

            <Form.Check
              type="switch"
              checked={data.recoveryMobileOtp || false}
              onChange={(e) =>
                onChange(
                  "recoveryMobileOtp",
                  e.target.checked
                )
              }
            />

          </div>

        </Col>

        {/* Security Questions */}

        <Col lg={6}>

          <div className="candidate-option-card">

            <div className="candidate-option-left">

              <div className="candidate-option-icon">
                <FiHelpCircle />
              </div>

              <div>

                <h6>Security Questions</h6>

                <small>
                  Allow recovery using security questions.
                </small>

              </div>

            </div>

            <Form.Check
              type="switch"
              checked={data.securityQuestions || false}
              onChange={(e) =>
                onChange(
                  "securityQuestions",
                  e.target.checked
                )
              }
            />

          </div>

        </Col>

        {/* Recovery Link */}

        <Col lg={6}>

          <div className="candidate-option-card">

            <div className="candidate-option-left">

              <div className="candidate-option-icon">
                <FiRefreshCw />
              </div>

              <div>

                <h6>Password Reset Link</h6>

                <small>
                  Send password reset link to registered email.
                </small>

              </div>

            </div>

            <Form.Check
              type="switch"
              checked={data.resetLink || false}
              onChange={(e) =>
                onChange(
                  "resetLink",
                  e.target.checked
                )
              }
            />

          </div>

        </Col>

      </Row>

      {/* ==========================================================
          Recovery Policy
      ========================================================== */}

      <h5 className="candidate-section-title mt-5">
        Recovery Policy
      </h5>

      <Row className="g-3">

        {/* OTP Expiry */}

        <Col lg={4}>

          <Form.Group>

            <Form.Label>

              OTP Expiry (Minutes)

            </Form.Label>

            <Form.Control
              type="number"
              min="1"
              value={data.recoveryOtpExpiry || 5}
              onChange={(e) =>
                onChange(
                  "recoveryOtpExpiry",
                  e.target.value
                )
              }
            />

          </Form.Group>

        </Col>

        {/* Max Attempts */}

        <Col lg={4}>

          <Form.Group>

            <Form.Label>

              Maximum Attempts

            </Form.Label>

            <Form.Control
              type="number"
              min="1"
              value={data.recoveryAttempts || 3}
              onChange={(e) =>
                onChange(
                  "recoveryAttempts",
                  e.target.value
                )
              }
            />

          </Form.Group>

        </Col>

        {/* Cooldown */}

        <Col lg={4}>

          <Form.Group>

            <Form.Label>

              Retry After (Minutes)

            </Form.Label>

            <Form.Control
              type="number"
              min="1"
              value={data.recoveryCooldown || 15}
              onChange={(e) =>
                onChange(
                  "recoveryCooldown",
                  e.target.value
                )
              }
            />

          </Form.Group>

        </Col>

      </Row>

      <Row className="g-3 mt-3">

        {/* Auto Lock */}

        <Col lg={6}>

          <div className="candidate-option-card">

            <div className="candidate-option-left">

              <div className="candidate-option-icon">
                <FiClock />
              </div>

              <div>

                <h6>Lock Recovery After Failed Attempts</h6>

                <small>
                  Temporarily block recovery after multiple failures.
                </small>

              </div>

            </div>

            <Form.Check
              type="switch"
              checked={data.lockRecovery || false}
              onChange={(e) =>
                onChange(
                  "lockRecovery",
                  e.target.checked
                )
              }
            />

          </div>

        </Col>

        {/* Force Password Change */}

        <Col lg={6}>

          <div className="candidate-option-card">

            <div className="candidate-option-left">

              <div className="candidate-option-icon">
                <FiKey />
              </div>

              <div>

                <h6>Force Password Change</h6>

                <small>
                  Require a new password immediately after recovery.
                </small>

              </div>

            </div>

            <Form.Check
              type="switch"
              checked={data.forcePasswordAfterRecovery || false}
              onChange={(e) =>
                onChange(
                  "forcePasswordAfterRecovery",
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

export default PasswordRecovery;