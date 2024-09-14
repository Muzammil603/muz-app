import React, { useState, useEffect } from 'react';

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch order history from local storage (replace with API call to fetch orders from database)
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div>
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <p>Confirmation Number: {order.confirmationNumber}</p>
              <p>Name: {order.name}</p>
              <p>Address: {order.address}</p>
              <p>Delivery Date: {order.deliveryDate}</p>
              {/* Display other order details */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderHistory;