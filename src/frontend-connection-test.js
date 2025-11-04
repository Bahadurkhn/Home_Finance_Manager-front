// frontend-connection-test.js
console.log('🔌 Testing frontend connection to backend...');

// Test if global socket functions are available
console.log('notifyUserLogin available:', typeof window.notifyUserLogin);
console.log('notifyUserLogout available:', typeof window.notifyUserLogout);

// Test if socket is connected
if (window.socket) {
  console.log('Socket connected:', window.socket.connected);
  console.log('Socket ID:', window.socket.id);
} else {
  console.log('❌ Socket not found - frontend not connected to backend');
}

// Manual test - simulate a user login
console.log('🎯 Testing manual user login notification...');
if (window.notifyUserLogin) {
  window.notifyUserLogin({
    id: 'test-user-123',
    email: 'test@example.com',
    name: 'Test User',
    loginTime: new Date().toLocaleString()
  });
  console.log('✅ Test notification sent to admin panel!');
} else {
  console.log('❌ Cannot send test - notifyUserLogin not available');
}
