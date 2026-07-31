import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { showToast } from "../../utils/customToast";

import { FiCheckCircle, FiAlertCircle, FiTrash2 } from "react-icons/fi";

const AuthenticationConfiguration = () => {
  const navigate = useNavigate();
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
      EMAIL_PASSWORD: false,
      defaultLoginMethod: "",
    },

    recruitmentLogin: {
      ENTRA_ID: false,
      EMAIL_PASSWORD: false,
      enableCaptcha: false,
      defaultLoginMethod: "",
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
      minLength: "",
      maxLength: "",
      uppercase: false,
      lowercase: false,
      number: false,
      specialCharacter: false,
      enableExpiry: false,
      enableHistory: false,
      expiryDays: "",
      historyCount: "",
      lockAttempts: "",
      unlockDuration: "",
    },

    recruitmentPassword: {
      minLength: "",
      maxLength: "",
      uppercase: false,
      lowercase: false,
      number: false,
      specialCharacter: false,
      enableExpiry: false,
      enableHistory: false,
      expiryDays: "",
      historyCount: "",
      lockAttempts: "",
      unlockDuration: "",
    },

    candidateSession: {
      idleTimeout: "",
      concurrentSessions: "",
    },

    recruitmentSession: {
      idleTimeout: "",
      concurrentSessions: "",
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
  const [loading, setLoading] = useState(false);
  const fetchAuthenticationConfiguration = async () => {
    try {
      const response =
        await authenticationApiService.getAuthenticationConfiguration(
          organizationId,
        );

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

  const handleSave = async () => {
    try {
      setLoading(true);

      const payload = buildSavePayload(config);

      await authenticationApiService.updateAuthenticationConfiguration(
        organizationId,
        payload,
      );

      await fetchAuthenticationConfiguration();

      showToast({
        type: "success",
        message: "Authentication configuration saved successfully.",
      });
    } catch (error) {
      showToast({
        type: "error",
        message:
          error.response?.data?.message ||
          "Failed to save authentication configuration.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDiscard = () => {
    setConfig(initialState);

    showToast({
      type: "warning",
      message: "All changes have been discarded.",
    });
  };

  const handleCancel = () => {
    setConfig(initialState);

    showToast({
      type: "warning",
      message: "Changes discarded.",
    });

    navigate("/organizations");
  };

  const handleDraft = () => {
    showToast({
      type: "info",
      message: "Draft saved successfully.",
    });
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
                <div className="d-flex align-items-center gap-2">
                  <div className="header-icon">
                    <i className="bi bi-shield-lock-fill"></i>
                  </div>

                  <div>
                    <h4 className="authentication-title mb-1">
                      Authentication Configuration
                    </h4>

                    <p className="authentication-subtitle mb-0">
                      Configure login methods, password policies, two-factor
                      authentication, and session management.
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

                  <ul className="nav nav-tabs custom-portal-tabs">
                    <li className="nav-item">
                      <button
                        type="button"
                        className={`nav-link ${
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
                    </li>

                    <li className="nav-item">
                      <button
                        type="button"
                        className={`nav-link ${
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
                    </li>
                  </ul>
                </Card.Body>
              </Card>
              {/* <Card className="border-0 shadow-sm mb-4">
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
              </Card> */}
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
        onDraft={handleDraft}
        onDiscard={handleDiscard}
        onCancel={handleCancel}
        loading={loading}
      />
    </Container>
  );
};

export default AuthenticationConfiguration;
