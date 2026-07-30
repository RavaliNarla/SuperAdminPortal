import React from "react";
import { Card, Form, Row, Col } from "react-bootstrap";
import { FiShield } from "react-icons/fi";

const TwoFactorSection = ({
  title = "Two-Factor Authentication",
  data,
  onChange,
}) => {
  return (
    <Card className="border-0 shadow-sm mt-4">
      <Card.Header className="bg-white border-0">
        <div className="d-flex align-items-center">
          <div className="header-icon me-3">
            <FiShield />
          </div>

          <div>
            <h5 className="fw-bold mb-1">{title}</h5>

            <small className="text-muted">
              Configure additional security for user login.
            </small>
          </div>
        </div>
      </Card.Header>

      <Card.Body>
        {/* Enable Two Factor */}
        <Form.Group className="mb-4">
          <Form.Check
            type="switch"
            id={`${title}-enabled`}
            label="Enable Two-Factor Authentication"
            checked={data.enabled}
            onChange={(e) => onChange("enabled", e.target.checked)}
          />
        </Form.Group>

        {data.enabled && (
          <>
            <h6 className="fw-semibold mb-3">Verification Methods</h6>

            <Row className="g-3">
              <Col md={6}>
                <Card className="setting-card h-100">
                  <Card.Body>
                    <Form.Check
                      type="switch"
                      id={`${title}-email`}
                      label="Email OTP"
                      checked={data.EMAIL_OTP}
                      onChange={(e) => onChange("EMAIL_OTP", e.target.checked)}
                    />

                    <small className="text-muted d-block mt-2">
                      Send OTP to registered email address.
                    </small>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="setting-card h-100">
                  <Card.Body>
                    <Form.Check
                      type="switch"
                      id={`${title}-sms`}
                      label="SMS OTP"
                      checked={data.SMS_OTP}
                      onChange={(e) => onChange("SMS_OTP", e.target.checked)}
                    />

                    <small className="text-muted d-block mt-2">
                      Send OTP to registered mobile number.
                    </small>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <div className="alert alert-light border mt-4 mb-0">
              <strong>Note:</strong> You can enable one or both OTP methods.
              Users will authenticate using the enabled verification methods.
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default TwoFactorSection;
