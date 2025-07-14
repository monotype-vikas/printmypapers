import React, { useState, useEffect } from "react";
import "./Hero.css";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselData = [
    {
      id: 1,
      title: "24x7 Printout Service",
      description: "Available across Noida",
      icon: "🖨️",
      bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: 2,
      title: "Free Delivery",
      description: "Upto 3 Km",
      icon: "🚚",
      bgColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      id: 3,
      title: "Become a Partner",
      description: "Join our network",
      icon: "🤝",
      bgColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      id: 4,
      title: "Professional Printing",
      description: "High-quality prints for all your needs",
      icon: "✨",
      bgColor: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [carouselData.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselData.length) % carouselData.length
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          {/* Main Headline */}
          <h1 className="hero-title">
            Professional Printing
            <span className="highlight"> in 10 Minutes</span>
          </h1>

          {/* Tagline */}
          <p className="hero-tagline">Fast printing in 10 mins or less!</p>

          {/* Subtitle */}
          <p className="hero-subtitle">
            Quality prints delivered to your doorstep. Perfect for students,
            professionals, and businesses.
          </p>

          {/* Trust Indicators */}
          <div className="trust-indicators">
            <div className="trust-item">
              <span className="trust-icon">⚡</span>
              <span>Lightning Fast</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🎯</span>
              <span>100% Quality</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🚚</span>
              <span>Free Delivery</span>
            </div>
          </div>

          {/* Client Logos */}
          <div className="client-logos">
            <p className="logos-title">Trusted by:</p>
            <div className="logos-grid">
              <div className="logo-item">🏢 Universities</div>
              <div className="logo-item">🏢 Offices</div>
              <div className="logo-item">🏢 Students</div>
              <div className="logo-item">🏢 Businesses</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hero-cta">
            <a href="#order" className="cta-button primary">
              Order Now
            </a>
            <a href="#pricing" className="cta-button secondary">
              View Pricing
            </a>
            <a href="#resume-builder" className="cta-button resume">
              🎯 Free Resume Builder
            </a>
          </div>

          {/* Mobile Sticky CTA */}
          <div className="mobile-sticky-cta">
            <a href="#order" className="sticky-order-btn">
              📱 Order Now
            </a>
          </div>
        </div>

        <div className="hero-visual">
          {/* Full Width Text Carousel */}
          <div className="text-carousel-section">
            <div className="text-carousel-container">
              {carouselData.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`text-carousel-slide ${
                    index === currentSlide ? "active" : ""
                  }`}
                  style={{ background: slide.bgColor }}
                >
                  <div className="text-carousel-content">
                    <div className="text-carousel-icon">{slide.icon}</div>
                    <h3 className="text-carousel-title">{slide.title}</h3>
                    <p className="text-carousel-description">
                      {slide.description}
                    </p>
                  </div>
                </div>
              ))}

              <button className="text-carousel-arrow prev" onClick={prevSlide}>
                ‹
              </button>
              <button className="text-carousel-arrow next" onClick={nextSlide}>
                ›
              </button>

              <div className="text-carousel-nav">
                {carouselData.map((_, index) => (
                  <button
                    key={index}
                    className={`text-carousel-dot ${
                      index === currentSlide ? "active" : ""
                    }`}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* WhatsApp Section */}
          <div className="whatsapp-hero-section">
            <div className="whatsapp-hero-card">
              <h3>Order via WhatsApp</h3>
              <p>
                Prefer WhatsApp? Scan the QR code or click the button below to
                order directly via WhatsApp!
              </p>

              <div className="whatsapp-hero-qr">
                <div className="qr-code-hero"></div>
                <p>Scan to order via WhatsApp</p>
              </div>

              <a
                href="https://wa.me/919717548785?text=Hi! I want to place a print order. Can you help me?"
                className="whatsapp-hero-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                📱 Order via WhatsApp
              </a>

              <div className="whatsapp-hero-features">
                <div className="feature-item">
                  <span>⚡</span>
                  <span>Instant Response</span>
                </div>
                <div className="feature-item">
                  <span>📸</span>
                  <span>Send Documents</span>
                </div>
                <div className="feature-item">
                  <span>💬</span>
                  <span>Live Chat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
