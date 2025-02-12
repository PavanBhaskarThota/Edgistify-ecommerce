import { Request, Response } from "express";
import OrderServices from "../Services/OrderServices";

class OrderController {
  async create(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { order } = req.body;
      const result = await OrderServices.createOrder(id, order);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new OrderController();