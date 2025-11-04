// connection-check.js - Check if socket functions are available
console.log('🔌 Checking frontend-backend connection...');

setTimeout(() => {
  console.log('notifyUserLogin available:', typeof window.notifyUserLogin);
  console.log('notifyUserLogout available:', typeof window.notifyUserLogout);
  
  if (window.notifyUserLogin) {
    console.log('✅ Global socket functions are available!');
    
    // Auto-test
    window.notifyUserLogin({
      id: 'connection-test',
      email: 'connection@test.com',
      name: 'Connection Test User'
    });
    console.log('✅ Auto-test notification sent!');
  } else {
    console.log('❌ Global socket functions NOT available');
    console.log('Available window properties:', Object.keys(window).filter(key => 
      key.includes('socket') || key.includes('notify') || key.includes('io')
    ));
  }
}, 1000);
