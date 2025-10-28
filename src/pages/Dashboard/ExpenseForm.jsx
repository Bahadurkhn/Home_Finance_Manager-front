// import React, { useState } from 'react'
// import { useFinance } from '../../context/FinanceContext' // ✅ Correct import path
// import { motion } from 'framer-motion'
// import { Plus, DollarSign, Tag, FileText } from 'lucide-react'
// import './ExpenseForm.css'

// const ExpenseForm = () => {
//   const { financeData, addExpense } = useFinance()
//   const [formData, setFormData] = useState({
//     description: '',
//     amount: '',
//     category: 'Food'
//   })
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
    
//     if (!formData.description || !formData.amount) {
//       alert('Please fill in all fields')
//       return
//     }

//     if (parseFloat(formData.amount) <= 0) {
//       alert('Please enter a valid amount')
//       return
//     }

//     try {
//       setIsSubmitting(true)
//       addExpense(formData)
//       setFormData({
//         description: '',
//         amount: '',
//         category: 'Food'
//       })
//     } catch (error) {
//       alert('Failed to add expense. Please try again.')
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   return (
//     <motion.div 
//       className="expense-form"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//     >
//       <h3>Add New Expense</h3>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Description</label>
//           <div className="input-container">
//             <FileText className="input-icon" />
//             <input
//               type="text"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="What did you spend on?"
//               required
//             />
//           </div>
//         </div>

//         <div className="form-group">
//           <label>Amount ($)</label>
//           <div className="input-container">
//             <DollarSign className="input-icon" />
//             <input
//               type="number"
//               name="amount"
//               value={formData.amount}
//               onChange={handleChange}
//               placeholder="0.00"
//               step="0.01"
//               min="0.01"
//               required
//             />
//           </div>
//         </div>

//         <div className="form-group">
//           <label>Category</label>
//           <div className="input-container">
//             <Tag className="input-icon" />
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               required
//             >
//               {financeData.categories.map(category => (
//                 <option key={category.id} value={category.name}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <motion.button 
//           type="submit" 
//           className="add-expense-btn"
//           disabled={isSubmitting}
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//         >
//           <Plus size={18} />
//           {isSubmitting ? 'Adding...' : 'Add Expense'}
//         </motion.button>
//       </form>
//     </motion.div>
//   )
// }

// export default ExpenseForm




import React, { useState } from 'react'
import { useFinance } from '../../context/FinanceContext'
import { motion } from 'framer-motion'
import { Plus, DollarSign, Tag, FileText } from 'lucide-react'
import './ExpenseForm.css'

const ExpenseForm = () => {
  const { financeData, addExpense } = useFinance()
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.description || !formData.amount) {
      alert('Please fill in all fields')
      return
    }

    if (parseFloat(formData.amount) <= 0) {
      alert('Please enter a valid amount')
      return
    }

    try {
      setIsSubmitting(true)
      const result = await addExpense(formData)
      if (result.success) {
        setFormData({
          description: '',
          amount: '',
          category: 'Food'
        })
      } else {
        alert(result.message || 'Failed to add expense')
      }
    } catch (error) {
      alert('Failed to add expense. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Ensure categories exist and have unique keys
  const categories = financeData?.categories || []

  return (
    <motion.div 
      className="expense-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3>Add New Expense</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Description</label>
          <div className="input-container">
            <FileText className="input-icon" />
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="What did you spend on?"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Amount ($)</label>
          <div className="input-container">
            <DollarSign className="input-icon" />
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0.01"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Category</label>
          <div className="input-container">
            <Tag className="input-icon" />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {categories.map(category => (
                <option 
                  key={category._id || category.name} // ✅ Fallback to name if _id is missing
                  value={category.name}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <motion.button 
          type="submit" 
          className="add-expense-btn"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus size={18} />
          {isSubmitting ? 'Adding...' : 'Add Expense'}
        </motion.button>
      </form>
    </motion.div>
  )
}

export default ExpenseForm