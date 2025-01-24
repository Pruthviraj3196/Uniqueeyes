import React, { useEffect, useState } from "react";
import axios from "axios";
import imageall from "../../assets/imagefor.jpg";

const RectangleContainer = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [mainType, setMainType] = useState(""); // State for main type filter
  const [subtype, setSubtype] = useState(""); // State for subtype filter
  const [subtypes, setSubtypes] = useState([]); // Dynamic list of subtypes based on main type

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
        setFilteredProducts(response.data); // Initially show all products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle filtering logic
  const handleMainTypeChange = (e) => {
    const selectedMainType = e.target.value;
    setMainType(selectedMainType);
    setSubtype(""); // Reset subtype when main type changes

    // Filter products by main type and update subtypes dynamically
    const filteredByMainType = selectedMainType
      ? products.filter((product) => product.type === selectedMainType)
      : products;

    setFilteredProducts(filteredByMainType);

    // Extract unique subtypes for the selected main type
    const uniqueSubtypes = [
      ...new Set(filteredByMainType.map((product) => product.subtype)),
    ];
    setSubtypes(uniqueSubtypes);
  };

  const handleSubtypeChange = (e) => {
    const selectedSubtype = e.target.value;
    setSubtype(selectedSubtype);

    // Further filter products by subtype
    const filteredBySubtype = selectedSubtype
      ? products.filter(
          (product) => product.type === mainType && product.subtype === selectedSubtype
        )
      : products.filter((product) => product.type === mainType);

    setFilteredProducts(filteredBySubtype);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="container">
      {/* Filter Dropdowns */}
      <div className="filter-container">
        <label htmlFor="mainType">Filter by Main Type:</label>
        <select id="mainType" value={mainType} onChange={handleMainTypeChange}>
          <option value="">All Types</option>
          <option value="Door">Door</option>
          <option value="Celling">Celling</option>
          <option value="Wall">Wall</option>
        </select>

        {mainType && (
          <>
            <label htmlFor="subtype">Filter by Subtype:</label>
            <select id="subtype" value={subtype} onChange={handleSubtypeChange}>
              <option value="">All Subtypes</option>
              {subtypes.map((st, index) => (
                <option key={index} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid-container">
        {filteredProducts.map((item) => (
          <div key={item._id} className="card" onClick={() => handleProductClick(item)}>
            <img src={imageall} alt={item.productName} className="card-image" />
            <div className="card-info">
              <h3 className="card-name">{item.productName}</h3>
              <p className="card-price">
                {item.price ? `${item.price} AED` : "Price not available"}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(item);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}

        {/* Popup for Product Details */}
        {isPopupOpen && selectedProduct && (
          <div className="popup-overlay">
            <div className="popup">
              <button className="popup-close" onClick={closePopup}>
                X
              </button>
              <img
                src={imageall}
                alt={selectedProduct.productName}
                className="popup-image"
              />
              <div className="popup-info">
                <h2>{selectedProduct.productName}</h2>
                <p>{selectedProduct.description}</p>
                <p>
                  {selectedProduct.price
                    ? `${selectedProduct.price} AED`
                    : "Price not available"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RectangleContainer;
