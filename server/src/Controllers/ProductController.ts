import { Request, Response } from "express";
import ProductServices from "../Services/ProductServices";

class ProductController {
  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await ProductServices.getAllProducts();
      res.status(200).json(products);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ProductController()
