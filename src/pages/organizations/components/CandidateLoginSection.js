// src/pages/organizations/components/CandidateLoginSection.js

import React from "react";
import { Card, Row, Col, Form } from "react-bootstrap";

const CandidateLoginSection = ({ data, onChange }) => {
    return (
        <Card className="shadow-sm mb-4">
            <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">Candidate Login Configuration</h5>
            </Card.Header>

            <Card.Body>
                <Row>
                    <Col md={4}>
                        <Form.Check
                            type="radio"
                            name="candidateLoginMethod"
                            label="Username"
                            checked={data.defaultLoginMethod === "USERNAME"}
                            onChange={() => onChange("defaultLoginMethod", "USERNAME")}
                        />
                    </Col>

                    <Col md={4}>
                        <Form.Check
                            type="radio"
                            name="candidateLoginMethod"
                            label="Email"
                            checked={data.defaultLoginMethod === "EMAIL"}
                            onChange={() => onChange("defaultLoginMethod", "EMAIL")}
                        />
                    </Col>

                    <Col md={4}>
                        <Form.Check
                            type="radio"
                            name="candidateLoginMethod"
                            label="Mobile Number"
                            checked={data.defaultLoginMethod === "MOBILE"}
                            onChange={() => onChange("defaultLoginMethod", "MOBILE")}
                        />
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col md={4}>
                        <Form.Check
                            type="radio"
                            name="candidateLoginMethod"
                            label="Aadhaar Number"
                            checked={data.defaultLoginMethod === "AADHAAR"}
                            onChange={() => onChange("defaultLoginMethod", "AADHAAR")}
                        />
                    </Col>

                    <Col md={4}>
                        <Form.Check
                            type="radio"
                            name="candidateLoginMethod"
                            label="PAN Number"
                            checked={data.defaultLoginMethod === "PAN"}
                            onChange={() => onChange("defaultLoginMethod", "PAN")}
                        />
                    </Col>
                </Row>

                <hr />

                <Form.Group>
                    <Form.Label>
                        Default Login Method
                    </Form.Label>

                    <Form.Select
                        value={data.defaultLoginMethod || ""}
                        onChange={(e) =>
                            onChange("defaultLoginMethod", e.target.value)
                        }
                    >
                        <option value="">Select Login Method</option>
                        <option value="USERNAME">Username</option>
                        <option value="EMAIL">Email</option>
                        <option value="MOBILE">Mobile Number</option>
                        <option value="AADHAAR">Aadhaar Number</option>
                        <option value="PAN">PAN Number</option>
                    </Form.Select>
                </Form.Group>

                <div className="mt-4">
                    <Form.Check
                        type="switch"
                        id="candidate-forgot-password"
                        label="Enable Forgot Password"
                        checked={data.enableForgotPassword || false}
                        onChange={(e) =>
                            onChange("enableForgotPassword", e.target.checked)
                        }
                    />
                </div>

                <div className="mt-3">
                    <Form.Check
                        type="switch"
                        id="candidate-self-registration"
                        label="Allow Self Registration"
                        checked={data.allowRegistration || false}
                        onChange={(e) =>
                            onChange("allowRegistration", e.target.checked)
                        }
                    />
                </div>

                <div className="mt-3">
                    <Form.Check
                        type="switch"
                        id="candidate-captcha"
                        label="Enable CAPTCHA"
                        checked={data.enableCaptcha || false}
                        onChange={(e) =>
                            onChange("enableCaptcha", e.target.checked)
                        }
                    />
                </div>
            </Card.Body>
        </Card>
    );
};

export default CandidateLoginSection;