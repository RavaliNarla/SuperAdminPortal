// src/pages/organizations/components/PasswordPolicySection.js

import React from "react";
import { Card, Row, Col, Form } from "react-bootstrap";

const PasswordPolicySection = ({ data, onChange }) => {
  return (
    <Card className="shadow-sm mb-4">
      <Card.Header className="bg-danger text-white">
        <h5 className="mb-0">Password Policy</h5>
      </Card.Header>

      <Card.Body>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Minimum Password Length</Form.Label>
              <Form.Control
                type="number"
                min="6"
                max="32"
                value={data.minLength || ""}
                onChange={(e) =>
                  onChange("minLength", e.target.value)
                }
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Maximum Password Length</Form.Label>
              <Form.Control
                type="number"
                min="6"
                max="64"
                value={data.maxLength || ""}
                onChange={(e) =>
                  onChange("maxLength", e.target.value)
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Check
              type="switch"
              id="uppercase"
              label="Require Uppercase Letter"
              checked={data.uppercase || false}
              onChange={(e) =>
                onChange("uppercase", e.target.checked)
              }
            />
          </Col>

          <Col md={4}>
            <Form.Check
              type="switch"
              id="lowercase"
              label="Require Lowercase Letter"
              checked={data.lowercase || false}
              onChange={(e) =>
                onChange("lowercase", e.target.checked)
              }
            />
          </Col>

          <Col md={4}>
            <Form.Check
              type="switch"
              id="number"
              label="Require Numeric Character"
              checked={data.number || false}
              onChange={(e) =>
                onChange("number", e.target.checked)
              }
            />
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={4}>
            <Form.Check
              type="switch"
              id="specialCharacter"
              label="Require Special Character"
              checked={data.specialCharacter || false}
              onChange={(e) =>
                onChange("specialCharacter", e.target.checked)
              }
            />
          </Col>

          <Col md={4}>
            <Form.Check
              type="switch"
              id="passwordExpiry"
              label="Enable Password Expiry"
              checked={data.enableExpiry || false}
              onChange={(e) =>
                onChange("enableExpiry", e.target.checked)
              }
            />
          </Col>

          <Col md={4}>
            <Form.Check
              type="switch"
              id="history"
              label="Enable Password History"
              checked={data.enableHistory || false}
              onChange={(e) =>
                onChange("enableHistory", e.target.checked)
              }
            />
          </Col>
        </Row>

        <hr />

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Password Expiry (Days)</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={data.expiryDays || ""}
                onChange={(e) =>
                  onChange("expiryDays", e.target.value)
                }
                disabled={!data.enableExpiry}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Password History Count</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={data.historyCount || ""}
                onChange={(e) =>
                  onChange("historyCount", e.target.value)
                }
                disabled={!data.enableHistory}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Account Lock Attempts</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={data.lockAttempts || ""}
                onChange={(e) =>
                  onChange("lockAttempts", e.target.value)
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Account Unlock Time (Minutes)</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={data.unlockDuration || ""}
                onChange={(e) =>
                  onChange("unlockDuration", e.target.value)
                }
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Check
              className="mt-4"
              type="switch"
              id="forceChange"
              label="Force Password Change on First Login"
              checked={data.forceChangeOnFirstLogin || false}
              onChange={(e) =>
                onChange(
                  "forceChangeOnFirstLogin",
                  e.target.checked
                )
              }
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PasswordPolicySection;