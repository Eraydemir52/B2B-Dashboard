// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Login from "./Login";
import ChangePasswordForm from "./ChangePasswordForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [shouldRenderComponents, setShouldRenderComponents] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    setShouldRenderComponents(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <div>
        {shouldRenderComponents ? (
          <div className="grid-container">
            <Sidebar
              openSidebarToggle={openSidebarToggle}
              OpenSidebar={OpenSidebar}
            />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/change-password"
                element={
                  <div className="form-container">
                    <ChangePasswordForm />
                  </div>
                }
              />
            </Routes>
          </div>
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    </Router>
  );
}

export default App;
