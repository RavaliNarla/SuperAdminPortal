// src/pages/organizations/components/CandidateLoginSection.js

import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import {
    FiLogIn,
    FiUser,
    FiMail,
    FiSmartphone,
    FiCreditCard,
    FiKey,
    FiShield,
    FiUserPlus,
    FiCheckCircle,
} from "react-icons/fi";

import "../../../css/Section.css";

const loginMethods = [
    {
        value: "USERNAME",
        label: "Username",
        icon: <FiUser />,
        description: "Login using Username",
    },
    {
        value: "EMAIL",
        label: "Email Address",
        icon: <FiMail />,
        description: "Login using Email",
    },
    {
        value: "MOBILE",
        label: "Mobile Number",
        icon: <FiSmartphone />,
        description: "Login using Mobile",
    },
    {
        value: "AADHAAR",
        label: "Aadhaar Number",
        icon: <FiCreditCard />,
        description: "Login using Aadhaar",
    },
    {
        value: "PAN",
        label: "PAN Number",
        icon: <FiCreditCard />,
        description: "Login using PAN",
    },
];

const CandidateLoginSection = ({ data, onChange }) => {
    return (
        <div className="candidate-login-card">

            {/* Header */}

            <div className="candidate-header">
                <div>
                    <h4>
                        <FiLogIn className="me-2" />
                        Candidate Portal Login
                    </h4>

                    <p>
                        Configure authentication and registration settings for
                        candidates.
                    </p>
                </div>
            </div>

            {/* Login Methods */}

            <h5 className="candidate-section-title">
                Choose Login Method
            </h5>

            <Row className="g-3 mb-4">
                {loginMethods.map((item) => (
                    <Col lg={4} md={6} key={item.value}>
                        <div
                            className={`candidate-method-card ${data.defaultLoginMethod === item.value ? "active" : ""
                                }`}
                            onClick={() =>
                                onChange("defaultLoginMethod", item.value)
                            }
                        >
                            <div className="candidate-method-left">
                                <div className="candidate-method-icon">
                                    {item.icon}
                                </div>

                                <div>
                                    <h6>{item.label}</h6>
                                    <small>{item.description}</small>
                                </div>
                            </div>

                            <div
                                className={`candidate-radio ${data.defaultLoginMethod === item.value
                                    ? "active"
                                    : ""
                                    }`}
                            >
                                <div className="candidate-radio-dot"></div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>

            {/* Default Login */}

            <Row className="mb-4">
                <Col lg={6}>
                    <Form.Label className="candidate-label">
                        Default Login Method
                    </Form.Label>

                    <Form.Select
                        className="candidate-input"
                        value={data.defaultLoginMethod || ""}
                        onChange={(e) =>
                            onChange(
                                "defaultLoginMethod",
                                e.target.value
                            )
                        }
                    >
                        <option value="">
                            Select Login Method
                        </option>

                        {loginMethods.map((item) => (
                            <option
                                key={item.value}
                                value={item.value}
                            >
                                {item.label}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>

            {/* Portal Settings */}

            <h5 className="candidate-section-title">
                Portal Settings
            </h5>

            <Row className="g-3">

                <Col lg={6}>
                    <div className="candidate-setting-card">

                        <div className="candidate-setting-left">

                            <div className="candidate-setting-icon">
                                <FiKey />
                            </div>

                            <div>
                                <h6>Forgot Password</h6>

                                <small>
                                    Allow candidates to recover their
                                    passwords securely.
                                </small>
                            </div>

                        </div>

                        <Form.Check
                            type="switch"
                            checked={
                                data.enableForgotPassword ||
                                false
                            }
                            onChange={(e) =>
                                onChange(
                                    "enableForgotPassword",
                                    e.target.checked
                                )
                            }
                        />

                    </div>
                </Col>

                <Col lg={6}>
                    <div className="candidate-setting-card">

                        <div className="candidate-setting-left">

                            <div className="candidate-setting-icon">
                                <FiUserPlus />
                            </div>

                            <div>
                                <h6>Allow Self Registration</h6>

                                <small>
                                    Let candidates create their own
                                    accounts.
                                </small>
                            </div>

                        </div>

                        <Form.Check
                            type="switch"
                            checked={
                                data.allowRegistration || false
                            }
                            onChange={(e) =>
                                onChange(
                                    "allowRegistration",
                                    e.target.checked
                                )
                            }
                        />

                    </div>
                </Col>

                <Col lg={6}>
                    <div className="candidate-setting-card">

                        <div className="candidate-setting-left">

                            <div className="candidate-setting-icon">
                                <FiShield />
                            </div>

                            <div>
                                <h6>Enable CAPTCHA</h6>

                                <small>
                                    Protect the portal from spam and
                                    bots.
                                </small>
                            </div>

                        </div>

                        <Form.Check
                            type="switch"
                            checked={
                                data.enableCaptcha || false
                            }
                            onChange={(e) =>
                                onChange(
                                    "enableCaptcha",
                                    e.target.checked
                                )
                            }
                        />

                    </div>
                </Col>

            </Row>

            {/* Verification */}

            <h5 className="candidate-section-title mt-5">
                Registration Verification
            </h5>

            <Row className="g-3">

                <Col lg={6}>
                    <div className="candidate-option-card">
                        <div className="candidate-option-left">
                            <div className="candidate-option-icon">
                                <FiSmartphone />
                            </div>

                            <div>
                                <h6>Verify Mobile using OTP</h6>
                                <small>
                                    Candidate must verify their mobile number before registration.
                                </small>
                            </div>
                        </div>

                        <Form.Check
                            type="switch"
                            className="candidate-switch"
                            checked={data.mobileOtp || false}
                            onChange={(e) =>
                                onChange("mobileOtp", e.target.checked)
                            }
                        />
                    </div>
                </Col>

                <Col lg={6}>
                    <div className="candidate-option-card">
                        <div className="candidate-option-left">
                            <div className="candidate-option-icon">
                                <FiMail />
                            </div>

                            <div>
                                <h6>Verify Email using OTP</h6>
                                <small>
                                    Candidate must verify their email before activation.
                                </small>
                            </div>
                        </div>

                        <Form.Check
                            type="switch"
                            className="candidate-switch"
                            checked={data.emailOtp || false}
                            onChange={(e) =>
                                onChange("emailOtp", e.target.checked)
                            }
                        />
                    </div>
                </Col>

                <Col lg={6}>
                    <div className="candidate-option-card">
                        <div className="candidate-option-left">
                            <div className="candidate-option-icon">
                                <FiCreditCard />
                            </div>

                            <div>
                                <h6>Aadhaar Verification</h6>
                                <small>
                                    Validate Aadhaar details during registration.
                                </small>
                            </div>
                        </div>

                        <Form.Check
                            type="switch"
                            className="candidate-switch"
                            checked={data.aadhaarVerification || false}
                            onChange={(e) =>
                                onChange("aadhaarVerification", e.target.checked)
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
                                <h6>PAN Verification</h6>
                                <small>
                                    Validate PAN details during registration.
                                </small>
                            </div>
                        </div>

                        <Form.Check
                            type="switch"
                            className="candidate-switch"
                            checked={data.panVerification || false}
                            onChange={(e) =>
                                onChange("panVerification", e.target.checked)
                            }
                        />
                    </div>
                </Col>

            </Row>
            {/* Recovery */}

            <h5 className="candidate-section-title mt-5">
                Password Recovery Options
            </h5>

            <Row className="g-3">

                <Col lg={4}>
                    <div className="candidate-option-card">
                        <div className="candidate-option-left">
                            <div className="candidate-option-icon">
                                <FiSmartphone />
                            </div>

                            <div>
                                <h6>Mobile OTP</h6>
                                <small>
                                    Recover password using mobile OTP.
                                </small>
                            </div>
                        </div>

                        <Form.Check
                            type="switch"
                            className="candidate-switch"
                            checked={data.mobileRecovery || false}
                            onChange={(e) =>
                                onChange(
                                    "mobileRecovery",
                                    e.target.checked
                                )
                            }
                        />
                    </div>
                </Col>

                <Col lg={4}>
                    <div className="candidate-option-card">
                        <div className="candidate-option-left">
                            <div className="candidate-option-icon">
                                <FiMail />
                            </div>

                            <div>
                                <h6>Email OTP</h6>
                                <small>
                                    Recover password using email OTP.
                                </small>
                            </div>
                        </div>

                        <Form.Check
                            type="switch"
                            className="candidate-switch"
                            checked={data.emailRecovery || false}
                            onChange={(e) =>
                                onChange(
                                    "emailRecovery",
                                    e.target.checked
                                )
                            }
                        />
                    </div>
                </Col>

                <Col lg={4}>
                    <div className="candidate-option-card">
                        <div className="candidate-option-left">
                            <div className="candidate-option-icon">
                                <FiShield />
                            </div>

                            <div>
                                <h6>Security Questions</h6>
                                <small>
                                    Recover password using security questions.
                                </small>
                            </div>
                        </div>

                        <Form.Check
                            type="switch"
                            className="candidate-switch"
                            checked={data.securityQuestions || false}
                            onChange={(e) =>
                                onChange(
                                    "securityQuestions",
                                    e.target.checked
                                )
                            }
                        />
                    </div>
                </Col>

            </Row>

        </div>
    );
};

export default CandidateLoginSection;