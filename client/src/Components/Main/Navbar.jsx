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
  const { totalQuantity, cartItems } = useSelector((state) => state.cart);
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

  useEffect(() => {
    if (!user) {
      fetchUser();
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
        backgroundColor: "#FFEFD5",
        borderBottom: "1px solid #8f8f8f",
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
                  cursor: "pointer",
                }}
                onClick={() => navigate("/cart")}
              />
            </Badge>

            <Avatar
              sx={{ width: 30, height: 30, cursor: "pointer" }}
              onClick={handleClick}
              src="https://img.freepik.com/free-vector/blond-man-stylish-icon-isolated_24911-100835.jpg?ga=GA1.1.709686024.1684082835&semt=ais_authors_boost"
            />
            <Typography
              sx={{
                fontWeight: "500",
                cursor: "pointer",
                display: { xs: "none", sm: "block" },
              }}
              onClick={handleClick}
            >
              {user?.name.split(" ")[0]}
            </Typography>

            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              sx={{ width: "200px" }}
            >
              <Box sx={{ padding: "10px", maxWidth: "200px", textAlign: "center" }}>
                <Typography
                  sx={{
                    fontWeight: "500",
                    cursor: "pointer",
                    display: { xs: "block", sm: "none" },
                    py: 1,
                  }}
                >
                  {user?.name.split(" ")[0]}
                </Typography>

                <Typography
                  sx={{
                    fontWeight: "500",
                    cursor: "pointer",
                    borderBottom: "1px solid lightgray",
                    py: 1,
                  }}
                >
                  <Link
                    to={"/profile&orders"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Orders
                  </Link>
                </Typography>
                <Button color="error" onClick={handleLogout}>
                  Logout
                </Button>
              </Box>
            </Popover>
          </Box>
        ) : (
          <Button variant="contained" sx={{ bgcolor: "#5C3D2E" }}>
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
