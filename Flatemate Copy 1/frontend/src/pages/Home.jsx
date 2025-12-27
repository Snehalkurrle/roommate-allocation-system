import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch } from "react-icons/fa"; // ✅ Search Icon
import HomeImage from "../assets/Home.png"; // ✅ Ensure Correct Path
import HomeImage3 from "../assets/Home3.png"; // ✅ Ensure Correct Path

// ✅ Import City Images
import puneImage from "../assets/Pune1.png";
import mumbaiImage from "../assets/Mumbai2.jpg";
import nagpurImage from "../assets/Nagpur3.png";
import nashikImage from "../assets/Nashik4.jpg";
import aurangabadImage from "../assets/Aurangabad5.jpg";

import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const [searchCity, setSearchCity] = useState("");

  // 🔍 Handle City Search & Redirect to Dashboard
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchCity) {
      navigate(`/dashboard?location=${searchCity}`);
    }
  };

  // 🔹 Quick Navigation to Dashboard with Selected City
  const handleCityClick = (city) => {
    navigate(`/dashboard?location=${city}`);
  };

  return (
    <div style={styles.container} className="container-fluid">
      {/* ✅ Search Bar */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          className="form-control"
          placeholder="Search for Flats or Flatmates..."
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          onKeyDown={handleSearch} // 🔍 Search on Enter
          style={styles.searchInput}
        />
        <button className="btn" onClick={() => handleSearch({ key: "Enter" })} style={styles.searchButton}>
          <FaSearch />
        </button>
      </div>

{/* ✅ City Links for Quick Navigation */}
<div className="text-center mt-2">
  <span style={styles.cityLinks}>
    {["Pune", "Mumbai", "Nagpur", "Nashik", "Aurangabad"].map((city, index) => (
      <span key={city}>
        <button 
          className="btn btn-link p-0 m-0" 
          onClick={() => handleCityClick(city)} 
          style={styles.cityLink}
        >
          {city}
        </button>
        {index !== 4 && ", "} {/* ✅ Add comma between cities, except last one */}
      </span>
    ))}
  </span>
</div>


      {/* ✅ Animated Heading */}
      <h1 style={styles.animatedHeading}>
        <span style={styles.textSeaGreen}>Find Your Perfect</span> <span style={styles.textPink}>Flatmate</span> <span style={styles.textBlack}>Easily!</span>
      </h1>

      {/* ✅ Centered Image */}
      <div className="text-center">
        <img src={HomeImage} alt="Home" style={styles.imageCentered} />
      </div>

      {/* ✅ Left: Text Content | Right: Image */}
      <div className="row align-items-center mt-5">
        {/* Left Side - Text Content */}
        <div className="col-lg-6 text-center text-lg-start">
          <h2 style={styles.leftHeading}>Effortless Flat Hunting</h2>
          <p style={styles.text}>
            Discover the best flats and roommates in your city with our easy-to-use platform. Hassle-free connections and verified listings ensure a smooth experience!
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="col-lg-6 text-center">
          <img src={HomeImage3} alt="Home3" style={styles.imageRight} />
        </div>
      </div>

      {/* ✅ "View Rooms in Popular Cities" Section */}
      <div className="container text-center mt-4 ">
      <h1 className="fw-bold mb-3" style={{ color: "#20b2aa" }}>
    View Rooms in Popular Cities
  </h1>
  <br/>
  <br/>
        <div className="row">
          {[
            { city: "Pune", img: puneImage },
            { city: "Mumbai", img: mumbaiImage },
            { city: "Nagpur", img: nagpurImage },
            { city: "Nashik", img: nashikImage },
            { city: "Aurangabad", img: aurangabadImage },
          ].map(({ city, img }) => (
            <div key={city} className="col-md-4 mb-3">
              <img
                src={img}
                alt={city}
                className="img-fluid rounded shadow"
                style={{ cursor: "pointer", height: "200px", objectFit: "cover" }}
                onClick={() => handleCityClick(city)}
              />
              <h5 className="mt-2">{city}</h5>
            </div>
          ))}
        </div>
      </div>
  
    </div>
  );
};

// ✅ Inline Styles (Bootstrap + Custom Animations)
const styles = {
  container: {
    padding: "50px 10px",
    textAlign: "center",
  },

  // ✅ Search Bar Container
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "600px",
    margin: "0 auto 30px",
    border: "2px solid #20b2aa",
    borderRadius: "30px",
    overflow: "hidden",
  },
  searchInput: {
    flex: 1,
    border: "none",
    padding: "12px",
    fontSize: "16px",
    outline: "none",
  },
  searchButton: {
    backgroundColor: "#20b2aa",
    color: "white",
    padding: "12px 12px",
    border: "none",
    borderRadius: "0 30px 30px 0",
    cursor: "pointer",
  },

  // ✅ City Links for Quick Navigation
  cityLink: {
    textDecoration: "none",
    fontSize: "16px",
    cursor: "pointer",
  },

  // ✅ Animated Heading
  animatedHeading: {
    fontSize: "3rem",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "2px",
    animation: "fadeIn 1.5s ease-in-out",
    marginTop: "90px",
  },
  textSeaGreen: { color: "#20b2aa", fontWeight: "bold" },
  textPink: { color: "rgb(219,112,147)", fontWeight: "bold" },
  textBlack: { color: "black", fontWeight: "bold" },

  // ✅ Centered Image
  imageCentered: {
    width: "90%",
    height: "90%",
    maxWidth: "900px",
  },

  // ✅ Left Side Heading
  leftHeading: {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#20b2aa",
    marginLeft: "20%",
  },
  text: {
    fontSize: "1.2rem",
    color: "black",
    fontWeight: "400",
    marginLeft: "10%",
  },

  // ✅ Right Side Image
  imageRight: {
    width: "100%",
    maxWidth: "550px",
    height: "auto",
  },
  cityLinks: {
    fontSize: "16px",
    color: "#20b2aa", // ✅ Default text color
  },
  cityLink: {
    textDecoration: "none",
    color: "#20b2aa", // ✅ Remove bold effect & keep default color
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    padding: "0 2px", // ✅ Minimize space between city names
  },

  // ✅ Responsive Design
  "@media (max-width: 768px)": {
    imageCentered: { width: "80%" },
    animatedHeading: { fontSize: "2.5rem" },
    leftHeading: { fontSize: "1.8rem" },
    text: { fontSize: "1rem" },
  },
  "@media (max-width: 480px)": {
    imageCentered: { width: "90%" },
    animatedHeading: { fontSize: "2rem" },
    leftHeading: { fontSize: "1.6rem" },
    text: { fontSize: "0.9rem" },
  },
};

export default Home;
