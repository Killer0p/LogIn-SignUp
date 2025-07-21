const isAdmin = (req, res) => {
  try {
    const user = req.user;
    if (user.role == "ADMIN") {
      throw new error("User is not an Admin");
    }
    next();
  } catch (error) {
    res.status(403).json({
      message: "Admin Denied",
      error: error.message,
    });
  }
};

export { isAdmin };
