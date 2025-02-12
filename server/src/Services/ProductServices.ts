import { ItemModel } from "../Models/item.model";

class ProductServices {
  async getAllProducts() {
    try {
      const products = await ItemModel.find({});
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ProductServices();
