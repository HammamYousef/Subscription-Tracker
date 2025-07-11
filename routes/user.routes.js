import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', authorize, getUser);

userRouter.post('/', (req, res) => {
    // Handle creating a new user profile logic here
    res.status(201).json({ message: "User profile created successfully" });
});

userRouter.put('/:id', (req, res) => {
    // Handle updating user profile logic here
    const userId = req.params.id;
    res.status(200).json({ message: `User with ID ${userId} updated successfully` });
});

userRouter.delete('/:id', (req, res) => {
    // Handle deleting user profile logic here
    const userId = req.params.id;
    res.status(200).json({ message: `User with ID ${userId} deleted successfully` });
});

export default userRouter;