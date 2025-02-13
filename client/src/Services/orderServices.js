import api from "../Api";

const orderServices = {
  async createOrder(userId, order) {
    return await api.post(`/order/create/${userId}`, { order: order });
  },

  async getAllOrders(userId) {
    return await api.get(`/order/${userId}`);
  },
};

export default orderServices;
