import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import {
  FiLogIn,
  FiUser,
  FiMail,
  FiShield,
  FiUsers,
} from "react-icons/fi";

import "../../css/Section.css";

// Candidate Portal Authentication — Email + Password only for now
// (narrower than the roadmap's Email+Password/Mobile OTP/Email OTP trio,
// by deliberate product decision). It's the sole method, so it's shown as a
// fixed label rather than a toggle — there's no meaningful "off" state when
// disabling it would mean no one could log in at all.
const CandidateLoginSection = ({ data, onChange }) => {
  return (
    <div className="candidate-login-card mb-4">
      <div className="card-body">
        {/* Header */}

        <div className="candidate-header">
          <div>
            <h4>
              <FiLogIn className="me-2" />
              Candidate Portal Authentication
            </h4>

            <p>
              Configure candidate login methods, registration, verification and
              password recovery options.
            </p>
          </div>
        </div>

        {/* Login Methods */}

        <h6 className="section-sub-heading mb-3">
          <FiUsers className="me-2" />
          Login Methods
        </h6>

        <Row className="g-3">
          <Col lg={4} md={6}>
            <div className="setting-card h-100">
              <div className="setting-card-content">
                <div className="setting-icon">
                  <FiMail />
                </div>

                <div>
                  <h6>Email + Password</h6>

                  <p>Login using Email Address and Password</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Security Settings */}

        <h6 className="section-sub-heading mt-5 mb-3">
          <FiShield className="me-2" />
          Security Settings
        </h6>

        <Row className="g-3">
          <Col lg={6}>
            <div className="setting-card">
              <div className="setting-card-content">
                <div className="setting-icon">
                  <FiShield />
                </div>

                <div>
                  <h6>Enable CAPTCHA</h6>

                  <p>
                    Protect the candidate login page from automated bot attacks.
                  </p>
                </div>
              </div>

              <Form.Check
                className="setting-switch"
                type="switch"
                checked={data.enableCaptcha || false}
                onChange={(e) => onChange("enableCaptcha", e.target.checked)}
              />
            </div>
          </Col>

          <Col lg={6}>
            <div className="setting-card">
              <div className="setting-card-content">
                <div className="setting-icon">
                  <FiUser />
                </div>

                <div>
                  <h6>Allow Candidate Registration</h6>

                  <p>
                    Allow new candidates to register themselves through the
                    portal.
                  </p>
                </div>
              </div>

              <Form.Check
                className="setting-switch"
                type="switch"
                checked={data.allowRegistration || false}
                onChange={(e) =>
                  onChange("allowRegistration", e.target.checked)
                }
              />
            </div>
          </Col>

          <Col lg={6}>
            <div className="setting-card">
              <div className="setting-card-content">
                <div className="setting-icon">
                  <FiShield />
                </div>

                <div>
                  <h6>Verify Email During Registration</h6>

                  <p>
                    Send an email verification link before activating candidate
                    accounts.
                  </p>
                </div>
              </div>

              <Form.Check
                className="setting-switch"
                type="switch"
                checked={data.verifyEmail || false}
                onChange={(e) => onChange("verifyEmail", e.target.checked)}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CandidateLoginSection;
