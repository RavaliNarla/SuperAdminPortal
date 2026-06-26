// src/pages/organizations/components/SessionPolicySection.js

import React from "react";
import { Card, Row, Col, Form } from "react-bootstrap";

const SessionPolicySection = ({ data, onChange }) => {
  return (
    <Card className="shadow-sm mb-4">
      <Card.Header className="bg-secondary text-white">
        <h5 className="mb-0">Session Policy</h5>
      </Card.Header>

      <Card.Body>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Idle Timeout (Minutes)</Form.Label>
              <Form.Control
                type="number"
                value={data.idleTimeout || ""}
                onChange={(e) =>
                  onChange("idleTimeout", e.target.value)
                }
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Absolute Timeout (Minutes)</Form.Label>
              <Form.Control
                type="number"
                value={data.absoluteTimeout || ""}
                onChange={(e) =>
                  onChange("absoluteTimeout", e.target.value)
                }
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Concurrent Sessions</Form.Label>
              <Form.Control
                type="number"
                value={data.concurrentSessions || ""}
                onChange={(e) =>
                  onChange("concurrentSessions", e.target.value)
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Check
              type="switch"
              label="Remember Me"
              checked={data.rememberMe || false}
              onChange={(e) =>
                onChange("rememberMe", e.target.checked)
              }
            />
          </Col>

          <Col md={6}>
            <Form.Check
              type="switch"
              label="Logout on Browser Close"
              checked={data.browserCloseLogout || false}
              onChange={(e) =>
                onChange("browserCloseLogout", e.target.checked)
              }
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SessionPolicySection;