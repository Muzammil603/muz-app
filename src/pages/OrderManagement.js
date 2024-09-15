import React, { useState, useEffect } from 'react';

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderFormData, setOrderFormData] = useState({
    customerId: '',
    items: [],
    status: 'Pending'
  });

  useEffect(() => {
    loadOrders();
    loadCustomers();
    loadProducts();
  }, []);

  const loadOrders = () => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      try {
        const parsedOrders = JSON.parse(storedOrders);
        console.log('Loaded orders:', parsedOrders);
        setOrders(parsedOrders);
      } catch (error) {
        console.error('Error parsing orders:', error);
        setOrders([]);
      }
    } else {
      console.log('No orders found in localStorage');
      setOrders([]);
    }
  };

  const loadCustomers = () => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      try {
        const parsedUsers = JSON.parse(storedUsers);
        const customerUsers = parsedUsers.filter(user => user.role === 'customer');
        console.log('Loaded customers:', customerUsers);
        setCustomers(customerUsers);
      } catch (error) {
        console.error('Error parsing users:', error);
        setCustomers([]);
      }
    } else {
      console.log('No users found in localStorage');
      setCustomers([]);
    }
  };

  const loadProducts = () => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      try {
        const parsedProducts = JSON.parse(storedProducts);
        console.log('Loaded products:', parsedProducts);
        setProducts(parsedProducts);
      } catch (error) {
        console.error('Error parsing products:', error);
        setProducts([]);
      }
    } else {
      console.log('No products found in localStorage');
      setProducts([]);
    }
  };

  const saveOrders = (updatedOrders) => {
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  };

  const handleCustomerFilter = (e) => {
    setSelectedCustomer(e.target.value);
  };

  const handleAddItem = () => {
    setOrderFormData(prevData => ({
      ...prevData,
      items: [...prevData.items, { productId: '', quantity: 1, price: 0 }],
    }));
  };

  const handleRemoveItem = (index) => {
    setOrderFormData(prevData => ({
      ...prevData,
      items: prevData.items.filter((_, i) => i !== index),
    }));
  };

  const handleItemChange = (index, field, value) => {
    setOrderFormData(prevData => {
      const updatedItems = [...prevData.items];
      updatedItems[index] = { ...updatedItems[index], [field]: value };
      
      if (field === 'productId') {
        const selectedProduct = products.find(p => p.id === value);
        if (selectedProduct) {
          updatedItems[index].price = selectedProduct.price;
        }
      }
      
      return { ...prevData, items: updatedItems };
    });
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (selectedOrder) {
      const updatedOrders = orders.map((order) =>
        order.id === selectedOrder.id ? { ...order, ...orderFormData } : order
      );
      saveOrders(updatedOrders);
    } else {
      const newOrder = {
        id: Date.now().toString(),
        ...orderFormData,
        customerId: selectedCustomer,
        date: new Date().toISOString(),
      };
      saveOrders([...orders, newOrder]);
    }
    clearOrderForm();
    setSelectedOrder(null);
  };

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    saveOrders(updatedOrders);
    setSelectedOrder(null);
    clearOrderForm();
  };

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    setOrderFormData({
      customerId: order.customerId,
      items: order.items || [],
      status: order.status || 'Pending'
    });
  };

  const clearOrderForm = () => {
    setOrderFormData({
      customerId: '',
      items: [],
      status: 'Pending'
    });
  };

  const filteredOrders = selectedCustomer
    ? orders.filter(order => order.customerId === selectedCustomer)
    : orders;

  return (
    <div>
      <h2>Order Management</h2>
      <div>
        <label htmlFor="customerFilter">Filter by Customer: </label>
        <select
          id="customerFilter"
          value={selectedCustomer}
          onChange={handleCustomerFilter}
        >
          <option value="">All Customers</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>{customer.name}</option>
          ))}
        </select>
      </div>

      <form onSubmit={handleOrderSubmit}>
        <h3>{selectedOrder ? 'Edit Order' : 'Add New Order'}</h3>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={orderFormData.status}
            onChange={(e) => setOrderFormData(prevData => ({...prevData, status: e.target.value}))}
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        {orderFormData.items.map((item, index) => (
          <div key={index}>
            <select
              value={item.productId}
              onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
              required
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </select>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
              placeholder="Quantity"
              required
            />
            <input
              type="number"
              value={item.price}
              onChange={(e) => handleItemChange(index, 'price', e.target.value)}
              placeholder="Price"
              required
            />
            <button type="button" onClick={() => handleRemoveItem(index)}>Remove Item</button>
          </div>
        ))}
        <button type="button" onClick={handleAddItem}>Add Item</button>
        <button type="submit">{selectedOrder ? 'Update Order' : 'Add Order'}</button>
        {selectedOrder && (
          <button type="button" onClick={() => {
            setSelectedOrder(null);
            clearOrderForm();
          }}>
            Cancel
          </button>
        )}
      </form>

      <h3>Order List</h3>
      {filteredOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {filteredOrders.map((order) => (
            <li key={order.id}>
              Customer: {customers.find(c => c.id === order.customerId)?.name || 'Unknown'}
              <br />
              Status: {order.status}
              <br />
              Date: {new Date(order.date).toLocaleString()}
              <ul>
                {order.items && order.items.map((item, index) => {
                  const product = products.find(p => p.id === item.productId);
                  return (
                    <li key={index}>
                      Product: {product ? product.name : 'Unknown'} - 
                      Quantity: {item.quantity} - 
                      Price: ${item.price}
                    </li>
                  );
                })}
              </ul>
              <button onClick={() => handleSelectOrder(order)}>Edit</button>
              <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderManagement;