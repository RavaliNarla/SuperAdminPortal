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
import authenticationApiService from "../AuthenticationConfiguration/services/authServices";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const AuthenticationConfiguration = () => {
  const organizationId = useAppSelector(
    (state) => state.eligibility.selectedOrganization,
  );
  const organizations = useAppSelector((state) => state.organizations.items);

  const selectedOrganization = organizations.find(
    (org) => String(org.id) === String(organizationId),
  );
  const initialState = {
    portal: "candidate",

    candidateLogin: {
      EMAIL_PASSWORD: true,
      defaultLoginMethod: "EMAIL_PASSWORD",
    },

    recruitmentLogin: {
      ENTRA_ID: false,
      EMAIL_PASSWORD: true,
      enableCaptcha: true,
      defaultLoginMethod: "EMAIL_PASSWORD",
    },

    candidateTwoFactor: {
      enabled: false,
      EMAIL_OTP: false,
      SMS_OTP: false,
    },

    recruitmentTwoFactor: {
      enabled: false,
      EMAIL_OTP: false,
      SMS_OTP: false,
    },

    candidatePassword: {
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

    recruitmentPassword: {
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

    candidateSession: {
      idleTimeout: 15,
      concurrentSessions: 1,
    },

    recruitmentSession: {
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

  const toCamelCase = (key) =>
    key.toLowerCase().replace(/_([a-z])/g, (_, c) => c.toUpperCase());

  const camelCaseKeys = (obj = {}) =>
    Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [toCamelCase(key), value]),
    );

  const extractMethods = (fetchedSection, methodKeys) => {
    const result = {};
    methodKeys.forEach((key) => {
      const camelKey = toCamelCase(key);
      if (fetchedSection?.[camelKey] !== undefined) {
        result[key] = fetchedSection[camelKey];
      }
    });
    return result;
  };

  const mergeSection = (defaultsSection, fetchedSection, methodKeys) => ({
    ...defaultsSection,
    ...fetchedSection,
    ...(methodKeys && {
      methods: {
        ...defaultsSection.methods,
        ...extractMethods(fetchedSection, methodKeys),
      },
    }),
  });

  const fetchAuthenticationConfiguration = async () => {
    try {
      const response =
        await authenticationApiService.getAuthenticationConfiguration(
          organizationId,
        );

      // console.log("GET Response:", response.data);

      const apiData = response?.data?.data?.authenticationJson || {};

      setConfig({
        ...initialState,
        ...apiData,
        candidateLogin: mergeSection(
          initialState.candidateLogin,
          apiData.candidatePortal?.login,
          ["EMAIL_PASSWORD"],
        ),

        recruitmentLogin: mergeSection(
          initialState.recruitmentLogin,
          apiData.recruitmentPortal?.login,
          ["EMAIL_PASSWORD", "ENTRA_ID"],
        ),

        candidateTwoFactor: mergeSection(
          initialState.candidateTwoFactor,
          apiData.candidatePortal?.twoFactor,
          ["EMAIL_OTP", "SMS_OTP"],
        ),

        recruitmentTwoFactor: mergeSection(
          initialState.recruitmentTwoFactor,
          apiData.recruitmentPortal?.twoFactor,
          ["EMAIL_OTP", "SMS_OTP"],
        ),

        candidatePassword: mergeSection(
          initialState.candidatePassword,
          apiData.candidatePortal?.password,
        ),

        recruitmentPassword: mergeSection(
          initialState.recruitmentPassword,
          apiData.recruitmentPortal?.password,
        ),

        candidateSession: mergeSection(
          initialState.candidateSession,
          apiData.candidatePortal?.session,
        ),

        recruitmentSession: mergeSection(
          initialState.recruitmentSession,
          apiData.recruitmentPortal?.session,
        ),
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

  const buildSavePayload = (fullConfig) => ({
    orgCode: selectedOrganization?.orgCode || "",

    candidatePortal: {
      login: {
        EMAIL_PASSWORD: fullConfig.candidateLogin.EMAIL_PASSWORD,
        defaultLoginMethod: fullConfig.candidateLogin.defaultLoginMethod,
      },

      twoFactor: {
        enabled: fullConfig.candidateTwoFactor.enabled,
        EMAIL_OTP: fullConfig.candidateTwoFactor.EMAIL_OTP,
        SMS_OTP: fullConfig.candidateTwoFactor.SMS_OTP,
      },

      password: fullConfig.candidatePassword,

      session: fullConfig.candidateSession,
    },

    recruitmentPortal: {
      login: {
        ENTRA_ID: fullConfig.recruitmentLogin.ENTRA_ID,
        EMAIL_PASSWORD: fullConfig.recruitmentLogin.EMAIL_PASSWORD,
        enableCaptcha: fullConfig.recruitmentLogin.enableCaptcha,
        defaultLoginMethod: fullConfig.recruitmentLogin.defaultLoginMethod,
      },

      twoFactor: {
        enabled: fullConfig.recruitmentTwoFactor.enabled,
        EMAIL_OTP: fullConfig.recruitmentTwoFactor.EMAIL_OTP,
        SMS_OTP: fullConfig.recruitmentTwoFactor.SMS_OTP,
      },

      password: fullConfig.recruitmentPassword,

      session: fullConfig.recruitmentSession,
    },
  });

  // const buildSavePayload = (fullConfig) => {
  //   const payload = {
  //     orgCode: selectedOrganization?.orgCode || "",
  //     portal: fullConfig.portal,
  //   };

  //   if (fullConfig.portal === "candidate") {
  //     payload.candidateLogin = {
  //       EMAIL_PASSWORD: fullConfig.candidateLogin.EMAIL_PASSWORD,
  //       defaultLoginMethod: fullConfig.candidateLogin.defaultLoginMethod,
  //     };

  //     payload.candidateTwoFactor = {
  //       enabled: fullConfig.candidateTwoFactor.enabled,
  //       EMAIL_OTP: fullConfig.candidateTwoFactor.EMAIL_OTP,
  //       SMS_OTP: fullConfig.candidateTwoFactor.SMS_OTP,
  //     };
  //   }

  //   if (fullConfig.portal === "recruitment") {
  //     payload.recruitmentLogin = {
  //       ENTRA_ID: fullConfig.recruitmentLogin.ENTRA_ID,
  //       EMAIL_PASSWORD: fullConfig.recruitmentLogin.EMAIL_PASSWORD,
  //       defaultLoginMethod: fullConfig.recruitmentLogin.defaultLoginMethod,
  //     };

  //     payload.recruitmentTwoFactor = {
  //       enabled: fullConfig.recruitmentTwoFactor.enabled,
  //       EMAIL_OTP: fullConfig.recruitmentTwoFactor.EMAIL_OTP,
  //       SMS_OTP: fullConfig.recruitmentTwoFactor.SMS_OTP,
  //     };
  //   }

  //   payload.password = {
  //     minLength: fullConfig.password.minLength,
  //     maxLength: fullConfig.password.maxLength,
  //     uppercase: fullConfig.password.uppercase,
  //     lowercase: fullConfig.password.lowercase,
  //     number: fullConfig.password.number,
  //     specialCharacter: fullConfig.password.specialCharacter,
  //     enableExpiry: fullConfig.password.enableExpiry,
  //     enableHistory: fullConfig.password.enableHistory,
  //     expiryDays: fullConfig.password.expiryDays,
  //   };

  //   payload.session = {
  //     idleTimeout: fullConfig.session.idleTimeout,
  //     concurrentSessions: fullConfig.session.concurrentSessions,
  //   };

  //   return payload;
  // };

  const handleSave = async () => {
    try {
      const payload = buildSavePayload(config);
      // console.log("Saving Configuration", organizationId, payload);

      const response =
        await authenticationApiService.updateAuthenticationConfiguration(
          organizationId,
          payload,
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
                  <div className="mb-3">
                    <h5 className="fw-bold mb-1">Select Portal</h5>

                    <small className="text-muted">
                      Choose the portal whose authentication settings you want
                      to configure.
                    </small>
                  </div>

                  <div className="portal-tabs">
                    <button
                      type="button"
                      className={`portal-tab ${
                        config.portal === "candidate" ? "active" : ""
                      }`}
                      onClick={() =>
                        setConfig({
                          ...config,
                          portal: "candidate",
                        })
                      }
                    >
                      <i className="bi bi-person-circle me-2"></i>
                      Candidate Portal
                    </button>

                    <button
                      type="button"
                      className={`portal-tab ${
                        config.portal === "recruitment" ? "active" : ""
                      }`}
                      onClick={() =>
                        setConfig({
                          ...config,
                          portal: "recruitment",
                        })
                      }
                    >
                      <i className="bi bi-briefcase-fill me-2"></i>
                      Recruiter Portal
                    </button>
                  </div>
                </Card.Body>
              </Card>
              {config.portal === "candidate" && (
                <CandidateLoginSection
                  data={config.candidateLogin}
                  onChange={(field, value) =>
                    handleChange("candidateLogin", field, value)
                  }
                />
              )}

              {config.portal === "recruitment" && (
                <RecruitmentLoginSection
                  data={config.recruitmentLogin}
                  onChange={(field, value) =>
                    handleChange("recruitmentLogin", field, value)
                  }
                />
              )}

              {config.portal === "candidate" && (
                <TwoFactorSection
                  title="Candidate Two-Factor Authentication"
                  data={config.candidateTwoFactor}
                  onChange={(field, value) =>
                    handleChange("candidateTwoFactor", field, value)
                  }
                />
              )}

              {config.portal === "recruitment" && (
                <TwoFactorSection
                  title="Recruitment Two-Factor Authentication"
                  data={config.recruitmentTwoFactor}
                  onChange={(field, value) =>
                    handleChange("recruitmentTwoFactor", field, value)
                  }
                />
              )}

              <PasswordPolicySection
                data={
                  config.portal === "candidate"
                    ? config.candidatePassword
                    : config.recruitmentPassword
                }
                onChange={(field, value) =>
                  handleChange(
                    config.portal === "candidate"
                      ? "candidatePassword"
                      : "recruitmentPassword",
                    field,
                    value,
                  )
                }
              />
              <SessionPolicySection
                data={
                  config.portal === "candidate"
                    ? config.candidateSession
                    : config.recruitmentSession
                }
                onChange={(field, value) =>
                  handleChange(
                    config.portal === "candidate"
                      ? "candidateSession"
                      : "recruitmentSession",
                    field,
                    value,
                  )
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
