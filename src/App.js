import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import HomePage from "./components/Homepage";
import Register from "./components/Register";
import { useState ,useEffect} from "react";
import { auth } from "./components/firebase";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Navbar/>
            <Routes>
              <Route
                path="/"
                element={<HomePage />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path = "/profile" element={<Profile/>} />
              <Route path="/edit-profile" element={<EditProfile />} />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
