import express from "express";
import userRoute from "./routes/userRoute.js";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import constant from "./config/constant.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

connectDb();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(cookieParser());



app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the LogIn signUp with proper validation API",
  });
});

app.use("/api/user", userRoute);

app.use("/api/auth", authRoutes);

const PORT = constant.PORT;

app.listen(PORT, () => {
  console.log("Server is running on port http://localhost:7002");
});
