import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      product: { type: String, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1, default: 1 },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
});

export const CartModel = mongoose.model("Cart", cartSchema);