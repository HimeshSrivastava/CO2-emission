import razorpay from "../utils/razorpay.js";
import crypto from "crypto";
import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    // const name = req.user.name;
    
console.log("REQ BODY:", req.body);
console.log("FINAL AMOUNT:", amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    console.log("Received amount:", amount); 

    const order = await razorpay.orders.create({
      amount: amount * 100, 
      currency: "INR",
    });

    // ✅ Pehle DB save karo
    // const newPayment = new Payment({
    //   name,
    //   amount,
    //   razorpayOrderId: order.id,
    // });

    // await newPayment.save();

    // ✅ Fir response bhejo
    res.json(order);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Order failed" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment" });
    }

    const existing = await Payment.findOne({
      paymentId: razorpay_payment_id,
    });

    if (existing) {
      return res.json({ success: true });
    }

    const orderData = await Order.findOne({ orderId: razorpay_order_id });

    await Payment.create({
      userId,
      amount: orderData.amount / 100,
      paymentId: razorpay_payment_id,
    });

    await User.findByIdAndUpdate(userId, {
      $inc: { totalPayment: orderData.amount / 100 },
    });

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ message: "Verification failed" });
  }
};