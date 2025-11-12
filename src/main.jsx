import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Global Socket.io connection
import('socket.io-client').then(({ io }) => {
  // Use the correct port (5174 instead of 5173)
  const socket = io('http://localhost:5000', {
    transports: ['websocket', 'polling']
  });
  
  socket.on('connect', () => {
    console.log('Frontend connected to backend via Socket.io');
  
    // Auto-send userLoggedIn event if user is logged in
    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      if (user && socket) {
        console.log('Auto-sending userLoggedIn for:', user.email);
        socket.emit('userLoggedIn', {
          id: user.id || 'user-' + Date.now(),
          email: user.email,
          name: user.name || user.email.split('@')[0],
          loginTime: new Date().toLocaleString()
        });
      }
    }, 1000);
  });

  socket.on('connect_error', (error) => {
    console.error('Socket connection failed:', error);
  });

  // Make functions globally available
  window.notifyUserLogin = (userData) => {
    if (socket.connected) {
      socket.emit('userLoggedIn', {
        id: userData._id || userData.id,
        email: userData.email,
        name: userData.name || userData.email.split('@')[0],
        loginTime: new Date().toLocaleString()
      });
      console.log('User login notified to admin');
    }
  };

  window.notifyUserLogout = (userData) => {
    if (socket.connected) {
      socket.emit('userLoggedOut', {
        id: userData._id || userData.id,
        email: userData.email
      });
      console.log('User logout notified to admin');
    }
  };

  console.log('Global socket functions ready!');
}).catch(error => {
  console.log('Socket.io client not available:', error);
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)