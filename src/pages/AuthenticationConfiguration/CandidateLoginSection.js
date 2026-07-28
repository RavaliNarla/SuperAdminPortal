import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import {
  FiLogIn,
  FiUser,
  FiMail,
  FiSmartphone,
  FiCreditCard,
  FiShield,
  FiKey,
  FiUsers,
} from "react-icons/fi";

import { FaFacebook, FaGoogle, FaLinkedin, FaMicrosoft,  } from "react-icons/fa6"; // Using FA6 (Font Awesome 6)

import "../../css/Section.css";

// Dynamic Components
import UsernameConfig from "./candidate-login/UsernameConfig";
import EmailConfig from "./candidate-login/EmailConfig";
import MobileConfig from "./candidate-login/MobileConfig";
import AadhaarConfig from "./candidate-login/AadhaarConfig";
import PanConfig from "./candidate-login/PanConfig";

const loginMethods = [
  {
    value: "USERNAME",
    label: "Username",
    icon: <FiUser />,
    description: "Login using Username & Password",
  },
  {
    value: "EMAIL",
    label: "Email",
    icon: <FiMail />,
    description: "Login using Email Address",
  },
  {
    value: "MOBILE",
    label: "Mobile",
    icon: <FiSmartphone />,
    description: "Login using Mobile Number",
  },
  {
    value: "AADHAAR",
    label: "Aadhaar",
    icon: <FiCreditCard />,
    description: "Login using Aadhaar Number",
  },
  // {
  //   value: "PAN",
  //   label: "PAN",
  //   icon: <FiCreditCard />,
  //   description: "Login using PAN Number",
  // },
];

const CandidateLoginSection = ({ data, onChange }) => {
  return (
    <div className="candidate-login-card mb-4">
      <div className="card-body">
        {/* Header */}

        <div className="candidate-header">
          <div>
            <h4>
              <FiLogIn className="me-2" />
              Candidate Portal Authentication
            </h4>

            <p>
              Configure candidate login methods, registration, verification and
              password recovery options.
            </p>
          </div>
        </div>

        {/* Login Methods */}

        <h6 className="section-sub-heading mb-3">
          <FiUsers className="me-2" />
          Login Methods
        </h6>

        <Row className="g-3">
          {loginMethods.map((item) => (
            <Col lg={4} md={6} key={item.value}>
              <div
                className={`candidate-method-card ${
                  data.defaultLoginMethod === item.value ? "active" : ""
                }`}
                onClick={() => onChange("defaultLoginMethod", item.value)}
              >
                <div className="candidate-method-left">
                  <div className="candidate-method-icon">{item.icon}</div>

                  <div>
                    <h6>{item.label}</h6>

                    <small>{item.description}</small>
                  </div>
                </div>

                <div
                  className={`candidate-radio ${
                    data.defaultLoginMethod === item.value ? "active" : ""
                  }`}
                >
                  <div className="candidate-radio-dot"></div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* Social Login */}

        <h6 className="section-sub-heading mt-5 mb-3">
          <FiLogIn className="me-2" />
          Social Login Providers
        </h6>

        <Row className="g-3">
          <Col lg={6}>
            <div className="candidate-option-card">
              <div className="candidate-option-left">
                <div className="candidate-option-icon">
                  <FaGoogle />
                </div>

                <div>
                  <h6>Google</h6>

                  <small>Allow candidates to sign in using Google.</small>
                </div>
              </div>

              <Form.Check
                type="switch"
                checked={data.enableGoogleLogin || false}
                onChange={(e) =>
                  onChange("enableGoogleLogin", e.target.checked)
                }
              />
            </div>
          </Col>

          <Col lg={6}>
            <div className="candidate-option-card">
              <div className="candidate-option-left">
                <div className="candidate-option-icon">
                  <FaMicrosoft />
                </div>
                <div>
                  <h6>Microsoft</h6>
                  <small>
                    {" "}
                    Allow candidates to sign in with Microsoft account.
                  </small>
                </div>
              </div>
              <Form.Check
                type="switch"
                checked={data.enableMicrosoftLogin || false}
                onChange={(e) =>
                  onChange("enableMicrosoftLogin", e.target.checked)
                }
              />
            </div>
          </Col>

          <Col lg={6}>
            <div className="candidate-option-card">
              <div className="candidate-option-left">
                <div className="candidate-option-icon">
                  <FaFacebook />
                </div>
                <div>
                  <h6>Facebook</h6>
                  <small>Allow candidates to sign in using Facebook.</small>
                </div>
              </div>

              <Form.Check
                type="switch"
                checked={data.enableFacebookLogin || false}
                onChange={(e) =>
                  onChange("enableFacebookLogin", e.target.checked)
                }
              />
            </div>
          </Col>

          <Col lg={6}>
            <div className="candidate-option-card">
              <div className="candidate-option-left">
                <div className="candidate-option-icon">
                  <FaLinkedin />
                </div>
                <div>
                  <h6>LinkedIn</h6>
                  <small>Allow candidates to sign in using LinkedIn.</small>
                </div>
              </div>

              <Form.Check
                type="switch"
                checked={data.enableLinkedInLogin || false}
                onChange={(e) =>
                  onChange("enableLinkedInLogin", e.target.checked)
                }
              />
            </div>
          </Col>
        </Row>
        {/* Dynamic Login Configuration */}

        {data.defaultLoginMethod === "USERNAME" && (
          <UsernameConfig data={data} onChange={onChange} />
        )}

        {data.defaultLoginMethod === "EMAIL" && (
          <EmailConfig data={data} onChange={onChange} />
        )}

        {data.defaultLoginMethod === "MOBILE" && (
          <MobileConfig data={data} onChange={onChange} />
        )}

        {data.defaultLoginMethod === "AADHAAR" && (
          <AadhaarConfig data={data} onChange={onChange} />
        )}

        {/* {data.defaultLoginMethod === "PAN" && (
          <PanConfig data={data} onChange={onChange} />
        )} */}

        {/* Default Login Method */}

        <Row className="mt-4">
          <Col lg={6}>
            <Form.Group>
              <Form.Label>
                <FiUser className="me-2" />
                Default Login Method
              </Form.Label>

              <Form.Select
                className="modern-input"
                value={data.defaultLoginMethod || ""}
                onChange={(e) => onChange("defaultLoginMethod", e.target.value)}
              >
                <option value="">Select Login Method</option>

                <option value="USERNAME">Username</option>

                <option value="EMAIL">Email</option>

                <option value="MOBILE">Mobile</option>

                <option value="AADHAAR">Aadhaar</option>

                <option value="PAN">PAN</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Security Settings */}

        <h6 className="section-sub-heading mt-5 mb-3">
          <FiShield className="me-2" />
          Security Settings
        </h6>

        <Row className="g-3">
          <Col lg={6}>
            <div className="setting-card">
              <div className="setting-card-content">
                <div className="setting-icon">
                  <FiKey />
                </div>

                <div>
                  <h6>Enable Forgot Password</h6>

                  <p>Allow candidates to securely reset forgotten passwords.</p>
                </div>
              </div>

              <Form.Check
                className="setting-switch"
                type="switch"
                checked={data.enableForgotPassword || false}
                onChange={(e) =>
                  onChange("enableForgotPassword", e.target.checked)
                }
              />
            </div>
          </Col>

          <Col lg={6}>
            <div className="setting-card">
              <div className="setting-card-content">
                <div className="setting-icon">
                  <FiShield />
                </div>

                <div>
                  <h6>Enable CAPTCHA</h6>

                  <p>
                    Protect the candidate login page from automated bot attacks.
                  </p>
                </div>
              </div>

              <Form.Check
                className="setting-switch"
                type="switch"
                checked={data.enableCaptcha || false}
                onChange={(e) => onChange("enableCaptcha", e.target.checked)}
              />
            </div>
          </Col>

          <Col lg={6}>
            <div className="setting-card">
              <div className="setting-card-content">
                <div className="setting-icon">
                  <FiUser />
                </div>

                <div>
                  <h6>Allow Candidate Registration</h6>

                  <p>
                    Allow new candidates to register themselves through the
                    portal.
                  </p>
                </div>
              </div>

              <Form.Check
                className="setting-switch"
                type="switch"
                checked={data.allowRegistration || false}
                onChange={(e) =>
                  onChange("allowRegistration", e.target.checked)
                }
              />
            </div>
          </Col>

          <Col lg={6}>
            <div className="setting-card">
              <div className="setting-card-content">
                <div className="setting-icon">
                  <FiShield />
                </div>

                <div>
                  <h6>Verify Email During Registration</h6>

                  <p>
                    Send an email verification link before activating candidate
                    accounts.
                  </p>
                </div>
              </div>

              <Form.Check
                className="setting-switch"
                type="switch"
                checked={data.verifyEmail || false}
                onChange={(e) => onChange("verifyEmail", e.target.checked)}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CandidateLoginSection;
