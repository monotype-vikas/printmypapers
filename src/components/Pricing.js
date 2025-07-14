import React from "react";
import "./Pricing.css";

const Pricing = () => {
  return (
    <section id="pricing" className="pricing">
      <div className="pricing-container">
        <div className="section-header">
          <h2>Our Pricing</h2>
          <p>Transparent pricing with no hidden costs</p>
        </div>

        <div className="pricing-grid">
          <div className="pricing-card">
            <div className="card-header">
              <h3>Black & White</h3>
              <div className="price">
                <span className="currency">₹</span>
                <span className="amount">2</span>
                <span className="per">per page</span>
              </div>
            </div>
            <div className="card-features">
              <div className="feature">
                <span className="check">✓</span>
                <span>High quality prints</span>
              </div>
              <div className="feature">
                <span className="check">✓</span>
                <span>Standard A4 size</span>
              </div>
              <div className="feature">
                <span className="check">✓</span>
                <span>Fast processing</span>
              </div>
            </div>
          </div>

          <div className="pricing-card featured">
            <div className="popular-badge">Most Popular</div>
            <div className="card-header">
              <h3>Color Print</h3>
              <div className="price">
                <span className="currency">₹</span>
                <span className="amount">10</span>
                <span className="per">per page</span>
              </div>
            </div>
            <div className="card-features">
              <div className="feature">
                <span className="check">✓</span>
                <span>Vibrant color prints</span>
              </div>
              <div className="feature">
                <span className="check">✓</span>
                <span>Photo quality</span>
              </div>
              <div className="feature">
                <span className="check">✓</span>
                <span>Premium paper</span>
              </div>
            </div>
          </div>

          <div className="pricing-card">
            <div className="card-header">
              <h3>Delivery</h3>
              <div className="price">
                <span className="currency">₹</span>
                <span className="amount">0</span>
                <span className="per">upto 3km</span>
              </div>
            </div>
            <div className="card-features">
              <div className="feature">
                <span className="check">✓</span>
                <span>Free delivery (0-3km)</span>
              </div>
              <div className="feature">
                <span className="check">✓</span>
                <span>₹50 for 3km+</span>
              </div>
              <div className="feature">
                <span className="check">✓</span>
                <span>Same day delivery</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pricing-info">
          <div className="info-card">
            <div className="info-icon">⚡</div>
            <h4>10 Minute Service</h4>
            <p>Get your prints ready in just 10 minutes for urgent orders</p>
          </div>
          <div className="info-card">
            <div className="info-icon">🚚</div>
            <h4>Free Delivery</h4>
            <p>Free delivery within 3km radius from our location</p>
          </div>
          <div className="info-card">
            <div className="info-icon">💳</div>
            <h4>Cash on Delivery</h4>
            <p>Pay when you receive your prints - no advance payment</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
