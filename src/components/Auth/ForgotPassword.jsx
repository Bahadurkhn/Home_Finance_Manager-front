// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { useAuth } from '../../context/AuthContext'
// import { motion } from 'framer-motion'
// import { Mail, ArrowLeft } from 'lucide-react'
// import './ForgotPassword.css'

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('')
//   const [message, setMessage] = useState('')
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)
  
//   const { resetPassword } = useAuth()

//   const handleSubmit = async (e) => {
//     e.preventDefault()
    
//     if (!email) {
//       setError('Please enter your email address')
//       return
//     }

//     try {
//       setError('')
//       setMessage('')
//       setLoading(true)
//       const success = resetPassword(email)
//       if (success) {
//         setMessage('Check your email for password reset instructions')
//       }
//     } catch (error) {
//       setError('Failed to reset password. Please try again.')
//     }
//     setLoading(false)
//   }

//   return (
//     <motion.div 
//       className="auth-container"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <motion.div 
//         className="auth-card"
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.5, delay: 0.1 }}
//       >
//         <div className="auth-header">
//           <h2>Reset Password</h2>
//           <p>We'll send you instructions to reset your password</p>
//         </div>
        
//         {error && (
//           <motion.div 
//             className="error-message"
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             {error}
//           </motion.div>
//         )}
        
//         {message && (
//           <motion.div 
//             className="success-message"
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             {message}
//           </motion.div>
//         )}
        
//         <form onSubmit={handleSubmit} className="auth-form">
//           <div className="form-group">
//             <label>Email Address</label>
//             <div className="input-container">
//               <Mail className="input-icon" />
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email address"
//                 required
//               />
//             </div>
//           </div>
          
//           <motion.button 
//             type="submit" 
//             className="auth-button"
//             disabled={loading}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             {loading ? 'Sending...' : 'Reset Password'}
//           </motion.button>
//         </form>
        
//         <div className="auth-footer">
//           <Link to="/login" className="auth-link back-link">
//             <ArrowLeft size={16} />
//             Back to Login
//           </Link>
//         </div>
//       </motion.div>
//     </motion.div>
//   )
// }

// export default ForgotPassword

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft } from 'lucide-react'
import './ForgotPassword.css'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { resetPassword } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) {
      setError('Please enter your email address')
      return
    }

    try {
      setError('')
      setMessage('')
      setLoading(true)
      
      const result = await resetPassword(email)
      
      if (result.success) {
        setMessage(result.message)
      } else {
        setError(result.message)
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div 
      className="auth-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="auth-card"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="auth-header">
          <h2>Reset Password</h2>
          <p>We'll send you instructions to reset your password</p>
        </div>
        
        {error && (
          <motion.div 
            className="error-message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}
        
        {message && (
          <motion.div 
            className="success-message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {message}
          </motion.div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-container">
              <Mail className="input-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          
          <motion.button 
            type="submit" 
            className="auth-button"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Sending...' : 'Reset Password'}
          </motion.button>
        </form>
        
        <div className="auth-footer">
          <Link to="/login" className="auth-link back-link">
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ForgotPassword