import { Router } from "express";

const authRouter = Router();

authRouter.post("/signup", (req, res) => {
  // Handle user signup logic here
  res.status(201).json({ message: "User signed up successfully" });
});

authRouter.post("/login", (req, res) => {
  // Handle user login logic here
  res.status(200).json({ message: "User logged in successfully" });
});

authRouter.post("/logout", (req, res) => {
  // Handle user logout logic here
  res.status(200).json({ message: "User logged out successfully" });
});

export default authRouter;