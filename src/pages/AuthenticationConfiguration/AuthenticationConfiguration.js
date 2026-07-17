import React, { useState } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";

import CandidateLoginSection from "./CandidateLoginSection";
import RecruitmentLoginSection from "./RecruitmentLoginSection";
import TwoFactorSection from "./components/TwoFactorSection";
import OTPSettingsSection from "./components/OTPSettingsSection";
import PasswordPolicySection from "./components/PasswordPolicySection";
import SessionPolicySection from "./components/SessionPolicySection";
import LoginPreview from "./components/LoginPreview";
import AuthenticationFooter from "./AuthenticationFooter";

const AuthenticationConfiguration = () => {
  const initialState = {
    portal: "",
    candidateLogin: {
      username: true,
      email: false,
      mobile: false,
      aadhaar: false,
      pan: false,
      defaultLoginMethod: "",
      enableForgotPassword: true,
      allowRegistration: true,
      enableCaptcha: true,
    },

    recruitmentLogin: {
      employeeId: true,
      username: true,
      email: false,
      adLogin: false,
      sso: false,
      defaultLoginMethod: "",
      enableForgotPassword: true,
      enableCaptcha: true,
      forcePasswordChange: false,
    },

    twoFactor: {
      enabled: false,
      type: "",
      expiry: 5,
      resendCount: 3,
      cooldown: 30,
      rememberDevice: false,
    },

    otp: {
      method: "SMS",
      expiry: 5,
      resendCount: 3,
      cooldown: 30,
      loginOtp: true,
      passwordResetOtp: true,
      maskMobile: true,
      maskEmail: true,
    },

    password: {
      minLength: 8,
      maxLength: 20,
      uppercase: true,
      lowercase: true,
      number: true,
      specialCharacter: true,
      enableExpiry: true,
      enableHistory: true,
      expiryDays: 90,
      historyCount: 5,
      lockAttempts: 5,
      unlockDuration: 30,
      forceChangeOnFirstLogin: false,
    },

    session: {
      idleTimeout: 15,
      absoluteTimeout: 60,
      concurrentSessions: 1,
      rememberMe: false,
      browserCloseLogout: true,
    },
  };

  const [config, setConfig] = useState(initialState);

  const handleChange = (section, field, value) => {
    setConfig((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    console.log(config);
    alert("Configuration Saved Successfully");
  };

  const handleReset = () => {
    setConfig(initialState);
  };

  const handleCancel = () => {
    alert("Cancelled");
  };

  const handlePublish = () => {
    alert("Published Successfully");
  };

  return (
    <Container fluid className="py-4">
      <Row>
        <Col lg={8}>
          <Card className="auth-config-card">
            <Card.Header>
              <h4>Authentication Configuration</h4>
            </Card.Header>

            <Card.Body>
              <div className="portal-selection-card mb-4">

                <div className="portal-selection-header">

                  <div>

                    <h5>Select Portal</h5>

                    <p>
                      Choose which portal you want to configure.
                    </p>

                  </div>

                </div>

                <Form.Select
                  className="portal-select"
                  value={config.portal}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      portal: e.target.value,
                    })
                  }
                >
                  <option value="">
                    Select Portal
                  </option>

                  <option value="candidate">
                    Candidate Portal
                  </option>

                  <option value="recruitment">
                    Recruitment Portal
                  </option>

                  <option value="both">
                    Candidate + Recruitment
                  </option>

                </Form.Select>

              </div>
              {(config.portal === "candidate" || config.portal === "both") && (
                <CandidateLoginSection
                  data={config.candidateLogin}
                  onChange={(field, value) =>
                    handleChange("candidateLogin", field, value)
                  }
                />
              )}

              {(config.portal === "recruitment" || config.portal === "both") && (
                <RecruitmentLoginSection
                  data={config.recruitmentLogin}
                  onChange={(field, value) =>
                    handleChange("recruitmentLogin", field, value)
                  }
                />
              )}
              <TwoFactorSection
                data={config.twoFactor}
                onChange={(field, value) =>
                  handleChange("twoFactor", field, value)
                }
              />

              <OTPSettingsSection
                data={config.otp}
                onChange={(field, value) =>
                  handleChange("otp", field, value)
                }
              />

              <PasswordPolicySection
                data={config.password}
                onChange={(field, value) =>
                  handleChange("password", field, value)
                }
              />

              <SessionPolicySection
                data={config.session}
                onChange={(field, value) =>
                  handleChange("session", field, value)
                }
              />

            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} className="d-none d-lg-block">
          <div className="login-preview-wrapper">
            <LoginPreview config={config} />
          </div>
        </Col>
      </Row>

      <AuthenticationFooter
        onSave={handleSave}
        onReset={handleReset}
        onCancel={handleCancel}
        onPublish={handlePublish}
      />
    </Container>
  );
};

export default AuthenticationConfiguration;