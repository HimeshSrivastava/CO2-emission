import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  amount: Number,

}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);