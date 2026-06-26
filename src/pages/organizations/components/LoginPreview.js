import React from "react";
import { Card, Badge, Form, Button } from "react-bootstrap";

const LoginPreview = ({ config }) => {
    const getCandidateMethod = () => {
        switch (config.candidateLogin.defaultLoginMethod) {
            case "EMAIL":
                return "Email";
            case "MOBILE":
                return "Mobile Number";
            case "USERNAME":
                return "Username";
            case "AADHAAR":
                return "Aadhaar Number";
            case "PAN":
                return "PAN Number";
            default:
                return "Username";
        }
    };

    const getRecruitmentMethod = () => {
        switch (config.recruitmentLogin.defaultLoginMethod) {
            case "EMAIL":
                return "Email";
            case "EMPLOYEE_ID":
                return "Employee ID";
            case "USERNAME":
                return "Username";
            case "AD":
                return "Microsoft Entra ID";
            case "SSO":
                return "Single Sign-On";
            default:
                return "Employee ID";
        }
    };

    const get2FAMethod = () => {
        switch (config.twoFactor.type) {
            case "OTP_EMAIL":
                return "Email OTP";
            case "OTP_SMS":
                return "SMS OTP";
            case "AUTHENTICATOR":
                return "Google Authenticator";
            case "SMS_EMAIL":
                return "SMS OTP + Email OTP";
            default:
                return "Not Configured";
        }
    };

    return (
        <Card className="shadow-sm sticky-top">
            <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">Login Screen Preview</h5>
            </Card.Header>

            <Card.Body>

                <div className="text-center mb-4">
                    <Badge bg="success" className="px-3 py-2">
                        {config.portal === ""
                            ? "No Portal Selected"
                            : config.portal === "candidate"
                                ? "Candidate Portal"
                                : config.portal === "recruitment"
                                    ? "Recruitment Portal"
                                    : "Candidate + Recruitment"}
                    </Badge>
                </div>

                {(config.portal === "candidate" ||
                    config.portal === "both") && (
                        <>
                            <Card className="mb-4 border-primary">

                                <Card.Header className="bg-light">
                                    <strong>Candidate Portal</strong>
                                </Card.Header>

                                <Card.Body>

                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            {getCandidateMethod()}
                                        </Form.Label>

                                        <Form.Control
                                            placeholder={`Enter ${getCandidateMethod()}`}
                                            readOnly
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Password</Form.Label>

                                        <Form.Control
                                            type="password"
                                            value="********"
                                            readOnly
                                        />
                                    </Form.Group>

                                    <Form.Check
                                        className="mb-2"
                                        label="Remember Me"
                                        checked
                                        readOnly
                                    />

                                    {config.candidateLogin.enableForgotPassword && (
                                        <div className="text-primary mb-2 text-end">
                                            Forgot Password?
                                        </div>
                                    )}



                                    {config.candidateLogin.enableCaptcha && (
                                        <div className="border rounded p-2 text-center bg-light mb-3">
                                            CAPTCHA Preview
                                        </div>
                                    )}

                                    <Button
                                        className="w-100"
                                        disabled
                                    >
                                        Login
                                    </Button>

                                    <hr />
                                    {config.candidateLogin.allowRegistration && (
                                        <div className="text-success mb-2 text-center">
                                            New User? Register Here
                                        </div>
                                    )}
                                </Card.Body>

                            </Card>
                        </>
                    )}

                {(config.portal === "recruitment" ||
                    config.portal === "both") && (
                        <>
                            <Card className="mb-4 border-success">

                                <Card.Header className="bg-light">
                                    <strong>Recruitment Portal</strong>
                                </Card.Header>

                                <Card.Body>

                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            {getRecruitmentMethod()}
                                        </Form.Label>

                                        <Form.Control
                                            placeholder={`Enter ${getRecruitmentMethod()}`}
                                            readOnly
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Password</Form.Label>

                                        <Form.Control
                                            type="password"
                                            value="********"
                                            readOnly
                                        />
                                    </Form.Group>

                                    <Form.Check
                                        className="mb-2"
                                        label="Remember Me"
                                        checked
                                        readOnly
                                    />

                                    {config.recruitmentLogin.enableForgotPassword && (
                                        <div className="text-primary mb-2">
                                            Forgot Password?
                                        </div>
                                    )}

                                    {config.recruitmentLogin.enableCaptcha && (
                                        <div className="border rounded p-2 text-center bg-light mb-3">
                                            CAPTCHA Preview
                                        </div>
                                    )}

                                    <Button
                                        variant="success"
                                        className="w-100"
                                        disabled
                                    >
                                        Login
                                    </Button>

                                    <hr />

                                    <h6>Authentication Settings</h6>

                                    <Form.Check
                                        label="Forgot Password"
                                        checked={config.recruitmentLogin.enableForgotPassword}
                                        readOnly
                                    />

                                    <Form.Check
                                        label="CAPTCHA"
                                        checked={config.recruitmentLogin.enableCaptcha}
                                        readOnly
                                    />

                                    <Form.Check
                                        label="Force Password Change"
                                        checked={config.recruitmentLogin.forcePasswordChange}
                                        readOnly
                                    />

                                    <Form.Check
                                        label="Two-Factor Authentication"
                                        checked={config.twoFactor.enabled}
                                        readOnly
                                    />

                                    {config.twoFactor.enabled && (
                                        <Form.Group className="mt-3">
                                            <Form.Label>2FA Method</Form.Label>

                                            <Form.Control
                                                value={get2FAMethod()}
                                                readOnly
                                            />
                                        </Form.Group>
                                    )}

                                </Card.Body>

                            </Card>
                        </>
                    )}

            </Card.Body>
        </Card>
    );
};

export default LoginPreview;