import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // অথবা String রাখা যাবে যদি Manual Query করা হয়
      ref: "User", // Mongoose Population-এর জন্য আবশ্যক
      required: true,
    },
    serviceId: {
      type: String,
      required: false,
      default: null,
    },
    planName: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["bkash", "nagad", "rocket", "BKASH", "NAGAD", "ROCKET"],
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    senderNumber: {
      type: String,
      default: "N/A",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;