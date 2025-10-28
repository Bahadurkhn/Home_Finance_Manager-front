// import React, { useState } from 'react'
// import { motion } from 'framer-motion'
// // import { useFinance } from '../../context/AuthContext'
// import { useFinance } from '../../context/FinanceContext'
// import { fadeInUp, staggerChildren } from '../../utils/animations'
// import AnimatedCard from '../../components/AnimatedCard/AnimatedCard'
// // import { SavingsProgressChart } from '../../components/FinancialCharts/FinancialCharts'
// import { SavingsProgressChart} from "../../components/FinancialCharts/FinancialCharts"
// import { Target, PiggyBank, TrendingUp, Calendar, DollarSign } from 'lucide-react'
// import './Savings.css'

// export const Savings = () => {
//   const { financeData, updateSavingsGoal } = useFinance()
//   const [savingsGoal, setSavingsGoal] = useState(financeData.savingsGoal)

//   const totalExpenses = financeData.expenses.reduce((sum, expense) => sum + expense.amount, 0)
//   const actualSavings = financeData.monthlyIncome - totalExpenses
//   const goalProgress = financeData.savingsGoal > 0 
//     ? (actualSavings / financeData.savingsGoal) * 100 
//     : 0

//   const handleGoalUpdate = () => {
//     updateSavingsGoal(savingsGoal)
//   }

//   const getSavingsMessage = () => {
//     if (actualSavings >= financeData.savingsGoal && financeData.savingsGoal > 0) {
//       return "🎉 Excellent! You've reached your savings goal!"
//     } else if (actualSavings >= financeData.savingsGoal * 0.75) {
//       return "👍 Great progress! You're almost there!"
//     } else if (actualSavings >= financeData.savingsGoal * 0.5) {
//       return "💪 Good work! Keep going!"
//     } else if (actualSavings >= financeData.savingsGoal * 0.25) {
//       return "📈 You're on track! Every bit counts."
//     } else {
//       return "🎯 Set a savings goal to start tracking your progress!"
//     }
//   }

//   const getMonthlySavingsRate = () => {
//     return financeData.monthlyIncome > 0 
//       ? ((actualSavings / financeData.monthlyIncome) * 100)
//       : 0
//   }

//   return (
//     <motion.div 
//       className="savings-page"
//       initial="initial"
//       animate="animate"
//       variants={staggerChildren}
//     >
//       <motion.div className="savings-header" variants={fadeInUp}>
//         <h1>Savings Tracker</h1>
//         <p>Monitor your progress towards financial goals</p>
//       </motion.div>

//       <div className="savings-overview">
//         <AnimatedCard className="savings-goal-card" variants={fadeInUp}>
//           <div className="goal-header">
//             <Target className="goal-icon" />
//             <div>
//               <h3>Monthly Savings Goal</h3>
//               <p>Set how much you want to save each month</p>
//             </div>
//           </div>
//           <div className="goal-input-section">
//             <div className="input-group">
//               <DollarSign className="currency-icon" />
//               <input
//                 type="number"
//                 value={savingsGoal || ''}
//                 onChange={(e) => setSavingsGoal(e.target.value)}
//                 placeholder="0.00"
//                 step="0.01"
//                 min="0"
//               />
//             </div>
//             <motion.button 
//               onClick={handleGoalUpdate} 
//               className="update-btn"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Update Goal
//             </motion.button>
//           </div>
//         </AnimatedCard>

//         <AnimatedCard className="savings-progress-card" variants={fadeInUp}>
//           <div className="progress-header">
//             <PiggyBank className="progress-icon" />
//             <div>
//               <h3>Current Progress</h3>
//               <p>{getSavingsMessage()}</p>
//             </div>
//           </div>
//           <div className="progress-visualization">
//             <SavingsProgressChart 
//               current={actualSavings} 
//               goal={financeData.savingsGoal} 
//             />
//           </div>
//           <div className="progress-details">
//             <div className="detail">
//               <span>Actual Savings:</span>
//               <span className="amount">${actualSavings.toFixed(2)}</span>
//             </div>
//             <div className="detail">
//               <span>Savings Goal:</span>
//               <span className="amount">${financeData.savingsGoal.toFixed(2)}</span>
//             </div>
//             <div className="detail">
//               <span>Remaining:</span>
//               <span className="amount">
//                 ${Math.max(0, financeData.savingsGoal - actualSavings).toFixed(2)}
//               </span>
//             </div>
//           </div>
//         </AnimatedCard>
//       </div>

//       <div className="savings-insights">
//         <AnimatedCard className="insights-card" variants={fadeInUp}>
//           <h3>Savings Insights</h3>
//           <div className="insights-grid">
//             <div className="insight-item">
//               <TrendingUp className="insight-icon" />
//               <div>
//                 <span className="label">Monthly Savings Rate</span>
//                 <span className="value">
//                   {getMonthlySavingsRate().toFixed(1)}%
//                 </span>
//               </div>
//             </div>
//             <div className="insight-item">
//               <Calendar className="insight-icon" />
//               <div>
//                 <span className="label">Projected Annual Savings</span>
//                 <span className="value">${(actualSavings * 12).toFixed(2)}</span>
//               </div>
//             </div>
//             <div className="insight-item">
//               <Target className="insight-icon" />
//               <div>
//                 <span className="label">Goal Timeline</span>
//                 <span className="value">
//                   {financeData.savingsGoal > 0 && actualSavings > 0
//                     ? `${Math.ceil(financeData.savingsGoal / actualSavings)} months`
//                     : 'N/A'
//                   }
//                 </span>
//               </div>
//             </div>
//           </div>
//         </AnimatedCard>
//       </div>

//       {/* Savings Tips */}
//       <AnimatedCard className="savings-tips" variants={fadeInUp}>
//         <h3>💡 Smart Savings Tips</h3>
//         <div className="tips-grid">
//           <div className="tip-card">
//             <div className="tip-header">
//               <DollarSign className="tip-icon" />
//               <h4>Pay Yourself First</h4>
//             </div>
//             <p>Transfer savings immediately when you receive income before spending on anything else.</p>
//           </div>
//           <div className="tip-card">
//             <div className="tip-header">
//               <TrendingUp className="tip-icon" />
//               <h4>Automate Savings</h4>
//             </div>
//             <p>Set up automatic transfers to your savings account to build wealth consistently.</p>
//           </div>
//           <div className="tip-card">
//             <div className="tip-header">
//               <PiggyBank className="tip-icon" />
//               <h4>Round-Up Transactions</h4>
//             </div>
//             <p>Save the change from your everyday purchases by rounding up to the nearest dollar.</p>
//           </div>
//           <div className="tip-card">
//             <div className="tip-header">
//               <Target className="tip-icon" />
//               <h4>Review Subscriptions</h4>
//             </div>
//             <p>Cancel unused subscriptions and redirect that money to your savings goals.</p>
//           </div>
//         </div>
//       </AnimatedCard>
//     </motion.div>
//   )
// }

// export default Savings


import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useFinance } from '../../context/FinanceContext'
import { fadeInUp, staggerChildren } from '../../utils/animations'
// import AnimatedCard from '../AnimatedCard'
import AnimatedCard from "../../components/AnimatedCard/AnimatedCard"
import { Target, PiggyBank, TrendingUp, Calendar, DollarSign } from 'lucide-react'
import './Savings.css'

// Simple chart component - add this at the top of your file
const SimpleSavingsChart = ({ current, goal }) => {
  const percentage = goal > 0 ? (current / goal) * 100 : 0
  
  return (
    <div className="simple-savings-chart">
      <div className="progress-circle">
        <div 
          className="circle"
          style={{
            background: `conic-gradient(#4ECDC4 ${percentage}%, #e0e0e0 0)`
          }}
        >
          <div className="circle-inner">
            <span className="percentage">{percentage.toFixed(1)}%</span>
            <span className="label">Achieved</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Savings = () => {
  const { financeData, updateSavingsGoal } = useFinance()
  const [savingsGoal, setSavingsGoal] = useState(financeData.savingsGoal)

  const totalExpenses = financeData.expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const actualSavings = financeData.monthlyIncome - totalExpenses
  const goalProgress = financeData.savingsGoal > 0 
    ? (actualSavings / financeData.savingsGoal) * 100 
    : 0

  const handleGoalUpdate = () => {
    updateSavingsGoal(savingsGoal)
  }

  const getSavingsMessage = () => {
    if (actualSavings >= financeData.savingsGoal && financeData.savingsGoal > 0) {
      return "🎉 Excellent! You've reached your savings goal!"
    } else if (actualSavings >= financeData.savingsGoal * 0.75) {
      return "👍 Great progress! You're almost there!"
    } else if (actualSavings >= financeData.savingsGoal * 0.5) {
      return "💪 Good work! Keep going!"
    } else if (actualSavings >= financeData.savingsGoal * 0.25) {
      return "📈 You're on track! Every bit counts."
    } else {
      return "🎯 Set a savings goal to start tracking your progress!"
    }
  }

  const getMonthlySavingsRate = () => {
    return financeData.monthlyIncome > 0 
      ? ((actualSavings / financeData.monthlyIncome) * 100)
      : 0
  }

  return (
    <motion.div 
      className="savings-page"
      initial="initial"
      animate="animate"
      variants={staggerChildren}
    >
      <motion.div className="savings-header" variants={fadeInUp}>
        <h1>Savings Tracker</h1>
        <p>Monitor your progress towards financial goals</p>
      </motion.div>

      <div className="savings-overview">
        <AnimatedCard className="savings-goal-card" variants={fadeInUp}>
          <div className="goal-header">
            <Target className="goal-icon" />
            <div>
              <h3>Monthly Savings Goal</h3>
              <p>Set how much you want to save each month</p>
            </div>
          </div>
          <div className="goal-input-section">
            <div className="input-group">
              <DollarSign className="currency-icon" />
              <input
                type="number"
                value={savingsGoal || ''}
                onChange={(e) => setSavingsGoal(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>
            <motion.button 
              onClick={handleGoalUpdate} 
              className="update-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Update Goal
            </motion.button>
          </div>
        </AnimatedCard>

        <AnimatedCard className="savings-progress-card" variants={fadeInUp}>
          <div className="progress-header">
            <PiggyBank className="progress-icon" />
            <div>
              <h3>Current Progress</h3>
              <p>{getSavingsMessage()}</p>
            </div>
          </div>
          <div className="progress-visualization">
            {/* Use the simple chart instead of SavingsProgressChart */}
            <SimpleSavingsChart 
              current={actualSavings} 
              goal={financeData.savingsGoal} 
            />
          </div>
          <div className="progress-details">
            <div className="detail">
              <span>Actual Savings:</span>
              <span className="amount">${actualSavings.toFixed(2)}</span>
            </div>
            <div className="detail">
              <span>Savings Goal:</span>
              <span className="amount">${financeData.savingsGoal.toFixed(2)}</span>
            </div>
            <div className="detail">
              <span>Remaining:</span>
              <span className="amount">
                ${Math.max(0, financeData.savingsGoal - actualSavings).toFixed(2)}
              </span>
            </div>
          </div>
        </AnimatedCard>
      </div>

      {/* ... rest of your component remains the same ... */}
    </motion.div>
  )
}

export default Savings