import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Chair, Weekend, TableBar } from "@mui/icons-material";

export const Home = () => {
  return (
    <Box sx={{ 
      // backgroundColor: "#ECDFCC",
      backgroundColor: "#fff",
      borderTop: "1px solid #ccc",
       minHeight: "100vh" }}>
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography variant="h2" fontWeight="bold">
          Modern Minimalist Furniture
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Discover elegant and comfortable furniture for your perfect home.
        </Typography>
      </Box>
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              height="300"
              image="/sofa.jpg"
              alt="Sofa"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4">Luxury Sofas</Typography>
            <Typography sx={{ mt: 2 }}>
              Experience the ultimate comfort with our premium sofas.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Explore Our Categories
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={4}>
            <Chair fontSize="large" />
            <Typography>Chairs</Typography>
          </Grid>
          <Grid item xs={4}>
            <Weekend fontSize="large" />
            <Typography>Sofas</Typography>
          </Grid>
          <Grid item xs={4}>
            <TableBar fontSize="large" />
            <Typography>Tables</Typography>
          </Grid>
        </Grid>
      </Container>
      {[
        {
          title: "Elegant Tables",
          image: "/table.jpg",
          description: "Beautifully designed tables to match any interior.",
        },
        {
          title: "Office Chairs",
          image: "/office-chair.jpg",
          description: "Ergonomic office chairs for maximum productivity.",
        },
        {
          title: "Premium Chairs",
          image: "/premium-chair.jpg",
          description: "High-quality chairs for ultimate comfort.",
        },
      ].map((section, index) => (
        <Container key={index} sx={{ mt: 8 }}>
          <Grid
            container
            spacing={4}
            alignItems="center"
            flexDirection={index % 2 === 0 ? "row" : "row-reverse"}
          >
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                height="300"
                image={section.image}
                alt={section.title}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4">{section.title}</Typography>
              <Typography sx={{ mt: 2 }}>{section.description}</Typography>
            </Grid>
          </Grid>
        </Container>
      ))}
      <Box
        sx={{
          mt: 8,
          p: 3,
          backgroundColor: "#5C4033",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          &copy; 2025 Furniture Store. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};
