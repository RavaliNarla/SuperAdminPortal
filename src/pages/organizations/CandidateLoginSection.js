import React from "react";
import { Row, Col } from "react-bootstrap";
import {
  FiLogIn,
  FiUser,
  FiMail,
  FiSmartphone,
  FiCreditCard,
} from "react-icons/fi";

import "../../css/Section.css";

// Dynamic Components
import UsernameConfig from "../organizations/components/candidate-login/UsernameConfig";
import EmailConfig from "../organizations/components/candidate-login/EmailConfig";
import MobileConfig from "../organizations/components/candidate-login/MobileConfig";
import AadhaarConfig from "../organizations/components/candidate-login/AadhaarConfig";
import PanConfig from "../organizations/components/candidate-login/PanConfig";

const loginMethods = [
  {
    value: "USERNAME",
    label: "Username",
    icon: <FiUser />,
    description: "Login using Username & Password",
  },
  {
    value: "EMAIL",
    label: "Email",
    icon: <FiMail />,
    description: "Login using Email Address",
  },
  {
    value: "MOBILE",
    label: "Mobile",
    icon: <FiSmartphone />,
    description: "Login using Mobile Number",
  },
  {
    value: "AADHAAR",
    label: "Aadhaar",
    icon: <FiCreditCard />,
    description: "Login using Aadhaar Number",
  },
  {
    value: "PAN",
    label: "PAN",
    icon: <FiCreditCard />,
    description: "Login using PAN Number",
  },
];

const CandidateLoginSection = ({ data, onChange }) => {
  return (
    <div className="candidate-login-card">

      {/* Header */}

      <div className="candidate-header">

        <h4>
          <FiLogIn className="me-2" />
          Candidate Portal Authentication
        </h4>

        <p>
          Configure candidate login methods, registration,
          verification and password recovery options.
        </p>

      </div>

      {/* Login Methods */}

      <h5 className="candidate-section-title">
        Select Login Method
      </h5>

      <Row className="g-3 mb-4">

        {loginMethods.map((item) => (

          <Col lg={4} md={6} key={item.value}>

            <div
              className={`candidate-method-card ${
                data.defaultLoginMethod === item.value
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                onChange(
                  "defaultLoginMethod",
                  item.value
                )
              }
            >

              <div className="candidate-method-left">

                <div className="candidate-method-icon">
                  {item.icon}
                </div>

                <div>

                  <h6>{item.label}</h6>

                  <small>
                    {item.description}
                  </small>

                </div>

              </div>

              <div
                className={`candidate-radio ${
                  data.defaultLoginMethod === item.value
                    ? "active"
                    : ""
                }`}
              >
                <div className="candidate-radio-dot"></div>
              </div>

            </div>

          </Col>

        ))}

      </Row>

      {/* Dynamic Login Configuration */}

      {data.defaultLoginMethod === "USERNAME" && (
        <UsernameConfig
          data={data}
          onChange={onChange}
        />
      )}

      {data.defaultLoginMethod === "EMAIL" && (
        <EmailConfig
          data={data}
          onChange={onChange}
        />
      )}

      {data.defaultLoginMethod === "MOBILE" && (
        <MobileConfig
          data={data}
          onChange={onChange}
        />
      )}

      {data.defaultLoginMethod === "AADHAAR" && (
        <AadhaarConfig
          data={data}
          onChange={onChange}
        />
      )}

      {data.defaultLoginMethod === "PAN" && (
        <PanConfig
          data={data}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default CandidateLoginSection;