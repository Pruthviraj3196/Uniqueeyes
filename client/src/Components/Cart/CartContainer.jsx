import React from "react";
import { useNavigate } from "react-router-dom";

const CartContainer = ({ cartItems, removeFromCart, handlePlaceOrder }) => {
  const navigate = useNavigate();
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleOrder = () => {
    // Trigger place order logic
    handlePlaceOrder();

    // Show success popup
    alert("Order placed successfully!");

    // Navigate to CartDetails page
    navigate("/cartdetails");
  };

  return (
    <div className="cart-container-inner">
      <h3>Quote Summary</h3>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-info">
                <p>{item.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>{item.price * item.quantity} AED</p>
              </div>
              <button
                className="delete-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="cart-total">
        <span>Total:</span>
        <span>{total} AED</span>
      </div>
      <button
        className="place-order-button"
        onClick={handleOrder}
        disabled={cartItems.length === 0}
      >
        Place Order
      </button>
    </div>
  );
};

export default CartContainer;
