import { createToken } from "../helpers/Token.js";
import Otp from "../models/Otp.js";
import User from "../models/User.js";
import authService from "../Services/authService.js";

const register = async (req, res) => {
  try {
    const { email, phone, password, confirmPassword, userName } = req.body;

    if (!password || !email || !phone || !confirmPassword || !userName) {
      return res.status(400).json({ message: "user credentials missing" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "password donot match" });
    }

    const data = await authService.register({
      email,
      phone,
      password,
      userName,
    });
    res.status(201).json({
      message: "user registered successful",
      data,
    });
  } catch (error) {
    console.log(error.message);
    // Check if it's a duplicate user error
    if (error.message.includes("already exists")) {
      return res.status(409).json({ 
        message: error.message 
      });
    }
    // For other errors
    res.status(500).json({ 
      message: "Registration failed", 
      error: error.message 
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      // return res.status(400).json({message:"user credentials missing"})
      throw new Error("user credentials missing");
    }
    const data = await authService.login({ email, password });
    const payload = {
      id: data._id,
      role: data.role,
      phone: data.phone,
      email: data.email,
    };
    const token = createToken(payload);
    res.cookie("authToken", token);
    res.status(200).json({
      message: "login successful",
      data,
      token,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ message: "error occurred during login", error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    res.cookie("userEmail", email);

    console.log("email", email);

    if (!email) {
      throw new Error("Email is required");
    }
    const data = await authService.forgotPassword({ email });

    res.send(data);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const email = req.cookies.userEmail;

    if (!email || !otp) throw new Error("Email and otp required");

    const doEmailExist = await Otp.findOne({ email });

    if (!doEmailExist) {
      throw new Error("Email doesn't exist!");
    }

    await User.findOneAndUpdate(
      { email },
      { otpExpiresAt: new Date(Date.now() + 30 * 1000) },
      { new: true }
    );

    await Otp.deleteOne({ email });

    if (doEmailExist == otp) {
      throw new Error("Invallid Otp");
    }
    res.status(200).json({
      message: "Otp validated",
    });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};
export { register, login, forgotPassword, verifyOtp };
