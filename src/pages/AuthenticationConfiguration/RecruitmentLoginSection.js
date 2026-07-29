// src/pages/organizations/components/RecruitmentLoginSection.js

import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import {
    FiLogIn,
    FiMail,
    FiShield,
    FiUsers,
} from "react-icons/fi";

import "../../css/Section.css";

// Roadmap Module 2 — Recruitment Portal Authentication supports exactly
// these two methods: Microsoft Entra ID, Email + Password.
const loginMethods = [
    {
        value: "ENTRA_ID",
        label: "Microsoft Entra ID",
        icon: <FiShield />,
        description: "Azure Active Directory Authentication",
    },
    {
        value: "EMAIL_PASSWORD",
        label: "Email + Password",
        icon: <FiMail />,
        description: "Login using Email Address and Password",
    },
];

const RecruitmentLoginSection = ({ data, onChange }) => {
    const methods = data.methods || {};

    const toggleMethod = (value, checked) => {
        onChange("methods", { ...methods, [value]: checked });
    };

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
                            <div className="setting-card h-100">
                                <div className="setting-card-content">
                                    <div className="setting-icon">
                                        {item.icon}
                                    </div>

                                    <div>
                                        <h6>{item.label}</h6>
                                        <p>{item.description}</p>
                                    </div>
                                </div>

                                <Form.Check
                                    className="setting-switch"
                                    type="switch"
                                    checked={!!methods[item.value]}
                                    onChange={(e) =>
                                        toggleMethod(item.value, e.target.checked)
                                    }
                                />
                            </div>
                        </Col>
                    ))}
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

                </Row>

            </div>
        </div>
    );
};

export default RecruitmentLoginSection;
