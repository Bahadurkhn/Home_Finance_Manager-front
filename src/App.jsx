// import React from 'react'
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
// import { AuthProvider, useAuth } from './context/AuthContext'
// import { FinanceProvider } from './context/FinanceContext'
// import Login from './components/Auth/Login'
// // import Signup from './components/Auth/Signup'
// import Signup  from "./components/Auth/Signup"
// import ForgotPassword from './components/Auth/ForgotPassword'
// import Dashboard from './pages/Dashboard/Dashboard'
// import Savings from './pages/Dashboard/Savings'
// import Header from './components/Header/Header'
// import './App.css'

// // Remove AdminLogin and AdminDashboard references or create placeholder components
// const AdminLogin = () => {
//   return (
//     <div style={{ padding: '2rem', textAlign: 'center' }}>
//       <h2>Admin Login</h2>
//       <p>Admin login functionality will be implemented here.</p>
//     </div>
//   )
// }

// const AdminDashboard = () => {
//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2>Admin Dashboard</h2>
//       <p>Admin dashboard functionality will be implemented here.</p>
//     </div>
//   )
// }

// function ProtectedRoute({ children, adminOnly = false }) {
//   const { user, isAdmin } = useAuth()
  
//   if (!user) {
//     return <Navigate to="/login" />
//   }
  
//   if (adminOnly && !isAdmin()) {
//     return <Navigate to="/dashboard" />
//   }
  
//   return children
// }

// function PublicRoute({ children }) {
//   const { user } = useAuth()
  
//   if (user) {
//     return <Navigate to="/dashboard" />
//   }
  
//   return children
// }

// function App() {
//   return (
//     <AuthProvider>
//       <FinanceProvider>
//         <Router>
//           <div className="App">
//             <Routes>
//               {/* Public Routes */}
//               <Route path="/login" element={
//                 <PublicRoute>
//                   <Login />
//                 </PublicRoute>
//               } />
//               <Route path="/signup" element={
//                 <PublicRoute>
//                   <Signup />
//                 </PublicRoute>
//               } />
//               <Route path="/forgot-password" element={
//                 <PublicRoute>
//                   <ForgotPassword />
//                 </PublicRoute>
//               } />
              
//               {/* Admin Routes */}
//               <Route path="/admin/login" element={
//                 <PublicRoute>
//                   <AdminLogin />
//                 </PublicRoute>
//               } />
//               <Route path="/admin/dashboard" element={
//                 <ProtectedRoute adminOnly={true}>
//                   <AdminDashboard />
//                 </ProtectedRoute>
//               } />
              
//               {/* Protected User Routes */}
//               <Route path="/dashboard" element={
//                 <ProtectedRoute>
//                   <>
//                     <Header />
//                     <Dashboard />
//                   </>
//                 </ProtectedRoute>
//               } />
//               <Route path="/savings" element={
//                 <ProtectedRoute>
//                   <>
//                     <Header />
//                     <Savings />
//                   </>
//                 </ProtectedRoute>
//               } />
              
//               {/* Default Route */}
//               <Route path="/" element={<Navigate to="/dashboard" />} />
              
//               {/* 404 Route */}
//               <Route path="*" element={
//                 <div className="not-found">
//                   <h1>404 - Page Not Found</h1>
//                   <p>The page you're looking for doesn't exist.</p>
//                   <a href="/dashboard">Go to Dashboard</a>
//                 </div>
//               } />
//             </Routes>
//           </div>
//         </Router>
//       </FinanceProvider>
//     </AuthProvider>
//   )
// }

// export default App


import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { FinanceProvider } from './context/FinanceContext'
import Login from './components/Auth/Login'
import Signup from "./components/Auth/Signup"
import ForgotPassword from './components/Auth/ForgotPassword'
import Dashboard from './pages/Dashboard/Dashboard'
import Savings from './pages/Dashboard/Savings'
import Header from './components/Header/Header'
import AdminDashboard from './components/admin/AdminDashboard'
import UserManagement from './components/admin/UserManagement'
import './App.css'
import AdminUsers from './components/admin/AdminUsers'

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isAdmin } = useAuth()
  
  if (!user) {
    return <Navigate to="/login" />
  }
  
  if (adminOnly && !isAdmin) {  // Fixed: removed parentheses ()
    return <Navigate to="/dashboard" />
  }
  
  return children
}

function PublicRoute({ children }) {
  const { user } = useAuth()
  
  if (user) {
    return <Navigate to="/dashboard" />
  }
  
  return children
}

function App() {
  return (
    <AuthProvider>
      <FinanceProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />
              <Route path="/signup" element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              } />
              <Route path="/forgot-password" element={
                <PublicRoute>
                  <ForgotPassword />
                </PublicRoute>
              } />
              
              {/* Admin Routes - Updated with real components */}
              <Route path="/admin" element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute adminOnly={true}>
                  <UserManagement />
                </ProtectedRoute>
              } />
              
              {/* Protected User Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <>
                    <Header />
                    <Dashboard />
                  </>
                </ProtectedRoute>
              } />
              <Route path="/savings" element={
                <ProtectedRoute>
                  <>
                    <Header />
                    <Savings />
                  </>
                </ProtectedRoute>
              } />
              
              {/* Default Route */}
              <Route path="/" element={<Navigate to="/dashboard" />} />

              <Route path="/admin/users" element={
  <ProtectedRoute adminOnly={true}>
    <AdminUsers />
  </ProtectedRoute>
} />
              
              {/* 404 Route */}
              <Route path="*" element={
                <div className="not-found">
                  <h1>404 - Page Not Found</h1>
                  <p>The page you're looking for doesn't exist.</p>
                  <a href="/dashboard">Go to Dashboard</a>
                </div>
              } />
            </Routes>
          </div>
        </Router>
      </FinanceProvider>
    </AuthProvider>
  )
}

export default App