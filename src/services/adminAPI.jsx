const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('financeToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

// Admin API functions
export const adminAPI = {
  // Dashboard statistics
  getDashboardStats: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/stats`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Failed to fetch dashboard stats');
      }
    } catch (error) {
      console.error('getDashboardStats error:', error);
      throw error;
    }
  },

  // Get all users
  getAllUsers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Failed to fetch users');
      }
    } catch (error) {
      console.error('getAllUsers error:', error);
      throw error;
    }
  },

  // Update user status
  updateUserStatus: async (userId, isActive) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ isActive })
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Failed to update user status');
      }
    } catch (error) {
      console.error('updateUserStatus error:', error);
      throw error;
    }
  },

  // Delete user
  deleteUser: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      console.error('deleteUser error:', error);
      throw error;
    }
  },

  // Get user finance details
  getUserFinanceDetails: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/finance`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Failed to fetch user finance details');
      }
    } catch (error) {
      console.error('getUserFinanceDetails error:', error);
      throw error;
    }
  }
};

export default adminAPI;