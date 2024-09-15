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
          name: currentUser.name
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

    const order = {
      ...customerInfo,
      confirmationNumber,
      deliveryDate,
      items: cartItems,
      totalPrice: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
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
        {/* ... (rest of the form fields remain the same) ... */}
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;