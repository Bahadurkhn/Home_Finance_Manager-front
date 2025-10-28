import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../../services/adminAPI';
import './AdminPanel.css';

const AdminPanel = () => {
  const { isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [dashboardStats, setDashboardStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      console.log('Not an admin, redirecting...');
      navigate('/dashboard');
    } else {
      fetchDashboardData();
    }
  }, [isAdmin, navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsResponse, usersResponse] = await Promise.all([
        adminAPI.getDashboardStats(),
        adminAPI.getAllUsers()
      ]);
      
      setDashboardStats(statsResponse);
      setUsers(usersResponse);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleUserStatusUpdate = async (userId, isActive) => {
    try {
      await adminAPI.updateUserStatus(userId, isActive);
      const usersResponse = await adminAPI.getAllUsers();
      setUsers(usersResponse);
    } catch (err) {
      setError('Failed to update user status');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await adminAPI.deleteUser(userId);
        const usersResponse = await adminAPI.getAllUsers();
        setUsers(usersResponse);
      } catch (err) {
        setError('Failed to delete user');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Show loading or redirect if not admin
  if (!isAdmin) {
    return (
      <div className="admin-panel">
        <div className="loading">Redirecting to dashboard...</div>
      </div>
    );
  }

  return (
    <div className="admin-panel fade-in">
      <div className="admin-header">
        <div className="admin-header-content">
          <h1>Admin Dashboard 🛠️</h1>
          <button onClick={handleLogout} className="admin-logout-btn">
            Logout
          </button>
        </div>
        <p>Welcome back, {user?.name}! System overview and management</p>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError('')} className="dismiss-btn">×</button>
        </div>
      )}

      <div className="admin-content">
        {loading ? (
          <div className="loading">Loading dashboard data...</div>
        ) : (
          <>
            <div className="admin-stats">
              <div className="stat-card">
                <h3>Total Users</h3>
                <div className="stat-number">{dashboardStats?.totalUsers || 0}</div>
              </div>
              <div className="stat-card">
                <h3>Active Users</h3>
                <div className="stat-number">{dashboardStats?.activeUsers || 0}</div>
              </div>
              <div className="stat-card">
                <h3>Total Income</h3>
                <div className="stat-number">${dashboardStats?.totalIncome?.toLocaleString() || 0}</div>
              </div>
              <div className="stat-card">
                <h3>Average Savings</h3>
                <div className="stat-number">${dashboardStats?.averageSavings?.toLocaleString() || 0}</div>
              </div>
            </div>

            <div className="users-section">
              <h3>User Management ({users.length} users)</h3>
              <div className="users-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Last Login</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`role-badge ${user.role}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => handleUserStatusUpdate(user._id, !user.isActive)}
                            className={`status-btn ${user.isActive ? 'active' : 'inactive'}`}
                          >
                            {user.isActive ? 'Active' : 'Inactive'}
                          </button>
                        </td>
                        <td>
                          {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                        </td>
                        <td>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;