import express from "express";
import CartController from "../Controllers/CartController";
import { auth } from "../Middleware/auth";

const cartRoute = express.Router();

cartRoute.get("/:userId", auth, CartController.getCart);
cartRoute.post(
  "/addItem/:userId/:productId",
  auth,
  CartController.addProductToCart
);
// cartRoute.post(
//   "/updateQuantity/:userId/:productId",
//   auth,
//   CartController.addProductToCart
// );

export default cartRoute;
