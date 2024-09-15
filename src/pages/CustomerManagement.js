import React, { useState, useEffect } from 'react';

function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = () => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
      const customerUsers = parsedUsers.filter(user => user.role === 'customer');
      setCustomers(customerUsers);
    }
  };

  const saveCustomers = (updatedCustomers) => {
    const storedUsers = localStorage.getItem('users');
    let allUsers = storedUsers ? JSON.parse(storedUsers) : [];
    
    updatedCustomers.forEach(customer => {
      const index = allUsers.findIndex(user => user.id === customer.id);
      if (index !== -1) {
        allUsers[index] = { ...allUsers[index], ...customer };
      } else {
        allUsers.push({ ...customer, role: 'customer' });
      }
    });

    localStorage.setItem('users', JSON.stringify(allUsers));
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
    clearForm();
  };

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      password: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCustomer) {
      const updatedCustomers = customers.map((customer) =>
        customer.id === selectedCustomer.id 
          ? { 
              ...customer, 
              ...formData, 
              password: formData.password ? formData.password : customer.password 
            } 
          : customer
      );
      saveCustomers(updatedCustomers);
    } else {
      const newCustomer = {
        id: Date.now().toString(),
        ...formData,
        role: 'customer'
      };
      saveCustomers([...customers, newCustomer]);
    }
    clearForm();
    setSelectedCustomer(null);
  };

  const clearForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
    });
  };

  return (
    <div>
      <h2>Customer Management</h2>
      <form onSubmit={handleSubmit}>
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
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required={!selectedCustomer}
            placeholder={selectedCustomer ? "Leave blank to keep current password" : ""}
          />
        </div>
        <button type="submit">
          {selectedCustomer ? 'Update Customer' : 'Add Customer'}
        </button>
        {selectedCustomer && (
          <button type="button" onClick={() => {
            setSelectedCustomer(null);
            clearForm();
          }}>
            Cancel
          </button>
        )}
      </form>

      <h3>Customer List</h3>
      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <ul>
          {customers.map((customer) => (
            <li key={customer.id}>
              <strong>{customer.name}</strong> - {customer.email}
              <button onClick={() => handleSelectCustomer(customer)}>Edit</button>
              <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomerManagement;