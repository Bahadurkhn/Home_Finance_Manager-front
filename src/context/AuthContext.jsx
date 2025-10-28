// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(false);

//   // Check for existing session on app start
//   useEffect(() => {
//     const storedToken = localStorage.getItem('financeToken');
//     const storedUser = localStorage.getItem('financeUser');
    
//     if (storedToken && storedUser) {
//       try {
//         const userData = JSON.parse(storedUser);
//         setToken(storedToken);
//         setUser(userData);
//         setIsAdmin(userData.role === 'admin');
//         console.log('Auto-login:', userData.email, 'Admin:', userData.role === 'admin');
//       } catch (error) {
//         console.error('Error parsing stored user data:', error);
//         localStorage.removeItem('financeToken');
//         localStorage.removeItem('financeUser');
//       }
//     }
//   }, []);

//   const login = async (email, password) => {
//     try {
//       // Try backend login first
//       try {
//         const response = await fetch('http://localhost:5000/api/auth/login', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             email: email,
//             password: password
//           })
//         });

//         if (response.ok) {
//           const data = await response.json();
//           localStorage.setItem('financeToken', data.token);
//           localStorage.setItem('financeUser', JSON.stringify(data));
//           setUser(data);
//           setToken(data.token);
//           setIsAdmin(data.role === 'admin');
          
//           console.log('Login successful:', data.email, 'Admin:', data.role === 'admin');
//           return { success: true, user: data };
//         } else {
//           const errorData = await response.json();
//           throw new Error(errorData.message || 'Login failed');
//         }
//       } catch (apiError) {
//         // If API call fails, use mock login
//         console.log('API not available, using mock login');
        
//         // Check if it's the admin user
//         if (email === 'admin@finance.com' && password === 'admin123') {
//           const adminUser = {
//             _id: 'admin-1',
//             name: 'System Administrator',
//             email: 'admin@finance.com',
//             role: 'admin'
//           };
//           const adminToken = 'admin-token-123';
          
//           localStorage.setItem('financeToken', adminToken);
//           localStorage.setItem('financeUser', JSON.stringify(adminUser));
//           setUser(adminUser);
//           setToken(adminToken);
//           setIsAdmin(true);
          
//           console.log('Admin login successful');
//           return { success: true, user: adminUser };
//         } else {
//           // Regular user mock login
//           const mockUser = {
//             _id: '2',
//             name: 'Regular User',
//             email: email,
//             role: 'user'
//           };
//           const mockToken = 'user-token-123';
          
//           localStorage.setItem('financeToken', mockToken);
//           localStorage.setItem('financeUser', JSON.stringify(mockUser));
//           setUser(mockUser);
//           setToken(mockToken);
//           setIsAdmin(false);
          
//           return { success: true, user: mockUser };
//         }
//       }
//     } catch (error) {
//       return { success: false, message: error.message || 'Login failed' };
//     }
//   };

//   // Remove the separate loginAdmin function - use regular login instead
//   const logout = () => {
//     localStorage.removeItem('financeToken');
//     localStorage.removeItem('financeUser');
//     setUser(null);
//     setToken(null);
//     setIsAdmin(false);
//   };

//   const value = {
//     user,
//     token,
//     isAdmin,
//     login,
//     logout,
//     // Your existing signup function stays the same
//     signup: async (email, password, name) => {
//       // Your existing signup code here
//     }
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check for existing session on app start
  useEffect(() => {
    const storedToken = localStorage.getItem('financeToken');
    const storedUser = localStorage.getItem('financeUser');
    
    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(userData);
        setIsAdmin(userData.role === 'admin');
        console.log('Auto-login:', userData.email, 'Admin:', userData.role === 'admin');
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('financeToken');
        localStorage.removeItem('financeUser');
      }
    }
  }, []);

  // ✅ FIXED SIGNUP FUNCTION - NOW SAVES USERS FOR ADMIN PANEL
  const signup = async (email, password, name) => {
    try {
      console.log('🚀 Starting registration for:', { email, name });
      
      // Try backend registration first
      try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password
          })
        });

        console.log('📡 Backend response status:', response.status);

        if (response.ok) {
          const data = await response.json();
          console.log('✅ Backend registration successful:', data);
          
          // ✅ FIX: Save user to localStorage for admin panel
          const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
          const newUser = {
            id: data.user?.id || Date.now().toString(),
            name: name,
            email: email,
            role: data.user?.role || 'user',
            createdAt: new Date().toISOString()
          };
          
          // Check if user already exists to avoid duplicates
          const userExists = existingUsers.some(user => user.email === email);
          if (!userExists) {
            const updatedUsers = [...existingUsers, newUser];
            localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
            console.log('💾 User saved to localStorage for admin panel');
          }
          
          // Store user data and token
          localStorage.setItem('financeToken', data.token);
          localStorage.setItem('financeUser', JSON.stringify(data.user));
          setUser(data.user);
          setToken(data.token);
          setIsAdmin(data.user.role === 'admin');
          
          return { success: true, user: data.user };
        } else {
          const errorData = await response.json();
          console.error('❌ Backend registration failed:', errorData);
          throw new Error(errorData.message || 'Registration failed');
        }
      } catch (apiError) {
        console.log('🌐 Backend not available, using mock registration');
        
        // ✅ FIX: Save user to localStorage for admin panel
        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const newUser = {
          id: Date.now().toString(),
          name: name,
          email: email,
          role: 'user',
          createdAt: new Date().toISOString()
        };
        
        // Check if user already exists to avoid duplicates
        const userExists = existingUsers.some(user => user.email === email);
        if (!userExists) {
          const updatedUsers = [...existingUsers, newUser];
          localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
          console.log('💾 User saved to localStorage for admin panel');
        }

        // Mock registration for development
        const mockUser = {
          _id: 'user-' + Date.now(),
          name: name,
          email: email,
          role: 'user'
        };
        const mockToken = 'mock-token-' + Date.now();
        
        localStorage.setItem('financeToken', mockToken);
        localStorage.setItem('financeUser', JSON.stringify(mockUser));
        setUser(mockUser);
        setToken(mockToken);
        setIsAdmin(false);
        
        console.log('✅ Mock registration successful:', mockUser);
        return { success: true, user: mockUser };
      }
    } catch (error) {
      console.error('💥 Registration error:', error);
      return { 
        success: false, 
        message: error.message || 'An error occurred during registration. Please try again.' 
      };
    }
  };

  const login = async (email, password) => {
    try {
      // Try backend login first
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('financeToken', data.token);
          localStorage.setItem('financeUser', JSON.stringify(data.user));
          setUser(data.user);
          setToken(data.token);
          setIsAdmin(data.user.role === 'admin');
          
          console.log('Login successful:', data.user.email, 'Admin:', data.user.role === 'admin');
          return { success: true, user: data.user };
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Login failed');
        }
      } catch (apiError) {
        // If API call fails, use mock login
        console.log('API not available, using mock login');
        
        // Check if it's the admin user
        if (email === 'admin@finance.com' && password === 'admin123') {
          const adminUser = {
            _id: 'admin-1',
            name: 'System Administrator',
            email: 'admin@finance.com',
            role: 'admin'
          };
          const adminToken = 'admin-token-123';
          
          localStorage.setItem('financeToken', adminToken);
          localStorage.setItem('financeUser', JSON.stringify(adminUser));
          setUser(adminUser);
          setToken(adminToken);
          setIsAdmin(true);
          
          console.log('Admin login successful');
          return { success: true, user: adminUser };
        } else {
          // Regular user mock login
          const mockUser = {
            _id: 'user-' + Date.now(),
            name: 'Regular User',
            email: email,
            role: 'user'
          };
          const mockToken = 'user-token-' + Date.now();
          
          localStorage.setItem('financeToken', mockToken);
          localStorage.setItem('financeUser', JSON.stringify(mockUser));
          setUser(mockUser);
          setToken(mockToken);
          setIsAdmin(false);
          
          return { success: true, user: mockUser };
        }
      }
    } catch (error) {
      return { success: false, message: error.message || 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('financeToken');
    localStorage.removeItem('financeUser');
    setUser(null);
    setToken(null);
    setIsAdmin(false);
  };

  // ✅ FIXED FETCH ALL USERS FUNCTION - NOW READS FROM LOCALSTORAGE
  const fetchAllUsers = async () => {
    try {
      const currentToken = token || localStorage.getItem('financeToken');
      
      if (!currentToken) {
        throw new Error('No authentication token found');
      }

      // Try backend API first
      try {
        const response = await fetch('http://localhost:5000/api/admin/users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${currentToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const users = await response.json();
          console.log('Fetched users from backend:', users.length);
          return { success: true, users };
        } else if (response.status === 403) {
          throw new Error('Access denied - Admin privileges required');
        } else {
          throw new Error('Failed to fetch users from backend');
        }
      } catch (apiError) {
        console.log('Backend not available, using mock users and localStorage users');

        // Mock users data for development
        const mockUsers = [
          {
            id: '1',
            name: 'System Administrator',
            email: 'admin@finance.com',
            role: 'admin',
            createdAt: new Date().toISOString()
          },
          {
            id: '2',
            name: 'Regular User',
            email: 'user@finance.com',
            role: 'user',
            createdAt: new Date().toISOString()
          },
          {
            id: '3',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'user',
            createdAt: new Date().toISOString()
          }
        ];

        // ✅ FIX: Get registered users from localStorage
        const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        console.log('Found registered users in localStorage:', storedUsers.length);
        
        // Combine mock users and registered users, remove duplicates by email
        const allUsers = [...mockUsers];
        storedUsers.forEach(storedUser => {
          if (!allUsers.some(user => user.email === storedUser.email)) {
            allUsers.push({
              id: storedUser.id || `local-${Date.now()}`,
              name: storedUser.name,
              email: storedUser.email,
              role: storedUser.role || 'user',
              createdAt: storedUser.createdAt || new Date().toISOString()
            });
          }
        });

        console.log('📊 Total users for admin panel:', allUsers.length);
        return { success: true, users: allUsers };
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      return { success: false, message: error.message };
    }
  };

  const promoteToAdmin = async (userId) => {
    try {
      const currentToken = token || localStorage.getItem('financeToken');
      
      if (!currentToken) {
        throw new Error('No authentication token found');
      }

      // Try backend API first
      try {
        const response = await fetch(`http://localhost:5000/api/admin/users/${userId}/promote`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${currentToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          console.log('User promoted via backend');
          return { success: true };
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to promote user');
        }
      } catch (apiApiError) {
        // Mock promotion for development
        console.log('Backend not available, using mock promotion');
        
        // ✅ FIX: Also update the user role in localStorage
        const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const updatedUsers = storedUsers.map(user => 
          user.id === userId ? { ...user, role: 'admin' } : user
        );
        localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
        
        return { success: true };
      }
    } catch (error) {
      console.error('Error promoting user:', error);
      return { success: false, message: error.message };
    }
  };

  const value = {
    user,
    token,
    isAdmin,
    login,
    logout,
    signup,
    fetchAllUsers,
    promoteToAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}