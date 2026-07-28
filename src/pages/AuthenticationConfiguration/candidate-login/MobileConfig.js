// src/pages/organizations/components/candidate-login/MobileConfig.js

import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import {
  FiSmartphone,
  FiShield,
  FiKey,
  FiLock,
  FiMessageCircle,
  FiGlobe,
} from "react-icons/fi";

const MobileConfig = ({ data, onChange }) => {
  return (
    <>
      {/* ==============================================
          Mobile Login Configuration
      ============================================== */}

      <div className="candidate-config-card mt-4">
        <div className="candidate-config-header">
          <h5>
            <FiSmartphone className="me-2" />
            Mobile Login Configuration
          </h5>

          <p>
            Configure mobile number based authentication, OTP verification and
            SMS gateway settings.
          </p>
        </div>

        <Row className="g-3">
          <Col lg={6}>
            <Form.Group>
              <Form.Label>Default Country Code</Form.Label>

              <Form.Select
                value={data.countryCode || "+91"}
                onChange={(e) => onChange("countryCode", e.target.value)}
              >
                <option value="+91">🇮🇳 India (+91)</option>

                <option value="+1">🇺🇸 USA (+1)</option>

                <option value="+44">🇬🇧 UK (+44)</option>

                <option value="+971">🇦🇪 UAE (+971)</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col lg={6}>
            <Form.Group>
              <Form.Label>Login Type</Form.Label>

              <Form.Select
                value={data.mobileLoginType || "OTP"}
                onChange={(e) => onChange("mobileLoginType", e.target.value)}
              >
                <option value="OTP">OTP Only</option>

                <option value="PASSWORD">Password Only</option>

                <option value="OTP_PASSWORD">OTP + Password</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </div>

      {/* ==============================================
          OTP Configuration
      ============================================== */}

      <h5 className="candidate-section-title mt-4">OTP Configuration</h5>

      <Row className="g-3">
        <Col lg={6}>
          <div className="candidate-option-card">
            <div className="candidate-option-left">
              <div className="candidate-option-icon">
                <FiShield />
              </div>

              <div>
                <h6>SMS OTP</h6>

                <small>Send OTP through SMS.</small>
              </div>
            </div>

            <Form.Check
              type="switch"
              checked={data.smsOtp || false}
              onChange={(e) => onChange("smsOtp", e.target.checked)}
            />
          </div>
        </Col>

        <Col lg={6}>
          <div className="candidate-option-card">
            <div className="candidate-option-left">
              <div className="candidate-option-icon">
                <FiMessageCircle />
              </div>

              <div>
                <h6>WhatsApp OTP</h6>

                <small>Deliver OTP through WhatsApp.</small>
              </div>
            </div>

            <Form.Check
              type="switch"
              checked={data.whatsappOtp || false}
              onChange={(e) => onChange("whatsappOtp", e.target.checked)}
            />
          </div>
        </Col>
      </Row>

      {/* ==============================================
          Mobile Verification
      ============================================== */}

      <h5 className="candidate-section-title mt-4">Mobile Verification</h5>

      <Row className="g-3">
        <Col lg={6}>
          <div className="candidate-option-card">
            <div className="candidate-option-left">
              <div className="candidate-option-icon">
                <FiSmartphone />
              </div>

              <div>
                <h6>Verify Mobile Number</h6>

                <small>Verify mobile before account activation.</small>
              </div>
            </div>

            <Form.Check
              type="switch"
              checked={data.verifyMobile || false}
              onChange={(e) => onChange("verifyMobile", e.target.checked)}
            />
          </div>
        </Col>

        <Col lg={6}>
          <div className="candidate-option-card">
            <div className="candidate-option-left">
              <div className="candidate-option-icon">
                <FiGlobe />
              </div>

              <div>
                <h6>Allow International Numbers</h6>

                <small>Accept candidates from all countries.</small>
              </div>
            </div>

            <Form.Check
              type="switch"
              checked={data.internationalMobile || false}
              onChange={(e) =>
                onChange("internationalMobile", e.target.checked)
              }
            />
          </div>
        </Col>
      </Row>

      {/* ==============================================
          Authentication
      ============================================== */}

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

                <small>Require password with mobile login.</small>
              </div>
            </div>

            <Form.Check
              type="switch"
              checked={data.mobilePassword || false}
              onChange={(e) => onChange("mobilePassword", e.target.checked)}
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
                <h6>Remember Device</h6>

                <small>Skip OTP on trusted devices.</small>
              </div>
            </div>

            <Form.Check
              type="switch"
              checked={data.mobileRememberDevice || false}
              onChange={(e) =>
                onChange("mobileRememberDevice", e.target.checked)
              }
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default MobileConfig;
