import api from "../Api";

const productServices = {
  async getAllProducts() {
   return await api.get("/items");
  },
};

export default productServices;
