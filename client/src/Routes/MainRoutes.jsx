import React from "react";
import { Route, Routes } from "react-router";
import { Home } from "../Pages/Home";
import { Products } from "../Pages/Products/Products";
import { Auth } from "../Pages/Auth/Auth";
import { PrivateRoute } from "./PrivateRoutes";
import { Cart } from "../Pages/Cart";
import { Orders } from "../Pages/Orders";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/products" element={<Products />} />
      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile&orders"
        element={
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
