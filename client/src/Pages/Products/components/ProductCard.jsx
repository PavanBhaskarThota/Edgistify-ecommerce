import {
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
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../Redux/Slices/cartSlice";

export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const handleAddToCart = (id) => {
    if (!user) {
      toast.error("Please login first");
      navigate("/auth");
      return;
    }

    const obj = {
      userId: user.userId,
      productId: id,
      quantity: 1,
    };

    dispatch(addToCart(obj));
  };

  return (
    <Grid item xs={12} sm={6} md={3} h={400}>
      <Card h={"400px"}>
        <CardMedia
          sx={{ height: 200 }}
          image="https://img.freepik.com/free-photo/chic-mid-century-modern-luxury-aesthetics-living-room-with-gray-velvet-couch-blue-rug_53876-132809.jpg?ga=GA1.1.709686024.1684082835&semt=ais_hybrid"
          title="green iguana"
          bgcolor="red"
        />
        <CardContent bgcolor="green">
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {product.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleAddToCart(product._id)}
          >
            Add To Cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
