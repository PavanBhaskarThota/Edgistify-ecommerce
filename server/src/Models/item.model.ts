import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["Chair", "Table", "Sofa"],
    },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: true },
    dimensions: {
      width: { type: Number, required: true },
      depth: { type: Number, required: true },
      height: { type: Number, required: true },
    },
    material: { type: String, required: true },
    color: { type: String, required: true },
    images: { type: [String], required: true },
  },
  { timestamps: true }
);

export const ItemModel = mongoose.model("item", itemSchema);
