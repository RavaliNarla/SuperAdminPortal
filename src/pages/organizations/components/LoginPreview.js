import React from "react";
import { Card, Badge, Form, Button, Row, Col } from "react-bootstrap";
import {
    FiUser,
    FiMail,
    FiSmartphone,
    FiCreditCard,
    FiShield,
    FiLock,
    FiCheckCircle,
} from "react-icons/fi";

const LoginPreview = ({ config }) => {
    const getCandidateMethod = () => {
        switch (config.candidateLogin.defaultLoginMethod) {
            case "EMAIL":
                return {
                    label: "Email Address",
                    icon: <FiMail />,
                    placeholder: "Enter Email Address",
                };

            case "MOBILE":
                return {
                    label: "Mobile Number",
                    icon: <FiSmartphone />,
                    placeholder: "Enter Mobile Number",
                };

            case "AADHAAR":
                return {
                    label: "Aadhaar Number",
                    icon: <FiCreditCard />,
                    placeholder: "Enter Aadhaar Number",
                };

            case "PAN":
                return {
                    label: "PAN Number",
                    icon: <FiCreditCard />,
                    placeholder: "Enter PAN Number",
                };

            default:
                return {
                    label: "Username",
                    icon: <FiUser />,
                    placeholder: "Enter Username",
                };
        }
    };

    const getRecruitmentMethod = () => {
        switch (config.recruitmentLogin.defaultLoginMethod) {
            case "EMAIL":
                return {
                    label: "Email",
                    icon: <FiMail />,
                    placeholder: "Enter Email",
                };

            case "USERNAME":
                return {
                    label: "Username",
                    icon: <FiUser />,
                    placeholder: "Enter Username",
                };

            case "AD":
                return {
                    label: "Microsoft Entra ID",
                    icon: <FiShield />,
                    placeholder: "Login with Microsoft",
                };

            case "SSO":
                return {
                    label: "Single Sign-On",
                    icon: <FiShield />,
                    placeholder: "SSO Login",
                };

            default:
                return {
                    label: "Employee ID",
                    icon: <FiUser />,
                    placeholder: "Enter Employee ID",
                };
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

    const candidate = getCandidateMethod();
    const recruitment = getRecruitmentMethod();

    return (
        <Card className="login-preview-card">
            <Card.Header>
                <h5>Login Screen Preview</h5>
            </Card.Header>

            <Card.Body>

                <div className="text-center mb-4">

                    <Badge className="preview-badge bg-success">

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

                        <Card className="preview-portal-card mb-4">

                            <Card.Header>

                                Candidate Portal

                            </Card.Header>

                            <Card.Body>

                                <div className="text-center mb-4">

                                    <div className="preview-avatar">

                                        {candidate.icon}

                                    </div>

                                </div>

                                <Form.Group className="mb-3">

                                    <Form.Label>

                                        {candidate.label}

                                    </Form.Label>
                                    <div className="preview-input-wrapper">

                                        <span className="preview-input-icon">
                                            {candidate.icon}
                                        </span>

                                        <Form.Control
                                            className="preview-input"
                                            placeholder={candidate.placeholder}
                                            readOnly
                                        />

                                    </div>

                                </Form.Group>

                                <Form.Group className="mb-3">

                                    <Form.Label>Password</Form.Label>

                                    <div className="preview-input-wrapper">

                                        <span className="preview-input-icon">
                                            <FiLock />
                                        </span>

                                        <Form.Control
                                            className="preview-input"
                                            type="password"
                                            value="********"
                                            readOnly
                                        />

                                    </div>

                                </Form.Group>

                                <div className="preview-remember">

                                    <label className="remember-container">

                                        <input
                                            type="checkbox"
                                            checked
                                            readOnly
                                        />

                                        <span className="checkmark"></span>

                                        <span>Remember Me</span>

                                    </label>

                                    {config.candidateLogin.enableForgotPassword && (
                                        <span className="preview-link">
                                            Forgot Password?
                                        </span>
                                    )}

                                </div>
                                {config.candidateLogin.enableCaptcha && (

                                    <div className="preview-captcha">

                                        CAPTCHA Preview

                                    </div>

                                )}

                                <Button
                                    className="preview-login-btn w-100 mt-3"
                                    disabled
                                >

                                    Login

                                </Button>

                                {config.candidateLogin.allowRegistration && (

                                    <div className="preview-register">

                                        <FiCheckCircle className="me-2" />

                                        New User? Register Here

                                    </div>

                                )}

                            </Card.Body>

                        </Card>

                    )}
                {(config.portal === "recruitment" ||
                    config.portal === "both") && (

                        <Card className="preview-portal-card mb-4">

                            <Card.Header>

                                Recruitment Portal

                            </Card.Header>

                            <Card.Body>

                                <div className="text-center mb-4">

                                    <div className="preview-avatar">

                                        {recruitment.icon}

                                    </div>

                                </div>

                                <Form.Group className="mb-3">

                                    <Form.Label>

                                        {recruitment.label}

                                    </Form.Label>

                                    <Form.Control
                                        className="preview-input"
                                        placeholder={recruitment.placeholder}
                                        readOnly
                                    />

                                </Form.Group>

                                <Form.Group className="mb-3">

                                    <Form.Label>Password</Form.Label>
                                    <div className="preview-input-wrapper">

                                        <span className="preview-input-icon">
                                            <FiLock />
                                        </span>

                                        <Form.Control
                                            className="preview-input"
                                            type="password"
                                            value="********"
                                            readOnly
                                        />

                                    </div>

                                </Form.Group>

                                <div className="preview-remember">

                                    <label className="remember-container">

                                        <input
                                            type="checkbox"
                                            checked
                                            readOnly
                                        />

                                        <span className="checkmark"></span>

                                        <span>Remember Me</span>

                                    </label>

                                    {config.candidateLogin.enableForgotPassword && (
                                        <span className="preview-link">
                                            Forgot Password?
                                        </span>
                                    )}

                                </div>

                                {config.recruitmentLogin.enableCaptcha && (

                                    <div className="preview-captcha">

                                        CAPTCHA Preview

                                    </div>

                                )}

                                <Button
                                    className="preview-login-btn w-100 mt-3"
                                    disabled
                                >
                                    Login
                                </Button>

                                <div className="preview-divider" />

                                <div className="preview-settings">

                                    <h6>Authentication Settings</h6>

                                    <Row className="g-3">

                                        <Col xs={12}>

                                            <div className="preview-setting-item">

                                                <div>

                                                    <strong>Forgot Password</strong>

                                                    <small>
                                                        Password recovery is enabled.
                                                    </small>

                                                </div>

                                                <Badge
                                                    bg={
                                                        config.recruitmentLogin
                                                            .enableForgotPassword
                                                            ? "success"
                                                            : "secondary"
                                                    }
                                                >
                                                    {config.recruitmentLogin
                                                        .enableForgotPassword
                                                        ? "Enabled"
                                                        : "Disabled"}
                                                </Badge>

                                            </div>

                                        </Col>

                                        <Col xs={12}>

                                            <div className="preview-setting-item">

                                                <div>

                                                    <strong>CAPTCHA</strong>

                                                    <small>
                                                        Bot protection for login.
                                                    </small>

                                                </div>

                                                <Badge
                                                    bg={
                                                        config.recruitmentLogin
                                                            .enableCaptcha
                                                            ? "success"
                                                            : "secondary"
                                                    }
                                                >
                                                    {config.recruitmentLogin
                                                        .enableCaptcha
                                                        ? "Enabled"
                                                        : "Disabled"}
                                                </Badge>

                                            </div>

                                        </Col>

                                        <Col xs={12}>

                                            <div className="preview-setting-item">

                                                <div>

                                                    <strong>Force Password Change</strong>

                                                    <small>
                                                        Require password update after first login.
                                                    </small>

                                                </div>

                                                <Badge
                                                    bg={
                                                        config.recruitmentLogin
                                                            .forcePasswordChange
                                                            ? "success"
                                                            : "secondary"
                                                    }
                                                >
                                                    {config.recruitmentLogin
                                                        .forcePasswordChange
                                                        ? "Enabled"
                                                        : "Disabled"}
                                                </Badge>

                                            </div>

                                        </Col>

                                        <Col xs={12}>

                                            <div className="preview-setting-item">

                                                <div>

                                                    <strong>Two-Factor Authentication</strong>

                                                    <small>
                                                        Additional authentication layer.
                                                    </small>

                                                </div>

                                                <Badge
                                                    bg={
                                                        config.twoFactor.enabled
                                                            ? "success"
                                                            : "secondary"
                                                    }
                                                >
                                                    {config.twoFactor.enabled
                                                        ? "Enabled"
                                                        : "Disabled"}
                                                </Badge>

                                            </div>

                                        </Col>

                                    </Row>

                                    {config.twoFactor.enabled && (

                                        <Form.Group className="mt-4">

                                            <Form.Label>

                                                2FA Method

                                            </Form.Label>

                                            <Form.Control
                                                className="preview-input"
                                                value={get2FAMethod()}
                                                readOnly
                                            />

                                        </Form.Group>

                                    )}

                                </div>

                            </Card.Body>

                        </Card>

                    )}

            </Card.Body>

        </Card>

    );
};

export default LoginPreview;