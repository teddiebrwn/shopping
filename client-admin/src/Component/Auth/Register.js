import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash as faEyeSlashRegular } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"
import API from "../../api/api";
import "./Register.css";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        gender: "",
        name: "",
        username: "",
        email: "",
        birthday: "",
        password: "",
        confirmPassword: "",
        address: "",
        city: "",
        country: "",
    });
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordRequirements, setPasswordRequirements] = useState({
        oneLowercase: false,
        oneUppercase: false,
        oneNumber: false,
        oneSpecialChar: false,
        minLength: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: name === "username" ? value.replace(/^@/, "") : value,
        }));

        if (name === "password") {
            validatePassword(value);
        }
    };

    const validatePassword = (password) => {
        const specialChars = /[~!@#$%^&*_\/\-+=`]/;
        const requirements = {
            oneLowercase: /[a-z]/.test(password), // At least one lowercase letter
            oneUppercase: /[A-Z]/.test(password), // At least one uppercase letter
            oneNumber: /\d/.test(password), // At least one number
            oneSpecialChar: specialChars.test(password), // At least one special character
            minLength: password.length >= 8, // Minimum length of 8 characters
        };

        setPasswordRequirements(requirements);
    };

        const handleRegister = async () => {
            try {
                const payload = { ...formData };
                const response = await API.post("/auth/register", payload);
                setMessage(
                    response.data.message ||
                        "Registration successful! Please verify your account."
                );
                setError("");

                localStorage.setItem(
                    "emailOrUsername",
                    formData.email || formData.username
                );

                setTimeout(() => {
                    window.location.href = "/admin/verify";
                }, 2000);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                        "Registration failed. Please try again."
                );
                setMessage("");
            }
        };

    return (
        <div className="register-form">
            <div className="register-navigation">
                <a className="nav-link active" onClick={() => navigate("/admin/login")}>
                    ALREADY REGISTERED?
                </a>
                <a className="nav-link" onClick={() => navigate("/admin/register")}>
                    CREATE YOUR ACCOUNT
                </a>
            </div>

            <div className="register-container">
                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message">{message}</p>}
                <form>
                    <div className="input-group">
                        <input
                            type="text"
                            name="name"
                            placeholder=" "
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <label>Your Name *</label>
                    </div>

                    <div className="input-group">
                        <input
                            type="text"
                            name="username"
                            placeholder=" "
                            value={formData.username ? `@${formData.username}` : ""}
                            onChange={handleChange}
                        />
                        <label>Username *</label>
                    </div>

                    <div className="gender-group">
                        <label className="form-label">Gender *</label>
                        <div className="gender-options">
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    onChange={handleChange}
                                />
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    onChange={handleChange}
                                />
                                Female
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Non-binary"
                                    onChange={handleChange}
                                />
                                Non-binary
                            </label>
                        </div>
                    </div>

                    <div className="input-group">
                        <input
                            type="date"
                            name="birthday"
                            value={formData.birthday}
                            onChange={handleChange}
                        />
                        <label>Day of birth *</label>
                    </div>

                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            placeholder=" "
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <label>Email Address *</label>
                    </div>

                    <div className="password-requirements">
                        <label className="requirements-title">Password Requirements</label>
                        <ul>
                            <li className={passwordRequirements.oneLowercase ? "valid" : "invalid"}>
                                <FontAwesomeIcon
                                    icon={passwordRequirements.oneLowercase ? faCheck : faTimes}
                                    className="requirement-icon"
                                />
                                At least one lowercase character
                            </li>
                            <li className={passwordRequirements.oneUppercase ? "valid" : "invalid"}>
                                <FontAwesomeIcon
                                    icon={passwordRequirements.oneUppercase ? faCheck : faTimes}
                                    className="requirement-icon"
                                />
                                At least one uppercase character
                            </li>
                            <li className={passwordRequirements.oneNumber ? "valid" : "invalid"}>
                                <FontAwesomeIcon
                                    icon={passwordRequirements.oneNumber ? faCheck : faTimes}
                                    className="requirement-icon"
                                />
                                At least one number
                            </li>
                            <li className={passwordRequirements.oneSpecialChar ? "valid" : "invalid"}>
                                <FontAwesomeIcon
                                    icon={passwordRequirements.oneSpecialChar ? faCheck : faTimes}
                                    className="requirement-icon"
                                />
                                At least one special character (~!@#$%^&*_ /-+=`)
                            </li>
                            <li className={passwordRequirements.minLength ? "valid" : "invalid"}>
                                <FontAwesomeIcon
                                    icon={passwordRequirements.minLength ? faCheck : faTimes}
                                    className="requirement-icon"
                                />
                                Minimum 8 characters
                            </li>
                        </ul>
                    </div>

                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder=" "
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <label>Password *</label>
                        <FontAwesomeIcon
                            icon={showPassword ? faEyeSlashRegular : faEye}
                            className="password-icon"
                            onClick={() => setShowPassword((prev) => !prev)}
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder=" "
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        <label>Confirm Password *</label>
                        <FontAwesomeIcon
                            icon={showConfirmPassword ? faEyeSlashRegular : faEye}
                            className="password-icon"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="text"
                            name="address"
                            placeholder=" "
                            value={formData.address}
                            onChange={handleChange}
                        />
                        <label>Address</label>
                    </div>

                    <div className="input-group">
                        <input
                            type="text"
                            name="city"
                            placeholder=" "
                            value={formData.city}
                            onChange={handleChange}
                        />
                        <label>City</label>
                    </div>

                    <div className="input-group">
                        <input
                            type="text"
                            name="country"
                            placeholder=" "
                            value={formData.country}
                            onChange={handleChange}
                        />
                        <label>Country</label>
                    </div>

                    <button
                        type="button"
                        onClick={handleRegister}
                        disabled={!Object.values(passwordRequirements).every((req) => req)}
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
