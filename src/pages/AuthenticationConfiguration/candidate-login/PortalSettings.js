// // src/pages/organizations/components/candidate-login/PortalSettings.js

// import React from "react";
// import { Row, Col, Form } from "react-bootstrap";
// import {
//   FiUserPlus,
//   FiKey,
//   FiShield,
//   FiLock,
//   FiRefreshCw,
//   FiClock,
// } from "react-icons/fi";

// const PortalSettings = ({ data, onChange }) => {
//   return (
//     <>

//       {/* ============================================
//           Portal Settings
//       ============================================ */}

//       <h5 className="candidate-section-title mt-5">
//         Candidate Portal Settings
//       </h5>

//       <Row className="g-3">

//         {/* Allow Registration */}

//         <Col lg={6}>

//           <div className="candidate-option-card">

//             <div className="candidate-option-left">

//               <div className="candidate-option-icon">
//                 <FiUserPlus />
//               </div>

//               <div>

//                 <h6>Allow Self Registration</h6>

//                 <small>
//                   Candidates can create their own account.
//                 </small>

//               </div>

//             </div>

//             <Form.Check
//               type="switch"
//               checked={data.allowRegistration || false}
//               onChange={(e) =>
//                 onChange(
//                   "allowRegistration",
//                   e.target.checked
//                 )
//               }
//             />

//           </div>

//         </Col>

//         {/* Forgot Password */}

//         <Col lg={6}>

//           <div className="candidate-option-card">

//             <div className="candidate-option-left">

//               <div className="candidate-option-icon">
//                 <FiKey />
//               </div>

//               <div>

//                 <h6>Forgot Password</h6>

//                 <small>
//                   Allow candidates to reset password.
//                 </small>

//               </div>

//             </div>

//             <Form.Check
//               type="switch"
//               checked={data.enableForgotPassword || false}
//               onChange={(e) =>
//                 onChange(
//                   "enableForgotPassword",
//                   e.target.checked
//                 )
//               }
//             />

//           </div>

//         </Col>

//         {/* CAPTCHA */}

//         <Col lg={6}>

//           <div className="candidate-option-card">

//             <div className="candidate-option-left">

//               <div className="candidate-option-icon">
//                 <FiShield />
//               </div>

//               <div>

//                 <h6>Enable CAPTCHA</h6>

//                 <small>
//                   Prevent automated login attempts.
//                 </small>

//               </div>

//             </div>

//             <Form.Check
//               type="switch"
//               checked={data.enableCaptcha || false}
//               onChange={(e) =>
//                 onChange(
//                   "enableCaptcha",
//                   e.target.checked
//                 )
//               }
//             />

//           </div>

//         </Col>

//         {/* Remember Me */}

//         <Col lg={6}>

//           <div className="candidate-option-card">

//             <div className="candidate-option-left">

//               <div className="candidate-option-icon">
//                 <FiLock />
//               </div>

//               <div>

//                 <h6>Remember Me</h6>

//                 <small>
//                   Remember login on trusted devices.
//                 </small>

//               </div>

//             </div>

//             <Form.Check
//               type="switch"
//               checked={data.rememberMe || false}
//               onChange={(e) =>
//                 onChange(
//                   "rememberMe",
//                   e.target.checked
//                 )
//               }
//             />

//           </div>

//         </Col>

//       </Row>

//       {/* ============================================
//           Login Security
//       ============================================ */}

//       <h5 className="candidate-section-title mt-5">
//         Login Security
//       </h5>

//       <Row className="g-3">

//         {/* Max Login Attempts */}

//         <Col lg={6}>

//           <Form.Group>

//             <Form.Label>
//               Maximum Login Attempts
//             </Form.Label>

//             <Form.Control
//               type="number"
//               min="1"
//               max="10"
//               value={data.maxLoginAttempts || 5}
//               onChange={(e) =>
//                 onChange(
//                   "maxLoginAttempts",
//                   e.target.value
//                 )
//               }
//             />

//           </Form.Group>

//         </Col>

//         {/* Lock Duration */}

//         <Col lg={6}>

//           <Form.Group>

//             <Form.Label>
//               Account Lock Duration (Minutes)
//             </Form.Label>

//             <Form.Control
//               type="number"
//               min="5"
//               value={data.lockDuration || 30}
//               onChange={(e) =>
//                 onChange(
//                   "lockDuration",
//                   e.target.value
//                 )
//               }
//             />

//           </Form.Group>

//         </Col>

//       </Row>

//       {/* ============================================
//           Session Settings
//       ============================================ */}

//       <h5 className="candidate-section-title mt-5">
//         Session Settings
//       </h5>

//       <Row className="g-3">

//         {/* Session Timeout */}

//         <Col lg={6}>

//           <Form.Group>

//             <Form.Label>
//               Session Timeout (Minutes)
//             </Form.Label>

//             <Form.Control
//               type="number"
//               value={data.sessionTimeout || 30}
//               onChange={(e) =>
//                 onChange(
//                   "sessionTimeout",
//                   e.target.value
//                 )
//               }
//             />

//           </Form.Group>

//         </Col>

//         {/* Auto Logout */}

//         <Col lg={6}>

//           <div className="candidate-option-card">

//             <div className="candidate-option-left">

//               <div className="candidate-option-icon">
//                 <FiClock />
//               </div>

//               <div>

//                 <h6>Auto Logout</h6>

//                 <small>
//                   Automatically logout inactive users.
//                 </small>

//               </div>

//             </div>

//             <Form.Check
//               type="switch"
//               checked={data.autoLogout || false}
//               onChange={(e) =>
//                 onChange(
//                   "autoLogout",
//                   e.target.checked
//                 )
//               }
//             />

//           </div>

//         </Col>

//         {/* Refresh Session */}

//         <Col lg={6}>

//           <div className="candidate-option-card">

//             <div className="candidate-option-left">

//               <div className="candidate-option-icon">
//                 <FiRefreshCw />
//               </div>

//               <div>

//                 <h6>Refresh Session</h6>

//                 <small>
//                   Extend active user session automatically.
//                 </small>

//               </div>

//             </div>

//             <Form.Check
//               type="switch"
//               checked={data.refreshSession || false}
//               onChange={(e) =>
//                 onChange(
//                   "refreshSession",
//                   e.target.checked
//                 )
//               }
//             />

//           </div>

//         </Col>

//       </Row>

//     </>
//   );
// };

// export default PortalSettings;