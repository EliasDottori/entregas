class CartManager {
  constructor() {
    this.carts = [];
    this.cartId = 1;
  }

  createCart() {
    const newCart = {
      id: this.cartId++,
      products: [],
    };
    this.carts.push(newCart);
    return newCart;
  }

  getCartById(cartId) {
    return this.carts.find((cart) => cart.id === cartId);
  }

  addProductToCart(cartId, productId, quantity = 1) {
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
  }
}

module.exports = CartManager;
