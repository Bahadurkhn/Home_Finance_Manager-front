// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { adminAPI } from '../../services/adminAPI';

// const AdminUsers = () => {
//   const { user: currentUser } = useAuth();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   const loadUsers = async () => {
//   try {
//     setLoading(true);
//     setError('');
    
//     // Use fetchAllUsers from AuthContext instead of hardcoded data
//     const result = await fetchAllUsers();
    
//     if (result.success) {
//       setUsers(result.users);
//       console.log('Loaded users for admin panel:', result.users.length);
//     } else {
//       setError(result.message || 'Failed to load users');
//     }
//   } catch (error) {
//     setError('Error loading users: ' + error.message);
//   } finally {
//     setLoading(false);
//   }
// };
//   const handlePromote = async (userId) => {
//     if (!window.confirm('Are you sure you want to make this user an admin?')) {
//       return;
//     }

//     try {
//       await adminAPI.updateUserStatus(userId, true);
//       await loadUsers();
//       alert('User promoted to admin successfully!');
//     } catch (err) {
//       alert('Failed to promote user: ' + err.message);
//     }
//   };

//   if (loading) {
//     return (
//       <div style={{ padding: '40px', textAlign: 'center' }}>
//         <div style={{ fontSize: '24px', marginBottom: '20px' }}>⏳</div>
//         <h3>Loading Users...</h3>
//         <p>Fetching all registered users from database</p>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
//       {/* Header */}
//       <div style={{ marginBottom: '30px' }}>
//         <h1 style={{ fontSize: '32px', marginBottom: '8px', color: '#2c3e50' }}>
//           👥 User Management
//         </h1>
//         <p style={{ fontSize: '16px', color: '#7f8c8d', marginBottom: '20px' }}>
//           Admin Panel - Manage all system users and permissions
//         </p>
        
//         {/* Stats Cards */}
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
//           <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
//             <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{users.length}</div>
//             <div>Total Users</div>
//           </div>
//           <div style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
//             <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
//               {users.filter(u => u.role === 'admin').length}
//             </div>
//             <div>Admin Users</div>
//           </div>
//           <div style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
//             <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
//               {users.filter(u => u.role === 'user').length}
//             </div>
//             <div>Regular Users</div>
//           </div>
//         </div>

//         {error && (
//           <div style={{ 
//             background: '#fee', 
//             color: '#c33', 
//             padding: '15px', 
//             borderRadius: '8px',
//             marginBottom: '20px',
//             border: '1px solid #fcc'
//           }}>
//             <strong>Error:</strong> {error}
//           </div>
//         )}

//         <button 
//           onClick={loadUsers}
//           style={{
//             padding: '12px 24px',
//             background: '#27ae60',
//             color: 'white',
//             border: 'none',
//             borderRadius: '8px',
//             cursor: 'pointer',
//             fontSize: '14px',
//             fontWeight: '600',
//             marginBottom: '20px'
//           }}
//         >
//           🔄 Refresh Users
//         </button>
//       </div>

//       {/* Users Table */}
//       <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
//         <div style={{ padding: '20px', borderBottom: '1px solid #ecf0f1' }}>
//           <h3 style={{ margin: 0, color: '#2c3e50' }}>All System Users</h3>
//         </div>
        
//         {users.length > 0 ? (
//           <div style={{ overflowX: 'auto' }}>
//             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//               <thead>
//                 <tr style={{ background: '#f8f9fa' }}>
//                   <th style={{ padding: '16px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontWeight: '600', color: '#495057' }}>User</th>
//                   <th style={{ padding: '16px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontWeight: '600', color: '#495057' }}>Email</th>
//                   <th style={{ padding: '16px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontWeight: '600', color: '#495057' }}>Role</th>
//                   <th style={{ padding: '16px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontWeight: '600', color: '#495057' }}>Joined</th>
//                   <th style={{ padding: '16px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontWeight: '600', color: '#495057' }}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((user) => (
//                   <tr key={user._id || user.id} style={{ borderBottom: '1px solid #ecf0f1' }}>
//                     <td style={{ padding: '16px' }}>
//                       <div style={{ display: 'flex', alignItems: 'center' }}>
//                         <div style={{ 
//                           width: '44px', 
//                           height: '44px', 
//                           borderRadius: '50%', 
//                           background: user.role === 'admin' ? '#e74c3c' : '#2ecc71',
//                           color: 'white',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           marginRight: '12px',
//                           fontWeight: 'bold',
//                           fontSize: '16px'
//                         }}>
//                           {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
//                         </div>
//                         <div>
//                           <div style={{ fontWeight: '600', color: '#2c3e50' }}>
//                             {user.name || 'Unknown User'}
//                           </div>
//                           {currentUser?.email === user.email && (
//                             <div style={{ fontSize: '12px', color: '#7f8c8d', marginTop: '2px' }}>
//                               👤 Currently logged in
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </td>
//                     <td style={{ padding: '16px', fontFamily: 'monospace', fontSize: '14px', color: '#34495e' }}>
//                       {user.email}
//                     </td>
//                     <td style={{ padding: '16px' }}>
//                       <span 
//                         style={{
//                           padding: '8px 16px',
//                           borderRadius: '20px',
//                           fontSize: '12px',
//                           fontWeight: 'bold',
//                           background: user.role === 'admin' ? '#e74c3c' : '#2ecc71',
//                           color: 'white',
//                           display: 'inline-block',
//                           minWidth: '80px',
//                           textAlign: 'center'
//                         }}
//                       >
//                         {user.role ? user.role.toUpperCase() : 'USER'}
//                       </span>
//                     </td>
//                     <td style={{ padding: '16px', fontSize: '14px', color: '#7f8c8d' }}>
//                       {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
//                         year: 'numeric',
//                         month: 'short',
//                         day: 'numeric'
//                       }) : 'N/A'}
//                     </td>
//                     <td style={{ padding: '16px' }}>
//                       {user.role !== 'admin' && (
//                         <button
//                           onClick={() => handlePromote(user._id || user.id)}
//                           style={{
//                             padding: '8px 16px',
//                             background: '#3498db',
//                             color: 'white',
//                             border: 'none',
//                             borderRadius: '6px',
//                             cursor: 'pointer',
//                             fontSize: '12px',
//                             fontWeight: '600',
//                             transition: 'all 0.2s'
//                           }}
//                           onMouseOver={(e) => e.target.style.background = '#2980b9'}
//                           onMouseOut={(e) => e.target.style.background = '#3498db'}
//                         >
//                           ⬆️ Make Admin
//                         </button>
//                       )}
//                       {user.role === 'admin' && (
//                         <span style={{ 
//                           color: '#e74c3c', 
//                           fontSize: '12px', 
//                           fontWeight: '600',
//                           padding: '8px 12px',
//                           background: '#fadbd8',
//                           borderRadius: '6px'
//                         }}>
//                           🔧 Administrator
//                         </span>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div style={{ padding: '60px 20px', textAlign: 'center', color: '#7f8c8d' }}>
//             <div style={{ fontSize: '64px', marginBottom: '20px' }}>👥</div>
//             <h3 style={{ marginBottom: '16px', color: '#95a5a6' }}>No Users Found</h3>
//             <p>There are no users registered in the system yet.</p>
//             <p style={{ fontSize: '14px', marginTop: '8px' }}>
//               Users will appear here after they register through the signup page.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminUsers;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const AdminUsers = () => {
  const { user: currentUser, fetchAllUsers, promoteToAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('🔄 Loading users using fetchAllUsers...');
      
      const result = await fetchAllUsers();
      console.log('📊 fetchAllUsers result:', result);
      
      if (result.success) {
        setUsers(result.users);
        console.log('✅ SUCCESS: Loaded users for admin panel:', result.users.length);
        console.log('📋 Users:', result.users);
      } else {
        setError(result.message || 'Failed to load users');
        console.error('❌ FAILED to load users:', result.message);
      }
    } catch (error) {
      const errorMsg = 'Error loading users: ' + error.message;
      setError(errorMsg);
      console.error('💥 ERROR in loadUsers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePromote = async (userId) => {
    if (!window.confirm('Are you sure you want to make this user an admin?')) {
      return;
    }

    try {
      console.log(`🔄 Promoting user ${userId}...`);
      const result = await promoteToAdmin(userId);
      
      if (result.success) {
        await loadUsers(); // Refresh the list
        alert('User promoted to admin successfully!');
      } else {
        alert('Failed to promote user: ' + result.message);
      }
    } catch (err) {
      alert('Failed to promote user: ' + err.message);
    }
  };

  // Debug function to check what's actually stored
  const checkLocalStorage = () => {
    console.log('🔍 === DEBUG LOCALSTORAGE ===');
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    console.log('registeredUsers:', registeredUsers);
    console.log('registeredUsers count:', registeredUsers.length);
    
    // Check all localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.includes('user') || key.includes('registered')) {
        console.log(key + ':', localStorage.getItem(key));
      }
    }
    
    alert(`Found ${registeredUsers.length} users in localStorage. Check browser console for details.`);
  };

  // Test the fetchAllUsers function directly
  const testFetchAllUsers = async () => {
    console.log('🧪 Testing fetchAllUsers directly...');
    const result = await fetchAllUsers();
    console.log('🧪 fetchAllUsers test result:', result);
    alert(`fetchAllUsers test: ${result.success ? 'SUCCESS' : 'FAILED'}\nUsers: ${result.users?.length || 0}\nMessage: ${result.message || 'No message'}`);
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div style={{ fontSize: '24px', marginBottom: '20px' }}>⏳</div>
        <h3>Loading Users...</h3>
        <p>Using fetchAllUsers from AuthContext</p>
        <div style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          Checking: localStorage + mock users
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '8px', color: '#2c3e50' }}>
          👥 User Management
        </h1>
        <p style={{ fontSize: '16px', color: '#7f8c8d', marginBottom: '20px' }}>
          Admin Panel - Showing users from localStorage + mock data
        </p>
        
        {/* Debug Info Panel */}
        <div style={{ 
          background: '#f8f9fa', 
          padding: '15px', 
          borderRadius: '8px',
          marginBottom: '20px',
          fontSize: '14px',
          border: '1px solid #e9ecef',
          fontFamily: 'monospace'
        }}>
          <strong>🔧 DEBUG INFORMATION:</strong> 
          <br/>- <strong>Total users loaded:</strong> {users.length}
          <br/>- <strong>In localStorage:</strong> {JSON.parse(localStorage.getItem('registeredUsers') || '[]').length}
          <br/>- <strong>Your role:</strong> {currentUser?.role}
          <br/>- <strong>Your email:</strong> {currentUser?.email}
          <br/>- <strong>Source:</strong> AuthContext.fetchAllUsers()
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{users.length}</div>
            <div>Total Users</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
              {users.filter(u => u.role === 'admin').length}
            </div>
            <div>Admin Users</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
              {users.filter(u => u.role === 'user').length}
            </div>
            <div>Regular Users</div>
          </div>
        </div>

        {error && (
          <div style={{ 
            background: '#fee', 
            color: '#c33', 
            padding: '15px', 
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid #fcc'
          }}>
            <strong>❌ Error:</strong> {error}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <button 
            onClick={loadUsers}
            style={{
              padding: '12px 24px',
              background: '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            🔄 Refresh Users
          </button>

          <button 
            onClick={checkLocalStorage}
            style={{
              padding: '12px 24px',
              background: '#95a5a6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            🔍 Check Storage
          </button>

          <button 
            onClick={testFetchAllUsers}
            style={{
              padding: '12px 24px',
              background: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            🧪 Test Function
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #ecf0f1' }}>
          <h3 style={{ margin: 0, color: '#2c3e50' }}>All System Users</h3>
          <p style={{ margin: '5px 0 0 0', color: '#7f8c8d', fontSize: '14px' }}>
            Combined: Mock users + localStorage registered users
          </p>
        </div>
        
        {users.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '16px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontWeight: '600', color: '#495057' }}>User</th>
                  <th style={{ padding: '16px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontWeight: '600', color: '#495057' }}>Email</th>
                  <th style={{ padding: '16px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontWeight: '600', color: '#495057' }}>Role</th>
                  <th style={{ padding: '16px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontWeight: '600', color: '#495057' }}>Source</th>
                  <th style={{ padding: '16px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontWeight: '600', color: '#495057' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id || user.id || index} style={{ borderBottom: '1px solid #ecf0f1' }}>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ 
                          width: '44px', 
                          height: '44px', 
                          borderRadius: '50%', 
                          background: user.role === 'admin' ? '#e74c3c' : '#2ecc71',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '12px',
                          fontWeight: 'bold',
                          fontSize: '16px'
                        }}>
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <div style={{ fontWeight: '600', color: '#2c3e50' }}>
                            {user.name || 'Unknown User'}
                          </div>
                          {currentUser?.email === user.email && (
                            <div style={{ fontSize: '12px', color: '#7f8c8d', marginTop: '2px' }}>
                              👤 Currently logged in
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px', fontFamily: 'monospace', fontSize: '14px', color: '#34495e' }}>
                      {user.email}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span 
                        style={{
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          background: user.role === 'admin' ? '#e74c3c' : '#2ecc71',
                          color: 'white',
                          display: 'inline-block',
                          minWidth: '80px',
                          textAlign: 'center'
                        }}
                      >
                        {user.role ? user.role.toUpperCase() : 'USER'}
                      </span>
                    </td>
                    <td style={{ padding: '16px', fontSize: '12px', color: '#7f8c8d' }}>
                      {user.email?.includes('finance.com') || user.email?.includes('example.com') ? '🔄 Mock Data' : '💾 Registered User'}
                    </td>
                    <td style={{ padding: '16px' }}>
                      {user.role !== 'admin' && (
                        <button
                          onClick={() => handlePromote(user._id || user.id)}
                          style={{
                            padding: '8px 16px',
                            background: '#3498db',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '600',
                            transition: 'all 0.2s'
                          }}
                          onMouseOver={(e) => e.target.style.background = '#2980b9'}
                          onMouseOut={(e) => e.target.style.background = '#3498db'}
                        >
                          ⬆️ Make Admin
                        </button>
                      )}
                      {user.role === 'admin' && (
                        <span style={{ 
                          color: '#e74c3c', 
                          fontSize: '12px', 
                          fontWeight: '600',
                          padding: '8px 12px',
                          background: '#fadbd8',
                          borderRadius: '6px'
                        }}>
                          🔧 Administrator
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ padding: '60px 20px', textAlign: 'center', color: '#7f8c8d' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>👥</div>
            <h3 style={{ marginBottom: '16px', color: '#95a5a6' }}>No Users Found</h3>
            <p>The fetchAllUsers function returned 0 users.</p>
            <p style={{ fontSize: '14px', marginTop: '8px' }}>
              This means both mock users and localStorage users are empty.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
              <button 
                onClick={checkLocalStorage}
                style={{
                  padding: '12px 24px',
                  background: '#95a5a6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                🔍 Check Storage
              </button>
              <button 
                onClick={testFetchAllUsers}
                style={{
                  padding: '12px 24px',
                  background: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                🧪 Test Function
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;