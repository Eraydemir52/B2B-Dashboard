// LogoutButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Çıkış işlemlerini gerçekleştir
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");

    // Çıkış başarılı olduğunda onLogout prop'u aracılığıyla işlemi gerçekleştir
    onLogout();

    // Ana sayfaya yönlendir
    navigate("");
  };

  return (
    <button onClick={handleLogout} href="http://localhost:5173/">
      Çıkış Yap
    </button>
  );
};

export default LogoutButton;
