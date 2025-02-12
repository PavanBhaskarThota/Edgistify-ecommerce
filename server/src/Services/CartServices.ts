import { CartModel } from "../Models/cart.model";
import { ItemModel } from "../Models/item.model";

class CartServices {
  async getCart(userId: string) {
    try {
      const cart = await CartModel.findOne({ userId });
      return cart;
    } catch (error) {
      return error;
    }
  }
  async addProductToCart(userId: string, productId: string, quantity: number) {
    try {
      const product = await ItemModel.findById(productId);

      if (!product) {
        return { message: "Product not found" };
      }

      if (quantity === 0) {
        return { message: "Quantity must be greater than 0" };
      }

      if (product.stock < quantity) {
        return { message: "Product out of stock" };
      }

      const cart = await CartModel.findOne({ userId });

      if (cart) {
        const result = this.updateProductQuantity(quantity, product, cart);
        return result;
      }

      const newCart = new CartModel({
        userId,
        items: [
          {
            product: productId,
            name: product.name,
            quantity: 1,
            price: product.price,
          },
        ],
        totalAmount: product.price * quantity,
      });

      await newCart.save();
      return { cart: newCart, message: "Product added to cart" };
    } catch (error) {
      return error;
    }
  }

  async updateProductQuantity(quantity: number, product: any, cart: any) {
    try {
      // const cart = await CartModel.findOne({ userId });

      if (cart) {
        const existingProduct = cart.items.find(
          (item: any) => item.product.toString() === product._id.toString()
        );
        console.log(existingProduct);
        if (existingProduct) {
          if (existingProduct.quantity + quantity === 0) {
            return this.removeProductFromCart(cart.userId, product._id.toString());
          }
          existingProduct.quantity += quantity;

          if(existingProduct.quantity > product.stock){
            return {message: "Product out of stock"}
          }
        } else {
          cart.items.push({
            product: product._id,
            name: product.name,
            quantity: quantity || 1,
            price: product.price,
          });
        }

        const totalAmount = cart.items.reduce(
          (total: number, item: any) => total + item.price * item.quantity,
          0
        );

        cart.totalAmount = totalAmount;
        await cart.save();
        return { cart, message: "Product added to cart" };
      }
    } catch (error) {
      return error;
    }
  }

  async removeProductFromCart(userId: string, productId: string) {
    try {
      const cart = await CartModel.findOne({ userId });
      if (!cart) {
        return { message: "Cart not found" };
      }

      const productIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (productIndex === -1) {
        return { message: "Product not found in cart" };
      }

      cart.items.splice(productIndex, 1);

      if(cart.items.length === 0){
        await CartModel.deleteOne({ userId });
        return { message: "Cart is empty" };
      }

      const totalAmount = cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      cart.totalAmount = totalAmount;
      await cart.save();
      return { cart, message: "Product removed from cart" };
    } catch (error) {
      return error;
    }
  }
}

export default new CartServices();
