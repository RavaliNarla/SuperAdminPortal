// src/pages/organizations/components/candidate-login/UsernameConfig.js

import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import {
  FiUser,
  FiKey,
  FiShield,
  FiCheckCircle,
  FiHash,
  FiLock,
} from "react-icons/fi";

const UsernameConfig = ({ data, onChange }) => {
  return (
    <>
      {/* ==========================================================
          Username Configuration
      ========================================================== */}

      <div className="candidate-config-card mt-4">
        <div className="candidate-config-header">
          <h5>
            <FiUser className="me-2" />
            Username Login Configuration
          </h5>

          <p>
            Configure username based authentication settings for candidates.
          </p>
        </div>

        <Row className="g-3">
          <Col lg={6}>
            <Form.Group>
              <Form.Label>Username Minimum Length</Form.Label>

              <Form.Control
                type="number"
                value={data.usernameMinLength || 6}
                onChange={(e) => onChange("usernameMinLength", e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col lg={6}>
            <Form.Group>
              <Form.Label>Username Maximum Length</Form.Label>

              <Form.Control
                type="number"
                value={data.usernameMaxLength || 20}
                onChange={(e) => onChange("usernameMaxLength", e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </div>

      {/* ==========================================================
          Username Rules
      ========================================================== */}

      <h5 className="candidate-section-title mt-4">Username Rules</h5>

      <Row className="g-3">
        <Col lg={6}>
          <div className="candidate-option-card">
            <div className="candidate-option-left">
              <div className="candidate-option-icon">
                <FiHash />
              </div>

              <div>
                <h6>Allow Numbers</h6>

                <small>Username can contain numeric values.</small>
              </div>
            </div>

            <Form.Check
              type="switch"
              checked={data.allowNumbers || false}
              onChange={(e) => onChange("allowNumbers", e.target.checked)}
            />
          </div>
        </Col>

        <Col lg={6}>
          <div className="candidate-option-card">
            <div className="candidate-option-left">
              <div className="candidate-option-icon">
                <FiCheckCircle />
              </div>

              <div>
                <h6>Allow Underscore (_)</h6>

                <small>Permit underscore in username.</small>
              </div>
            </div>

            <Form.Check
              type="switch"
              checked={data.allowUnderscore || false}
              onChange={(e) => onChange("allowUnderscore", e.target.checked)}
            />
          </div>
        </Col>

        <Col lg={6}>
          <div className="candidate-option-card">
            <div className="candidate-option-left">
              <div className="candidate-option-icon">
                <FiShield />
              </div>

              <div>
                <h6>Auto Generate Username</h6>

                <small>
                  Automatically generate username during registration.
                </small>
              </div>
            </div>

            <Form.Check
              type="switch"
              checked={data.autoGenerateUsername || false}
              onChange={(e) =>
                onChange("autoGenerateUsername", e.target.checked)
              }
            />
          </div>
        </Col>

        <Col lg={6}>
          <div className="candidate-option-card">
            <div className="candidate-option-left">
              <div className="candidate-option-icon">
                <FiUser />
              </div>

              <div>
                <h6>Username Must Be Unique</h6>

                <small>Prevent duplicate usernames.</small>
              </div>
            </div>

            <Form.Check
              type="switch"
              checked={data.uniqueUsername || false}
              onChange={(e) => onChange("uniqueUsername", e.target.checked)}
            />
          </div>
        </Col>
      </Row>

      {/* ==========================================================
          Authentication
      ========================================================== */}

      <h5 className="candidate-section-title mt-4">Authentication</h5>

      <Row className="g-3">
        <Col lg={6}>
          <div className="candidate-option-card">
            <div className="candidate-option-left">
              <div className="candidate-option-icon">
                <FiKey />
              </div>

              <div>
                <h6>Password Required</h6>

                <small>Candidate must enter password to login.</small>
              </div>
            </div>

            <Form.Check
              type="switch"
              checked={data.passwordRequired || true}
              onChange={(e) => onChange("passwordRequired", e.target.checked)}
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
                <h6>Remember Username</h6>

                <small>Save username on trusted devices.</small>
              </div>
            </div>

            <Form.Check
              type="switch"
              checked={data.rememberUsername || false}
              onChange={(e) => onChange("rememberUsername", e.target.checked)}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default UsernameConfig;
