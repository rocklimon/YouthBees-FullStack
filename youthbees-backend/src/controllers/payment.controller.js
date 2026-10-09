import Order from "../models/Order.model.js";
import User from "../models/user.model.js";

// 1. Submit payment (Blocks guest payments & maps to real user)
export const submitPayment = async (req, res) => {
  try {
    const { serviceId, planName, amount, paymentMethod, transactionId, senderNumber } = req.body;

    let mongoUserId = req.user?._id;

    // If req.user does not directly contain MongoDB _id, search DB using Firebase UID or Email
    if (!mongoUserId && (req.user?.uid || req.user?.email)) {
      const dbUser = await User.findOne({
        $or: [
          { firebaseUid: req.user.uid },
          { email: req.user.email }
        ]
      });
      if (dbUser) {
        mongoUserId = dbUser._id;
      }
    }

    // ⛔ Block payment if user is not logged in or account is not found in database
    if (!mongoUserId) {
      return res.status(401).json({
        success: false,
        message: "User context missing or account not found! Please re-login.",
      });
    }

    if (!transactionId || !transactionId.trim()) {
      return res.status(400).json({ message: "Transaction ID is required." });
    }

    const cleanTrxId = transactionId.trim();

    // Check if the Transaction ID has already been submitted
    const existingOrder = await Order.findOne({ transactionId: cleanTrxId });
    if (existingOrder) {
      return res.status(400).json({ message: "This Transaction ID is already submitted." });
    }

    // Create new payment order
    const newOrder = new Order({
      userId: mongoUserId, // Correct MongoDB ObjectId
      serviceId: serviceId || null,
      planName,
      amount: Number(amount),
      paymentMethod: paymentMethod ? paymentMethod.toUpperCase() : "BKASH",
      transactionId: cleanTrxId,
      senderNumber: senderNumber || "N/A",
      status: "pending",
    });

    await newOrder.save();

    return res.status(201).json({
      success: true,
      message: "Payment submitted successfully!",
      order: newOrder,
    });
  } catch (error) {
    console.error("Submit Payment Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📋 2. Get pending / all orders for Admin (Includes User Name, Email, Phone)
export const getPendingOrders = async (req, res) => {
  try {
    // Populate user details from User schema
    const orders = await Order.find()
      .populate("userId", "firstName lastName name email phone") 
      .sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

// 3. Admin approve or reject order
export const verifyOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { action, durationInDays } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    if (action === "approve") {
      order.status = "approved";
      const days = durationInDays || 180;
      order.expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
      await order.save();

      return res.json({
        success: true,
        message: "Membership activated successfully!",
        order,
      });
    } else {
      order.status = "rejected";
      await order.save();

      return res.json({
        success: true,
        message: "Order has been rejected.",
        order,
      });
    }
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({
      message: "Verification error",
      error: error.message,
    });
  }
};