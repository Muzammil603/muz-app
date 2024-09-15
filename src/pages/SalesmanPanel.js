import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import CustomerManagement from './CustomerManagement';
import OrderManagement from './OrderManagement';

function SalesmanPanel() {
  const [activeSection, setActiveSection] = useState('customers');

  const userRole = localStorage.getItem('userRole');
  if (userRole !== 'salesman' && userRole !== 'storeManager') {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Salesman Panel</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setActiveSection('customers')}
          style={{ 
            fontWeight: activeSection === 'customers' ? 'bold' : 'normal',
            marginRight: '10px',
            padding: '5px 10px',
            backgroundColor: activeSection === 'customers' ? '#ddd' : '#f0f0f0'
          }}
        >
          Manage Customers
        </button>
        <button 
          onClick={() => setActiveSection('orders')}
          style={{ 
            fontWeight: activeSection === 'orders' ? 'bold' : 'normal',
            padding: '5px 10px',
            backgroundColor: activeSection === 'orders' ? '#ddd' : '#f0f0f0'
          }}
        >
          Manage Orders
        </button>
      </div>

      {activeSection === 'customers' ? <CustomerManagement /> : <OrderManagement />}
    </div>
  );
}

export default SalesmanPanel;