import { sendOrderEmail } from "./emailService";

// WhatsApp service for sending order details
export const sendOrderWhatsApp = (orderDetails) => {
  try {
    const phoneNumber = "919717548785"; // WhatsApp number with country code

    const message = encodeURIComponent(`
🖨️ *NEW PRINT ORDER*

*Customer Information:*
• Name: ${orderDetails.customerName || "Not provided"}
• Phone: ${orderDetails.customerPhone || "Not provided"}
• Address: ${orderDetails.address || "Not provided"}
• Distance: ${
      orderDetails.distance ? `${orderDetails.distance} km` : "Not provided"
    }

*Order Details:*
• Documents: ${orderDetails.documentsCount} file(s)
• Total Pages: ${orderDetails.totalPages}
• Print Type: ${orderDetails.color ? "Color" : "Black & White"}
• Print Cost: ₹${orderDetails.printCost}
• Delivery Cost: ${
      orderDetails.deliveryCost > 0 ? `₹${orderDetails.deliveryCost}` : "Free"
    }
• Total Cost: ₹${orderDetails.totalCost}

*Delivery Notes:* ${orderDetails.deliveryNotes || "None"}

*Order Time:* ${new Date().toLocaleString()}

---
Order placed via PrintMyPapers website
    `);

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    return { success: true, message: "WhatsApp opened successfully" };
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return { success: false, message: "Failed to send WhatsApp message" };
  }
};

// Function to send order details to both email and WhatsApp
export const sendOrderNotifications = async (orderDetails) => {
  try {
    // Send email notification
    const emailResult = await sendOrderEmail(orderDetails);

    // Send WhatsApp notification
    const whatsappResult = sendOrderWhatsApp(orderDetails);

    return {
      email: emailResult,
      whatsapp: whatsappResult,
      success: emailResult.success && whatsappResult.success,
    };
  } catch (error) {
    console.error("Error sending order notifications:", error);
    return {
      email: { success: false, message: "Failed to send email" },
      whatsapp: { success: false, message: "Failed to send WhatsApp" },
      success: false,
    };
  }
};
