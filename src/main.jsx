import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Global Socket.io connection
import('socket.io-client').then(({ io }) => {
  const socket = io('http://localhost:5000', {
    transports: ['websocket', 'polling']
  });
  
  socket.on('connect', () => {
    console.log('Frontend connected to backend via Socket.io');
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
