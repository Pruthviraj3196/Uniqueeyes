import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [product, setProduct] = useState({
    productName: '',
    type: '',
    subtype: '',
    description: '',
    price:'',
    imageid: '',
  });

  const [alertMessage, setAlertMessage] = useState('');
 
  const navigate = useNavigate();

  const goToAdminPage = () => {
    navigate("/admin/allproducts");  // Redirect to the /admin route
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));

    if (name === 'type') {
      setProduct((prevProduct) => ({
        ...prevProduct,
        subtype: '', // Reset subtype when type changes
      }));
    }
  };

  // Handle form submission and make API call
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend to add the product
      const response = await axios.post('/api/admin/add', product);
      
      // On successful addition of the product
      console.log('Product added successfully:', response.data);

      // Reset the form fields after submission
      setProduct({
        productName: '',
        type: '',
        subtype: '',
        description: '',
        price:'',
        imageid: '',
      });

      // Show success message
      setAlertMessage('Product added successfully!');
    } catch (error) {
      // Handle error and show an error message
      console.error('Error adding product:', error);
      setAlertMessage('Error adding product');
    }
  };

  const getSubtypes = (type) => {
    switch (type) {
      case 'Door':
        return ['Wood', 'Glass', 'PVC'];
      case 'Celling':
        return ['Plain', 'Decorated'];
      case 'Wall':
        return ['Brick', 'Designer', 'Simple'];
      default:
        return [];
    }
  };

  return (
    <div className="admin-container">
      <button className="go-to-admin-btn" onClick={goToAdminPage}>View All Added Products</button> {/* Button to navigate to /admin */}
      <h2>Add Product</h2>
      {alertMessage && <div className="alert">{alertMessage}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="productName"
            value={product.productName}
            onChange={handleChange}
            placeholder="Product Name"
            required
          />
        </div>
        
        <div className="input-group">
          <select
            name="type"
            value={product.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Door">Door</option>
            <option value="Celling">Celling</option>
            <option value="Wall">Wall</option>
          </select>
        </div>

        <div className="input-group">
          <select
            name="subtype"
            value={product.subtype}
            onChange={handleChange}
            required
            disabled={!product.type} // Disable subtype if no type is selected
          >
            <option value="">Select Subtype</option>
            {getSubtypes(product.type).map((subtype) => (
              <option key={subtype} value={subtype}>
                {subtype}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            required
          ></textarea>
        </div>

        <div className="input-group">
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            name="imageid"
            value={product.imageid}
            onChange={handleChange}
            placeholder="Image ID"
            required
          />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default Admin;
