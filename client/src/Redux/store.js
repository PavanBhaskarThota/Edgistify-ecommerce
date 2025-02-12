import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import cartReducer from "./Slices/cartSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    cart: cartReducer,
  },
});

export default store;
