import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập trước!");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Đăng xuất thành công!");
    navigate("/login");
  };

  return (
    <div className="homepage">
      <h1>Welcome to Homepage!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Homepage;
