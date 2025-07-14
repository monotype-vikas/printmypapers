import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>PrintMyPapers</h3>
            <p>
              Your trusted partner for fast, reliable, and affordable printing
              services. Get your prints delivered in just 10 minutes!
            </p>
            <div className="social-links">
              <a href="mailto:admin@printmypapers.com" className="social-link">
                📧
              </a>
              <a href="tel:+919717548785" className="social-link">
                📱
              </a>
              <a href="https://wa.me/919717548785" className="social-link">
                📞
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
              </li>
              <li>
                <a href="#order">Order Now</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul className="footer-links">
              <li>Black & White Printing</li>
              <li>Color Printing</li>
              <li>Document Printing</li>
              <li>Photo Printing</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>Your Location, City, State</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>+91 97175 48785</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <span>admin@printmypapers.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🕒</span>
                <span>Mon-Sat: 9AM-8PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2025 PrintMyPapers. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
