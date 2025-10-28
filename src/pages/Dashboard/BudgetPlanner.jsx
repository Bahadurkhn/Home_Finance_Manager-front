// import React, { useState } from 'react'
// import { motion } from 'framer-motion'
// import { useFinance } from '../../context/FinanceContext' // ✅ CORRECTED IMPORT
// import { fadeInUp, staggerChildren } from '../../utils/animations'
// import AnimatedCard from '../../components/AnimatedCard/AnimatedCard'
// import { Plus, Settings, Target, AlertTriangle } from 'lucide-react'
// import './BudgetPlanner.css'

// const BudgetPlanner = () => {
//   const { financeData, updateCategoryLimit, addCategory } = useFinance()
//   const [newCategory, setNewCategory] = useState('')
//   const [newCategoryLimit, setNewCategoryLimit] = useState('')

//   const handleAddCategory = (e) => {
//     e.preventDefault()
//     if (newCategory.trim()) {
//       addCategory(newCategory.trim(), newCategoryLimit)
//       setNewCategory('')
//       setNewCategoryLimit('')
//     }
//   }

//   const totalBudget = financeData.categories.reduce((sum, cat) => sum + cat.limit, 0)
//   const budgetUtilization = financeData.monthlyIncome > 0 
//     ? (totalBudget / financeData.monthlyIncome) * 100 
//     : 0

//   const overspendingCategories = financeData.categories.filter(
//     cat => cat.limit > 0 && cat.spent > cat.limit
//   )

//   return (
//     <motion.div 
//       className="budget-planner"
//       initial="initial"
//       animate="animate"
//       variants={staggerChildren}
//     >
//       <motion.div className="budget-header" variants={fadeInUp}>
//         <h1>Budget Planner</h1>
//         <p>Set spending limits and track your budget</p>
//       </motion.div>

//       {/* Budget Overview */}
//       <div className="budget-overview">
//         <AnimatedCard className="overview-card">
//           <div className="overview-header">
//             <Target className="overview-icon" />
//             <h3>Budget Overview</h3>
//           </div>
//           <div className="overview-stats">
//             <div className="stat">
//               <span className="label">Monthly Income</span>
//               <span className="value">${financeData.monthlyIncome.toLocaleString()}</span>
//             </div>
//             <div className="stat">
//               <span className="label">Total Budget Allocated</span>
//               <span className="value">${totalBudget.toLocaleString()}</span>
//             </div>
//             <div className="stat">
//               <span className="label">Budget Utilization</span>
//               <span className="value">{budgetUtilization.toFixed(1)}%</span>
//             </div>
//           </div>
//           {budgetUtilization > 100 && (
//             <div className="budget-warning">
//               <AlertTriangle size={16} />
//               <span>You've allocated more than your monthly income</span>
//             </div>
//           )}
//         </AnimatedCard>
//       </div>

//       {/* Overspending Alerts */}
//       {overspendingCategories.length > 0 && (
//         <motion.div className="overspending-alerts" variants={fadeInUp}>
//           <h3>Overspending Alerts</h3>
//           <div className="alerts-grid">
//             {overspendingCategories.map((category, index) => (
//               <AnimatedCard
//                 key={category.id}
//                 animation="scaleIn"
//                 delay={index * 0.1}
//                 className="overspending-card"
//               >
//                 <div className="alert-header">
//                   <div 
//                     className="category-color"
//                     style={{ backgroundColor: category.color }}
//                   ></div>
//                   <h4>{category.name}</h4>
//                   <AlertTriangle className="alert-icon" />
//                 </div>
//                 <div className="alert-details">
//                   <span>Spent: ${category.spent.toFixed(2)}</span>
//                   <span>Limit: ${category.limit.toFixed(2)}</span>
//                   <span className="overspent">
//                     Overspent: ${(category.spent - category.limit).toFixed(2)}
//                   </span>
//                 </div>
//               </AnimatedCard>
//             ))}
//           </div>
//         </motion.div>
//       )}

//       {/* Add New Category */}
//       <AnimatedCard className="add-category-form" variants={fadeInUp}>
//         <h3>Add New Category</h3>
//         <form onSubmit={handleAddCategory}>
//           <div className="form-row">
//             <input
//               type="text"
//               placeholder="Category name (e.g., Travel, Gym)"
//               value={newCategory}
//               onChange={(e) => setNewCategory(e.target.value)}
//               required
//             />
//             <input
//               type="number"
//               placeholder="Monthly limit"
//               value={newCategoryLimit}
//               onChange={(e) => setNewCategoryLimit(e.target.value)}
//               step="0.01"
//               min="0"
//             />
//             <motion.button 
//               type="submit" 
//               className="add-btn"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Plus size={16} />
//               Add
//             </motion.button>
//           </div>
//         </form>
//       </AnimatedCard>

//       {/* Categories Grid */}
//       <motion.div className="categories-section" variants={fadeInUp}>
//         <h3>Budget Categories</h3>
//         <div className="categories-grid">
//           {financeData.categories.map((category, index) => (
//             <AnimatedCard
//               key={category.id}
//               animation="fadeInUp"
//               delay={index * 0.1}
//               className="category-budget-card"
//             >
//               <div className="category-header">
//                 <div 
//                   className="category-color"
//                   style={{ backgroundColor: category.color }}
//                 ></div>
//                 <h4>{category.name}</h4>
//                 <Settings className="settings-icon" />
//               </div>
              
//               <div className="budget-inputs">
//                 <div className="input-group">
//                   <label>Monthly Limit ($)</label>
//                   <input
//                     type="number"
//                     value={category.limit || ''}
//                     onChange={(e) => updateCategoryLimit(category.id, e.target.value)}
//                     placeholder="0.00"
//                     step="0.01"
//                     min="0"
//                   />
//                 </div>
                
//                 <div className="spent-amount">
//                   <span>Spent this month:</span>
//                   <span className="amount">${category.spent.toFixed(2)}</span>
//                 </div>
//               </div>

//               {category.limit > 0 && (
//                 <div className="progress-section">
//                   <div className="progress-bar">
//                     <div 
//                       className="progress-fill"
//                       style={{
//                         width: `${Math.min((category.spent / category.limit) * 100, 100)}%`,
//                         backgroundColor: category.spent > category.limit ? '#ff6b6b' : '#4ECDC4'
//                       }}
//                     ></div>
//                   </div>
//                   <div className="progress-text">
//                     <span>{((category.spent / category.limit) * 100).toFixed(1)}%</span>
//                     <span>
//                       ${Math.max(0, category.limit - category.spent).toFixed(2)} remaining
//                     </span>
//                   </div>
//                 </div>
//               )}
//             </AnimatedCard>
//           ))}
//         </div>
//       </motion.div>
//     </motion.div>
//   )
// }

// export default BudgetPlanner




import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useFinance } from '../../context/FinanceContext'
import { fadeInUp, staggerChildren } from '../../utils/animations'
import AnimatedCard from '../../components/AnimatedCard/AnimatedCard'
import { Plus, Settings, Target, AlertTriangle, Globe } from 'lucide-react'
import './BudgetPlanner.css'

// Currency configuration
const CURRENCIES = {
  USD: { symbol: '$', code: 'USD', name: 'US Dollar', rate: 1 },
  PKR: { symbol: 'Rs', code: 'PKR', name: 'Pakistani Rupee', rate: 280 },
  EUR: { symbol: '€', code: 'EUR', name: 'Euro', rate: 0.85 },
  GBP: { symbol: '£', code: 'GBP', name: 'British Pound', rate: 0.73 },
  SAR: { symbol: '﷼', code: 'SAR', name: 'Saudi Riyal', rate: 3.75 },
  AED: { symbol: 'د.إ', code: 'AED', name: 'UAE Dirham', rate: 3.67 },
  INR: { symbol: '₹', code: 'INR', name: 'Indian Rupee', rate: 83 },
  CNY: { symbol: '¥', code: 'CNY', name: 'Chinese Yuan', rate: 7.23 },
  IRR: { symbol: '﷼', code: 'IRR', name: 'Iranian Rial', rate: 42000 }
}

const BudgetPlanner = () => {
  const { financeData, updateCategoryLimit, addCategory } = useFinance()
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  
  // Refs for form inputs
  const newCategoryRef = useRef()
  const newCategoryLimitRef = useRef()
  const currencySelectorRef = useRef()

  const handleAddCategory = () => {
    const categoryName = newCategoryRef.current?.value?.trim()
    const limitValue = newCategoryLimitRef.current?.value
    
    if (categoryName) {
      // Convert input to USD for storage (base currency)
      const limitInUSD = parseFloat(limitValue || 0) / CURRENCIES[selectedCurrency].rate
      addCategory(categoryName, limitInUSD)
      
      // Clear inputs
      if (newCategoryRef.current) newCategoryRef.current.value = ''
      if (newCategoryLimitRef.current) newCategoryLimitRef.current.value = ''
    }
  }

  // Currency conversion functions
  const convertToCurrency = (amount) => {
    return amount * CURRENCIES[selectedCurrency].rate
  }

  const formatCurrency = (amount) => {
    const convertedAmount = convertToCurrency(amount)
    return `${CURRENCIES[selectedCurrency].symbol}${convertedAmount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`
  }

  const handleCategoryLimitUpdate = (categoryId, inputValue) => {
    // Convert from selected currency to USD for storage
    const limitInUSD = parseFloat(inputValue || 0) / CURRENCIES[selectedCurrency].rate
    updateCategoryLimit(categoryId, limitInUSD)
  }

  const getCategoryLimitInCurrentCurrency = (limit) => {
    return convertToCurrency(limit)
  }

  const handleCurrencyChange = () => {
    const newCurrency = currencySelectorRef.current?.value || 'USD'
    setSelectedCurrency(newCurrency)
  }

  const totalBudget = financeData.categories.reduce((sum, cat) => sum + cat.limit, 0)
  const budgetUtilization = financeData.monthlyIncome > 0 
    ? (totalBudget / financeData.monthlyIncome) * 100 
    : 0

  const overspendingCategories = financeData.categories.filter(
    cat => cat.limit > 0 && cat.spent > cat.limit
  )

  return (
    <motion.div 
      className="budget-planner"
      initial="initial"
      animate="animate"
      variants={staggerChildren}
    >
      {/* Currency Selector */}
      <motion.div className="currency-selector-container" variants={fadeInUp}>
        <AnimatedCard className="currency-selector">
          <div className="selector-header">
            <Globe className="selector-icon" />
            <h3>Currency Settings</h3>
          </div>
          <div className="currency-options">
            <label>Select Currency:</label>
            <select 
              ref={currencySelectorRef}
              value={selectedCurrency}
              onChange={handleCurrencyChange}
              className="currency-dropdown"
            >
              {Object.entries(CURRENCIES).map(([code, currency]) => (
                <option key={code} value={code}>
                  {currency.name} ({currency.symbol})
                </option>
              ))}
            </select>
            <div className="exchange-rate">
              <small>
                1 USD = {CURRENCIES[selectedCurrency].symbol}{CURRENCIES[selectedCurrency].rate.toLocaleString()}
              </small>
            </div>
          </div>
        </AnimatedCard>
      </motion.div>

      <motion.div className="budget-header" variants={fadeInUp}>
        <h1>Budget Planner</h1>
        <p>Set spending limits and track your budget</p>
      </motion.div>

      {/* Budget Overview */}
      <div className="budget-overview">
        <AnimatedCard className="overview-card">
          <div className="overview-header">
            <Target className="overview-icon" />
            <h3>Budget Overview</h3>
          </div>
          <div className="overview-stats">
            <div className="stat">
              <span className="label">Monthly Income</span>
              <span className="value">{formatCurrency(financeData.monthlyIncome)}</span>
            </div>
            <div className="stat">
              <span className="label">Total Budget Allocated</span>
              <span className="value">{formatCurrency(totalBudget)}</span>
            </div>
            <div className="stat">
              <span className="label">Budget Utilization</span>
              <span className="value">{budgetUtilization.toFixed(1)}%</span>
            </div>
          </div>
          {budgetUtilization > 100 && (
            <div className="budget-warning">
              <AlertTriangle size={16} />
              <span>You've allocated more than your monthly income</span>
            </div>
          )}
        </AnimatedCard>
      </div>

      {/* Overspending Alerts */}
      {overspendingCategories.length > 0 && (
        <motion.div className="overspending-alerts" variants={fadeInUp}>
          <h3>Overspending Alerts</h3>
          <div className="alerts-grid">
            {overspendingCategories.map((category, index) => (
              <AnimatedCard
                key={category._id}
                animation="scaleIn"
                delay={index * 0.1}
                className="overspending-card"
              >
                <div className="alert-header">
                  <div 
                    className="category-color"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <h4>{category.name}</h4>
                  <AlertTriangle className="alert-icon" />
                </div>
                <div className="alert-details">
                  <span>Spent: {formatCurrency(category.spent)}</span>
                  <span>Limit: {formatCurrency(category.limit)}</span>
                  <span className="overspent">
                    Overspent: {formatCurrency(category.spent - category.limit)}
                  </span>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </motion.div>
      )}

      {/* Add New Category */}
      <AnimatedCard className="add-category-form" variants={fadeInUp}>
        <h3>Add New Category</h3>
        <div className="form-row">
          <input
            ref={newCategoryRef}
            type="text"
            placeholder="Category name (e.g., Travel, Gym)"
            required
          />
          <div className="currency-input-group">
            <span className="currency-symbol">{CURRENCIES[selectedCurrency].symbol}</span>
            <input
              ref={newCategoryLimitRef}
              type="number"
              placeholder="Monthly limit"
              step="0.01"
              min="0"
            />
          </div>
          <motion.button 
            type="button"
            onClick={handleAddCategory}
            className="add-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={16} />
            Add
          </motion.button>
        </div>
      </AnimatedCard>

      {/* Categories Grid */}
      <motion.div className="categories-section" variants={fadeInUp}>
        <h3>Budget Categories</h3>
        <div className="categories-grid">
          {financeData.categories.map((category, index) => (
            <CategoryBudgetCard
              key={category._id}
              category={category}
              index={index}
              selectedCurrency={selectedCurrency}
              formatCurrency={formatCurrency}
              getCategoryLimitInCurrentCurrency={getCategoryLimitInCurrentCurrency}
              handleCategoryLimitUpdate={handleCategoryLimitUpdate}
              CURRENCIES={CURRENCIES}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

// Separate component for category card to handle individual input refs
const CategoryBudgetCard = ({ 
  category, 
  index, 
  selectedCurrency, 
  formatCurrency, 
  getCategoryLimitInCurrentCurrency, 
  handleCategoryLimitUpdate,
  CURRENCIES 
}) => {
  const limitInputRef = useRef()

  const handleLimitChange = () => {
    const inputValue = limitInputRef.current?.value || ''
    handleCategoryLimitUpdate(category._id, inputValue)
  }

  return (
    <AnimatedCard
      animation="fadeInUp"
      delay={index * 0.1}
      className="category-budget-card"
    >
      <div className="category-header">
        <div 
          className="category-color"
          style={{ backgroundColor: category.color }}
        ></div>
        <h4>{category.name}</h4>
        <Settings className="settings-icon" />
      </div>
      
      <div className="budget-inputs">
        <div className="input-group">
          <label>Monthly Limit ({CURRENCIES[selectedCurrency].symbol})</label>
          <div className="currency-input-group">
            <span className="currency-symbol">{CURRENCIES[selectedCurrency].symbol}</span>
            <input
              ref={limitInputRef}
              type="number"
              defaultValue={getCategoryLimitInCurrentCurrency(category.limit) || ''}
              onBlur={handleLimitChange}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  handleLimitChange()
                }
              }}
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>
        </div>
        
        <div className="spent-amount">
          <span>Spent this month:</span>
          <span className="amount">{formatCurrency(category.spent)}</span>
        </div>
      </div>

      {category.limit > 0 && (
        <div className="progress-section">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{
                width: `${Math.min((category.spent / category.limit) * 100, 100)}%`,
                backgroundColor: category.spent > category.limit ? '#ff6b6b' : '#4ECDC4'
              }}
            ></div>
          </div>
          <div className="progress-text">
            <span>{((category.spent / category.limit) * 100).toFixed(1)}%</span>
            <span>
              {formatCurrency(Math.max(0, category.limit - category.spent))} remaining
            </span>
          </div>
        </div>
      )}
    </AnimatedCard>
  )
}

export default BudgetPlanner