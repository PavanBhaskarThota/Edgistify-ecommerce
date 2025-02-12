import { CartModel } from "../Models/cart.model";
import { OrderModel } from "../Models/order.model";
import CartServices from "./CartServices";

class OrderServices {
  async getAllOrders(userId: string) {
    try {
      const orders = await OrderModel.find({ userId });
      return orders;
    } catch (error) {
      return error;
    }
  }

  async createOrder(userId: string, order: any) {
    try {
      const newOrder = { ...order, userId: userId };

      const paymentStatusOptions = ["pending", "paid", "failed"];
      newOrder.paymentStatus =
        paymentStatusOptions[
          Math.floor(Math.random() * paymentStatusOptions.length)
        ];

      if (newOrder.paymentStatus === "pending") {
        newOrder.orderStatus = "pending";
      } else if (newOrder.paymentStatus === "paid") {
        const orderStatusOptions = ["processing", "shipped", "delivered"];
        newOrder.orderStatus =
          orderStatusOptions[
            Math.floor(Math.random() * orderStatusOptions.length)
          ];
      } else if (newOrder.paymentStatus === "failed") {
        newOrder.orderStatus = "cancelled";
      }
      const deleteCart = await CartModel.findOneAndDelete({ userId });
      console.log(deleteCart);

      const result = new OrderModel(newOrder);
      await result.save();

      return { order: result, message: "Order created successfully" };
    } catch (error) {
      return error;
    }
  }
}

export default new OrderServices();
