import React, { useState, useEffect } from "react";
import "./Hero.css";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselData = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Professional Printing",
      description: "High-quality prints for all your needs",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Fast Delivery",
      description: "Get your prints delivered in just 10 minutes",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Color & B&W",
      description: "Both color and black & white printing available",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Document Processing",
      description: "Handle all types of documents professionally",
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
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">⚡ FAST SERVICE</span>
          </div>
          <h1 className="hero-title">
            Get Your Printout in Just
            <span className="highlight"> 10 Minutes!</span>
          </h1>
          <p className="hero-subtitle">
            Professional printing services with lightning-fast delivery. Quality
            prints at affordable prices, delivered to your doorstep.
          </p>

          {/* Carousel replacing hero-features */}
          <div className="hero-carousel-section">
            <div className="carousel-container">
              {carouselData.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`carousel-slide ${
                    index === currentSlide ? "active" : ""
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="carousel-image"
                  />
                  <div className="carousel-overlay">
                    <h3>{slide.title}</h3>
                    <p>{slide.description}</p>
                  </div>
                </div>
              ))}

              <button className="carousel-arrow prev" onClick={prevSlide}>
                ‹
              </button>
              <button className="carousel-arrow next" onClick={nextSlide}>
                ›
              </button>

              <div className="carousel-nav">
                {carouselData.map((_, index) => (
                  <button
                    key={index}
                    className={`carousel-dot ${
                      index === currentSlide ? "active" : ""
                    }`}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>

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
        </div>
        <div className="hero-visual">
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
