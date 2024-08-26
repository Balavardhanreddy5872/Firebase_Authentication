import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setEmail(storedUser.email);
        setFirstName(storedUser.firstName);
        setPhoto(storedUser.photo);
      } else {
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            const docRef = doc(db, "Users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const userData = docSnap.data();
              setEmail(userData.email);
              setFirstName(userData.firstName);
              setPhoto(userData.photo);
            } else {
              console.log("No such document!");
            }
          } else {
            navigate("/login");
          }
        });
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      const userData = { email, firstName, photo };
      await setDoc(doc(db, "Users", user.uid), userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/profile");
    }
  };

  return (
    <div className="body1">
      <form onSubmit={handleSubmit}>
        <h3 style={{ marginBottom: "30px" }}>Edit Profile</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Photo URL</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter photo URL"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
