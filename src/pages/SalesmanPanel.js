import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function SalesmanPanel() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });



  useEffect(() => {
    // Fetch customers from localStorage
    const storedCustomers = localStorage.getItem('customers');
    if (storedCustomers) {
      setCustomers(JSON.parse(storedCustomers));
    }
  }, []);
    // Check if the user is a salesman or store manager
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'salesman' && userRole !== 'storeManager') {
      // Redirect to the login page if the user is not a salesman or store manager
      return <Navigate to="/login" />;
    }

  const saveCustomers = (updatedCustomers) => {
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    setCustomers(updatedCustomers);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteCustomer = (customerId) => {
    const updatedCustomers = customers.filter((customer) => customer.id !== customerId);
    saveCustomers(updatedCustomers);
    setSelectedCustomer(null);
  };

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
    });
  };

  const handleUpdateCustomer = (e) => {
    e.preventDefault();
    const updatedCustomers = customers.map((customer) => {
      if (customer.id === selectedCustomer.id) {
        return {
          ...customer,
          ...formData,
        };
      }
      return customer;
    });
    saveCustomers(updatedCustomers);
    setFormData({
      name: '',
      email: '',
    });
    setSelectedCustomer(null);
  };

  return (
    <div>
      <h1>Salesman Panel</h1>
      <h2>Customer Management</h2>
      <form onSubmit={selectedCustomer ? handleUpdateCustomer : undefined}>
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        {selectedCustomer && (
          <button type="submit">Update Customer</button>
        )}
      </form>
      <h2>Customer List</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            <strong>{customer.name}</strong>
            <button onClick={() => handleSelectCustomer(customer)}>Edit</button>
            <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SalesmanPanel;