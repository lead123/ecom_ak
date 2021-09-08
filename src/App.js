import react, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Checkout } from "./components";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState("");
  const [err, setErr] = useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const addToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  };

  const handleUpdateQty = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });
    setCart(response.cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const response = await commerce.cart.remove(productId);
    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();
    setCart(response.cart);
  };

  const refreshCart = async() => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };
  const handleCaptureCheckOut = async (checkOutTokenId, newOrder) => {
    try {
      const incommingOrder = await commerce.checkout.capture(
        checkOutTokenId,
        newOrder
      );
      setOrder(incommingOrder);
      refreshCart();
    } catch (error) {
      setErr(error.data.error.message);
    }
  };
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(cart);
  return (
    <Router className="App">
      <Navbar totalItems={cart.total_items} />

      <Switch>
        <Route exact path="/">
          <Products product={products} onAddToCart={addToCart} />
        </Route>
        <Route path="/cart">
          <Cart
            cart={cart}
            handleUpdateQty={handleUpdateQty}
            handleRemoveFromCart={handleRemoveFromCart}
            handleEmptyCart={handleEmptyCart}
          />
        </Route>
        <Route exact path="/checkout">
          <Checkout
            cart={cart}
            order={order}
            onCaptureCheckOut={handleCaptureCheckOut}
            error={err}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
