import React from "react";
import { Card, Badge, Form, Button, Row, Col } from "react-bootstrap";
import {
  FiMail,
  FiShield,
  FiLock,
  FiCheckCircle,
  FiClock,
  FiUsers,
  FiMonitor,
} from "react-icons/fi";
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

  const passwordPolicy =
    config.portal === "candidate"
      ? config.candidatePassword
      : config.recruitmentPassword;

  const sessionPolicy =
    config.portal === "candidate"
      ? config.candidateSession
      : config.recruitmentSession;
  const get2FAMethod = () => {
    const methods = [];

    if (activeTwoFactor?.EMAIL_OTP) {
      methods.push("Email OTP");
    }

    if (activeTwoFactor?.SMS_OTP) {
      methods.push("SMS OTP");
    }

    return methods.length ? methods.join(" & ") : "Not Configured";
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

              <Button className="preview-login-btn w-100 mt-3" disabled>
                Login
              </Button>

              <div className="preview-divider" />
            </Card.Body>
          </Card>
        )}

        {activeTwoFactor?.enabled && (
          <Card className="preview-portal-card mt-4">
            <Card.Header>Two-Factor Authentication</Card.Header>

            <Card.Body>
              <div className="text-center mb-3">
                <div className="preview-avatar">
                  <FiShield />
                </div>

                <h6 className="mt-3">Verification Required</h6>

                <p className="text-muted mb-3">
                  {activeTwoFactor?.EMAIL_OTP && activeTwoFactor?.SMS_OTP
                    ? "Enter the OTPs sent to your Email and Mobile."
                    : activeTwoFactor?.EMAIL_OTP
                      ? "Enter the OTP sent to your Email."
                      : "Enter the OTP sent to your Mobile."}
                </p>
              </div>

              {activeTwoFactor?.EMAIL_OTP && (
                <Form.Group className="mb-3">
                  <Form.Label>Email OTP</Form.Label>
                  <Form.Control
                    className="preview-input"
                    placeholder="Enter Email OTP"
                    readOnly
                  />
                </Form.Group>
              )}

              {activeTwoFactor?.SMS_OTP && (
                <Form.Group className="mb-3">
                  <Form.Label>SMS OTP</Form.Label>
                  <Form.Control
                    className="preview-input"
                    placeholder="Enter SMS OTP"
                    readOnly
                  />
                </Form.Group>
              )}

              <Button className="preview-login-btn w-100" disabled>
                Verify
              </Button>
            </Card.Body>
          </Card>
        )}
        <Card className="preview-portal-card mt-4">
          <Card.Header className="d-flex align-items-center">
            <FiLock className="me-2 text-primary" />
            <span className="fw-semibold">Password Policy</span>
          </Card.Header>

          <Card.Body className="p-3">
            <div className="preview-setting">
              <span>Minimum Password Length</span>
              <Badge bg="primary">{passwordPolicy?.minLength || "--"}</Badge>
            </div>

            <div className="preview-setting">
              <span>Maximum Password Length</span>
              <Badge bg="primary">{passwordPolicy?.maxLength || "--"}</Badge>
            </div>

            <div className="preview-setting">
              <span>Uppercase Letter</span>
              <Badge bg={passwordPolicy?.uppercase ? "success" : "light"}>
                {passwordPolicy?.uppercase ? "Required" : "Optional"}
              </Badge>
            </div>

            <div className="preview-setting">
              <span>Lowercase Letter</span>
              <Badge bg={passwordPolicy?.lowercase ? "success" : "light"}>
                {passwordPolicy?.lowercase ? "Required" : "Optional"}
              </Badge>
            </div>

            <div className="preview-setting">
              <span>Numeric Character</span>
              <Badge bg={passwordPolicy?.number ? "success" : "light"}>
                {passwordPolicy?.number ? "Required" : "Optional"}
              </Badge>
            </div>

            <div className="preview-setting">
              <span>Special Character</span>
              <Badge
                bg={passwordPolicy?.specialCharacter ? "success" : "light"}
              >
                {passwordPolicy?.specialCharacter ? "Required" : "Optional"}
              </Badge>
            </div>

            <div className="preview-setting">
              <span>Password Expiry</span>
              <Badge
                bg={passwordPolicy?.enableExpiry ? "warning" : "secondary"}
              >
                {passwordPolicy?.enableExpiry
                  ? `${passwordPolicy.expiryDays} Days`
                  : "Disabled"}
              </Badge>
            </div>

            <div className="preview-setting border-bottom-0">
              <span>Password History</span>
              <Badge bg={passwordPolicy?.enableHistory ? "info" : "secondary"}>
                {passwordPolicy?.enableHistory ? "Enabled" : "Disabled"}
              </Badge>
            </div>
          </Card.Body>
        </Card>

        <Card className="preview-portal-card mt-4">
          <Card.Header className="d-flex align-items-center">
            <FiMonitor className="me-2 text-primary" />
            <span className="fw-semibold">Session Policy</span>
          </Card.Header>

          <Card.Body className="p-3">
            <div className="preview-setting">
              <span className="d-flex align-items-center">
                <FiClock className="me-2 text-muted" />
                Idle Timeout
              </span>

              <Badge bg="primary">
                {sessionPolicy?.idleTimeout
                  ? `${sessionPolicy.idleTimeout} min`
                  : "--"}
              </Badge>
            </div>

            <div className="preview-setting border-bottom-0">
              <span className="d-flex align-items-center">
                <FiUsers className="me-2 text-muted" />
                Concurrent Sessions
              </span>

              <Badge bg="info">
                {sessionPolicy?.concurrentSessions || "--"}
              </Badge>
            </div>
          </Card.Body>
        </Card>

        {/* {activeTwoFactor?.EMAIL_OTP && (
          <div className="mb-4">
            <Form.Group className="mb-2">
              <Form.Label>Email OTP</Form.Label>
              <Form.Control
                className="preview-input"
                placeholder="Enter Email OTP"
                readOnly
              />
            </Form.Group>

            <Button className="preview-login-btn w-100" disabled>
              Verify Email OTP
            </Button>
          </div>
        )}

        {activeTwoFactor?.SMS_OTP && (
          <div className="mb-3">
            <Form.Group className="mb-2">
              <Form.Label>SMS OTP</Form.Label>
              <Form.Control
                className="preview-input"
                placeholder="Enter SMS OTP"
                readOnly
              />
            </Form.Group>

            <Button className="preview-login-btn w-100" disabled>
              Verify SMS OTP
            </Button>
          </div>
        )} */}
      </Card.Body>
    </Card>
  );
};

export default LoginPreview;
