import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Admin authentication service
export const adminAuthService = {
  // Login with backend admin credentials
  loginAdmin: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password
      });
      
      if (response.data && response.data.role === 'admin') {
        // Store token and user data
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('adminUser', JSON.stringify(response.data));
        return { success: true, user: response.data };
      } else {
        return { success: false, error: 'Not an admin account' };
      }
    } catch (error) {
      console.error('Admin login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  },

  // Verify admin token
  verifyAdmin: async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return { success: false, error: 'No token found' };

      const response = await axios.get(`${API_BASE_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.role === 'admin') {
        return { success: true, user: response.data };
      } else {
        return { success: false, error: 'Not an admin user' };
      }
    } catch (error) {
      console.error('Admin verification error:', error);
      return { success: false, error: 'Verification failed' };
    }
  },

  // Logout admin
  logoutAdmin: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminUser');
  }
};