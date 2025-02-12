import { Request, Response } from "express";
import CartServices from "../Services/CartServices";

class CartController {
  async getCart(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const result = await CartServices.getCart(userId);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
  async addProductToCart(req: Request, res: Response) {
    try {
      const { userId, productId } = req.params;
      const { quantity } = req.body;
      const result = await CartServices.addProductToCart(
        userId,
        productId,
        quantity
      );
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error });
    }
  }
}

export default new CartController();
