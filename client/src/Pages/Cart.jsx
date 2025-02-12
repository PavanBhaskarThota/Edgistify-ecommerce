import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Button,
  Box,
} from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getUser } from "../Redux/Slices/userSlice";
import { getCartItems } from "../Redux/Slices/cartSlice";
import orderServices from "../Services/orderServices";

export const Cart = () => {
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const createNewOrder = async (obj, id) => {
    try {
      const res = await orderServices.createOrder(id, obj);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/products");
    }
  };

  const handleBuy = () => {
    if (
      address.fullName === "" ||
      address.address === "" ||
      address.city === "" ||
      address.postalCode === ""
    ) {
      toast.error("Please fill all the fields.");
    } else {
      let newAddress =
        address.address + "," + address.city + "," + address.postalCode;

      const obj = {
        items: [...cart.cartItems],
        totalAmount: cart.totalAmount,
        shippingAddress: newAddress,
      };

      createNewOrder(obj, user.userId);
    }
  };

  if (cart.status === "loading") return <div>Loading...</div>;

  return cart.cartItems.length === 0 ? (
    <Typography variant="h5" textAlign="center" mt={4}>
      Cart is empty
    </Typography>
  ) : (
    <Container
      maxWidth="md"
      sx={{ mt: 4, backgroundColor: "#ffff", p: 3, borderRadius: 2 }}
    >
      <Typography variant="h4" gutterBottom color="primary" textAlign="center">
        🛒 Shopping Cart
      </Typography>
      <Card
        sx={{
          maxHeight: "60vh",
          overflowY: "auto",
          mb: 2,
          backgroundColor: "#fff",
          boxShadow: 3,
        }}
      >
        <CardContent>
          <List>
            {cart.cartItems.map((item, index) => (
              <React.Fragment key={item._id}>
                <ListItem
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#e3f2fd" : "#bbdefb",
                    borderRadius: 1,
                  }}
                >
                  <ListItemText
                    primary={item.name}
                    secondary={`Quantity: ${item.quantity} | Price: ₹${
                      item.price / 10
                    }`}
                  />
                </ListItem>
                {index < cart.cartItems.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom color="secondary" textAlign="right">
        💰 Total: ₹{cart.totalAmount / 10}
      </Typography>

      <Card sx={{ p: 3, mb: 2, backgroundColor: "#fff", boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom color="primary">
          📍 Shipping Address
        </Typography>
        <TextField
          fullWidth
          label="Full Name"
          margin="normal"
          variant="outlined"
          color="secondary"
          required
          name="fullName"
          value={address.fullName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Address"
          margin="normal"
          variant="outlined"
          color="secondary"
          required
          name="address"
          value={address.address}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="City"
          margin="normal"
          variant="outlined"
          color="secondary"
          required
          name="city"
          value={address.city}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Zip Code"
          margin="normal"
          variant="outlined"
          color="secondary"
          required
          name="postalCode"
          value={address.postalCode}
          onChange={handleChange}
        />
      </Card>

      <Box textAlign="center" mt={2}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{ borderRadius: 2, px: 4, bgcolor: "#FFD700", color: "black" }}
          onClick={handleBuy}
        >
          🛍️ Buy Now
        </Button>
      </Box>
    </Container>
  );
};
