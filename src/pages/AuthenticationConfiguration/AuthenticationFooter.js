import React from "react";
import { Row, Col, Button, Spinner } from "react-bootstrap";
import { FiSave, FiX, FiTrash2, FiFileText } from "react-icons/fi";

const AuthenticationFooter = ({
  onSave,
  onDraft,
  onDiscard,
  onCancel,
  loading = false,
}) => {
  return (
    <Row className="mt-4">
      <Col className="d-flex justify-content-end gap-2 flex-wrap">
        {/* Cancel */}
        <Button
          variant="outline-secondary"
          onClick={onCancel}
          disabled={loading}
        >
          <FiX className="me-2" />
          Cancel
        </Button>

        {/* Discard */}
        <Button variant="outline-danger" onClick={onDiscard} disabled={loading}>
          <FiTrash2 className="me-2" />
          Discard
        </Button>

        {/* Save Draft */}
        <Button variant="outline-primary" onClick={onDraft} disabled={loading}>
          <FiFileText className="me-2" />
          Save Draft
        </Button>

        {/* Save */}
        <Button variant="primary" onClick={onSave} disabled={loading}>
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Saving...
            </>
          ) : (
            <>
              <FiSave className="me-2" />
              Save Changes
            </>
          )}
        </Button>
      </Col>
    </Row>
  );
};

export default AuthenticationFooter;
