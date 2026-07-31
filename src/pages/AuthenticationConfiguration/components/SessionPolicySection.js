// src/pages/organizations/components/SessionPolicySection.js

import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { FiClock, FiMonitor, FiUsers } from "react-icons/fi";

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
              max="1440"
              placeholder="e.g. 30"
              value={data.idleTimeout || ""}
              isInvalid={
                data.idleTimeout !== "" &&
                (Number(data.idleTimeout) < 1 ||
                  Number(data.idleTimeout) > 1440)
              }
              onChange={(e) => onChange("idleTimeout", e.target.value)}
            />

            <Form.Control.Feedback type="invalid">
              Idle timeout must be between 1 and 1440 minutes.
            </Form.Control.Feedback>
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
              max="10"
              placeholder="e.g. 2"
              value={data.concurrentSessions || ""}
              isInvalid={
                data.concurrentSessions !== "" &&
                (Number(data.concurrentSessions) < 1 ||
                  Number(data.concurrentSessions) > 10)
              }
              onChange={(e) => onChange("concurrentSessions", e.target.value)}
            />

            <Form.Control.Feedback type="invalid">
              Concurrent sessions must be between 1 and 10.
            </Form.Control.Feedback>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SessionPolicySection;
