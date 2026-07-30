import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { FiLogIn, FiMail, FiUsers } from "react-icons/fi";

import "../../css/Section.css";

const CandidateLoginSection = () => {
  return (
    <div className="recruitment-login-card mb-4">
      <div className="card-body">
        {/* Header */}
        <div className="recruitment-login-header">
          <div>
            <h5 className="recruitment-login-title">
              <FiLogIn className="me-2" />
              Candidate Portal Authentication
            </h5>

            <p className="recruitment-login-subtitle">
              Configure authentication methods for candidate portal users.
            </p>
          </div>
        </div>

        {/* Login Method */}
        <h6 className="section-sub-heading mb-3">
          <FiUsers className="me-2" />
          Login Method
        </h6>

        <Row className="g-3">
          <Col lg={6} md={6}>
            <div className="recruitment-method-card">
              <div className="recruitment-method-left">
                <div className="recruitment-method-icon">
                  <FiMail />
                </div>

                <div>
                  <h6>Email + Password</h6>
                  <small>Login using Email Address and Password</small>
                </div>
              </div>

              <Form.Check
                className="setting-switch"
                type="switch"
                checked={true}
                disabled
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CandidateLoginSection;
