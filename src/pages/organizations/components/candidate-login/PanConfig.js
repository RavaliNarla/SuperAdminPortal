// src/pages/organizations/components/candidate-login/PanConfig.js

import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import {
  FiCreditCard,
  FiShield,
  FiLock,
  FiEyeOff,
  FiCheckCircle,
  FiKey,
} from "react-icons/fi";

const PanConfig = ({ data, onChange }) => {
  return (
    <>

      {/* =====================================================
          PAN Login Configuration
      ====================================================== */}

      <div className="candidate-config-card">

        <div className="candidate-config-header">

          <h5>
            <FiCreditCard className="me-2" />
            PAN Login Configuration
          </h5>

          <p>
            Configure PAN authentication, validation and
            security settings for candidate login.
          </p>

        </div>

        <Row className="g-3">

          <Col lg={6}>

            <Form.Group>

              <Form.Label>
                PAN Validation Mode
              </Form.Label>

              <Form.Select
                value={data.panValidationMode || "FORMAT"}
                onChange={(e) =>
                  onChange(
                    "panValidationMode",
                    e.target.value
                  )
                }
              >

                <option value="FORMAT">
                  Format Validation
                </option>

                <option value="API">
                  API Verification
                </option>

                <option value="MANUAL">
                  Manual Verification
                </option>

              </Form.Select>

            </Form.Group>

          </Col>

          <Col lg={6}>

            <Form.Group>

              <Form.Label>

                PAN Format

              </Form.Label>

              <Form.Control
                value="ABCDE1234F"
                readOnly
              />

            </Form.Group>

          </Col>

        </Row>

      </div>

      {/* =====================================================
          Verification
      ====================================================== */}

      <h5 className="candidate-section-title mt-4">
        PAN Verification
      </h5>

      <Row className="g-3">

        <Col lg={6}>

          <div className="candidate-option-card">

            <div className="candidate-option-left">

              <div className="candidate-option-icon">
                <FiShield />
              </div>

              <div>

                <h6>Verify PAN</h6>

                <small>
                  Verify PAN before allowing login.
                </small>

              </div>

            </div>

            <Form.Check
              type="switch"
              checked={data.verifyPan || false}
              onChange={(e) =>
                onChange(
                  "verifyPan",
                  e.target.checked
                )
              }
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

                <h6>Allow Duplicate PAN</h6>

                <small>
                  Permit multiple accounts using the same PAN.
                </small>

              </div>

            </div>

            <Form.Check
              type="switch"
              checked={data.allowDuplicatePan || false}
              onChange={(e) =>
                onChange(
                  "allowDuplicatePan",
                  e.target.checked
                )
              }
            />

          </div>

        </Col>

      </Row>

      {/* =====================================================
          Authentication
      ====================================================== */}

      <h5 className="candidate-section-title mt-4">
        Authentication
      </h5>

      <Row className="g-3">

        <Col lg={6}>

          <div className="candidate-option-card">

            <div className="candidate-option-left">

              <div className="candidate-option-icon">
                <FiKey />
              </div>

              <div>

                <h6>Password Required</h6>

                <small>
                  Candidate must enter password with PAN login.
                </small>

              </div>

            </div>

            <Form.Check
              type="switch"
              checked={data.panPassword || false}
              onChange={(e) =>
                onChange(
                  "panPassword",
                  e.target.checked
                )
              }
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

                <h6>Remember PAN</h6>

                <small>
                  Remember PAN on trusted devices.
                </small>

              </div>

            </div>

            <Form.Check
              type="switch"
              checked={data.rememberPan || false}
              onChange={(e) =>
                onChange(
                  "rememberPan",
                  e.target.checked
                )
              }
            />

          </div>

        </Col>

      </Row>

      {/* =====================================================
          Privacy
      ====================================================== */}

      <h5 className="candidate-section-title mt-4">
        Privacy & Security
      </h5>

      <Row className="g-3">

        <Col lg={6}>

          <div className="candidate-option-card">

            <div className="candidate-option-left">

              <div className="candidate-option-icon">
                <FiEyeOff />
              </div>

              <div>

                <h6>Mask PAN Number</h6>

                <small>
                  Display only the last four characters after verification.
                </small>

              </div>

            </div>

            <Form.Check
              type="switch"
              checked={data.maskPan || false}
              onChange={(e) =>
                onChange(
                  "maskPan",
                  e.target.checked
                )
              }
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
                  Save PAN verification status in candidate profile.
                </small>

              </div>

            </div>

            <Form.Check
              type="switch"
              checked={data.storePanStatus || false}
              onChange={(e) =>
                onChange(
                  "storePanStatus",
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

export default PanConfig;