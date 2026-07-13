// src/pages/organizations/components/SessionPolicySection.js

import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import {
  FiClock,
  FiMonitor,
  FiUsers,
  FiLogOut,
  FiCheckCircle,
} from "react-icons/fi";

import "../../../css/Section.css";


const SessionPolicySection = ({ data, onChange }) => {
  return (
    <div className="session-policy-card mb-4">
      <div className="card-body">
        {/* Header */}

        <div className="session-policy-header">
          <div>
            <h5 className="session-policy-title">
              <FiMonitor className="me-2" />
              Session Policy
            </h5>

            <p className="session-policy-subtitle">
              Configure user session timeout, concurrent sessions and login
              persistence.
            </p>
          </div>
        </div>

        {/* Session Settings */}

        <Row className="g-4">

          <Col lg={4}>
            <label className="form-label">
              <FiClock className="me-2" />
              Idle Timeout (Minutes)
            </label>

            <Form.Control
              className="modern-input"
              type="number"
              min="1"
              value={data.idleTimeout || ""}
              onChange={(e) =>
                onChange("idleTimeout", e.target.value)
              }
            />
          </Col>

          <Col lg={4}>
            <label className="form-label">
              <FiClock className="me-2" />
              Absolute Timeout (Minutes)
            </label>

            <Form.Control
              className="modern-input"
              type="number"
              min="1"
              value={data.absoluteTimeout || ""}
              onChange={(e) =>
                onChange("absoluteTimeout", e.target.value)
              }
            />
          </Col>

          <Col lg={4}>
            <label className="form-label">
              <FiUsers className="me-2" />
              Concurrent Sessions
            </label>

            <Form.Control
              className="modern-input"
              type="number"
              min="1"
              value={data.concurrentSessions || ""}
              onChange={(e) =>
                onChange("concurrentSessions", e.target.value)
              }
            />
          </Col>

        </Row>

        {/* Switch Cards */}

        <div className="row g-3 mt-3">

          <div className="col-lg-6">
            <div className="setting-switch-card">

              <div>
                <h6>
                  <FiCheckCircle className="me-2" />
                  Remember Me
                </h6>

                <small>
                  Allow users to stay signed in across browser sessions.
                </small>
              </div>

              <Form.Check
                type="switch"
                checked={data.rememberMe || false}
                onChange={(e) =>
                  onChange("rememberMe", e.target.checked)
                }
              />

            </div>
          </div>

          <div className="col-lg-6">
            <div className="setting-switch-card">

              <div>
                <h6>
                  <FiLogOut className="me-2" />
                  Logout on Browser Close
                </h6>

                <small>
                  Automatically sign users out when the browser is closed.
                </small>
              </div>

              <Form.Check
                type="switch"
                checked={data.browserCloseLogout || false}
                onChange={(e) =>
                  onChange(
                    "browserCloseLogout",
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

export default SessionPolicySection;