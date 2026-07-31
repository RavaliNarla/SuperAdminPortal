// src/pages/organizations/components/PasswordPolicySection.js

import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import {
  FiLock,
  FiKey,
  FiShield,
  FiHash,
  FiClock,
  FiRefreshCw,
  // FiAlertTriangle, // only used by the commented-out Account Lock Attempts field below
} from "react-icons/fi";

import "../../../css/Section.css";

const PasswordPolicySection = ({ data, onChange }) => {
  return (
    <div className="password-policy-card mb-4">
      <div className="card-body">
        {/* Header */}

        <div className="password-policy-header">
          <div>
            <h5 className="password-policy-title">
              <FiLock className="me-2" />
              Password Policy
            </h5>

            <p className="password-policy-subtitle">
              Configure password complexity, expiry, history and account
              security settings.
            </p>
          </div>
        </div>

        {/* Password Length */}

        <Row className="g-4">
          <Col lg={6}>
            <label className="form-label">
              <FiKey className="me-2" />
              Minimum Password Length
            </label>

            <Form.Control
              className="password-policy-input"
              type="number"
              min="6"
              max="32"
              placeholder="e.g. 8"
              value={data.minLength || ""}
              isInvalid={
                data.minLength !== "" &&
                (Number(data.minLength) < 6 || Number(data.minLength) > 32)
              }
              onChange={(e) => onChange("minLength", e.target.value)}
            />

            <Form.Control.Feedback type="invalid">
              Minimum length must be between 6 and 32.
            </Form.Control.Feedback>
          </Col>

          <Col lg={6}>
            <label className="form-label">
              <FiKey className="me-2" />
              Maximum Password Length
            </label>

            <Form.Control
              className="password-policy-input"
              type="number"
              min="6"
              max="64"
              placeholder="e.g. 16"
              value={data.maxLength || ""}
              isInvalid={
                data.maxLength !== "" &&
                (Number(data.maxLength) < 6 ||
                  Number(data.maxLength) > 64 ||
                  Number(data.maxLength) < Number(data.minLength))
              }
              onChange={(e) => onChange("maxLength", e.target.value)}
            />

            <Form.Control.Feedback type="invalid">
              Maximum length must be between 6 and 64 and greater than minimum
              length.
            </Form.Control.Feedback>
          </Col>
        </Row>

        {/* Password Complexity */}

        <div className="row g-3 mt-3">
          <div className="col-lg-6">
            <div className="password-switch-card">
              <div>
                <h6>
                  <FiShield className="me-2" />
                  Require Uppercase Letter
                </h6>

                <small>
                  Password must contain at least one uppercase letter.
                </small>
              </div>

              <Form.Check
                type="switch"
                checked={data.uppercase || false}
                onChange={(e) => onChange("uppercase", e.target.checked)}
              />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="password-switch-card">
              <div>
                <h6>
                  <FiShield className="me-2" />
                  Require Lowercase Letter
                </h6>

                <small>
                  Password must contain at least one lowercase letter.
                </small>
              </div>

              <Form.Check
                type="switch"
                checked={data.lowercase || false}
                onChange={(e) => onChange("lowercase", e.target.checked)}
              />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="password-switch-card">
              <div>
                <h6>
                  <FiHash className="me-2" />
                  Require Numeric Character
                </h6>

                <small>
                  Password must contain at least one numeric character.
                </small>
              </div>

              <Form.Check
                type="switch"
                checked={data.number || false}
                onChange={(e) => onChange("number", e.target.checked)}
              />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="password-switch-card">
              <div>
                <h6>
                  <FiShield className="me-2" />
                  Require Special Character
                </h6>

                <small>
                  Password must contain at least one special character.
                </small>
              </div>

              <Form.Check
                type="switch"
                checked={data.specialCharacter || false}
                onChange={(e) => onChange("specialCharacter", e.target.checked)}
              />
            </div>
          </div>
        </div>

        {/* Security */}

        <div className="row g-3 mt-3">
          <div className="col-lg-6">
            <div className="password-switch-card">
              <div>
                <h6>
                  <FiClock className="me-2" />
                  Enable Password Expiry
                </h6>

                <small>
                  Users must update passwords after a specified period.
                </small>
              </div>

              <Form.Check
                type="switch"
                checked={data.enableExpiry || false}
                onChange={(e) => onChange("enableExpiry", e.target.checked)}
              />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="password-switch-card">
              <div>
                <h6>
                  <FiRefreshCw className="me-2" />
                  Enable Password History
                </h6>

                <small>Prevent users from reusing previous passwords.</small>
              </div>

              <Form.Check
                type="switch"
                checked={data.enableHistory || false}
                onChange={(e) => onChange("enableHistory", e.target.checked)}
              />
            </div>
          </div>
        </div>

        {/* Advanced Settings */}

        <Row className="g-4 mt-3">
          <Col lg={4}>
            <label className="form-label">
              <FiClock className="me-2" />
              Password Expiry (Days)
            </label>

            <Form.Control
              className="password-policy-input"
              type="number"
              min="1"
              max="365"
              placeholder="e.g. 90"
              disabled={!data.enableExpiry}
              value={data.expiryDays || ""}
              isInvalid={
                data.enableExpiry &&
                data.expiryDays !== "" &&
                (Number(data.expiryDays) < 1 || Number(data.expiryDays) > 365)
              }
              onChange={(e) => onChange("expiryDays", e.target.value)}
            />

            <Form.Control.Feedback type="invalid">
              Expiry days must be between 1 and 365.
            </Form.Control.Feedback>
          </Col>

          {/* Password History Count, Account Lock Attempts, and Account
              Unlock Time — commented out for now. */}
          {/* <Col lg={4}>
            <label className="form-label">
              <FiRefreshCw className="me-2" />
              Password History Count
            </label>

            <Form.Control
              className="password-policy-input"
              type="number"
              min="1"
              disabled={!data.enableHistory}
              value={data.historyCount || ""}
              onChange={(e) =>
                onChange("historyCount", e.target.value)
              }
            />
          </Col>

          <Col lg={4}>
            <label className="form-label">
              <FiAlertTriangle className="me-2" />
              Account Lock Attempts
            </label>

            <Form.Control
              className="password-policy-input"
              type="number"
              min="1"
              value={data.lockAttempts || ""}
              onChange={(e) =>
                onChange("lockAttempts", e.target.value)
              }
            />
          </Col>

          <Col lg={6}>
            <label className="form-label">
              <FiClock className="me-2" />
              Account Unlock Time (Minutes)
            </label>

            <Form.Control
              className="password-policy-input"
              type="number"
              min="1"
              value={data.unlockDuration || ""}
              onChange={(e) =>
                onChange("unlockDuration", e.target.value)
              }
            />
          </Col> */}
        </Row>
      </div>
    </div>
  );
};

export default PasswordPolicySection;
