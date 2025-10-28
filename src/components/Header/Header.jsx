// import React from 'react'
// import { Link, useNavigate, useLocation } from 'react-router-dom'
// import { useAuth } from '../../context/AuthContext'
// import { useFinance } from '../../context/FinanceContext'
// import { motion } from 'framer-motion'
// import { Wallet, LogOut, User } from 'lucide-react'
// import './Header.css'

// const Header = () => {
//   const { user, logout } = useAuth()
//   const navigate = useNavigate()
//   const location = useLocation()

//   const handleLogout = () => {
//     logout()
//     navigate('/login')
//   }

//   if (!user) return null

//   const isActive = (path) => location.pathname === path

//   return (
//     <motion.header 
//       className="header"
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="header-container">
//         <Link to="/dashboard" className="logo">
//           <Wallet className="logo-icon" />
//           <span>FinanceManager</span>
//         </Link>
        
//         <nav className="nav">
//           <Link 
//             to="/dashboard" 
//             className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
//           >
//             Dashboard
//           </Link>
//           <Link 
//             to="/savings" 
//             className={`nav-link ${isActive('/savings') ? 'active' : ''}`}
//           >
//             Savings
//           </Link>
//         </nav>
        
//         <div className="user-section">
//           <div className="user-info">
//             <User size={16} />
//             <span>Hello, {user.name}</span>
//           </div>
//           <motion.button 
//             onClick={handleLogout} 
//             className="logout-btn"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <LogOut size={16} />
//             Logout
//           </motion.button>
//         </div>
//       </div>
//     </motion.header>
//   )
// }

// export default Header

import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useFinance } from '../../context/FinanceContext'
import { motion } from 'framer-motion'
import { Wallet, LogOut, User, RefreshCw } from 'lucide-react'
import './Header.css'

const Header = () => {
  const { user, logout } = useAuth()
  const { resetUserData } = useFinance()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all your financial data? This action cannot be undone.')) {
      resetUserData()
      alert('Your financial data has been reset successfully!')
    }
  }

  if (!user) return null

  const isActive = (path) => location.pathname === path

  return (
    <motion.header 
      className="header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header-container">
        <Link to="/dashboard" className="logo">
          <Wallet className="logo-icon" />
          <span>FinanceManager</span>
        </Link>
        
        <nav className="nav">
          <Link 
            to="/dashboard" 
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/savings" 
            className={`nav-link ${isActive('/savings') ? 'active' : ''}`}
          >
            Savings
          </Link>
        </nav>
        
        <div className="user-section">
          <div className="user-info">
            <User size={16} />
            <span>Hello, {user.name}</span>
          </div>
          
          <motion.button 
            onClick={handleResetData} 
            className="reset-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Reset all data"
          >
            <RefreshCw size={16} />
          </motion.button>
          
          <motion.button 
            onClick={handleLogout} 
            className="logout-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut size={16} />
            Logout
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}

export default Header