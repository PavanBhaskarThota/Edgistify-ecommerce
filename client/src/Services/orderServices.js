import api from "../Api";


const orderServices = {

  async createOrder(userId, order) {
    return await api.post(`/order/create/${userId}`, {order: order});
  }

}

export default orderServices