// src/pages/organizations/components/AuthenticationFooter.js

import React from "react";
import { Row, Col, Button } from "react-bootstrap";

const AuthenticationFooter = ({
  onSave,
  onReset,
  onCancel,
  onPublish,
}) => {
  return (
    <Row className="mt-4">
      <Col className="text-end">

        <Button
          variant="secondary"
          className="me-2"
          onClick={onReset}
        >
          Reset
        </Button>

        <Button
          variant="outline-danger"
          className="me-2"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          variant="outline-success"
          className="me-2"
          onClick={onPublish}
        >
          Publish
        </Button>

        <Button
          variant="primary"
          onClick={onSave}
        >
          Save
        </Button>

      </Col>
    </Row>
  );
};

export default AuthenticationFooter;