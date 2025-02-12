import express from "express";
import UserController from "../Controllers/UserController";

const userRoute = express.Router();

userRoute.get("/", (req, res) => {
  res.send("User Route");
});

userRoute.post("/create", UserController.create);
userRoute.post("/login", UserController.login);
export default userRoute;
