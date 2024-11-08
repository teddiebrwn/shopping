// src/pages/Register.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  usePhonePrefixes,
  useEmailSuggestions,
} from "../Hooks/useDropdownOptions";

const Register = () => {
  const navigate = useNavigate();

  const phonePrefixes = usePhonePrefixes();
  const emailSuggestions = useEmailSuggestions();

  const [registrationType, setRegistrationType] = useState("Username");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailSuggestion, setEmailSuggestion] = useState(emailSuggestions[0]);
  const [phone, setPhone] = useState("");
  const [phonePrefix, setPhonePrefix] = useState(phonePrefixes[0]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

  useEffect(() => {
    if (month && year) {
      if (day > daysInMonth(month, year)) {
        setDay("");
      }
    }
  }, [month, year, day]);

  const handleRegistrationTypeChange = (type) => {
    setRegistrationType(type);
    setUsername("");
    setEmail("");
    setPhone("");
  };

  const handleRegister = async () => {
    const dateOfBirth = `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}`;
    if (!day || !month || !year) {
      setErrorMessage("Vui lòng nhập ngày tháng năm sinh hợp lệ!");
      return;
    }

    const payload = {
      registrationType,
      username: registrationType === "Username" ? username : undefined,
      email: registrationType === "Email" ? email + emailSuggestion : undefined,
      phone: registrationType === "Phone" ? phonePrefix + phone : undefined,
      firstName,
      lastName,
      dateOfBirth,
      password,
    };

    try {
      const response = await fetch(
        "http://localhost:5001/api/admins/registerAdmin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate("/login"); //login page
      } else {
        setErrorMessage(data.message || "Đăng ký thất bại.");
      }
    } catch (error) {
      setErrorMessage("Đăng ký thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow-md bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
      <form className="space-y-4">
        <div>
          <label className="block font-medium mb-2">
            Choose registration type:
          </label>
          <select
            value={registrationType}
            onChange={(e) => handleRegistrationTypeChange(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option>Username</option>
            <option>Email</option>
            <option>Phone</option>
          </select>
        </div>

        {registrationType === "Username" && (
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

        {registrationType === "Email" && (
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

        {registrationType === "Phone" && (
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
          <label className="block font-medium mb-2">First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium mb-2">Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium mb-2">Date of Birth:</label>
          <div className="flex space-x-2">
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="">Day</option>
              {[
                ...Array(
                  daysInMonth(month || 1, year || new Date().getFullYear())
                ).keys(),
              ].map((d) => (
                <option key={d + 1} value={d + 1}>
                  {d + 1}
                </option>
              ))}
            </select>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="">Month</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="">Year</option>
              {Array.from(
                { length: 100 },
                (_, i) => new Date().getFullYear() - i
              ).map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
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
            onClick={handleRegister}
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full p-2 border rounded-md hover:bg-gray-100"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
