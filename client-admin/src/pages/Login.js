import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  usePhonePrefixes,
  useEmailSuggestions,
} from "../Hooks/useDropdownOptions";

const Login = () => {
  const navigate = useNavigate();

  const phonePrefixes = usePhonePrefixes();
  const emailSuggestions = useEmailSuggestions();

  const [loginType, setLoginType] = useState("Username");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailSuggestion, setEmailSuggestion] = useState(emailSuggestions[0]);
  const [phone, setPhone] = useState("");
  const [phonePrefix, setPhonePrefix] = useState(phonePrefixes[0]);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginTypeChange = (type) => {
    setLoginType(type);
    setUsername("");
    setEmail("");
    setPhone("");
  };

  const handleLogin = async () => {
    const identifier =
      loginType === "Username"
        ? username
        : loginType === "Email"
        ? email + emailSuggestion
        : phonePrefix + phone;

    try {
      const response = await fetch(
        "http://localhost:5001/api/admins/loginAdmin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier, password }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Đăng nhập thành công!");
        localStorage.setItem("token", data.token); //token được lưu trong cache
        navigate("/homepage");
      } else {
        setErrorMessage(data.message || "Đăng nhập thất bại!");
      }
    } catch (error) {
      setErrorMessage("Đăng nhập thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow-md bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      <form className="space-y-4">
        <div>
          <label className="block font-medium mb-2">Choose login type:</label>
          <select
            value={loginType}
            onChange={(e) => handleLoginTypeChange(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option>Username</option>
            <option>Email</option>
            <option>Phone</option>
          </select>
        </div>

        {loginType === "Username" && (
          <div>
            <label className="block font-medium mb-2">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value.startsWith("@")
                    ? e.target.value
                    : `@${e.target.value}`
                )
              }
              placeholder="@Username"
              className="w-full p-2 border rounded-md"
            />
          </div>
        )}

        {loginType === "Email" && (
          <div>
            <label className="block font-medium mb-2">Email:</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="flex-grow p-2 border rounded-md"
              />
              <select
                value={emailSuggestion}
                onChange={(e) => setEmailSuggestion(e.target.value)}
                className="p-2 border rounded-md"
              >
                {emailSuggestions.map((suggestion) => (
                  <option key={suggestion}>{suggestion}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {loginType === "Phone" && (
          <div>
            <label className="block font-medium mb-2">Phone:</label>
            <div className="flex space-x-2">
              <select
                value={phonePrefix}
                onChange={(e) => setPhonePrefix(e.target.value)}
                className="p-2 border rounded-md"
              >
                {phonePrefixes.map((prefix) => (
                  <option key={prefix}>{prefix}</option>
                ))}
              </select>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                className="flex-grow p-2 border rounded-md"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block font-medium mb-2">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleLogin}
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="w-full p-2 border rounded-md hover:bg-gray-100"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
