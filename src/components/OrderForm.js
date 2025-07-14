import React, { useState, useEffect, useRef } from "react";
import "./OrderForm.css";
import { GOOGLE_MAPS_CONFIG } from "../config/googleMaps";

const OrderForm = ({ orderData, setOrderData, onSubmit }) => {
  const [documents, setDocuments] = useState([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [showManualLocation, setShowManualLocation] = useState(false);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  const fileInputRef = useRef(null);

  // Google Maps API key from configuration
  const GOOGLE_MAPS_API_KEY = GOOGLE_MAPS_CONFIG.API_KEY;

  // Load Google Maps API
  useEffect(() => {
    if (GOOGLE_MAPS_API_KEY !== "YOUR_GOOGLE_MAPS_API_KEY_HERE") {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsGoogleMapsLoaded(true);
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [GOOGLE_MAPS_API_KEY]);

  useEffect(() => {
    // Auto-detect location on component mount
    detectCurrentLocation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const detectCurrentLocation = () => {
    setIsLoadingLocation(true);
    setLocationError("");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setOrderData((prev) => ({
            ...prev,
            latitude,
            longitude,
          }));

          // Use Google Maps API if available, otherwise fallback
          if (
            isGoogleMapsLoaded &&
            GOOGLE_MAPS_API_KEY !== "YOUR_GOOGLE_MAPS_API_KEY_HERE"
          ) {
            getAddressFromGoogleMaps(latitude, longitude);
            calculateDistanceFromGoogleMaps(latitude, longitude);
          } else {
            // Fallback to simple calculation
            calculateDistanceFromCoords(latitude, longitude);
          }
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationError(
            "Unable to detect location automatically. Please enter manually."
          );
          setIsLoadingLocation(false);
          setShowManualLocation(true);
        },
        {
          timeout: 10000,
          enableHighAccuracy: true,
          maximumAge: 60000,
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
      setIsLoadingLocation(false);
      setShowManualLocation(true);
    }
  };

  const getAddressFromGoogleMaps = async (lat, lng) => {
    try {
      const response = await fetch(
        `${GOOGLE_MAPS_CONFIG.ENDPOINTS.GEOCODING}?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.results && data.results[0]) {
        const address = data.results[0].formatted_address;
        setOrderData((prev) => ({
          ...prev,
          address,
        }));
      }
    } catch (error) {
      console.error("Error getting address from Google Maps:", error);
      // Fallback to coordinates
      setOrderData((prev) => ({
        ...prev,
        address: `Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
      }));
    }
  };

  const calculateDistanceFromGoogleMaps = async (lat, lng) => {
    // Business location coordinates from configuration
    const businessLat = GOOGLE_MAPS_CONFIG.BUSINESS_LOCATION.lat;
    const businessLng = GOOGLE_MAPS_CONFIG.BUSINESS_LOCATION.lng;

    try {
      const response = await fetch(
        `${GOOGLE_MAPS_CONFIG.ENDPOINTS.DISTANCE_MATRIX}?origins=${lat},${lng}&destinations=${businessLat},${businessLng}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.rows && data.rows[0] && data.rows[0].elements[0]) {
        const distanceText = data.rows[0].elements[0].distance.text;
        const distanceKm = parseFloat(distanceText.replace(" km", ""));
        setOrderData((prev) => ({
          ...prev,
          distance: distanceKm,
        }));
      }
    } catch (error) {
      console.error("Error calculating distance from Google Maps:", error);
      // Fallback to simple calculation
      calculateDistanceFromCoords(lat, lng);
    }
  };

  const calculateDistanceFromCoords = (lat, lng) => {
    // Business location coordinates from configuration
    const businessLat = GOOGLE_MAPS_CONFIG.BUSINESS_LOCATION.lat;
    const businessLng = GOOGLE_MAPS_CONFIG.BUSINESS_LOCATION.lng;

    // Calculate distance using Haversine formula
    const R = 6371; // Earth's radius in kilometers
    const dLat = ((lat - businessLat) * Math.PI) / 180;
    const dLng = ((lng - businessLng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((businessLat * Math.PI) / 180) *
        Math.cos((lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    setOrderData((prev) => ({
      ...prev,
      distance: Math.round(distance * 10) / 10, // Round to 1 decimal place
    }));
  };

  const handleManualLocationSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const distance = parseFloat(formData.get("manualDistance"));

    if (distance && !isNaN(distance)) {
      setOrderData((prev) => ({
        ...prev,
        distance: distance,
        address: formData.get("manualAddress") || "Address entered manually",
      }));
      setShowManualLocation(false);
      setLocationError("");
    } else {
      setLocationError("Please enter a valid distance.");
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);

    files.forEach((file) => {
      if (file.type === "application/pdf") {
        // For PDF files, we'll estimate pages (you can use a PDF library for exact count)
        const estimatedPages = Math.ceil(file.size / 50000); // Rough estimate
        addDocument(file, estimatedPages);
      } else if (file.type.startsWith("image/")) {
        // For images, count as 1 page each
        addDocument(file, 1);
      } else {
        // For other files, estimate based on size
        const estimatedPages = Math.ceil(file.size / 100000);
        addDocument(file, estimatedPages);
      }
    });
  };

  const addDocument = (file, pages) => {
    const newDocument = {
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      pages,
      size: file.size,
      type: file.type,
    };

    setDocuments((prev) => [...prev, newDocument]);
    updateTotalPages();
  };

  const removeDocument = (id) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    updateTotalPages();
  };

  const updateTotalPages = () => {
    const totalPages = documents.reduce((sum, doc) => sum + doc.pages, 0);
    setOrderData((prev) => ({
      ...prev,
      pages: totalPages,
    }));
  };

  const calculateTotal = () => {
    const basePrice = orderData.color ? 10 : 2;
    const totalPages = documents.reduce((sum, doc) => sum + doc.pages, 0);
    const deliveryCost = orderData.distance > 3 ? 50 : 0;
    return basePrice * totalPages + deliveryCost;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setOrderData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (documents.length === 0) {
      alert("Please upload at least one document to print.");
      return;
    }
    onSubmit(e);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <section id="order" className="order-form">
      <div className="order-container">
        <div className="section-header">
          <h2>Place Your Order</h2>
          <p>
            Upload your documents and we'll get back to you within 10 minutes
          </p>
        </div>

        <div className="order-content">
          <div className="order-grid">
            <form onSubmit={handleSubmit} className="form">
              {/* Location Detection */}
              <div className="location-section">
                <h3>📍 Location & Delivery</h3>
                <div className="location-info">
                  {isLoadingLocation ? (
                    <div className="loading">Detecting your location...</div>
                  ) : showManualLocation ? (
                    <div className="manual-location-form">
                      <p className="location-error">{locationError}</p>
                      <form onSubmit={handleManualLocationSubmit}>
                        <div className="form-group">
                          <label htmlFor="manualAddress">Your Address:</label>
                          <input
                            type="text"
                            id="manualAddress"
                            name="manualAddress"
                            placeholder="Enter your address"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="manualDistance">
                            Distance from our location (km):
                          </label>
                          <input
                            type="number"
                            id="manualDistance"
                            name="manualDistance"
                            placeholder="e.g., 2.5"
                            step="0.1"
                            min="0"
                            required
                          />
                        </div>
                        <button type="submit" className="submit-manual-btn">
                          Set Location
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="location-details">
                      {locationError && (
                        <div className="location-error">{locationError}</div>
                      )}
                      <div className="location-item">
                        <span className="label">Address:</span>
                        <span className="value">
                          {orderData.address || "Address not detected"}
                        </span>
                      </div>
                      <div className="location-item">
                        <span className="label">Distance:</span>
                        <span className="value">
                          {orderData.distance
                            ? `${orderData.distance.toFixed(1)} km`
                            : "Calculating..."}
                        </span>
                      </div>
                      <div className="location-item">
                        <span className="label">Delivery Cost:</span>
                        <span className="value">
                          {orderData.distance > 3 ? "₹50" : "Free"}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="location-buttons">
                    <button
                      type="button"
                      className="refresh-location-btn"
                      onClick={detectCurrentLocation}
                    >
                      🔄 Refresh Location
                    </button>
                    {!showManualLocation && (
                      <button
                        type="button"
                        className="manual-location-btn"
                        onClick={() => setShowManualLocation(true)}
                      >
                        📝 Enter Manually
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Document Upload */}
              <div className="upload-section">
                <h3>📄 Upload Documents</h3>
                <div
                  className="upload-area"
                  onClick={() => fileInputRef.current.click()}
                >
                  <div className="upload-content">
                    <span className="upload-icon">📁</span>
                    <p>Click to upload documents (PDF, Images, etc.)</p>
                    <p className="upload-hint">
                      Drag & drop files here or click to browse
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                  />
                </div>
              </div>

              {/* Documents Grid */}
              {documents.length > 0 && (
                <div className="documents-section">
                  <h3>📋 Selected Documents</h3>
                  <div className="documents-grid">
                    {documents.map((doc) => (
                      <div key={doc.id} className="document-card">
                        <div className="document-info">
                          <div className="document-icon">
                            {doc.type === "application/pdf" ? "📄" : "🖼️"}
                          </div>
                          <div className="document-details">
                            <h4>{doc.name}</h4>
                            <p>
                              {doc.pages} pages • {formatFileSize(doc.size)}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="remove-doc-btn"
                          onClick={() => removeDocument(doc.id)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Print Options */}
              <div className="print-options">
                <h3>🖨️ Print Options</h3>
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="color"
                      checked={orderData.color}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    Color Print (₹10 per page)
                  </label>
                </div>

                <div className="form-group">
                  <label htmlFor="deliveryNotes">
                    Delivery Notes (Optional)
                  </label>
                  <textarea
                    id="deliveryNotes"
                    name="deliveryNotes"
                    value={orderData.deliveryNotes}
                    onChange={handleInputChange}
                    placeholder="Any special delivery instructions..."
                    rows="3"
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className="order-summary">
                <h3>📊 Order Summary</h3>
                <div className="summary-item">
                  <span>Documents:</span>
                  <span>{documents.length} file(s)</span>
                </div>
                <div className="summary-item">
                  <span>Total Pages:</span>
                  <span>
                    {documents.reduce((sum, doc) => sum + doc.pages, 0)}
                  </span>
                </div>
                <div className="summary-item">
                  <span>Print Type:</span>
                  <span>{orderData.color ? "Color" : "Black & White"}</span>
                </div>
                <div className="summary-item">
                  <span>Print Cost:</span>
                  <span>
                    ₹
                    {(orderData.color ? 10 : 2) *
                      documents.reduce((sum, doc) => sum + doc.pages, 0)}
                  </span>
                </div>
                <div className="summary-item">
                  <span>Delivery:</span>
                  <span>{orderData.distance > 3 ? "₹50" : "Free"}</span>
                </div>
                <div className="summary-item total">
                  <span>Total:</span>
                  <span>₹{calculateTotal()}</span>
                </div>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={documents.length === 0}
              >
                {documents.length === 0
                  ? "Upload Documents to Continue"
                  : "Place Order"}
              </button>
            </form>

            <div className="whatsapp-section">
              <div className="whatsapp-card">
                <h3>Order via WhatsApp</h3>
                <p>
                  Prefer WhatsApp? Scan the QR code or click the button below to
                  order directly via WhatsApp!
                </p>

                <div className="whatsapp-qr">
                  <div className="qr-code-large"></div>
                  <p>Scan to order via WhatsApp</p>
                </div>

                <a
                  href="https://wa.me/919717548785?text=Hi! I want to place a print order. Can you help me?"
                  className="whatsapp-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📱 Order via WhatsApp
                </a>

                <div className="whatsapp-features">
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
      </div>
    </section>
  );
};

export default OrderForm;
