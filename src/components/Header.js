import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../logo.png";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <div className="logo">
          <div className="logo-main">
            <img src={logo} alt="PrintMyPapers Logo" className="logo-icon" />
            <h1 className="logo-text">printmypapers</h1>
          </div>
          <span className="logo-tagline">in just 10 mins</span>
        </div>

        <nav className="nav">
          <a href="#home" className="nav-link" onClick={closeMobileMenu}>
            Home
          </a>
          <a href="#pricing" className="nav-link" onClick={closeMobileMenu}>
            Pricing
          </a>
          <a href="#order" className="nav-link" onClick={closeMobileMenu}>
            Order Now
          </a>
          <a
            href="#resume-builder"
            className="nav-link"
            onClick={closeMobileMenu}
          >
            Resume Builder
          </a>
          <a href="#contact" className="nav-link" onClick={closeMobileMenu}>
            Contact
          </a>
        </nav>

        <button className="mobile-nav-toggle" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      <nav className={`mobile-nav ${isMobileMenuOpen ? "active" : ""}`}>
        <a href="#home" className="nav-link" onClick={closeMobileMenu}>
          Home
        </a>
        <a href="#pricing" className="nav-link" onClick={closeMobileMenu}>
          Pricing
        </a>
        <a href="#order" className="nav-link" onClick={closeMobileMenu}>
          Order Now
        </a>
        <a
          href="#resume-builder"
          className="nav-link"
          onClick={closeMobileMenu}
        >
          Resume Builder
        </a>
        <a href="#contact" className="nav-link" onClick={closeMobileMenu}>
          Contact
        </a>
      </nav>
    </header>
  );
};

export default Header;
