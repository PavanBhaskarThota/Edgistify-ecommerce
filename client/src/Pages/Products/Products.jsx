import React, { useEffect, useState } from "react";
import productServices from "../../Services/productsServices";
import { Grid } from "@mui/material";
import { ProductCard } from "./components/ProductCard";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

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

  if (loading) return <h1>Loading...</h1>;

  return (
    <Grid container spacing={2} sx={{ padding: "10px" }} w={'90%'}>
      {products.length > 0 &&
        products.map((product, index) => (
          <ProductCard key={index} product={product}/>
        ))}
    </Grid>
  );
};
