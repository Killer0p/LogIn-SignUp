import otpGenerator from 'otp-generator';

const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000); // Always 6-digit number
  console.log(otp);
  return otp;
};

export { generateOtp };