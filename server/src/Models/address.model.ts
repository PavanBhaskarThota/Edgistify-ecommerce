import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId : { type: String, required: true },
  fullName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

export const AddressModel = mongoose.model("address", addressSchema);
