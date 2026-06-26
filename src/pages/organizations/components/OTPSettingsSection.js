// src/pages/organizations/components/OTPSettingsSection.js

import React from "react";
import { Card, Row, Col, Form } from "react-bootstrap";

const OTPSettingsSection = ({ data, onChange }) => {
  return (
    <Card className="shadow-sm mb-4">
      <Card.Header className="bg-info text-white">
        <h5 className="mb-0">OTP Settings</h5>
      </Card.Header>

      <Card.Body>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>OTP Delivery Method</Form.Label>
              <Form.Select
                value={data.method || ""}
                onChange={(e) => onChange("method", e.target.value)}
              >
                <option value="">Select Method</option>
                <option value="SMS">SMS</option>
                <option value="EMAIL">Email</option>
                <option value="BOTH">SMS + Email</option>
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
                value={data.expiry || ""}
                onChange={(e) => onChange("expiry", e.target.value)}
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
                value={data.resendCount || ""}
                onChange={(e) => onChange("resendCount", e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Resend Cooldown (Seconds)</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={data.cooldown || ""}
                onChange={(e) => onChange("cooldown", e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Check
              type="switch"
              id="enableOtpOnLogin"
              label="Require OTP During Login"
              checked={data.loginOtp || false}
              onChange={(e) => onChange("loginOtp", e.target.checked)}
            />
          </Col>

          <Col md={6}>
            <Form.Check
              type="switch"
              id="enableOtpOnPasswordReset"
              label="Require OTP for Password Reset"
              checked={data.passwordResetOtp || false}
              onChange={(e) =>
                onChange("passwordResetOtp", e.target.checked)
              }
            />
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={6}>
            <Form.Check
              type="switch"
              id="maskMobile"
              label="Mask Mobile Number"
              checked={data.maskMobile || false}
              onChange={(e) => onChange("maskMobile", e.target.checked)}
            />
          </Col>

          <Col md={6}>
            <Form.Check
              type="switch"
              id="maskEmail"
              label="Mask Email Address"
              checked={data.maskEmail || false}
              onChange={(e) => onChange("maskEmail", e.target.checked)}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default OTPSettingsSection;