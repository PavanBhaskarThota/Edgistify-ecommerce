import { CartModel } from "../Models/cart.model";
import { ItemModel } from "../Models/item.model";
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

      for (let i = 0; i < order.items.length; i++) {
        const itemId = order.items[i].product;
        const item = await this.checkAvailability(
          itemId,
          order.items[i].quantity
        );
        if (!item) {
          return {
            message: "Some products may out of stock, please refresh the page",
          };
        }
      }

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

      for (let i = 0; i < result.items.length; i++) {
        const itemId = order.items[i].product;

        await this.updateQuantity(itemId, order.items[i].quantity);
      }

      return { order: result, message: "Order placed" };
    } catch (error) {
      return error;
    }
  }

  async updateQuantity(productId: string, quantity: number) {
    const item = await ItemModel.findById(productId);
    if (item) {
      const updatedQuantity = item.stock - quantity;
      const updateItem = await ItemModel.findByIdAndUpdate(
        productId,
        { stock: updatedQuantity },
        { new: true }
      );
      return updateItem;
    }
  }

  async checkAvailability(productId: string, quantity: number) {
    try {
      const item = await ItemModel.findById(productId);
      if (item) {
        if (item.stock >= quantity) {
          return true;
        } else {
          return false;
        }
      }
    } catch (error) {
      return error;
    }
  }
}

export default new OrderServices();
