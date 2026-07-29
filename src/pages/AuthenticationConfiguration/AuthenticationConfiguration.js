import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";

import CandidateLoginSection from "./CandidateLoginSection";
import RecruitmentLoginSection from "./RecruitmentLoginSection";
import TwoFactorSection from "./components/TwoFactorSection";
// import OTPSettingsSection from "./components/OTPSettingsSection"; // commented out for now, see render call below
import PasswordPolicySection from "./components/PasswordPolicySection";
import SessionPolicySection from "./components/SessionPolicySection";
import LoginPreview from "./components/LoginPreview";
import AuthenticationFooter from "./AuthenticationFooter";
import "../../css/AuthenticationConfiguration.css";
import { useParams, Link } from "react-router-dom";
import authenticationApiService from "../AuthenticationConfiguration/services/authServices";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const AuthenticationConfiguration = () => {
  const organizationId = useAppSelector(
    (state) => state.eligibility.selectedOrganization,
  );
  console.log("Organization ID:", organizationId);
  const initialState = {
    portal: "",

    candidateLogin: {
      methods: { EMAIL_PASSWORD: true },
      allowRegistration: true,
      enableCaptcha: true,
      verifyEmail: true,
    },

    recruitmentLogin: {
      methods: { ENTRA_ID: false, EMAIL_PASSWORD: true },
      enableCaptcha: true,
    },

    twoFactor: {
      enabled: false,
      methods: { EMAIL_OTP: true, SMS_OTP: false },
    },

    otp: {
      method: "SMS",
      otpLength: 6,
      expiry: 5,
      resendCount: 3,
      retryCount: 3,
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
    },

    session: {
      idleTimeout: 15,
      concurrentSessions: 1,
    },
  };

  const [config, setConfig] = useState(initialState);
  useEffect(() => {
    if (organizationId) {
      fetchAuthenticationConfiguration();
    }
  }, [organizationId]);

  // Merges a fetched section over its default so a config saved before a
  // field existed (e.g. otpLength/retryCount, or the method toggles) can't
  // wipe that field back to blank/undefined — a plain shallow spread at the
  // top level would replace the whole section object wholesale instead of
  // filling in just what's missing. Also deep-merges `methods` sub-objects
  // specifically, since a fetched section only partially covering methods
  // would otherwise leave every method disabled.
  const mergeSection = (defaultsSection, fetchedSection) => ({
    ...defaultsSection,
    ...fetchedSection,
    ...(defaultsSection?.methods && {
      methods: { ...defaultsSection.methods, ...fetchedSection?.methods },
    }),
  });

  const fetchAuthenticationConfiguration = async () => {
    try {
      const response =
        await authenticationApiService.getAuthenticationConfiguration(
          organizationId,
        );

      console.log("GET Response:", response.data);

      const apiData = response?.data?.data?.authenticationJson || {};

      setConfig({
        ...initialState,
        ...apiData,
        candidateLogin: mergeSection(
          initialState.candidateLogin,
          apiData.candidateLogin,
        ),
        recruitmentLogin: mergeSection(
          initialState.recruitmentLogin,
          apiData.recruitmentLogin,
        ),
        twoFactor: mergeSection(initialState.twoFactor, apiData.twoFactor),
        otp: mergeSection(initialState.otp, apiData.otp),
        password: mergeSection(initialState.password, apiData.password),
        session: mergeSection(initialState.session, apiData.session),
      });
    } catch (error) {
      console.error("GET Error:", error);
    }
  };
  const handleChange = (section, field, value) => {
    setConfig((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      console.log("Saving Configuration", organizationId, config);

      const response =
        await authenticationApiService.updateAuthenticationConfiguration(
          organizationId,
          config,
        );

      console.log("POST Response:", response.data);

      // Reload configuration after saving
      await fetchAuthenticationConfiguration();

      alert("Configuration Saved Successfully");
    } catch (error) {
      console.error("Save Error:", error);

      alert(error.response?.data?.message || "Failed to save configuration.");
    }
  };

  // const handleSave = async () => {
  //   try {
  //     console.log("Saving Configuration", organizationId, config);

  //     const response =
  //       await authenticationApiService.saveAuthenticationConfiguration(
  //         organizationId,
  //         config,
  //       );

  //     console.log(response.data);

  //     alert("Configuration Saved Successfully");
  //   } catch (error) {
  //     console.error(error);

  //     alert(error.response?.data?.message || "Failed to save configuration.");
  //   }
  // };

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
    <Container fluid className="authentication-page py-4 px-lg-4 px-3">
      <Row className="g-4">
        {/* Left Section */}
        <Col xl={8} lg={8}>
          <Card className="auth-config-card shadow-sm border-0">
            <Card.Header className="authentication-header border-0">
              <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
                {/* Left Side */}
                <div className="d-flex align-items-center gap-3">
                  <div className="header-icon">
                    <i className="bi bi-shield-lock-fill"></i>
                  </div>

                  <div>
                    <h2 className="authentication-title mb-1">
                      Authentication Configuration
                    </h2>

                    <p className="authentication-subtitle mb-0">
                      Configure login methods, security policies, password
                      policies, two-factor authentication, OTP settings, and
                      session management for your portals.
                    </p>
                  </div>
                </div>
              </div>
            </Card.Header>

            <Card.Body className="p-4">
              {/* Portal Selection */}

              <Card className="border-0 shadow-sm mb-4">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h5 className="fw-bold mb-1">Select Portal</h5>

                      <small className="text-muted">
                        Choose the portal whose authentication settings you want
                        to configure.
                      </small>
                    </div>
                  </div>

                  <Form.Group>
                    <Form.Label className="fw-semibold">Portal</Form.Label>

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
                      <option value="">Select Portal</option>

                      <option value="candidate">Candidate Portal</option>

                      <option value="recruitment">Recruitment Portal</option>

                      <option value="both">Candidate + Recruitment</option>
                    </Form.Select>
                  </Form.Group>
                </Card.Body>
              </Card>

              {(config.portal === "candidate" || config.portal === "both") && (
                <CandidateLoginSection
                  data={config.candidateLogin}
                  onChange={(field, value) =>
                    handleChange("candidateLogin", field, value)
                  }
                />
              )}

              {(config.portal === "recruitment" ||
                config.portal === "both") && (
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

              {/* OTP Settings — commented out for now, pending decision on
                  the Email OTP / SMS OTP "both enabled" semantics (2FA
                  section) before re-enabling. */}
              {/* <OTPSettingsSection
                data={config.otp}
                onChange={(field, value) => handleChange("otp", field, value)}
              /> */}

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

        {/* Right Preview */}

        <Col xl={4} lg={4} className="d-none d-lg-block">
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
