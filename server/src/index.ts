import express from "express";
import "dotenv/config";
import { connectDB } from "./Database/db";
import userRoute from "./Routes/userRoute";
import cors from "cors";
import productRoute from "./Routes/productRoutes";
import cartRoute from "./Routes/cartRoutes";

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", userRoute);
app.use("/items", productRoute);
app.use("/cart", cartRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, async () => {
  try {
    await connectDB;
    console.log("Server is running on port", port);
  } catch (error) {
    console.log(error);
  }
});
