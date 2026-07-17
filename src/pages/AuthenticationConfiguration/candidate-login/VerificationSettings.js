// src/pages/organizations/components/candidate-login/VerificationSettings.js

import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import {
  FiMail,
  FiSmartphone,
  FiCreditCard,
  FiFileText,
  FiShield,
  FiCamera,
} from "react-icons/fi";

const VerificationSettings = ({ data, onChange }) => {
  return (
    <>

      {/* ==========================================================
          Registration Verification
      ========================================================== */}

      <h5 className="candidate-section-title mt-5">
        Registration Verification
      </h5>

      <Row className="g-3">

        {/* Email OTP */}

        <Col lg={6}>

          <div className="candidate-option-card">

            <div className="candidate-option-left">

              <div className="candidate-option-icon">
                <FiMail />
              </div>

              <div>

                <h6>Email OTP Verification</h6>

                <small>
                  Verify candidate email before activation.
                </small>

              </div>

            </div>

            <Form.Check
              type="switch"
              checked={data.emailOtp || false}
              onChange={(e) =>
                onChange(
                  "emailOtp",
                  e.target.checked
                )
              }
            />

          </div>

        </Col>

        {/* Mobile OTP */}

        <Col lg={6}>

          <div className="candidate-option-card">

            <div className="candidate-option-left">

              <div className="candidate-option-icon">
                <FiSmartphone />
              </div>

              <div>

                <h6>Mobile OTP Verification</h6>

                <small>
                  Verify mobile number before activation.
                </small>

              </div>

            </div>

            <Form.Check
              type="switch"
              checked={data.mobileOtp || false}
              onChange={(e) =>
                onChange(
                  "mobileOtp",
                  e.target.checked
                )
              }
            />

          </div>

        </Col>

        {/* Aadhaar */}

        <Col lg={6}>

          <div className="candidate-option-card">

            <div className="candidate-option-left">

              <div className="candidate-option-icon">
                <FiCreditCard />
              </div>

              <div>

                <h6>Aadhaar Verification</h6>

                <small>
                  Verify Aadhaar before profile submission.
                </small>

              </div>

            </div>

            <Form.Check
              type="switch"
              checked={data.aadhaarVerification || false}
              onChange={(e) =>
                onChange(
                  "aadhaarVerification",
                  e.target.checked
                )
              }
            />

          </div>

        </Col>

        {/* PAN */}

        <Col lg={6}>

          <div className="candidate-option-card">

            <div className="candidate-option-left">

              <div className="candidate-option-icon">
                <FiCreditCard />
              </div>

              <div>

                <h6>PAN Verification</h6>

                <small>
                  Validate PAN before registration.
                </small>

              </div>

            </div>

            <Form.Check
              type="switch"
              checked={data.panVerification || false}
              onChange={(e) =>
                onChange(
                  "panVerification",
                  e.target.checked
                )
              }
            />

          </div>

        </Col>

      </Row>

      {/* ==========================================================
          Document Verification
      ========================================================== */}

      <h5 className="candidate-section-title mt-5">
        Document Verification
      </h5>

      <Row className="g-3">

        {/* DigiLocker */}

        <Col lg={6}>

          <div className="candidate-option-card">

            <div className="candidate-option-left">

              <div className="candidate-option-icon">
                <FiFileText />
              </div>

              <div>

                <h6>DigiLocker Verification</h6>

                <small>
                  Allow document verification through DigiLocker.
                </small>

              </div>

            </div>

            <Form.Check
              type="switch"
              checked={data.enableDigilocker || false}
              onChange={(e) =>
                onChange(
                  "enableDigilocker",
                  e.target.checked
                )
              }
            />

          </div>

        </Col>

        {/* Mandatory Verification */}

        <Col lg={6}>

          <div className="candidate-option-card">

            <div className="candidate-option-left">

              <div className="candidate-option-icon">
                <FiShield />
              </div>

              <div>

                <h6>Mandatory Verification</h6>

                <small>
                  Complete all enabled verifications before registration.
                </small>

              </div>

            </div>

            <Form.Check
              type="switch"
              checked={data.mandatoryVerification || false}
              onChange={(e) =>
                onChange(
                  "mandatoryVerification",
                  e.target.checked
                )
              }
            />

          </div>

        </Col>

      </Row>

      {/* ==========================================================
          Advanced Verification
      ========================================================== */}

      <h5 className="candidate-section-title mt-5">
        Advanced Verification
      </h5>

      <Row className="g-3">

        {/* Face Verification */}

        <Col lg={6}>

          <div className="candidate-option-card">

            <div className="candidate-option-left">

              <div className="candidate-option-icon">
                <FiCamera />
              </div>

              <div>

                <h6>Face Verification</h6>

                <small>
                  Verify candidate identity using facial recognition.
                </small>

              </div>

            </div>

            <Form.Check
              type="switch"
              checked={data.faceVerification || false}
              onChange={(e) =>
                onChange(
                  "faceVerification",
                  e.target.checked
                )
              }
            />

          </div>

        </Col>

        {/* Manual Approval */}

        <Col lg={6}>

          <div className="candidate-option-card">

            <div className="candidate-option-left">

              <div className="candidate-option-icon">
                <FiShield />
              </div>

              <div>

                <h6>Manual Verification Approval</h6>

                <small>
                  Require administrator approval after verification.
                </small>

              </div>

            </div>

            <Form.Check
              type="switch"
              checked={data.manualApproval || false}
              onChange={(e) =>
                onChange(
                  "manualApproval",
                  e.target.checked
                )
              }
            />

          </div>

        </Col>

      </Row>

    </>
  );
};

export default VerificationSettings;