// src/pages/organizations/components/RecruitmentLoginSection.js

import React from "react";
import { Card, Row, Col, Form } from "react-bootstrap";

const RecruitmentLoginSection = ({ data, onChange }) => {
    return (
        <Card className="shadow-sm mb-4">
            <Card.Header className="bg-success text-white">
                <h5 className="mb-0">Recruitment Portal Login Configuration</h5>
            </Card.Header>

            <Card.Body>
                <Row>
                    <Col md={4}>
                        <Form.Check
                            type="radio"
                            name="recruitmentLogin"
                            label="Employee ID"
                            checked={data.defaultLoginMethod === "EMPLOYEE_ID"}
                            onChange={() =>
                                onChange("defaultLoginMethod", "EMPLOYEE_ID")
                            }
                        />
                    </Col>

                    <Col md={4}>
                        <Form.Check
                            type="radio"
                            name="recruitmentLogin"
                            label="Username"
                            checked={data.defaultLoginMethod === "USERNAME"}
                            onChange={() =>
                                onChange("defaultLoginMethod", "USERNAME")
                            }
                        />
                    </Col>

                    <Col md={4}>
                        <Form.Check
                            type="radio"
                            name="recruitmentLogin"
                            label="Email"
                            checked={data.defaultLoginMethod === "EMAIL"}
                            onChange={() =>
                                onChange("defaultLoginMethod", "EMAIL")
                            }
                        />
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col md={4}>
                        <Form.Check
                            type="radio"
                            name="recruitmentLogin"
                            label="Microsoft Entra ID"
                            checked={data.defaultLoginMethod === "AD"}
                            onChange={() =>
                                onChange("defaultLoginMethod", "AD")
                            }
                        />
                    </Col>

                    <Col md={4}>
                        <Form.Check
                            type="radio"
                            name="recruitmentLogin"
                            label="Single Sign-On (SSO)"
                            checked={data.defaultLoginMethod === "SSO"}
                            onChange={() =>
                                onChange("defaultLoginMethod", "SSO")
                            }
                        />
                    </Col>
                </Row>
                <hr />

                <Form.Group className="mb-3">
                    <Form.Label>Default Login Method</Form.Label>

                    <Form.Select
                        value={data.defaultLoginMethod || ""}
                        onChange={(e) =>
                            onChange("defaultLoginMethod", e.target.value)
                        }
                    >
                        <option value="">Select Login Method</option>
                        <option value="EMPLOYEE_ID">Employee ID</option>
                        <option value="USERNAME">Username</option>
                        <option value="EMAIL">Email</option>
                        <option value="AD">Active Directory</option>
                        <option value="SSO">Single Sign-On (SSO)</option>
                    </Form.Select>
                </Form.Group>

                <Form.Check
                    className="mb-3"
                    type="switch"
                    id="forgot-password"
                    label="Enable Forgot Password"
                    checked={data.enableForgotPassword || false}
                    onChange={(e) =>
                        onChange("enableForgotPassword", e.target.checked)
                    }
                />

                <Form.Check
                    className="mb-3"
                    type="switch"
                    id="captcha"
                    label="Enable CAPTCHA"
                    checked={data.enableCaptcha || false}
                    onChange={(e) =>
                        onChange("enableCaptcha", e.target.checked)
                    }
                />

                <Form.Check
                    type="switch"
                    id="force-password-change"
                    label="Force Password Change on First Login"
                    checked={data.forcePasswordChange || false}
                    onChange={(e) =>
                        onChange("forcePasswordChange", e.target.checked)
                    }
                />
            </Card.Body>
        </Card>
    );
};

export default RecruitmentLoginSection;