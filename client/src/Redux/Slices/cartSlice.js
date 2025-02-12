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
      console.log(res.data);
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
    status: "",
  },
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
      state.status = "";
    },
  },

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
        if (
          payload.message === "Product added to cart" ||
          payload.message === "Product removed from cart" ||
          payload.message === "Product quantity updated"
        ) {
          payload.message === "Product removed from cart"
            ? toast.error(payload.message)
            : toast.success(payload.message);
          state.cartItems = payload.cart.items;
          state.totalAmount = payload.cart.totalAmount;
          state.totalQuantity = payload.cart.items.length;
          state.status = "success";
        } else if (payload.message === "Cart is empty") {
          toast.error(payload.message);
          state.cartItems = [];
          state.totalQuantity = 0;
          state.totalAmount = 0;
          state.status = "success";
        } else {
          toast.error(payload.message);
          state.status = "";
        }
      })
      .addCase(addToCart.rejected, (state) => {
        state.status = "failed";
      });
  },
});


export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
