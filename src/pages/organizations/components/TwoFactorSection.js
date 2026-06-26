// src/pages/organizations/components/TwoFactorSection.js

import React from "react";
import { Card, Row, Col, Form } from "react-bootstrap";

const TwoFactorSection = ({ data, onChange }) => {
  return (
    <Card className="shadow-sm mb-4">
      <Card.Header className="bg-warning">
        <h5 className="mb-0">Two-Factor Authentication (2FA)</h5>
      </Card.Header>

      <Card.Body>
        <Row className="mb-4">
          <Col md={6}>
            <Form.Check
              type="switch"
              id="enable-2fa"
              label="Enable Two-Factor Authentication"
              checked={data.enabled}
              onChange={(e) =>
                onChange("enabled", e.target.checked)
              }
            />
          </Col>
        </Row>

        {data.enabled && (
          <>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Authentication Method</Form.Label>

                  <Form.Select
                    value={data.type}
                    onChange={(e) =>
                      onChange("type", e.target.value)
                    }
                  >
                    <option value="">Select Method</option>
                    <option value="OTP_SMS">OTP via SMS</option>
                    <option value="OTP_EMAIL">OTP via Email</option>
                    <option value="SMS_EMAIL">
                      SMS + Email OTP
                    </option>
                    <option value="AUTHENTICATOR">
                      Authenticator App
                    </option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>OTP Expiry (Minutes)</Form.Label>

                  <Form.Control
                    type="number"
                    min="1"
                    max="30"
                    value={data.expiry || 5}
                    onChange={(e) =>
                      onChange("expiry", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Maximum Resend Count</Form.Label>

                  <Form.Control
                    type="number"
                    min="1"
                    max="10"
                    value={data.resendCount || 3}
                    onChange={(e) =>
                      onChange("resendCount", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Resend Cooldown (Seconds)</Form.Label>

                  <Form.Control
                    type="number"
                    min="0"
                    value={data.cooldown || 30}
                    onChange={(e) =>
                      onChange("cooldown", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Check
              className="mt-2"
              type="switch"
              id="remember-device"
              label="Remember Trusted Device"
              checked={data.rememberDevice || false}
              onChange={(e) =>
                onChange("rememberDevice", e.target.checked)
              }
            />
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default TwoFactorSection;