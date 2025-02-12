import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../../../Redux/Slices/cartSlice";

export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const { cartItems, status } = useSelector((state) => state.cart);

  const handleAddToCart = (id, quantity) => {
    if (!user) {
      toast.error("Please login first");
      navigate("/auth");
      return;
    }

    const obj = {
      userId: user.userId,
      productId: id,
      quantity: quantity || 1,
    };

    dispatch(addToCart(obj));
  };

  const findProduct = cartItems.find((item) => item.product === product._id);

  return (
    <Grid item xs={12} sm={6} md={4} h={400}>
      <Card sx={{ height: "450px", bgcolor: "#f8f8f8" }}>
        <CardMedia
          sx={{ height: "200px" }}
          image={product.images[0]}
          title="green iguana"
          bgcolor="red"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "250px",
          }}
        >
          <CardContent bgcolor="green">
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {product.description}
            </Typography>
          </CardContent>
          <Typography variant="h8" color="text.secondary" sx={{ px: 2 }}>
            Price : Rs-{product.price / 10}
          </Typography>

          <CardActions>
            {findProduct ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  gap: 1,
                  width: "100%",
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  sx={{ display: "block" }}
                  onClick={() => handleAddToCart(product._id, -1)}
                  loading={status === "loading"}
                >
                  -1
                </Button>

                <Button
                  variant="outlined"
                  size="small"
                  sx={{ display: "block" }}
                  onClick={() => handleAddToCart(product._id)}
                  loading={status === "loading"}
                >
                  +1
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="success"
                  sx={{ display: "block", width:'50%' }}
                  loading={status === "loading"}
                >
                  <Link
                    to="/cart"
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    Cart ( {findProduct.quantity} )
                  </Link>
                </Button>
              </Box>
            ) : product.stock > 0 ? (
              <Button
                variant="outlined"
                size="small"
                fullWidth
                onClick={() => handleAddToCart(product._id)}
                loading={status === "loading"}
              >
                Add To Cart
              </Button>
            ) : (
              <Button
                variant="outlined"
                size="small"
                fullWidth
                color="error"
                onClick={() => toast.error("Out of Stock")}
              >
                Out of Stock
              </Button>
            )}
          </CardActions>
        </Box>
      </Card>
    </Grid>
  );
};
