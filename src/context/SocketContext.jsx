// // contexts/SocketContext.jsx
// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// const SocketContext = createContext();

// export const useSocket = () => {
//   const context = useContext(SocketContext);
//   if (!context) {
//     throw new Error('useSocket must be used within a SocketProvider');
//   }
//   return context;
// };

// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const newSocket = io('http://localhost:5000', {
//       transports: ['websocket', 'polling']
//     });

//     newSocket.on('connect', () => {
//       console.log('✅ Connected to backend via Socket.io');
//     });

//     newSocket.on('connect_error', (error) => {
//       console.error('❌ Socket connection error:', error);
//     });

//     setSocket(newSocket);

//     return () => newSocket.close();
//   }, []);

//   const notifyUserLogin = (userData) => {
//     if (socket?.connected) {
//       socket.emit('userLoggedIn', {
//         id: userData._id || userData.id,
//         email: userData.email,
//         name: userData.name || userData.email.split('@')[0],
//         loginTime: new Date().toLocaleString()
//       });
//     }
//   };

//   const notifyUserLogout = (userData) => {
//     if (socket?.connected) {
//       socket.emit('userLoggedOut', {
//         id: userData._id || userData.id,
//         email: userData.email
//       });
//     }
//   };

//   const value = {
//     socket,
//     notifyUserLogin,
//     notifyUserLogout
//   };

//   return (
//     <SocketContext.Provider value={value}>
//       {children}
//     </SocketContext.Provider>
//   );
// };


// contexts/SocketContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      console.log('✅ Connected to backend via Socket.io');
      console.log('Socket ID:', newSocket.id);
      
      // If user is already logged in, notify immediately
      if (user) {
        notifyUserLogin(user);
      }
    });

    newSocket.on('connect_error', (error) => {
      console.error('❌ Socket connection error:', error);
    });

    newSocket.on('disconnect', () => {
      console.log('🔌 Disconnected from server');
    });

    setSocket(newSocket);

    return () => {
      if (user) {
        notifyUserLogout(user);
      }
      newSocket.close();
    };
  }, []);

  // Notify when user logs in
  useEffect(() => {
    if (socket?.connected && user) {
      notifyUserLogin(user);
    }
  }, [socket, user]);

  const notifyUserLogin = (userData) => {
    if (socket?.connected && userData) {
      console.log('📢 Emitting userLoggedIn for:', userData.email);
      socket.emit('userLoggedIn', {
        id: userData._id || userData.id,
        email: userData.email,
        name: userData.name || userData.email.split('@')[0],
        loginTime: new Date().toLocaleString()
      });
    }
  };

  const notifyUserLogout = (userData) => {
    if (socket?.connected && userData) {
      console.log('📢 Emitting userLoggedOut for:', userData.email);
      socket.emit('userLoggedOut', {
        id: userData._id || userData.id,
        email: userData.email
      });
    }
  };

  const value = {
    socket,
    notifyUserLogin,
    notifyUserLogout
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};