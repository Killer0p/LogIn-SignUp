import userService from "../Services/userService.js";

const createUser = async (req, res) => {
  try {
    // Destructure the required fields from the request body
    const { userName, password, phone, email, confirmPassword } = req.body;

    if (!userName & !password & !phone & !email) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password does not match" });
    }
    const data = await userService.createUser(req.body);

    res.send(data);
  } catch (error) {
    console.error("error.messaage");
    res.status(400).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};



export { createUser };
