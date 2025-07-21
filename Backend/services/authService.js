import bcrypt from "bcrypt";
import Otp from "../models/Otp.js";
import { generateOtp } from "../utils/generateOtp.js";
import { sendMail } from "../utils/sendMail.js";
import { hashPassword } from "../utils/utility.js";
import User from "../models/User.js";

const register = async (data) => {
  const email = data.email;
  const userExist = await User.findOne({ email });

  if (userExist) {
    throw new Error("User already exists. Please login.");
  }

  const hashedPassword = hashPassword(data.password, 10);
  
  return await User.create({
    email: email,
    password: hashedPassword,
    userName: data.userName,
    phone: data.phone,
  });
};

const login = async (data) => {
  const doEmailExist = await User.findOne({ email: data.email });

  if (!doEmailExist) {
    throw new Error("User is not registered! Please sign up first.");
  }

  const isPasswordMatched = bcrypt.compareSync(data.password, doEmailExist.password);

  if (isPasswordMatched) {
    return doEmailExist;
  } else {
    throw new Error("Invalid password! Please try again.");
  }
};

const forgotPassword = async (data) => {
  const isUserValid = await User.findOne({ email: data.email });

  if (!isUserValid) {
    throw new Error("User is not registered");
  }

  const otp = generateOtp();

  const doEmailExist = await Otp.findOne({ email: data.email });

  let newOtp;

  if (!doEmailExist) {
    newOtp = await Otp.create({
      email: data.email,
      otp: otp,
    });
  } else {
    newOtp = await Otp.findOneAndUpdate(
      { email: data.email },
      { otp: otp, createdAt: new Date() },
      { new: true }
    );
  }

  sendMail(data.email, otp);

  return { message: "OTP sent to your email" };
};
const verifyOtp = async ({ email, otp }) => {
  const doesExist = await Otp.findOne({ email });

  if (!doesExist) {
    throw new Error("Email doesn't exist");
  }

  if (doesExist.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  await User.findOneAndUpdate(
    { email },
    { otpExpiresAt: new Date(Date.now() + 30 * 1000) },
    { new: true }
  );

  //optional
  await Otp.deleteOne({ email });
  return "verifyOtp";
};

export default { register, login, forgotPassword, verifyOtp };
