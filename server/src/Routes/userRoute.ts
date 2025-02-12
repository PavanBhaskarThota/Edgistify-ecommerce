import express from "express";
import UserController from "../Controllers/UserController";

const userRoute = express.Router();

userRoute.post("/signup", UserController.create);
userRoute.post("/login", UserController.login);
export default userRoute;
