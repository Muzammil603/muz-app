import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    creditCard: '',
    deliveryOption: '',
    pickupLocation: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const generateConfirmationNumber = () => {
    // Generate a random confirmation number
    return Math.floor(Math.random() * 1000000);
  };

  const generateDeliveryDate = () => {
    // Generate a delivery date (2 weeks from the current date)
    const currentDate = new Date();
    const deliveryDate = new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000);
    return deliveryDate.toLocaleDateString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate confirmation number and delivery/pickup date
    const confirmationNumber = generateConfirmationNumber();
    const deliveryDate = generateDeliveryDate();

    // Create order object
    const order = {
      ...customerInfo,
      confirmationNumber,
      deliveryDate,
    };

    // Store the order data (you can replace this with an API call to save the order to a database)
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear the cart
    // Redirect to confirmation page
    navigate('/confirmation');
  };

  return (
    <div>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={customerInfo.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={customerInfo.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="creditCard">Credit Card:</label>
          <input
            type="text"
            id="creditCard"
            name="creditCard"
            value={customerInfo.creditCard}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="deliveryOption">Delivery Option:</label>
          <select
            id="deliveryOption"
            name="deliveryOption"
            value={customerInfo.deliveryOption}
            onChange={handleChange}
            required
          >
            <option value="">Select an option</option>
            <option value="store-pickup">Store Pickup</option>
            <option value="home-delivery">Home Delivery</option>
          </select>
        </div>
        {customerInfo.deliveryOption === 'store-pickup' && (
          <div>
            <label htmlFor="pickupLocation">Pickup Location:</label>
            <select
              id="pickupLocation"
              name="pickupLocation"
              value={customerInfo.pickupLocation}
              onChange={handleChange}
              required
            >
              <option value="">Select a store</option>
              <option value="store1">Store 1</option>
              <option value="store2">Store 2</option>
              {/* Add more store options */}
            </select>
          </div>
        )}
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;