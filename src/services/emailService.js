// Email service for sending order details
export const sendOrderEmail = async (orderDetails) => {
  try {
    // Using EmailJS service for client-side email sending
    // You'll need to set up EmailJS account and get service ID, template ID, and user ID

    // For now, we'll use a simple approach with mailto link
    // In production, you should use a proper email service like EmailJS, SendGrid, or a backend API

    const subject = encodeURIComponent(
      `New Print Order - ${orderDetails.customerName || "Customer"}`
    );

    const body = encodeURIComponent(`
Order Details:

Customer Information:
- Name: ${orderDetails.customerName || "Not provided"}
- Phone: ${orderDetails.customerPhone || "Not provided"}
- Address: ${orderDetails.address || "Not provided"}
- Distance: ${
      orderDetails.distance ? `${orderDetails.distance} km` : "Not provided"
    }

Order Information:
- Documents: ${orderDetails.documentsCount} file(s)
- Total Pages: ${orderDetails.totalPages}
- Print Type: ${orderDetails.color ? "Color" : "Black & White"}
- Print Cost: ₹${orderDetails.printCost}
- Delivery Cost: ${
      orderDetails.deliveryCost > 0 ? `₹${orderDetails.deliveryCost}` : "Free"
    }
- Total Cost: ₹${orderDetails.totalCost}

Delivery Notes: ${orderDetails.deliveryNotes || "None"}

Order Time: ${new Date().toLocaleString()}
    `);

    // Create mailto link
    const mailtoLink = `mailto:admin@printmypapers.com?subject=${subject}&body=${body}`;

    // Open default email client
    window.open(mailtoLink);

    return { success: true, message: "Email client opened successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email" };
  }
};

// Alternative: Using EmailJS (requires setup)
export const sendOrderEmailWithEmailJS = async (orderDetails) => {
  // This requires EmailJS setup
  // 1. Sign up at emailjs.com
  // 2. Create a service (Gmail, Outlook, etc.)
  // 3. Create an email template
  // 4. Get your service ID, template ID, and user ID

  try {
    // Example EmailJS implementation
    // const templateParams = {
    //   to_email: 'admin@printmypapers.com',
    //   customer_name: orderDetails.customerName,
    //   customer_phone: orderDetails.customerPhone,
    //   address: orderDetails.address,
    //   distance: orderDetails.distance,
    //   documents_count: orderDetails.documentsCount,
    //   total_pages: orderDetails.totalPages,
    //   print_type: orderDetails.color ? 'Color' : 'Black & White',
    //   print_cost: orderDetails.printCost,
    //   delivery_cost: orderDetails.deliveryCost,
    //   total_cost: orderDetails.totalCost,
    //   delivery_notes: orderDetails.deliveryNotes,
    //   order_time: new Date().toLocaleString()
    // };

    // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID');

    // For now, return success (this will be implemented when EmailJS is set up)
    // eslint-disable-next-line no-unreachable
    return { success: true, message: "EmailJS not configured yet" };
  } catch (error) {
    console.error("Error sending email with EmailJS:", error);
    return { success: false, message: "Failed to send email" };
  }
};
