import express from "express";
import { createUser } from "../controllers/userController.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

router.get("/", isLoggedIn, isAdmin, (req, res) => {
  const user = req.user;
  console.log("I am decoded from route", user);
  res.send("route page");
});

router.get("/test", (req, res) => {
  res.send("test route running");
});

router.post("/user", createUser);

export default router;
