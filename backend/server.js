import express from "express";
import "./config/env.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import ConnectMongoose from "./db/ConnectMongoose.js";

import authRoutes from "./routes/auth.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true, 
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/payment", paymentRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

console.log("ENV TEST:", process.env.RAZORPAY_KEY_ID);


const PORT = process.env.PORT || 4000;

ConnectMongoose().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});