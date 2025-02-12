import api from "../Api";

const authServices = {
  async login(user) {
    return await api.post("/user/login", {user:user});
  },

  async signup(user) {
    return await api.post("/user/signup", {user:user});
  },
};

export default authServices;
