import React, { useState, useEffect } from 'react';
import OrderHistory from '../components/OrderHistory';
import { Navigate } from 'react-router-dom';

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  useEffect(() => {
    // Fetch products from localStorage
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  

  // Check if the user is a store manager
  const userRole = localStorage.getItem('userRole');
  if (userRole !== 'storeManager') {
    // Redirect to the login page if the user is not a store manager
    return <Navigate to="/login" />;
  }

  const saveProducts = (updatedProducts) => {
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      ...formData,
      id: Date.now().toString(),
    };
    const updatedProducts = [...products, newProduct];
    saveProducts(updatedProducts);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
    });
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    saveProducts(updatedProducts);
    setSelectedProduct(null);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
    });
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const updatedProducts = products.map((product) => {
      if (product.id === selectedProduct.id) {
        return {
          ...product,
          ...formData,
        };
      }
      return product;
    });
    saveProducts(updatedProducts);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
    });
    setSelectedProduct(null);
  };

  const handleCancelEdit = () => {
    setSelectedProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
    });
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <h2>Product Management</h2>
      <form onSubmit={selectedProduct ? handleUpdateProduct : handleAddProduct}>
        {/* Form fields */}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Smart Doorbells">Smart Doorbells</option>
            <option value="Smart Doorlocks">Smart Doorlocks</option>
            <option value="Smart Speakers">Smart Speakers</option>
            <option value="Smart Lightings">Smart Lightings</option>
            <option value="Smart Thermostats">Smart Thermostats</option>
          </select>
        </div>
        <button type="submit">{selectedProduct ? 'Update Product' : 'Add Product'}</button>
        {selectedProduct && (
          <button type="button" onClick={handleCancelEdit}>
            Cancel
          </button>
        )}
      </form>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong>
            <button onClick={() => handleSelectProduct(product)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <OrderHistory />
    </div>
  );
}

export default AdminPanel;