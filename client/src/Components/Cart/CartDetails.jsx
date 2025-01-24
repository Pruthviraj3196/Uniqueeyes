import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const CartDetails = () => {
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  // Fetch cart data from the backend
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch('/api/cart/getthecart');

        const data = await response.json();
        setCartData(data);

        // Calculate total price
        const total = data.reduce((sum, item) => sum + item.quantity * item.productId.price, 0);
        setTotalPrice(total);
      } catch (err) {
        console.error('Error fetching cart data:', err.message);
        setError(err.message);
      }
    };

    fetchCartData();
  }, []);

  // Handle Print Button
  const handlePrint = () => {
    window.print();
  };

  // Handle Confirm Button
  const handleConfirm = async () => {
    try {
      const response = await fetch('/api/cart/deleteCart', {
        method: 'DELETE',
      });

      if (response.ok) {
        // Clear the cart data on successful API call
        setCartData([]);
        setTotalPrice(0);
        alert('Order confirmed and cart cleared!');
        navigate("/");
      } else {
        throw new Error('Failed to clear the cart.');
      }
    } catch (error) {
      console.error('Error confirming order:', error.message);
      alert('Failed to confirm order, please try again.');
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Cart Details</h1>

      {error && (
        <p className="text-red-500 font-medium mb-4">Error: {error}</p>
      )}

      {cartData.length > 0 ? (
        <div>
          <table className="w-full border-collapse border border-gray-300 mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Product Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Quantity</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartData.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{item.productId.productName}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.productId.type}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                  <td className="border border-gray-300 px-4 py-2">${item.productId.price}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    ${item.quantity * item.productId.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Total Price: ${totalPrice}
            </h2>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handlePrint}
              className="px-6 py-2 bg-blue-500 text-white font-medium rounded shadow hover:bg-blue-600 transition"
            >
              Print
            </button>
            <button
              onClick={handleConfirm}
              className="px-6 py-2 bg-green-500 text-white font-medium rounded shadow hover:bg-green-600 transition"
            >
              Confirm
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-lg">No items in the cart.</p>
      )}
    </div>
  );
};

export default CartDetails;
