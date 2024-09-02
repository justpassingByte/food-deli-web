import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/FoodRouter.js";
import userRouter from "./routes/UserRouter.js";
import dotenv from "dotenv";
dotenv.config(); 

import { isAdmin, authMiddleware } from "./middleware/Auth/Auth.js";
import cartRouter from "./routes/CartRouter.js";
import orderRouter from "./routes/OrderRouter.js";

// App config
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// DB connect
connectDB();

// API end points
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", authMiddleware, cartRouter);
app.use("/api/order",orderRouter)
// Protected route with admin authorization
app.get("/admin-dashboard", authMiddleware, isAdmin, (req, res) => {
  res.json({ success: true, message: "Welcome to the admin dashboard!" });
});

// Basic route
app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
