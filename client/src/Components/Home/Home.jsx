import React, { useState } from "react";
import axios from "axios";
import CartContainer from "../Cart/CartContainer";
import ReactangleConatiner from "./ReactangleConatiner";

function Home() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { id: product._id, name: product.productName, price: product.price, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handlePlaceOrder = async () => {
    try {
      // Send the entire cart array to the backend
      const response = await axios.post('/api/cart/addtocart', {
        cartItems: cart, // Send the whole cart array
      });

      if (response.status === 201) {
        alert("Order placed successfully!");
        setCart([]); // Clear the cart after placing the order
      } else {
        alert("There was an issue with your order.");
      }
    } catch (error) {
      console.error("Error placing the order:", error);
      alert("There was an error placing your order.");
    }
  };

  return (
    <div className="home">
      <div className="main-container">
        <div className="products-container">
          <ReactangleConatiner addToCart={addToCart} />
        </div>
        <div className="cart-container">
          <CartContainer
            cartItems={cart}
            removeFromCart={removeFromCart}
            handlePlaceOrder={handlePlaceOrder}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
