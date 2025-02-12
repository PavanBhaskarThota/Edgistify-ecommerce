import api from "../Api";

const authServices = {
  async login(user) {
    await api.post("/user/login", user);
  },

  async signup(user) {
    await api.post("/user/signup", user);
  },
};

export default authServices;
