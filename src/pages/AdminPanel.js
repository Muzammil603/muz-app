import React, { useState } from 'react';
import OrderHistory from '../components/OrderHistory';

function AdminPanel() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add/Update product in the data store
    const products = JSON.parse(localStorage.getItem('/products.json')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    // Clear the form
    setProduct({
      name: '',
      description: '',
      price: '',
      category: '',
    });
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <h2>Add/Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
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
        <button type="submit">Save Product</button>
      </form>
      <OrderHistory />
    </div>
  );
}

export default AdminPanel;