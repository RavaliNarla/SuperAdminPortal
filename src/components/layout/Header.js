import { FiMenu, FiSearch, FiBell, FiChevronDown } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import "../../css/Header.css";
import { FiX } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";

export default function Header({ setSidebarOpen }) {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector((state) => state.auth.loggedIn);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      {/* Left */}
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
          onClick={() => setSidebarOpen(prev => !prev)}
        >
          <FiMenu size={24} />
        </button>
      </div>





      {/* Right */}
      <div className="header-right">
        {/* Search */}
        <div className="header-search">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>

        <button className="notification-btn">
          <FiBell size={22} />
          <span className="notification-dot"></span>
        </button>

        <div className="profile-dropdown" ref={dropdownRef}>
          <div
            className="user-profile"
            onClick={() => setOpen(!open)}
          >
            <div className="avatar">SA</div>

            <div className="user-info">
              <div className="user-name">Super Admin</div>
              <div className="user-role">System Administrator</div>
            </div>

            <FiChevronDown
              className={open ? "rotate" : ""}
            />
          </div>

          {open && (
            <div className="dropdown-menu-custom">
              <button
                className="dropdown-item-custom"
              >
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

        {/* Keep your existing logout logic */}
        {/* {loggedIn && (
          <button
            className="btn btn-sm btn-outline-secondary ms-3"
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
        )} */}
      </div>
    </header>
  );
}



// import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import { logout } from '../../features/auth/authSlice';

// export default function Header() {
//   const dispatch = useAppDispatch();
//   const loggedIn = useAppSelector((state) => state.auth.loggedIn);

//   return (
//     <div className="d-flex justify-content-between align-items-center header-row">
//       <div>
//         <h1 className="h4 mb-0">RMS Super Admin Portal</h1>
//         <p className="text-muted mb-0">Manage tenants, themes, and organization configuration.</p>
//       </div>
//       <div>
//         {loggedIn ? (
//           <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => dispatch(logout())}>
//             Logout
//           </button>
//         ) : (
//           <span className="badge bg-secondary">Super Admin</span>
//         )}
//       </div>
//     </div>
//   );
// }
