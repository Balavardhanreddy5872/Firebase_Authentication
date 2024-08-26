import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserDetails(storedUser);
    } else {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            localStorage.setItem("user", JSON.stringify(userData));
            setUserDetails(userData);
          } else {
            console.log("No such document!");
          }
        } else {
          navigate("/login");
        }
      });
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      localStorage.removeItem("user");
      navigate("/login");
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#282c34",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {userDetails ? (
        <>
          <div style={{ marginBottom: "20px" }}>
            {userDetails.photo ? (
              <img
                src={userDetails.photo}
                alt="User profile"
                style={{
                  borderRadius: "50%",
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <FaUserCircle size={120} />
            )}
          </div>
          <h3>Welcome, {userDetails.firstName}! to our Photography CLUB </h3>
          <div
            style={{
              backgroundColor: "#3b3f45",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              width: "80%",
              maxWidth: "400px",
              textAlign: "left",
            }}
          >
            <p>Email: {userDetails.email}</p>
            <p>Name: {userDetails.firstName}</p>
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "30px" }}>
            <button
              className="btn btn-primary"
              onClick={handleLogout}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                width: "100px",
              }}
            >
              Logout
            </button>
            <Link to="/edit-profile">
              <button
                className="btn btn-secondary"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#6c757d",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  width: "100px",
                }}
              >
                Edit Profile
              </button>
            </Link>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
