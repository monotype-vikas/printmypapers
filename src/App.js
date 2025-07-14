import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import OrderForm from "./components/OrderForm";
import ResumeBuilder from "./components/ResumeBuilder";
import Footer from "./components/Footer";

function App() {
  const [orderData, setOrderData] = useState({
    address: "",
    distance: "",
    latitude: null,
    longitude: null,
    color: false,
    deliveryNotes: "",
  });

  const handleOrderSubmit = (e) => {
    e.preventDefault();

    // Get documents from the OrderForm component
    const formData = new FormData(e.target);
    const documents = formData.getAll("documents");

    if (documents.length === 0) {
      alert("Please upload at least one document to print.");
      return;
    }

    // Calculate total cost
    const basePrice = orderData.color ? 10 : 2;
    const totalPages = documents.reduce(
      (sum, doc) => sum + (doc.pages || 1),
      0
    );
    const deliveryCost = orderData.distance > 3 ? 50 : 0;
    const totalCost = basePrice * totalPages + deliveryCost;

    alert(
      `Order submitted successfully!\n\nOrder Summary:\n- Documents: ${
        documents.length
      } file(s)\n- Total Pages: ${totalPages}\n- Type: ${
        orderData.color ? "Color" : "Black & White"
      }\n- Delivery: ${
        orderData.distance > 3 ? "₹50" : "Free"
      }\n- Total Cost: ₹${totalCost}\n\nWe'll contact you soon!`
    );

    // Reset form
    setOrderData({
      address: "",
      distance: "",
      latitude: null,
      longitude: null,
      color: false,
      deliveryNotes: "",
    });
  };

  return (
    <div className="App">
      <Header />
      <Hero />
      <Pricing />
      <OrderForm
        orderData={orderData}
        setOrderData={setOrderData}
        onSubmit={handleOrderSubmit}
      />
      <ResumeBuilder />
      <Footer />
    </div>
  );
}

export default App;
