import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import OrderForm from "./components/OrderForm";
import ResumeBuilder from "./components/ResumeBuilder";
import Footer from "./components/Footer";
import { sendOrderNotifications } from "./services/whatsappService";

function App() {
  const [orderData, setOrderData] = useState({
    customerName: "",
    customerPhone: "",
    address: "",
    distance: "",
    latitude: null,
    longitude: null,
    color: false,
    deliveryNotes: "",
  });

  const handleOrderSubmit = async (e) => {
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

    // Prepare order details for notifications
    const orderDetails = {
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      address: orderData.address,
      distance: orderData.distance,
      documentsCount: documents.length,
      totalPages: totalPages,
      color: orderData.color,
      printCost: basePrice * totalPages,
      deliveryCost: deliveryCost,
      totalCost: totalCost,
      deliveryNotes: orderData.deliveryNotes,
    };

    try {
      // Send notifications to admin
      const notificationResult = await sendOrderNotifications(orderDetails);
      
      if (notificationResult.success) {
        alert(
          `Order submitted successfully!\n\nOrder Summary:\n- Customer: ${orderData.customerName}\n- Phone: ${orderData.customerPhone}\n- Documents: ${documents.length} file(s)\n- Total Pages: ${totalPages}\n- Type: ${orderData.color ? "Color" : "Black & White"}\n- Delivery: ${orderData.distance > 3 ? "₹50" : "Free"}\n- Total Cost: ₹${totalCost}\n\nNotifications sent to admin!\nWe'll contact you soon!`
        );
      } else {
        alert(
          `Order submitted successfully!\n\nOrder Summary:\n- Customer: ${orderData.customerName}\n- Phone: ${orderData.customerPhone}\n- Documents: ${documents.length} file(s)\n- Total Pages: ${totalPages}\n- Type: ${orderData.color ? "Color" : "Black & White"}\n- Delivery: ${orderData.distance > 3 ? "₹50" : "Free"}\n- Total Cost: ₹${totalCost}\n\nNote: Some notifications may not have been sent.\nWe'll contact you soon!`
        );
      }
    } catch (error) {
      console.error('Error sending notifications:', error);
      alert(
        `Order submitted successfully!\n\nOrder Summary:\n- Customer: ${orderData.customerName}\n- Phone: ${orderData.customerPhone}\n- Documents: ${documents.length} file(s)\n- Total Pages: ${totalPages}\n- Type: ${orderData.color ? "Color" : "Black & White"}\n- Delivery: ${orderData.distance > 3 ? "₹50" : "Free"}\n- Total Cost: ₹${totalCost}\n\nWe'll contact you soon!`
      );
    }

    // Reset form
    setOrderData({
      customerName: "",
      customerPhone: "",
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
