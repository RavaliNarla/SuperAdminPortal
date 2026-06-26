import React, { useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";

const SecurityPolicy = () => {
  const initialState = {
    minLength: 8,
    maxLength: 20,
    expiryDays: 90,
    passwordHistory: 5,

    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecialCharacter: true,

    sessionTimeout: 30,
    concurrentSessions: 1,
    rememberMe: false,

    failedAttempts: 5,
    lockDuration: 30,

    ipRestriction: false,
    allowedIPs: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Security Policy:", formData);
    alert("Security Policy Saved Successfully");
  };

  const handleReset = () => {
    setFormData(initialState);
  };

  return (
    <Container fluid className="mt-4">
      <Card className="shadow-sm">
        <Card.Header>
          <h4>Security Policy</h4>
        </Card.Header>

        <Card.Body>
          {/* Your existing Password Policy, Session Policy,
              Account Lock Policy and IP Restriction JSX goes here */}
        </Card.Body>

        <Card.Footer className="text-end">
          <Button
            variant="secondary"
            className="me-2"
            onClick={handleReset}
          >
            Reset
          </Button>

          <Button
            variant="primary"
            onClick={handleSave}
          >
            Save Policy
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default SecurityPolicy;