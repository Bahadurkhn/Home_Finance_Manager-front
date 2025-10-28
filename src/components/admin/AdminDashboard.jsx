import React from 'react';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Welcome, {user?.name}!</h3>
        <p>You have administrator privileges.</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> <span style={{ color: '#dc3545' }}>{user?.role}</span></p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div style={{ background: '#007bff', color: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <h3>User Management</h3>
          <p>Manage all system users</p>
          <a 
            href="/admin/users" 
            style={{ 
              color: 'white', 
              textDecoration: 'underline',
              display: 'block',
              marginTop: '10px'
            }}
          >
            Go to Users →
          </a>
        </div>
        
        <div style={{ background: '#28a745', color: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <h3>System Stats</h3>
          <p>View platform analytics</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;