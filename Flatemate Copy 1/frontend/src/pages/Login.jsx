import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Step 1: Enter Mobile | Step 2: Enter OTP
  const [error, setError] = useState("");

  // 🔹 Handle Input Changes
  const handleChange = (e) => {
    if (step === 1) {
      setMobile(e.target.value);
    } else {
      setOtp(e.target.value);
    }
    setError("");
  };

  // 🔄 Handle OTP Request
  const handleGetOTP = async () => {
    if (!mobile || mobile.length !== 10) {
      setError("❌ Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/login/get-otp", { mobile });
      alert("✅ OTP Sent Successfully!");
      setStep(2); // Move to OTP verification step
    } catch (error) {
      console.error("❌ OTP Request Error:", error.response?.data || error);
      setError("❌ User not found. Please register first.");
    }
  };

  // 🔄 Handle OTP Verification
  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 4) {
      setError("❌ Please enter a valid 4-digit OTP.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login/verify-otp", { mobile, otp });

      // ✅ Save token and user details in localStorage
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } else {
        setError("❌ Login failed. No token received.");
        return;
      }

      alert("✅ Login Successful!");
      console.log("🔹 Login Response:", response.data);

      // ✅ Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ OTP Verification Error:", error.response?.data || error);
      setError("❌ Invalid OTP. Try again.");
    }
  };

  return (
    <motion.div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow-lg text-center" style={{ maxWidth: "400px" }}>
        <h2>{step === 1 ? "Login" : "Verify OTP"}</h2>

        {step === 1 ? (
          <>
            <p>Enter your registered mobile number to log in.</p>
            <input
              type="text"
              className="form-control text-center"
              placeholder="Enter Mobile Number"
              value={mobile}
              onChange={handleChange}
              maxLength="10"
            />
            {error && <p className="text-danger mt-2">{error}</p>}
            <button className="btn w-100 mt-3" style={{ backgroundColor: "#20b2aa", color: "#fff" }} onClick={handleGetOTP}>
              Get OTP
            </button>
          </>
        ) : (
          <>
            <p>Enter the OTP sent to your mobile number.</p>
            <input
              type="text"
              className="form-control text-center"
              placeholder="Enter OTP"
              value={otp}
              onChange={handleChange}
              maxLength="4"
            />
            {error && <p className="text-danger mt-2">{error}</p>}
            <button className="btn w-100 mt-3" style={{ backgroundColor: "#20b2aa", color: "#fff" }} onClick={handleVerifyOTP}>
              Verify OTP
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Login;
