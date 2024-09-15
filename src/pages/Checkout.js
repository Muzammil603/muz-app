import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout({ cartItems }) {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    creditCard: '',
    deliveryOption: '',
    pickupLocation: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Load user information if logged in
    const userId = localStorage.getItem('userId');
    if (userId) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const currentUser = users.find(user => user.id === userId);
      if (currentUser) {
        setCustomerInfo(prevInfo => ({
          ...prevInfo,
          name: currentUser.name,
          // You might want to add address and credit card here if you store them with user data
        }));
      }
    }
  }, []);

  const handleChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const generateConfirmationNumber = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const generateDeliveryDate = () => {
    const currentDate = new Date();
    const deliveryDate = new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000);
    return deliveryDate.toISOString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const confirmationNumber = generateConfirmationNumber();
    const deliveryDate = generateDeliveryDate();

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = subtotal * 0.125; // 12.5% tax
    const total = subtotal + tax;

    const order = {
      id: Date.now().toString(),
      customerId: localStorage.getItem('userId'),
      ...customerInfo,
      confirmationNumber,
      deliveryDate,
      items: cartItems,
      subtotal,
      tax,
      total,
      status: 'Pending'
    };

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear the cart (you'll need to implement this in your cart management logic)
    // clearCart();

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
          />
        </div>
        <div>
          <label htmlFor="deliveryOption">Delivery Option:</label>
          <input
            type="text"
            id="deliveryOption"
            name="deliveryOption"
            value={customerInfo.deliveryOption}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="pickupLocation">Pickup Location:</label>
          <input
            type="text"
            id="pickupLocation"
            name="pickupLocation"
            value={customerInfo.pickupLocation}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;
