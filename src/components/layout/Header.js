import { FiMenu, FiSearch, FiBell, FiChevronDown, FiX } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";

import EligibilityHeader from "../../pages/HeaderEligibility/EligibilityHeader";

import "../../css/Header.css";

export default function Header({ setSidebarOpen }) {
  const dispatch = useAppDispatch();

  const loggedIn = useAppSelector((state) => state.auth.loggedIn);

  const location = useLocation();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  const showEligibilityHeader =
    location.pathname.startsWith("/eligibility-overview") ||
    location.pathname.startsWith("/eligibility-configuration") ||
    location.pathname.startsWith("/validation-workflow") ||
    location.pathname.startsWith("/authentication-configuration");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      {/* LEFT */}

      <div className="header-left">
        {window.innerWidth < 992 && (
          <button
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX size={24} />
          </button>
        )}

        <button
          className="menu-btn"
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          <FiMenu size={24} />
        </button>

        {showEligibilityHeader && <EligibilityHeader />}
      </div>

      {/* RIGHT */}

      <div className="header-right">
        <div className="header-search">
          <FiSearch className="search-icon" />

          <input type="text" placeholder="Search..." />
        </div>

        <button className="notification-btn">
          <FiBell size={22} />

          <span className="notification-dot"></span>
        </button>

        <div className="profile-dropdown" ref={dropdownRef}>
          <div className="user-profile" onClick={() => setOpen(!open)}>
            <div className="avatar">SA</div>

            <div className="user-info">
              <div className="user-name">Super Admin</div>

              <div className="user-role">System Administrator</div>
            </div>

            <FiChevronDown className={open ? "rotate" : ""} />
          </div>

          {open && (
            <div className="dropdown-menu-custom">
              <button className="dropdown-item-custom">
                <i className="bi bi-person-circle me-2"></i>
                Profile
              </button>

              {loggedIn && (
                <button
                  className="dropdown-item-custom text-danger"
                  onClick={() => {
                    setOpen(false);

                    dispatch(logout());
                  }}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
