import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <div className="logo-main">
            <span className="logo-icon">🖨️</span>
            <h1 className="logo-text">printmypapers</h1>
          </div>
          <span className="logo-tagline">in just 10 mins</span>
        </div>
        <nav className="nav">
          <a href="#home" className="nav-link">
            Home
          </a>
          <a href="#pricing" className="nav-link">
            Pricing
          </a>
          <a href="#order" className="nav-link">
            Order Now
          </a>
          <a href="#resume-builder" className="nav-link">
            Resume Builder
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
