import razorpay from "../utils/razorpay.js";
import crypto from "crypto";
import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";

// export const createOrder = async (req, res) => {
//   try {
//     const { amount } = req.body;

//     const order = await razorpay.orders.create({
//       amount: amount * 100,
//       currency: "INR",
//     });

//     res.json(order);
//   } catch (err) {
//     res.status(500).json({ message: "Order failed" });
//   }
// };

export const createOrder = async (req, res) => {
  const { amount } = req.body;

  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
  });

  res.json(order);
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      amount,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment" });
    }

    // ✅ Save payment
    await Payment.create({
      userId,
      amount,
      paymentId: razorpay_payment_id,
    });

    // ✅ Update leaderboard field
    await User.findByIdAndUpdate(userId, {
      $inc: { totalPayment: amount },
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Verification failed" });
  }
};