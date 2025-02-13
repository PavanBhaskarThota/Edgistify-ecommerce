import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import orderServices from "../Services/orderServices";
import { getUser } from "../Redux/Slices/userSlice";
import { Loading } from "../Components/Loader/Loading";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Typography,
} from "@mui/material";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const fetchOrders = async (id) => {
    try {
      setLoading(true);
      const res = await orderServices.getAllOrders(id);
      console.log(res);
      if (res.status === 200) setOrders(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(orders);

  useEffect(() => {
    if (!user) dispatch(getUser());
    else fetchOrders(user.userId);
  }, [user]);

  if (loading) return <Loading />;
  return (
    <Box sx={{ minHeight: "86vh", bgcolor: "#FFEFD5", py: 2 }}>
      {user && (
        <Box
          sx={{
            width: "90%",
            margin: "auto",
            py: 4,
            display: "flex",
            justifyContent: "center",
            gap: 2,
            bgcolor: "#fffaf1",
          }}
        >
          <Box>
            <Avatar
              sx={{ width: "100px", height: "100px", borderRadius: "50%" }}
              src="https://img.freepik.com/free-vector/blond-man-stylish-icon-isolated_24911-100835.jpg?ga=GA1.1.709686024.1684082835&semt=ais_authors_boost"
            />
          </Box>
          <Box mt={2}>
            <Typography variant="h4" mb={2}>
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        </Box>
      )}

      <Box
        sx={{
          width: "90%",
          margin: "auto",
          bgcolor: "#fffaf1",
          my: 2,
          color: "#5C4033",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={"bold"}
          textAlign={"center"}
          py={2}
        >
          Orders
        </Typography>

        {orders && (
          <Box sx={{ width: "90%", margin: "auto", py: 2 }}>
            {orders.length > 0 ? (
              orders.map((order) => (
                <Accordion key={order._id} sx={{ bgcolor: "#fffaf1", my: 2 }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                    // sx={{ alignItems: "start" }}
                  >
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 2,
                        }}
                      >
                        <Typography variant="h6">Ordered on</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {moment(order.createdAt).format("MMM Do YY")}
                        </Typography>
                      </Box>

                      <Typography variant="body2" color="text.secondary">
                        Total : {order.totalAmount / 10}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    {order.items.length > 0 ? (
                      order.items.map((item) => (
                        <Box
                          key={item._id}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 2,
                            my: 2,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <img
                              src={item.productImage}
                              alt={item.productName}
                              style={{ width: "50px", height: "50px" }}
                            />
                            <Box>
                              <Typography variant="body2">
                                {item.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Quantity: {item.quantity}
                              </Typography>
                            </Box>
                          </Box>
                          <Typography variant="body2">
                            {item.price / 10}
                          </Typography>
                        </Box>
                      ))
                    ) : (
                      <Typography>No Items Found</Typography>
                    )}
                  </AccordionDetails>
                </Accordion>
              ))
            ) : (
              <Typography>No Orders Found</Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};
