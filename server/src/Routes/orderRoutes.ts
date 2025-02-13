import express from "express";
import OrderController from "../Controllers/OrderController";
import { auth } from "../Middleware/auth";

const orderRoute = express.Router();

orderRoute.post("/create/:id",auth, OrderController.create);
orderRoute.get("/:id",auth, OrderController.getAllOrders);

export default orderRoute;
