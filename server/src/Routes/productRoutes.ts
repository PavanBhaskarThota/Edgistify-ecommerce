import express from "express";
import ProductController from "../Controllers/ProductController";

const productRoute = express.Router();

productRoute.get("/", ProductController.getAllProducts);

export default productRoute