// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import ConnectMongoose from "./db/ConnectMongoose.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

import authRoutes from "./routes/auth.routes.js";
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});



const PORT = process.env.PORT || 4000;

// ✅ Correct flow
ConnectMongoose().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});