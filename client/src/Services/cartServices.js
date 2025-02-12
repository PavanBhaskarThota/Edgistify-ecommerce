import api from "../Api";

const cartServices = {
  async getCart(userId) {
    return await api.get(`/cart/${userId}`);
  },

  async addItem(userId, productId, quantity) {
    return await api.post(`/cart/addItem/${userId}/${productId}`, {
      quantity: quantity,
    });
  },
};

export default cartServices;
