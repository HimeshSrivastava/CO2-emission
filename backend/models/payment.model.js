import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  amount: Number,
  paymentId: String,
}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);