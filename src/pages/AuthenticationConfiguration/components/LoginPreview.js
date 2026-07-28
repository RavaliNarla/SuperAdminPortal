import React from "react";
import { Card, Badge, Form, Button, Row, Col } from "react-bootstrap";
import {
  FiUser,
  FiMail,
  FiSmartphone,
  FiCreditCard,
  FiShield,
  FiLock,
  FiCheckCircle,
} from "react-icons/fi";

const LoginPreview = ({ config }) => {
  // -----------------------------
  // Candidate Login Method
  // -----------------------------
  const getCandidateMethod = () => {
    switch (config.candidateLogin.defaultLoginMethod) {
      case "USERNAME":
        return {
          label: "Username",
          icon: <FiUser />,
          placeholder: "Enter Username",
          secondField: {
            label: "Password",
            type: "password",
            icon: <FiLock />,
            placeholder: "Enter Password",
          },
        };

      case "EMAIL":
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

      case "MOBILE": {
        const loginType = config.candidateLogin.mobileLoginType || "OTP";

        return {
          label: "Mobile Number",
          icon: <FiSmartphone />,
          placeholder: "Enter Mobile Number",

          secondField:
            loginType === "PASSWORD"
              ? {
                  label: "Password",
                  type: "password",
                  icon: <FiLock />,
                  placeholder: "Enter Password",
                }
              : loginType === "OTP_PASSWORD"
                ? {
                    label: "OTP + Password",
                    type: "text",
                    icon: <FiSmartphone />,
                    placeholder: "Enter OTP & Password",
                  }
                : {
                    label: "OTP",
                    type: "text",
                    icon: <FiSmartphone />,
                    placeholder: "Enter OTP",
                  },
        };
      }

      case "AADHAAR":
        return {
          label: "Aadhaar Number",
          icon: <FiCreditCard />,
          placeholder: "Enter Aadhaar Number",
          secondField: {
            label: "OTP",
            type: "text",
            icon: <FiSmartphone />,
            placeholder: "Enter OTP",
          },
        };

      case "PAN":
        return {
          label: "PAN Number",
          icon: <FiCreditCard />,
          placeholder: "Enter PAN Number",
          secondField: {
            label: "Password",
            type: "password",
            icon: <FiLock />,
            placeholder: "Enter Password",
          },
        };

      default:
        return {
          label: "Username",
          icon: <FiUser />,
          placeholder: "Enter Username",
          secondField: {
            label: "Password",
            type: "password",
            icon: <FiLock />,
            placeholder: "Enter Password",
          },
        };
    }
  };

  // -----------------------------
  // Recruitment Login Method
  // -----------------------------
  const getRecruitmentMethod = () => {
    switch (config.recruitmentLogin.defaultLoginMethod) {
      case "EMAIL":
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

      case "USERNAME":
        return {
          label: "Username",
          icon: <FiUser />,
          placeholder: "Enter Username",
          secondField: {
            label: "Password",
            type: "password",
            icon: <FiLock />,
            placeholder: "Enter Password",
          },
        };

      case "MOBILE":
        return {
          label: "Mobile Number",
          icon: <FiSmartphone />,
          placeholder: "Enter Mobile Number",
          secondField: {
            label: "OTP",
            type: "text",
            icon: <FiSmartphone />,
            placeholder: "Enter OTP",
          },
        };

      case "AD":
        return {
          label: "Microsoft Entra ID",
          icon: <FiShield />,
          placeholder: "Login with Microsoft",
          secondField: null,
        };

      case "SSO":
        return {
          label: "Single Sign-On",
          icon: <FiShield />,
          placeholder: "SSO Login",
          secondField: null,
        };

      default:
        return {
          label: "Employee ID",
          icon: <FiUser />,
          placeholder: "Enter Employee ID",
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

  const get2FAMethod = () => {
    switch (config.twoFactor.type) {
      case "OTP_EMAIL":
        return "Email OTP";
      case "OTP_SMS":
        return "SMS OTP";
      case "SMS_EMAIL":
        return "SMS + Email OTP";
      case "AUTHENTICATOR":
        return "Google Authenticator";
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
        {/* ============================
            Candidate Portal
        ============================= */}

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

                {config.candidateLogin.enableForgotPassword && (
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

                {config.recruitmentLogin.enableForgotPassword && (
                  <span className="preview-link">Forgot Password?</span>
                )}
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
                        <strong>Forgot Password</strong>
                        <small>Password recovery is enabled.</small>
                      </div>

                      <Badge
                        bg={
                          config.recruitmentLogin.enableForgotPassword
                            ? "success"
                            : "secondary"
                        }
                      >
                        {config.recruitmentLogin.enableForgotPassword
                          ? "Enabled"
                          : "Disabled"}
                      </Badge>
                    </div>
                  </Col>

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
                        <strong>Force Password Change</strong>
                        <small>
                          Require password update after first login.
                        </small>
                      </div>

                      <Badge
                        bg={
                          config.recruitmentLogin.forcePasswordChange
                            ? "success"
                            : "secondary"
                        }
                      >
                        {config.recruitmentLogin.forcePasswordChange
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
                        bg={config.twoFactor.enabled ? "success" : "secondary"}
                      >
                        {config.twoFactor.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        )}

        {/* ===========================
            Two Factor Authentication
        =========================== */}

        {config.twoFactor.enabled && (
          <Form.Group className="mt-4">
            <Form.Label>2FA Method</Form.Label>

            <Form.Control
              className="preview-input"
              value={get2FAMethod()}
              readOnly
            />

            {config.twoFactor.expiry && (
              <small className="text-muted d-block mt-2">
                OTP Expiry : {config.twoFactor.expiry} Minutes
              </small>
            )}

            {config.twoFactor.resendCount && (
              <small className="text-muted d-block">
                Resend Attempts : {config.twoFactor.resendCount}
              </small>
            )}

            {config.twoFactor.cooldown && (
              <small className="text-muted d-block">
                Cooldown : {config.twoFactor.cooldown} Seconds
              </small>
            )}
          </Form.Group>
        )}
      </Card.Body>
    </Card>
  );
};

export default LoginPreview;
