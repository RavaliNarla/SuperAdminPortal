// src/pages/organizations/components/RecruitmentLoginSection.js

import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import {
    FiLogIn,
    FiUser,
    FiMail,
    FiKey,
    FiShield,
    FiLock,
    FiUsers,
} from "react-icons/fi";

import "../../../css/Section.css";

const loginMethods = [
    {
        value: "EMPLOYEE_ID",
        label: "Employee ID",
        icon: <FiUser />,
        description: "Login using Employee ID",
    },
    {
        value: "USERNAME",
        label: "Username",
        icon: <FiUser />,
        description: "Login using Username",
    },
    {
        value: "EMAIL",
        label: "Email",
        icon: <FiMail />,
        description: "Login using Email Address",
    },
    {
        value: "AD",
        label: "Microsoft Entra ID",
        icon: <FiShield />,
        description: "Azure Active Directory Authentication",
    },
    {
        value: "SSO",
        label: "Single Sign-On (SSO)",
        icon: <FiLock />,
        description: "Enterprise Single Sign-On",
    },
];

const RecruitmentLoginSection = ({ data, onChange }) => {
    return (
        <div className="recruitment-login-card mb-4">
            <div className="card-body">

                {/* Header */}

                <div className="recruitment-login-header">
                    <div>
                        <h5 className="recruitment-login-title">
                            <FiLogIn className="me-2" />
                            Recruitment Portal Login Configuration
                        </h5>

                        <p className="recruitment-login-subtitle">
                            Configure authentication methods and security settings for
                            recruitment portal users.
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
                                className={`recruitment-method-card ${data.defaultLoginMethod === item.value
                                        ? "active"
                                        : ""
                                    }`}
                                onClick={() =>
                                    onChange("defaultLoginMethod", item.value)
                                }
                            >
                                <div className="recruitment-method-left">
                                    <div className="recruitment-method-icon">
                                        {item.icon}
                                    </div>

                                    <div>
                                        <h6>{item.label}</h6>
                                        <small>{item.description}</small>
                                    </div>
                                </div>

                                <div
                                    className={`recruitment-radio ${data.defaultLoginMethod === item.value
                                            ? "active"
                                            : ""
                                        }`}
                                >
                                    <div className="recruitment-radio-dot"></div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>

                {/* Default Login */}

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
                                onChange={(e) =>
                                    onChange("defaultLoginMethod", e.target.value)
                                }
                            >
                                <option value="">Select Login Method</option>
                                <option value="EMPLOYEE_ID">Employee ID</option>
                                <option value="USERNAME">Username</option>
                                <option value="EMAIL">Email</option>
                                <option value="AD">Microsoft Entra ID</option>
                                <option value="SSO">Single Sign-On (SSO)</option>
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

                                    <p>
                                        Allow users to securely reset forgotten passwords.
                                    </p>
                                </div>

                            </div>

                            <Form.Check
                                className="setting-switch"
                                type="switch"
                                checked={data.enableForgotPassword || false}
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
                        <div className="setting-card">

                            <div className="setting-card-content">

                                <div className="setting-icon">
                                    <FiShield />
                                </div>

                                <div>
                                    <h6>Enable CAPTCHA</h6>

                                    <p>
                                        Protect the login page from automated bot attacks.
                                    </p>
                                </div>

                            </div>

                            <Form.Check
                                className="setting-switch"
                                type="switch"
                                checked={data.enableCaptcha || false}
                                onChange={(e) =>
                                    onChange(
                                        "enableCaptcha",
                                        e.target.checked
                                    )
                                }
                            />

                        </div>
                    </Col>

                    <Col lg={6}>
                        <div className="setting-card">

                            <div className="setting-card-content">

                                <div className="setting-icon">
                                    <FiLock />
                                </div>

                                <div>
                                    <h6>Force Password Change</h6>

                                    <p>
                                        Require users to change their password on first login.
                                    </p>
                                </div>

                            </div>

                            <Form.Check
                                className="setting-switch"
                                type="switch"
                                checked={data.forcePasswordChange || false}
                                onChange={(e) =>
                                    onChange(
                                        "forcePasswordChange",
                                        e.target.checked
                                    )
                                }
                            />

                        </div>
                    </Col>

                </Row>

            </div>
        </div>
    );
};

export default RecruitmentLoginSection;