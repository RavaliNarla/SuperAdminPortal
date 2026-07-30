import React from "react";
import { Card, Badge, Form, Button, Row, Col } from "react-bootstrap";
import { FiMail, FiShield, FiLock, FiCheckCircle } from "react-icons/fi";
const RECRUITMENT_METHOD_ORDER = ["EMAIL_PASSWORD", "ENTRA_ID"];
const TWO_FACTOR_METHOD_ORDER = ["EMAIL_OTP", "SMS_OTP"];

const LoginPreview = ({ config }) => {
  const getCandidateMethod = () => {
    return {
      label: "Email Address",
      icon: <FiMail />,
      placeholder: "Enter Email Address",
      secondField: {
        label: "Password",
        type: "password",
        icon: <FiLock />,
        placeholder: "Enter Password",
      },
    };
  };
  const getRecruitmentMethod = () => {
    const activeMethod = RECRUITMENT_METHOD_ORDER.find(
      (key) => config.recruitmentLogin?.[key],
    );
    switch (activeMethod) {
      case "ENTRA_ID":
        return {
          label: "Microsoft Entra ID",
          icon: <FiShield />,
          placeholder: "Login with Microsoft",
          secondField: null,
        };
      case "EMAIL_PASSWORD":
      default:
        return {
          label: "Email",
          icon: <FiMail />,
          placeholder: "Enter Email",
          secondField: {
            label: "Password",
            type: "password",
            icon: <FiLock />,
            placeholder: "Enter Password",
          },
        };
    }
  };
  const candidate = getCandidateMethod();
  const recruitment = getRecruitmentMethod();
  const activeTwoFactor =
    config.portal === "candidate"
      ? config.candidateTwoFactor
      : config.recruitmentTwoFactor;
  const get2FAMethod = () => {
    const activeMethod = TWO_FACTOR_METHOD_ORDER.find(
      (key) => activeTwoFactor?.[key],
    );

    switch (activeMethod) {
      case "EMAIL_OTP":
        return "Email OTP";
      case "SMS_OTP":
        return "SMS OTP";
      default:
        return "Not Configured";
    }
  };

  return (
    <Card className="login-preview-card">
      <Card.Header>
        <h5>Login Screen Preview</h5>
      </Card.Header>

      <Card.Body>
        <div className="text-center mb-4">
          <Badge className="preview-badge bg-success">
            {config.portal === ""
              ? "No Portal Selected"
              : config.portal === "candidate"
                ? "Candidate Portal"
                : config.portal === "recruitment"
                  ? "Recruitment Portal"
                  : "Candidate + Recruitment"}
          </Badge>
        </div>

        {(config.portal === "candidate" || config.portal === "both") && (
          <Card className="preview-portal-card mb-4">
            <Card.Header>Candidate Portal</Card.Header>

            <Card.Body>
              <div className="text-center mb-4">
                <div className="preview-avatar">{candidate.icon}</div>
              </div>

              {/* Login Field */}

              <Form.Group className="mb-3">
                <Form.Label>{candidate.label}</Form.Label>

                <div className="preview-input-wrapper">
                  <span className="preview-input-icon">{candidate.icon}</span>

                  <Form.Control
                    className="preview-input"
                    placeholder={candidate.placeholder}
                    readOnly
                  />
                </div>
              </Form.Group>

              {/* Dynamic Password / OTP */}

              {candidate.secondField && (
                <Form.Group className="mb-3">
                  <Form.Label>{candidate.secondField.label}</Form.Label>

                  <div className="preview-input-wrapper">
                    <span className="preview-input-icon">
                      {candidate.secondField.icon}
                    </span>

                    <Form.Control
                      className="preview-input"
                      type={candidate.secondField.type}
                      placeholder={candidate.secondField.placeholder}
                      readOnly
                    />
                  </div>
                </Form.Group>
              )}

              {/* Remember Me */}

              <div className="preview-remember">
                <label className="remember-container">
                  <input type="checkbox" checked readOnly />

                  <span className="checkmark"></span>

                  <span>Remember Me</span>
                </label>

               {config.candidateLogin?.EMAIL_PASSWORD && (
                  <span className="preview-link">Forgot Password?</span>
                )}
              </div>

              {/* Candidate CAPTCHA */}

              {config.candidateLogin.enableCaptcha && (
                <div className="preview-captcha">Candidate CAPTCHA</div>
              )}

              <Button className="preview-login-btn w-100 mt-3" disabled>
                Login
              </Button>

              {config.candidateLogin.allowRegistration && (
                <div className="preview-register">
                  <FiCheckCircle className="me-2" />
                  New User? Register Here
                </div>
              )}
            </Card.Body>
          </Card>
        )}

        {/* ============================
            Recruitment Portal
        ============================= */}

        {(config.portal === "recruitment" || config.portal === "both") && (
          <Card className="preview-portal-card mb-4">
            <Card.Header>Recruitment Portal</Card.Header>
            <Card.Body>
              <div className="text-center mb-4">
                <div className="preview-avatar">{recruitment.icon}</div>
              </div>

              {/* Login Field */}

              <Form.Group className="mb-3">
                <Form.Label>{recruitment.label}</Form.Label>

                <div className="preview-input-wrapper">
                  <span className="preview-input-icon">{recruitment.icon}</span>

                  <Form.Control
                    className="preview-input"
                    placeholder={recruitment.placeholder}
                    readOnly
                  />
                </div>
              </Form.Group>

              {/* Dynamic Password / OTP */}

              {recruitment.secondField && (
                <Form.Group className="mb-3">
                  <Form.Label>{recruitment.secondField.label}</Form.Label>

                  <div className="preview-input-wrapper">
                    <span className="preview-input-icon">
                      {recruitment.secondField.icon}
                    </span>

                    <Form.Control
                      className="preview-input"
                      type={recruitment.secondField.type}
                      placeholder={recruitment.secondField.placeholder}
                      readOnly
                    />
                  </div>
                </Form.Group>
              )}

              {/* Remember Me */}

              <div className="preview-remember">
                <label className="remember-container">
                  <input type="checkbox" checked readOnly />

                  <span className="checkmark"></span>

                  <span>Remember Me</span>
                </label>
              </div>

              {/* CAPTCHA */}

              {config.recruitmentLogin.enableCaptcha && (
                <div className="preview-captcha recruitment-captcha">
                  Recruitment CAPTCHA
                </div>
              )}

              <Button className="preview-login-btn w-100 mt-3" disabled>
                Login
              </Button>

              <div className="preview-divider" />

              {/* Authentication Settings */}

              <div className="preview-settings">
                <h6>Authentication Settings</h6>

                <Row className="g-3">
                  <Col xs={12}>
                    <div className="preview-setting-item">
                      <div>
                        <strong>CAPTCHA</strong>
                        <small>Bot protection for login.</small>
                      </div>

                      <Badge
                        bg={
                          config.recruitmentLogin.enableCaptcha
                            ? "success"
                            : "secondary"
                        }
                      >
                        {config.recruitmentLogin.enableCaptcha
                          ? "Enabled"
                          : "Disabled"}
                      </Badge>
                    </div>
                  </Col>

                  <Col xs={12}>
                    <div className="preview-setting-item">
                      <div>
                        <strong>Two-Factor Authentication</strong>
                        <small>Additional authentication layer.</small>
                      </div>

                      <Badge
                        bg={activeTwoFactor?.enabled ? "success" : "secondary"}
                      >
                        {activeTwoFactor?.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        )}

        {activeTwoFactor?.enabled && (
          <Form.Group className="mt-4">
            <Form.Label>2FA Method</Form.Label>

            <Form.Control
              className="preview-input"
              value={get2FAMethod()}
              readOnly
            />
          </Form.Group>
        )}
      </Card.Body>
    </Card>
  );
};

export default LoginPreview;
