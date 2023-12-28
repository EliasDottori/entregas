const cartModel = require("./cart.model");

class CartManager {
  constructor(io) {
    this.io = io;
    this.loadCarts();
    this.setupWebSocket();
  }

  async loadCarts() {
    try {
      this.carts = await cartModel.find({});
      this.cartId =
        this.carts.length > 0
          ? Math.max(...this.carts.map((cart) => cart.id)) + 1
          : 1;
    } catch (error) {
      console.error("Error al cargar el carrito:", error.message);
      this.carts = [];
      this.cartId = 1;
    }
  }

  setupWebSocket() {
    this.io.on("connection", (socket) => {
      console.log("New client connected");
      socket.on("disconnect", () => console.log("Client disconnected"));

      // Handle add product event
      socket.on("addProductToCart", ({ cartId, productId, quantity }) => {
        this.addProductToCart(cartId, productId, quantity);
        this.io.emit("cartUpdated", this.getCartById(cartId));
      });

      // Other socket events can be handled similarly
    });
  }

  async saveCarts() {
    try {
      // Update or insert carts into the MongoDB collection
      await Promise.all(
        this.carts.map(async (cart) => {
          await cartModel.findOneAndUpdate({ id: cart.id }, cart, {
            upsert: true,
            new: true,
          });
        })
      );
    } catch (error) {
      console.error("Error saving carts:", error.message);
    }
  }

  createCart() {
    const newCart = {
      id: this.cartId++,
      products: [],
    };
    this.carts.push(newCart);
    this.saveCarts();
    return newCart;
  }

  getCartById(cartId) {
    return this.carts.find((cart) => cart.id === cartId);
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    try {
      const cart = this.getCartById(cartId);
      if (!cart) {
        console.log("Carrito no encontrado");
        return;
      }

      const existingProduct = cart.products.find(
        (item) => item.product === productId
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      await this.saveCarts();
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
    }
  }
}

export default CartManager;
