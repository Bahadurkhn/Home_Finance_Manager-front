import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { adminAPI } from '../../services/adminAPI';

const UserManagement = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError('');
    
    try {
      console.log('🔄 Loading users from admin API...');
      
      // Use your existing adminAPI service
      const response = await adminAPI.getAllUsers();
      console.log('📊 API Response:', response);
      
      // ✅ FIXED: Handle the response format correctly
      if (response && response.users) {
        setUsers(response.users);
        console.log(`✅ Loaded ${response.users.length} users from database`);
      } else if (Array.isArray(response)) {
        // Fallback: if response is directly the array
        setUsers(response);
        console.log(`✅ Loaded ${response.length} users from database (array format)`);
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (err) {
      console.error('❌ Error loading users:', err);
      setError(err.message || 'Failed to load users from database');
    } finally {
      setLoading(false);
    }
  };

  const handlePromote = async (userId) => {
    if (!window.confirm('Are you sure you want to make this user an admin?')) {
      return;
    }

    try {
      console.log(`🔄 Promoting user ${userId}...`);
      
      // Use updateUserStatus to change role to admin
      await adminAPI.updateUserStatus(userId, true);
      
      // Refresh the users list
      await loadUsers();
      alert('User promoted to admin successfully!');
    } catch (err) {
      console.error('❌ Error promoting user:', err);
      alert('Failed to promote user: ' + err.message);
    }
  };

  // Test backend connection directly
  const testBackendConnection = async () => {
    try {
      const token = localStorage.getItem('financeToken');
      const response = await fetch('http://localhost:5000/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log('🔧 Direct backend test:', data);
      alert(`Backend response: ${data.count} users found`);
    } catch (error) {
      console.error('Backend test failed:', error);
      alert('Backend connection failed: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div>Loading users from database...</div>
        <div style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          Querying MongoDB for registered users...
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2>User Management</h2>
        <p>Manage all users and their permissions</p>
        
        {/* Debug Info */}
        <div style={{ 
          background: '#f8f9fa', 
          padding: '15px', 
          borderRadius: '4px',
          marginBottom: '15px',
          fontSize: '14px',
          border: '1px solid #dee2e6'
        }}>
          <strong>Database Info:</strong> Found {users.length} users in MongoDB | 
          <strong> Your Role:</strong> {currentUser?.role} |
          <strong> Your Email:</strong> {currentUser?.email}
        </div>
        
        {error && (
          <div style={{ 
            background: '#fee', 
            color: '#c33', 
            padding: '15px', 
            borderRadius: '4px',
            marginBottom: '15px',
            border: '1px solid #fcc'
          }}>
            <strong>Error Loading Users:</strong> {error}
          </div>
        )}
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={loadUsers}
            style={{
              padding: '10px 20px',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            🔄 Refresh Users
          </button>

          <button 
            onClick={testBackendConnection}
            style={{
              padding: '10px 20px',
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            🔧 Test Backend
          </button>

          <button 
            onClick={() => {
              console.log('Current users state:', users);
              console.log('Current user:', currentUser);
              console.log('LocalStorage token:', localStorage.getItem('financeToken'));
            }}
            style={{
              padding: '10px 20px',
              background: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            📋 Debug Console
          </button>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6', fontWeight: '600' }}>User</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6', fontWeight: '600' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6', fontWeight: '600' }}>Role</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6', fontWeight: '600' }}>Joined Date</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6', fontWeight: '600' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id || user.id || index} style={{ borderBottom: '1px solid #dee2e6' }}>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      background: user?.role === 'admin' ? '#dc3545' : '#28a745',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '12px',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <strong style={{ display: 'block', marginBottom: '4px' }}>
                        {user.name || 'Unknown User'}
                      </strong>
                      {currentUser?.email === user.email && (
                        <span style={{ 
                          background: '#6c757d', 
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '500'
                        }}>
                          👤 Currently Logged In
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px', fontFamily: 'monospace', fontSize: '14px', fontWeight: '500' }}>
                  {user.email}
                </td>
                <td style={{ padding: '12px' }}>
                  <span 
                    style={{
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      background: user?.role === 'admin' ? '#dc3545' : '#28a745',
                      color: 'white',
                      display: 'inline-block',
                      minWidth: '80px',
                      textAlign: 'center',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    {user?.role ? user?.role.toUpperCase() : 'USER'}
                  </span>
                </td>
                <td style={{ padding: '12px', fontSize: '14px', color: '#666' }}>
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </td>
                <td style={{ padding: '12px' }}>
                  {user?.role !== 'admin' && (
                    <button
                      onClick={() => handlePromote(user._id || user.id)}
                      style={{
                        padding: '8px 16px',
                        background: '#17a2b8',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={(e) => e.target.style.background = '#138496'}
                      onMouseOut={(e) => e.target.style.background = '#17a2b8'}
                    >
                      ⬆️ Make Admin
                    </button>
                  )}
                  {user?.role === 'admin' && user.email !== currentUser?.email && (
                    <span style={{ 
                      color: '#dc3545', 
                      fontSize: '12px', 
                      fontWeight: '600',
                      padding: '8px 12px',
                      background: '#f8d7da',
                      borderRadius: '4px'
                    }}>
                      🔧 Admin User
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {users.length === 0 && !loading && (
          <div style={{ padding: '60px 20px', textAlign: 'center', color: '#6c757d' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>👥</div>
            <h3 style={{ marginBottom: '16px', fontSize: '24px' }}>No Users Found in Database</h3>
            <p style={{ marginBottom: '8px', fontSize: '16px' }}>
              There are no users registered in the system yet.
            </p>
            <p style={{ marginBottom: '24px', fontSize: '14px', color: '#8a8a8a' }}>
              Try registering a new user through the signup page first.
            </p>
            <button 
              onClick={loadUsers}
              style={{
                padding: '12px 24px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              🔄 Check Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
