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
    status: 'Pending',
    address: '',
    creditCard: '',
    subtotal: 0,
    tax: 0,
    total: 0
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
      
      const subtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const tax = subtotal * 0.125; // 12.5% tax
      const total = subtotal + tax;

      return { 
        ...prevData, 
        items: updatedItems,
        subtotal: subtotal,
        tax: tax,
        total: total
      };
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
      status: order.status || 'Pending',
      address: order.address || '',
      creditCard: order.creditCard || '',
      subtotal: order.subtotal || 0,
      tax: order.tax || 0,
      total: order.total || 0
    });
  };

  const clearOrderForm = () => {
    setOrderFormData({
      customerId: '',
      items: [],
      status: 'Pending',
      address: '',
      creditCard: '',
      subtotal: 0,
      tax: 0,
      total: 0
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
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={orderFormData.address}
            onChange={(e) => setOrderFormData(prevData => ({...prevData, address: e.target.value}))}
            required
          />
        </div>
        <div>
          <label htmlFor="creditCard">Credit Card:</label>
          <input
            type="text"
            id="creditCard"
            name="creditCard"
            value={orderFormData.creditCard}
            onChange={(e) => setOrderFormData(prevData => ({...prevData, creditCard: e.target.value}))}
            required
          />
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
        <div>
          <p>Subtotal: ${orderFormData.subtotal.toFixed(2)}</p>
          <p>Tax (12.5%): ${orderFormData.tax.toFixed(2)}</p>
          <p>Total: ${orderFormData.total.toFixed(2)}</p>
        </div>
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
              <br />
              Address: {order.address}
              <br />
              Credit Card: {order.creditCard}
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
              <p>Subtotal: ${order.subtotal?.toFixed(2)}</p>
              <p>Tax (12.5%): ${order.tax?.toFixed(2)}</p>
              <p>Total: ${order.total?.toFixed(2)}</p>
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