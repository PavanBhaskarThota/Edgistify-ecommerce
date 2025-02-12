import React, { useEffect, useState } from "react";
import productServices from "../../Services/productsServices";
import { Box, Grid } from "@mui/material";
import { ProductCard } from "./components/ProductCard";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { Loading } from "../../Components/Loader/Loading";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const AllProducts = await productServices.getAllProducts();
      setProducts(AllProducts.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <Loading />;

  return (
    <Box backgroundColor="#ECDFCC">
      <Grid
        container
        spacing={2}
        sx={{ width: "90%", margin: "auto", py: 4 }}
       
      >
        {products.length > 0 &&
          products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </Grid>
    </Box>
  );
};
