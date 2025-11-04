// This file connects your frontend with admin panel via localStorage
// When users login to your frontend, they appear here through shared localStorage

export const frontendUsers = {
  // Get all users from localStorage (shared with frontend)
  getAllUsers: function() {
    try {
      const usersData = localStorage.getItem('finance_users');
      if (usersData) {
        return JSON.parse(usersData);
      }
      
      // Fallback: if no users in localStorage, return sample data
      return [
        { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin' }
      ];
    } catch (error) {
      console.error('Error getting users from localStorage:', error);
      return [];
    }
  },

  // Get all transactions from localStorage
  getAllTransactions: function() {
    try {
      const transactionsData = localStorage.getItem('finance_transactions');
      return transactionsData ? JSON.parse(transactionsData) : [];
    } catch (error) {
      console.error('Error getting transactions:', error);
      return [];
    }
  },

  // Get current user from localStorage
  getCurrentUser: function() {
    try {
      const userData = localStorage.getItem('finance_user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  },

  // Add a new user (for testing)
  addUser: function(user) {
    try {
      const users = this.getAllUsers();
      users.push({ ...user, id: Date.now() });
      localStorage.setItem('finance_users', JSON.stringify(users));
      return true;
    } catch (error) {
      console.error('Error adding user:', error);
      return false;
    }
  },

  // Remove a user
  removeUser: function(userId) {
    try {
      const users = this.getAllUsers().filter(user => user.id !== userId);
      localStorage.setItem('finance_users', JSON.stringify(users));
      return true;
    } catch (error) {
      console.error('Error removing user:', error);
      return false;
    }
  }
};

console.log('✅ frontendUsers utility loaded - Connected via localStorage');
