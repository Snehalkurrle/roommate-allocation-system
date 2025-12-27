import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";

const Auth = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mobile: "",
    name: "",
    gender: "",
    city: "",
    profilePic: null,
    profilePicPreview: null,
  });

  const [error, setError] = useState("");

  // 🔹 Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // 🖼 Handle Profile Picture Upload
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profilePic: file, profilePicPreview: imageUrl });
    }
  };

  // 🔄 Handle Registration (Save User in DB & Store Token)
  const handleRegister = async (e) => {
    e.preventDefault();

    const { mobile, name, gender, city, profilePic } = formData;
    if (!mobile || mobile.length !== 10 || !name || !gender || !city || !profilePic) {
      setError("❌ Please fill in all required fields and upload a profile picture.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("mobile", mobile);
      formDataToSend.append("name", name);
      formDataToSend.append("gender", gender);
      formDataToSend.append("city", city);
      formDataToSend.append("profilePic", profilePic);

      const response = await axios.post("http://localhost:5000/api/auth/register", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Register Response:", response.data);

      if (response.data.token) {
        // ✅ Store user data in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } else {
        setError("❌ Token missing from response!");
        return;
      }

      alert("✅ Registration Successful!");
      navigate("/preferences"); // ✅ Redirect to Dashboard
    } catch (error) {
      console.error("❌ Registration Error:", error.response?.data || error);
      setError(error.response?.data.message || "❌ Error registering. Please try again.");
    }
  };

  return (
    <motion.div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow-lg text-center" style={{ maxWidth: "400px" }}>
        <h2>Register</h2>

        {/* Profile Picture Upload */}
        <div className="d-flex justify-content-center mb-3">
          <label
            htmlFor="profilePicInput"
            className="d-flex align-items-center justify-content-center"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              border: "2px dashed #20b2aa",
              cursor: "pointer",
            }}
          >
            {formData.profilePicPreview ? (
              <img
                src={formData.profilePicPreview}
                alt="Profile"
                style={{ width: "100%", height: "100%", borderRadius: "50%" }}
              />
            ) : (
              <FaPlus style={{ fontSize: "20px", color: "#20b2aa" }} />
            )}
          </label>
          <input type="file" id="profilePicInput" accept="image/*" onChange={handleProfilePicChange} style={{ display: "none" }} />
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="w-100">
          <input type="text" className="form-control mb-2" placeholder="Enter Mobile Number" name="mobile" value={formData.mobile} onChange={handleChange} maxLength="10" required />
          <input type="text" className="form-control mb-2" placeholder="Full Name" name="name" value={formData.name} onChange={handleChange} required />
          <select className="form-control mb-2" name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <select className="form-control mb-2" name="city" value={formData.city} onChange={handleChange} required>
            <option value="">Select City</option>
            <option value="Pune">Pune</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Nagpur">Nagpur</option>
            <option value="Nashik">Nashik</option>
            <option value="Aurangabad">Aurangabad</option>
          </select>

          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn w-100" style={{ backgroundColor: "#20b2aa", color: "#fff" }}>
            Register
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Auth;
