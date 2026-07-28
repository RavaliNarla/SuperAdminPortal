// src/pages/organizations/components/candidate-login/AadhaarConfig.js

import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import {
  FiCreditCard,
  FiShield,
  FiLock,
  FiCheckCircle,
  FiEyeOff,
  FiFileText,
} from "react-icons/fi";

const AadhaarConfig = ({ data, onChange }) => {
  return (
    <>
      {/* ==========================================================
          Aadhaar Login Configuration
      ========================================================== */}

      <div className="candidate-config-card mt-4">
        <div className="candidate-config-header">
          <h5>
            <FiCreditCard className="me-2" />
            Aadhaar Login Configuration
          </h5>

          <p>
            Configure Aadhaar authentication, verification and e-KYC settings
            for candidate login.
          </p>
        </div>

        <Row className="g-3">
          <Col lg={6}>
            <Form.Group>
              <Form.Label>Authentication Method</Form.Label>

              <Form.Select
                value={data.aadhaarAuthMethod || "OTP"}
                onChange={(e) => onChange("aadhaarAuthMethod", e.target.value)}
              >
                <option value="OTP">OTP Authentication</option>

                <option value="EKYC">e-KYC Authentication</option>

                <option value="DIGILOCKER">DigiLocker Authentication</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col lg={6}>
            <Form.Group>
              <Form.Label>Aadhaar Format</Form.Label>

              <Form.Select
                value={data.aadhaarFormat || "XXXX-XXXX-1234"}
                onChange={(e) => onChange("aadhaarFormat", e.target.value)}
              >
                <option value="XXXX-XXXX-1234">XXXX-XXXX-1234</option>

                <option value="123412341234">123412341234</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </div>

      {/* ==========================================================
          Verification
      ========================================================== */}

      <h5 className="candidate-section-title mt-4">Aadhaar Verification</h5>

      <Row className="g-3">
        <Col lg={6}>
          <div className="candidate-option-card">
            <div className="candidate-option-left">
              <div className="candidate-option-icon">
                <FiShield />
              </div>

              <div>
                <h6>Verify Aadhaar</h6>

                <small>Verify Aadhaar before allowing login.</small>
              </div>
            </div>

            <Form.Check
              type="switch"
              checked={data.verifyAadhaar || false}
              onChange={(e) => onChange("verifyAadhaar", e.target.checked)}
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
                <h6>OTP Verification</h6>

                <small>Send OTP to Aadhaar registered mobile.</small>
              </div>
            </div>

            <Form.Check
              type="switch"
              checked={data.aadhaarOtp || false}
              onChange={(e) => onChange("aadhaarOtp", e.target.checked)}
            />
          </div>
        </Col>
      </Row>

      {/* ==========================================================
          DigiLocker
      ========================================================== */}

      <h5 className="candidate-section-title mt-4">DigiLocker Integration</h5>

      <Row className="g-3">
        <Col lg={6}>
          <div className="candidate-option-card">
            <div className="candidate-option-left">
              <div className="candidate-option-icon">
                <FiFileText />
              </div>

              <div>
                <h6>Enable DigiLocker</h6>

                <small>
                  Fetch verified identity documents from DigiLocker.
                </small>
              </div>
            </div>

            <Form.Check
              type="switch"
              checked={data.enableDigilocker || false}
              onChange={(e) => onChange("enableDigilocker", e.target.checked)}
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
                <h6>Consent Required</h6>

                <small>
                  Require candidate consent before document retrieval.
                </small>
              </div>
            </div>

            <Form.Check
              type="switch"
              checked={data.digilockerConsent || false}
              onChange={(e) => onChange("digilockerConsent", e.target.checked)}
            />
          </div>
        </Col>
      </Row>

      {/* ==========================================================
          Privacy
      ========================================================== */}

      <h5 className="candidate-section-title mt-4">Privacy & Security</h5>

      <Row className="g-3">
        <Col lg={6}>
          <div className="candidate-option-card">
            <div className="candidate-option-left">
              <div className="candidate-option-icon">
                <FiEyeOff />
              </div>

              <div>
                <h6>Mask Aadhaar Number</h6>

                <small>
                  Display only the last four digits after verification.
                </small>
              </div>
            </div>

            <Form.Check
              type="switch"
              checked={data.maskAadhaar || false}
              onChange={(e) => onChange("maskAadhaar", e.target.checked)}
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
                <h6>Store Verification Status</h6>

                <small>
                  Save Aadhaar verification status in the candidate profile.
                </small>
              </div>
            </div>

            <Form.Check
              type="switch"
              checked={data.storeAadhaarStatus || false}
              onChange={(e) => onChange("storeAadhaarStatus", e.target.checked)}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default AadhaarConfig;
