import express from "express";
import CartController from "../Controllers/CartController";

const cartRoute = express.Router();

cartRoute.get("/:userId", CartController.getCart);
cartRoute.post("/addItem/:userId/:productId", CartController.addProductToCart);
cartRoute.post("/updateQuantity/:userId/:productId", CartController.addProductToCart);

export default cartRoute;
