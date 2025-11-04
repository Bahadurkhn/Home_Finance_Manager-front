// socket-connection.js - Frontend Socket.io connection
let socket = null;

const initializeSocket = () => {
  import('socket.io-client').then(({ io }) => {
    socket = io('http://localhost:5000');
    
    socket.on('connect', () => {
      console.log('Frontend connected to backend');
    });
  });
};

// Call this when user logs in successfully
export const notifyUserLogin = (userData) => {
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

// Call this when user logs out
export const notifyUserLogout = (userData) => {
  if (socket && socket.connected) {
    socket.emit('userLoggedOut', {
      id: userData._id || userData.id,
      email: userData.email
    });
    console.log('User logout notified to admin');
  }
};

// Initialize socket when this file is imported
initializeSocket();
