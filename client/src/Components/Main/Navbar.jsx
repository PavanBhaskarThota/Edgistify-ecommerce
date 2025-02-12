import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

export const Navbar = () => {
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px",
      height: "7vh",
      boxShadow: "0px 0px 10px 0px #000000",
    }}>
      <Link to="/">Home</Link>
    </Box>
  );
};
