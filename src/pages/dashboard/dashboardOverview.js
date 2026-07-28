import React from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";

import {
  FiUsers,
  FiUserCheck,
  FiBriefcase,
  FiMapPin,
  FiClipboard,
  FiTrendingUp,
  FiCalendar,
} from "react-icons/fi";

import "./dashboard.css";

const statistics = [
  {
    title: "Organizations",
    value: "18",
    growth: "+12%",
    color: "primary",
    icon: <FiUsers size={28} />,
  },
  {
    title: "Employees",
    value: "2,458",
    growth: "+8%",
    color: "success",
    icon: <FiUsers size={28} />,
  },
  {
    title: "Candidates",
    value: "8,420",
    growth: "+18%",
    color: "warning",
    icon: <FiUserCheck size={28} />,
  },
  {
    title: "Recruiters",
    value: "96",
    growth: "+6%",
    color: "info",
    icon: <FiBriefcase size={28} />,
  },
  {
    title: "Open Jobs",
    value: "126",
    growth: "+14%",
    color: "danger",
    icon: <FiClipboard size={28} />,
  },
  {
    title: "Departments",
    value: "24",
    growth: "+2%",
    color: "secondary",
    icon: <FiTrendingUp size={28} />,
  },
  {
    title: "Locations",
    value: "16",
    growth: "+4%",
    color: "dark",
    icon: <FiMapPin size={28} />,
  },
  {
    title: "Interviews Today",
    value: "38",
    growth: "+11%",
    color: "primary",
    icon: <FiCalendar size={28} />,
  },
];

const organizationData = [
  { name: "Corporate", value: 18 },
  { name: "Government", value: 8 },
  { name: "Private", value: 14 },
  { name: "Education", value: 6 },
];

const departmentData = [
  { department: "IT", employees: 650 },
  { department: "HR", employees: 180 },
  { department: "Finance", employees: 240 },
  { department: "Sales", employees: 520 },
  { department: "Support", employees: 310 },
];

const recruitmentData = [
  { month: "Jan", hired: 42 },
  { month: "Feb", hired: 56 },
  { month: "Mar", hired: 68 },
  { month: "Apr", hired: 74 },
  { month: "May", hired: 61 },
  { month: "Jun", hired: 92 },
  { month: "Jul", hired: 108 },
];

const COLORS = ["#0d6efd", "#198754", "#ffc107", "#dc3545"];

const AdminDashboard = () => {
  return (
    <Container fluid className="dashboard-page">
      {/* Header */}

      <Row className="mb-4">
        <Col md={8}>
          <h2 className="dashboard-title">Admin Dashboard</h2>

          <p className="dashboard-subtitle">
            Welcome back! Here's an overview of your HRMS platform.
          </p>
        </Col>

        <Col md={4} className="text-md-end mt-3 mt-md-0">
          <Badge bg="success" className="px-3 py-2">
            System Healthy
          </Badge>
        </Col>
      </Row>

      {/* Statistics */}

      <Row className="g-4">
        {statistics.map((item, index) => (
          <Col xl={3} lg={4} md={6} key={index}>
            <Card className="stats-card h-100">
              <Card.Body>
                <div className="stats-top">
                  <div className={`stats-icon bg-${item.color}`}>
                    {item.icon}
                  </div>

                  <Badge bg="light" text="success">
                    {item.growth}
                  </Badge>
                </div>

                <h2 className="stats-value">{item.value}</h2>

                <h6 className="stats-title">{item.title}</h6>

                <small className="text-muted">Compared to last month</small>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts Section */}

      <Row className="mt-5">
        <Col lg={6} className="mb-4">
          <Card className="overview-card">
            <Card.Header>
              <h5>🏢 Organization Overview</h5>
            </Card.Header>

            <Card.Body>
              <div className="metric-row">
                <span>Total Organizations</span>
                <span className="metric-badge primary">18</span>
              </div>

              <div className="metric-row">
                <span>Active Organizations</span>
                <span className="metric-badge success">15</span>
              </div>

              <div className="metric-row">
                <span>Inactive Organizations</span>
                <span className="metric-badge danger">3</span>
              </div>

              <div className="metric-row">
                <span>New This Month</span>
                <span className="metric-badge warning">2</span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card className="dashboard-card employee-overview-card">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <strong>👥 Employee Overview</strong>
              <span className="text-primary fw-semibold">Live Status</span>
            </Card.Header>

            <Card.Body>
              {/* Total Employees */}
              <div className="employee-total-card mb-4">
                <h6>Total Employees</h6>
                <h2>2,458</h2>
                <p className="mb-0">Across all organizations</p>
              </div>

              {/* Other Metrics */}
              <Row className="g-3">
                <Col xs={6}>
                  <div className="employee-metric-card active-card">
                    <h3>2,310</h3>
                    <span>Active</span>
                  </div>
                </Col>

                <Col xs={6}>
                  <div className="employee-metric-card leave-card">
                    <h3>50</h3>
                    <span>On Leave</span>
                  </div>
                </Col>

                <Col xs={6}>
                  <div className="employee-metric-card resigned-card">
                    <h3>98</h3>
                    <span>Resigned</span>
                  </div>
                </Col>

                <Col xs={6}>
                  <div className="employee-metric-card new-card">
                    <h3>42</h3>
                    <span>New Joinees</span>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card className="dashboard-card">
            <Card.Header>
              <strong>Candidate Summary</strong>
            </Card.Header>

            <Card.Body>
              <div className="summary-row">
                <span>Applied</span>
                <strong>8420</strong>
              </div>

              <div className="summary-row">
                <span>Interview Scheduled</span>
                <strong>420</strong>
              </div>

              <div className="summary-row">
                <span>Selected</span>
                <strong>110</strong>
              </div>

              <div className="summary-row">
                <span>Rejected</span>
                <strong>680</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card className="dashboard-card">
            <Card.Header>
              <strong>Recruitment Summary</strong>
            </Card.Header>

            <Card.Body>
              <div className="summary-row">
                <span>Open Positions</span>
                <strong>126</strong>
              </div>

              <div className="summary-row">
                <span>Offers Released</span>
                <strong>52</strong>
              </div>

              <div className="summary-row">
                <span>Offers Accepted</span>
                <strong>40</strong>
              </div>

              <div className="summary-row">
                <span>Joined</span>
                <strong>32</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tables Section - Part 3 */}
    </Container>
  );
};

export default AdminDashboard;
