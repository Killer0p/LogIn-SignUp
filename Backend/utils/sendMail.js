import nodemailer from "nodemailer";
import dotenv from "dotenv";
import constant from "../config/constant.js";
dotenv.config();

const sendMail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: constant.EMAIL_USER,
      pass: constant.EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: '"Support Team" <support@example.com>',
    to: email,
    subject: "Your OTP Code",
    // text: `Your One-Time Password (OTP) is: ${otp}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; background-color: #f0f4f8; color: #333;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #007BFF; color: #ffffff; padding: 20px 30px; text-align: center;">
            <h2 style="margin: 0;">One-Time Password (OTP)</h2>
          </div>
          <div style="padding: 30px; text-align: center;">
            <p style="font-size: 16px;">Hello,</p>
            <p style="font-size: 16px;">Please use the following OTP to complete your verification process. The code is valid for the next 10 minutes.</p>
            <div style="margin: 30px auto; display: inline-block; padding: 16px 32px; font-size: 24px; letter-spacing: 4px; background-color: #e6f0ff; color: #007BFF; border-radius: 8px; font-weight: bold;">
              ${otp}
            </div>
            <p style="margin-top: 30px; font-size: 14px; color: #666;">If you didn’t request this code, you can safely ignore this email.</p>
            <p style="font-size: 14px; color: #666;">Best regards,<br>The Support Team</p>
          </div>
        </div>
      </div>  
    `,
  });

  console.log("Message sent: %s", info.messageId);
};

// sendMail("", "")
export { sendMail };
