import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import the useNavigate hook
import imageall from "../../assets/imagefor.jpg";

const AdminAllProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();  // Initialize the navigate function

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Delete product function
  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`/api/admin/delete/${productId}`);
      if (response.status === 200) {
        // Remove the deleted product from the local state
        setProducts(products.filter((product) => product._id !== productId));
        alert("Product deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  // Redirect function for navigating to the Admin page
  const goToAdminPage = () => {
    navigate("/admin");  // Redirect to the /admin route
  };

  return (
    <div className="admin-container">
      <button className="go-to-admin-btn" onClick={goToAdminPage}>Add Product</button> {/* Button to navigate to /admin */}
      <div className="grid-container">
        {products.map((item) => (
          <div key={item._id} className="card">
            <img src={imageall} alt={item.productName} className="card-image" />
            <div className="card-info">
              <h3 className="card-name">{item.productName}</h3>
              <p className="card-price">
                {item.price ? `${item.price} AED` : "Price not available"}
              </p>
              <button onClick={() => deleteProduct(item._id)}>Delete Product</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAllProducts;
