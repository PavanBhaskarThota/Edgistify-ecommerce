import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartServices from "../../Services/cartServices";
import toast from "react-hot-toast";

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await cartServices.getCart(userId);
      console.log(res);
      return res.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await cartServices.addItem(userId, productId, quantity);
      console.log(res);
      return res.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalAmount: 0,
    totalQuantity: 0,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        if (!action.payload) {
          state.status = "failed";
          return;
        }
        state.cartItems = action.payload.items;
        state.totalAmount = action.payload.totalAmount;
        state.totalQuantity = action.payload.items.length;
        state.status = "success";
      })
      .addCase(getCartItems.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, { payload }) => {
        if (payload.message === "Product added to cart") {
          toast.success(payload.message);
          state.cartItems = payload.cart.items;
          state.totalAmount = payload.cart.totalAmount;
          state.totalQuantity = payload.cart.items.length;
          state.status = "success";
        } else {
          toast.error(payload.message);
        }
      })
      .addCase(addToCart.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default cartSlice.reducer;
