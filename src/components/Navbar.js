import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        <Link to="/" style={styles.navLink}>Home</Link>
        <div style={styles.rightContainer}>
          {user ? (
            <div style={styles.userContainer}>
              <div onClick={toggleDropdown} style={styles.userName}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png" // Replace with your user icon URL
                  alt="User Icon"
                  style={styles.userIcon}
                />
                {user.firstName}
              </div>
              {dropdownOpen && (
                <div style={styles.dropdown}>
                  <Link to="/profile" style={styles.dropdownItem}>
                    Profile
                  </Link>
                  <div onClick={handleLogout} style={styles.dropdownItem}>
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" style={styles.navLink}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png" 
                alt="Login Icon"
                style={styles.userIcon}
              />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: "#007bff",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    top :'0',
    height: '8vh'
  },
  navContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    padding: "0 10px",
    fontSize: "18px",
  },
  rightContainer: {
    display: "flex",
    alignItems: "center",
  },
  userContainer: {
    position: "relative",
    cursor: "pointer",
  },
  userName: {
    display: "flex",
    alignItems: "center",
    color: "white",
    textDecoration: "none",
  },
  userIcon: {
    width: "24px",
    height: "24px",
    marginRight: "5px",
  },
  dropdown: {
    position: "absolute",
    top: "30px",
    right: "0",
    backgroundColor: "white",
    width :"140px",
    color: "#333",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "4px",
    zIndex: 1,
  },
  dropdownItem: {
    padding: "10px 20px",
    textDecoration: "none",
    color: "#333",
    display: "block",
  },
};

export default Navbar;
