import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Badge, Box, Button, Popover, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../Redux/Slices/userSlice";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import cartServices from "../../Services/cartServices";
import { getCartItems } from "../../Redux/Slices/cartSlice";

export const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { totalQuantity } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const fetchUser = () => {
    dispatch(getUser());
  };

  const fetchCart = async (id) => {
    try {
      const res = await cartServices.getCart(id);
      console.log(res);
      setCartItems(res.data.items.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
      console.log(user);
    } else {
      dispatch(getCartItems(user.userId));
    }
  }, [user, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        height: "7vh",
        boxShadow: "0px 0px 1px 0px #000000",
      }}
    >
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <HomeOutlinedIcon />
        </Link>
        <Link to="/products" style={{ textDecoration: "none", color: "black" }}>
          Products
        </Link>
      </Box>

      <Box>
        {user ? (
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Badge
              badgeContent={totalQuantity}
              color="primary"
              max={9}
              sx={{ cursor: "pointer" }}
            >
              <ShoppingCartOutlinedIcon
                sx={{
                  width: 30,
                  height: 30,
                  border: "1px solid gray",
                  borderRadius: "25%",
                  padding: "5px",
                }}
                onClick={() => navigate("/cart")}
              />
            </Badge>

            <Avatar sx={{ width: 30, height: 30 }} />
            <Typography sx={{ fontWeight: "500" }} onClick={handleClick}>
              {user?.name.split(" ")[0]}
            </Typography>

            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              sx={{ width: "200px" }}
            >
              <Box sx={{ padding: "10px" }}>

              <Button variant="outlined" color="error" onClick={handleLogout}>
                Logout
              </Button>
              </Box>
            </Popover>
          </Box>
        ) : (
          <Button variant="contained">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={"/auth"}
            >
              Login
            </Link>
          </Button>
        )}
      </Box>
    </Box>
  );
};
