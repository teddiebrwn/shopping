import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResetPassword.css";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/auth/reset-password", {
        newPassword,
        confirmNewPassword: confirmPassword,
      });
      console.log("Password reset successful:", response.data);
      setSuccessMessage("Password has been reset successfully!");
      setTimeout(() => navigate("/login"), 2000); 
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred while resetting password.");
    }
  };

  const handleCancel = () => {
    navigate("/login");
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    if (newPassword !== value) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  return (
    <div className="reset-password-container">
      <h2 className="reset-password-header">RESET PASSWORD</h2>
      <div className="password-requirements">
        <p>Password requirements</p>
        <ul>
          <li>No repetition of more than two characters</li>
          <li>One number</li>
          <li>At least 1 allowed special character(s) from ~!@#$%^&*-_/+=`</li>
          <li>One lowercase character</li>
          <li>One uppercase character</li>
          <li>8 characters minimum</li>
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type={showNewPassword ? "text" : "password"}
            id="new-password"
            placeholder=" "
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <label htmlFor="new-password">New Password*</label>
          <span
            className="show-toggle"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? "Hide" : "Show"}
          </span>
        </div>
        <div className="input-group">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirm-password"
            placeholder=" "
            value={confirmPassword}
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            required
          />
          <label htmlFor="confirm-password">Confirm New Password*</label>
          <span
            className="show-toggle"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </span>
          {error && <p className="error-message">{error}</p>}
        </div>
        <div className="button-group">
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            CANCEL
          </button>
          <button type="submit" className="save-button">
            SAVE
          </button>
        </div>
        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}
      </form>
    </div>
  );
}

export default ResetPassword;
