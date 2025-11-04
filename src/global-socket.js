// global-socket.js - Global Socket.io functions
let socket = null;

const initializeSocket = () => {
  if (socket) return;
  
  import('socket.io-client').then(({ io }) => {
    socket = io('http://localhost:5000');
    
    socket.on('connect', () => {
      console.log('Frontend connected to backend');
    });
  });
};

// Make functions globally available
window.notifyUserLogin = (userData) => {
  if (!socket) initializeSocket();
  
  if (socket && socket.connected) {
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
  if (socket && socket.connected) {
    socket.emit('userLoggedOut', {
      id: userData._id || userData.id,
      email: userData.email
    });
    console.log('User logout notified to admin');
  }
};

// Initialize socket when this file loads
initializeSocket();
