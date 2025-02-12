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
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getUser } from "../Redux/Slices/userSlice";
import { clearCart, getCartItems } from "../Redux/Slices/cartSlice";
import orderServices from "../Services/orderServices";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Loading } from "../Components/Loader/Loading";

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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const createNewOrder = async (obj, id) => {
    try {
      setLoading(true);
      const res = await orderServices.createOrder(id, obj);
      if (res.data.message === "Order placed") {
        toast.success(res.data.message);
        dispatch(clearCart());
        navigate("/products");
      }else{
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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

  if (cart.status === "loading" || loading) return <Loading />;

  return (
    <Box backgroundColor="#ECDFCC" py={4} minHeight={"80vh"}>
      {cart.cartItems.length === 0 ? (
        <Typography variant="h5" textAlign="center">
          🛒 Cart is empty
        </Typography>
      ) : (
        <Container
          maxWidth="md"
          sx={{ backgroundColor: "#ffff", p: 3, borderRadius: 2 }}
        >
          <Typography
            variant="h4"
            gutterBottom
            color="primary"
            textAlign="center"
          >
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
                  <Box key={item._id}>
                    <ListItem
                      sx={{
                        backgroundColor:
                          index % 2 === 0 ? "#e3f2fd" : "#bbdefb",
                        borderRadius: 1,
                      }}
                    >
                      <Avatar
                        alt={item.name}
                        src="https://img.freepik.com/free-vector/soft-furniture-set_1191-523.jpg?ga=GA1.1.709686024.1684082835&semt=ais_hybrid"
                        sx={{ width: 56, height: 56, mr: 2 }}
                      />
                      <ListItemText
                        primary={item.name}
                        secondary={`Quantity: ${item.quantity} | Price: ₹${
                          item.price / 10
                        }`}
                      />
                    </ListItem>
                    {index < cart.cartItems.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>

          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">Add Address +</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Card sx={{ p: 3, mb: 2, backgroundColor: "#fff", boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom color="primary">
                  📍 Shipping Address
                </Typography>
                <TextField
                  fullWidth
                  label="Full Name"
                  margin="normal"
                  variant="outlined"
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
                  required
                  name="postalCode"
                  value={address.postalCode}
                  onChange={handleChange}
                />
              </Card>
            </AccordionDetails>
          </Accordion>

          <Typography
            variant="h6"
            gutterBottom
            textAlign="right"
            sx={{ mt: "20px" }}
          >
            💰 Total: ₹{cart.totalAmount / 10}
          </Typography>

          <Box textAlign="center" mt={2}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{
                borderRadius: 2,
                px: 4,
                bgcolor: "#FFD700",
                color: "black",
              }}
              onClick={handleBuy}
            >
              🛍️ Buy Now
            </Button>
          </Box>
        </Container>
      )}
    </Box>
  );
};
