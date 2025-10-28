// import React, { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// // import { useFinance } from '../../context/AuthContext'
// import { useFinance } from '../../context/FinanceContext'
// import { AIFinancialAdvisor } from '../../utils/aiEngine'
// import { fadeInUp, staggerChildren } from '../../utils/animations'
// import ExpenseForm from './ExpenseForm'
// import BudgetPlanner from './BudgetPlanner'
// import AIAssistant from './AIAssistant'
// import Savings from './Savings'
// import AnimatedCard from '../../components/AnimatedCard/AnimatedCard'
// // import { ExpenseBarChart, BudgetDoughnutChart } from '../Common/FinancialCharts'
// import { DollarSign, TrendingUp, Target, AlertTriangle, PieChart, Brain } from 'lucide-react'
// import './Dashboard.css'
// import { BudgetDoughnutChart, ExpenseBarChart } from '../../components/FinancialCharts/FinancialCharts'

// export const Dashboard = () => {
//   const { financeData, updateMonthlyIncome } = useFinance()
//   const [activeTab, setActiveTab] = useState('overview')
//   const [aiAdvice, setAiAdvice] = useState([])
//   const [overspendingAlerts, setOverspendingAlerts] = useState([])

//   useEffect(() => {
//     const advice = AIFinancialAdvisor.generateFinancialAdvice(financeData)
//     setAiAdvice(advice)
    
//     const alerts = AIFinancialAdvisor.getOverspendingAlerts(financeData.categories)
//     setOverspendingAlerts(alerts)
//   }, [financeData])

//   const totalExpenses = financeData.expenses.reduce((sum, expense) => sum + expense.amount, 0)
//   const remainingBalance = financeData.monthlyIncome - totalExpenses
//   const savingsPercentage = financeData.monthlyIncome > 0 
//     ? (remainingBalance / financeData.monthlyIncome) * 100 
//     : 0

//   const recentExpenses = financeData.expenses.slice(0, 5)

//   const tabs = [
//     { id: 'overview', label: 'Overview', icon: PieChart },
//     { id: 'budget', label: 'Budget', icon: Target },
//     { id: 'ai', label: 'AI Insights', icon: Brain },
//     { id: 'savings', label: 'Savings', icon: TrendingUp }
//   ]

//   return (
//     <motion.div 
//       className="dashboard"
//       initial="initial"
//       animate="animate"
//       variants={staggerChildren}
//     >
//       <div className="dashboard-container">
//         {/* Header Section */}
//         <motion.div className="dashboard-header" variants={fadeInUp}>
//           <div className="header-content">
//             <h1>Financial Dashboard</h1>
//             <p>Take control of your finances with smart insights</p>
//           </div>
//           <div className="income-section">
//             <AnimatedCard className="income-card">
//               <div className="income-input">
//                 <DollarSign className="income-icon" />
//                 <div>
//                   <label>Monthly Income</label>
//                   <input
//                     type="number"
//                     value={financeData.monthlyIncome || ''}
//                     onChange={(e) => updateMonthlyIncome(e.target.value)}
//                     placeholder="0"
//                     min="0"
//                     step="0.01"
//                   />
//                 </div>
//               </div>
//             </AnimatedCard>
//           </div>
//         </motion.div>

        
// {financeData.monthlyIncome === 0 && (
//   <motion.div 
//     className="welcome-banner"
//     initial={{ opacity: 0, scale: 0.9 }}
//     animate={{ opacity: 1, scale: 1 }}
//     transition={{ duration: 0.5 }}
//   >
//     <div className="welcome-content">
//       <h2>👋 Welcome to Your Finance Manager!</h2>
//       <p>Start by setting your monthly income to get personalized insights and budget recommendations.</p>
//       <div className="welcome-tips">
//         <div className="tip">💡 <strong>Set your income</strong> - This helps us create accurate budget plans</div>
//         <div className="tip">📊 <strong>Add expenses</strong> - Track your spending across categories</div>
//         <div className="tip">🎯 <strong>Set budget limits</strong> - Get alerts when you're overspending</div>
//         <div className="tip">🤖 <strong>Get AI insights</strong> - Smart recommendations based on your spending</div>
//       </div>
//     </div>
//   </motion.div>
// )}

//         {/* Overspending Alerts */}
//         <AnimatePresence>
//           {overspendingAlerts.length > 0 && (
//             <motion.div
//               className="alerts-banner"
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//             >
//               <AlertTriangle className="alert-icon" />
//               <div className="alert-content">
//                 <strong>Budget Alerts</strong>
//                 <span>
//                   You're over budget in {overspendingAlerts.map(alert => alert.category).join(', ')}
//                 </span>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Navigation Tabs */}
//         <motion.div className="tab-navigation" variants={fadeInUp}>
//           {tabs.map(tab => {
//             const IconComponent = tab.icon
//             return (
//               <button
//                 key={tab.id}
//                 className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
//                 onClick={() => setActiveTab(tab.id)}
//               >
//                 <IconComponent size={18} />
//                 {tab.label}
//               </button>
//             )
//           })}
//         </motion.div>

//         {/* AI Advice Cards */}
//         {activeTab === 'overview' && aiAdvice.length > 0 && (
//           <motion.div className="ai-advice-grid" variants={fadeInUp}>
//             {aiAdvice.slice(0, 3).map((advice, index) => (
//               <AnimatedCard
//                 key={index}
//                 animation="scaleIn"
//                 delay={index * 0.1}
//                 className={`advice-card ${advice.type}`}
//               >
//                 <div className="advice-header">
//                   <span className="advice-icon">{advice.icon}</span>
//                   <h4>{advice.title}</h4>
//                 </div>
//                 <p>{advice.message}</p>
//               </AnimatedCard>
//             ))}
//           </motion.div>
//         )}

//         {/* Tab Content */}
//         <div className="tab-content">
//           <AnimatePresence mode="wait">
//             {activeTab === 'overview' && (
//               <motion.div
//                 key="overview"
//                 className="overview-content"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//               >
//                 {/* Financial Summary */}
//                 <div className="financial-summary">
//                   <AnimatedCard animation="scaleIn" delay={0.1} className="summary-card income">
//                     <div className="card-header">
//                       <DollarSign className="card-icon" />
//                       <h3>Monthly Income</h3>
//                     </div>
//                     <p className="amount">${financeData.monthlyIncome.toLocaleString()}</p>
//                   </AnimatedCard>

//                   <AnimatedCard animation="scaleIn" delay={0.2} className="summary-card expenses">
//                     <div className="card-header">
//                       <TrendingUp className="card-icon" />
//                       <h3>Total Expenses</h3>
//                     </div>
//                     <p className="amount">${totalExpenses.toLocaleString()}</p>
//                   </AnimatedCard>

//                   <AnimatedCard animation="scaleIn" delay={0.3} className="summary-card balance">
//                     <div className="card-header">
//                       <Target className="card-icon" />
//                       <h3>Remaining</h3>
//                     </div>
//                     <p className="amount">${remainingBalance.toLocaleString()}</p>
//                     <div className="savings-rate">
//                       {savingsPercentage.toFixed(1)}% savings rate
//                     </div>
//                   </AnimatedCard>
//                 </div>

//                 {/* Charts and Forms */}
//                 <div className="main-content-grid">
//                   <div className="charts-section">
//                     <AnimatedCard animation="fadeInUp" delay={0.4} className="chart-card">
//                       <h3>Monthly Expenses</h3>
//                       <ExpenseBarChart expenses={financeData.expenses} />
//                     </AnimatedCard>

//                     <AnimatedCard animation="fadeInUp" delay={0.5} className="chart-card">
//                       <h3>Budget Allocation</h3>
//                       <BudgetDoughnutChart categories={financeData.categories} />
//                     </AnimatedCard>
//                   </div>

//                   <div className="sidebar-section">
//                     <AnimatedCard animation="fadeInUp" delay={0.6} className="expense-form-card">
//                       <ExpenseForm />
//                     </AnimatedCard>

//                     <AnimatedCard animation="fadeInUp" delay={0.7} className="recent-expenses-card">
//                       <h3>Recent Expenses</h3>
//                       {recentExpenses.length > 0 ? (
//                         <div className="expenses-list">
//                           {recentExpenses.map(expense => (
//                             <div key={expense.id} className="expense-item">
//                               <div className="expense-info">
//                                 <span className="description">{expense.description}</span>
//                                 <span className="category">{expense.category}</span>
//                               </div>
//                               <span className="amount">-${expense.amount.toFixed(2)}</span>
//                             </div>
//                           ))}
//                         </div>
//                       ) : (
//                         <p className="no-expenses">No expenses recorded yet</p>
//                       )}
//                     </AnimatedCard>
//                   </div>
//                 </div>
//               </motion.div>
//             )}

//             {activeTab === 'budget' && (
//               <motion.div
//                 key="budget"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//               >
//                 <BudgetPlanner />
//               </motion.div>
//             )}

//             {activeTab === 'ai' && (
//               <motion.div
//                 key="ai"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//               >
//                 <AIAssistant />
//               </motion.div>
//             )}

//             {activeTab === 'savings' && (
//               <motion.div
//                 key="savings"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//               >
//                 <Savings />
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </motion.div>
//   )
// }

// export default Dashboard



import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFinance } from '../../context/FinanceContext'
import { AIFinancialAdvisor } from '../../utils/aiEngine'
import { fadeInUp, staggerChildren } from '../../utils/animations'
import ExpenseForm from './ExpenseForm'
import BudgetPlanner from './BudgetPlanner'
import AIAssistant from './AIAssistant'
import Savings from './Savings'
import AnimatedCard from '../../components/AnimatedCard/AnimatedCard'
import { DollarSign, TrendingUp, Target, AlertTriangle, PieChart, Brain } from 'lucide-react'
import './Dashboard.css'

// Create the chart components directly here to fix the import error
const BudgetDoughnutChart = ({ categories }) => {
  const totalSpent = categories.reduce((sum, category) => sum + category.spent, 0);
  
  return (
    <div className="doughnut-chart">
      <div className="chart-container">
        {categories.filter(cat => cat.spent > 0).map(category => {
          const percentage = totalSpent > 0 ? (category.spent / totalSpent) * 100 : 0;
          return (
            <div key={category._id} className="chart-item"> {/* ✅ FIXED: Use _id */}
              <div 
                className="color-indicator" 
                style={{ backgroundColor: category.color }}
              ></div>
              <span className="category-name">{category.name}</span>
              <span className="category-amount">${category.spent.toFixed(2)}</span>
              <span className="category-percentage">({percentage.toFixed(1)}%)</span>
            </div>
          );
        })}
      </div>
      {totalSpent === 0 && (
        <p className="no-data">No expenses yet</p>
      )}
    </div>
  );
};

const ExpenseBarChart = ({ expenses }) => {
  const recentExpenses = expenses.slice(0, 6);
  const maxAmount = Math.max(...recentExpenses.map(exp => exp.amount), 1);
  
  return (
    <div className="bar-chart">
      <div className="bars-container">
        {recentExpenses.map((expense, index) => (
          <div key={expense.id || `expense-${index}`} className="bar-item"> {/* ✅ FIXED: Add fallback key */}
            <div className="bar-label">{expense.description?.substring(0, 15)}{expense.description?.length > 15 ? '...' : ''}</div>
            <div className="bar-track">
              <div 
                className="bar-fill"
                style={{ 
                  width: `${Math.min((expense.amount / maxAmount) * 100, 100)}%`
                }}
              ></div>
            </div>
            <div className="bar-amount">${expense.amount?.toFixed(2)}</div>
          </div>
        ))}
      </div>
      {expenses.length === 0 && (
        <p className="no-data">No expenses recorded</p>
      )}
    </div>
  );
};

export const Dashboard = () => {
  const { financeData, updateMonthlyIncome, loading } = useFinance() // ✅ Added loading
  const [activeTab, setActiveTab] = useState('overview')
  const [aiAdvice, setAiAdvice] = useState([])
  const [overspendingAlerts, setOverspendingAlerts] = useState([])

  useEffect(() => {
    if (financeData && !loading) {
      const advice = AIFinancialAdvisor.generateFinancialAdvice(financeData)
      setAiAdvice(advice)
      
      const alerts = AIFinancialAdvisor.getOverspendingAlerts(financeData.categories)
      setOverspendingAlerts(alerts)
    }
  }, [financeData, loading])

  // Add loading state
  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading your financial data...</p>
      </div>
    )
  }

  const totalExpenses = financeData.expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const remainingBalance = financeData.monthlyIncome - totalExpenses
  const savingsPercentage = financeData.monthlyIncome > 0 
    ? (remainingBalance / financeData.monthlyIncome) * 100 
    : 0

  const recentExpenses = financeData.expenses.slice(0, 5)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: PieChart },
    { id: 'budget', label: 'Budget', icon: Target },
    { id: 'ai', label: 'AI Insights', icon: Brain },
    { id: 'savings', label: 'Savings', icon: TrendingUp }
  ]

  return (
    <motion.div 
      className="dashboard"
      initial="initial"
      animate="animate"
      variants={staggerChildren}
    >
      <div className="dashboard-container">
        {/* Header Section */}
        <motion.div className="dashboard-header" variants={fadeInUp}>
          <div className="header-content">
            <h1>Financial Dashboard</h1>
            <p>Take control of your finances with smart insights</p>
          </div>
         <div className="income-section">
  <AnimatedCard className="income-card">
    <div className="income-input">
      <DollarSign className="income-icon" />
      <div>
        <label>Monthly Income</label>
        <input
          type="number"
          value={financeData.monthlyIncome || ''}
          onChange={(e) => updateMonthlyIncome(Number(e.target.value) || 0)}
          placeholder="0"
          min="0"
          step="100"
        />
      </div>
    </div>
  </AnimatedCard>
</div>
        </motion.div>

        {financeData.monthlyIncome === 0 && (
          <motion.div 
            className="welcome-banner"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="welcome-content">
              <h2>👋 Welcome to Your Finance Manager!</h2>
              <p>Start by setting your monthly income to get personalized insights and budget recommendations.</p>
              <div className="welcome-tips">
                <div className="tip">💡 <strong>Set your income</strong> - This helps us create accurate budget plans</div>
                <div className="tip">📊 <strong>Add expenses</strong> - Track your spending across categories</div>
                <div className="tip">🎯 <strong>Set budget limits</strong> - Get alerts when you're overspending</div>
                <div className="tip">🤖 <strong>Get AI insights</strong> - Smart recommendations based on your spending</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Overspending Alerts */}
        <AnimatePresence>
          {overspendingAlerts.length > 0 && (
            <motion.div
              className="alerts-banner"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AlertTriangle className="alert-icon" />
              <div className="alert-content">
                <strong>Budget Alerts</strong>
                <span>
                  You're over budget in {overspendingAlerts.map(alert => alert.category).join(', ')}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Tabs */}
        <motion.div className="tab-navigation" variants={fadeInUp}>
          {tabs.map(tab => {
            const IconComponent = tab.icon
            return (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <IconComponent size={18} />
                {tab.label}
              </button>
            )
          })}
        </motion.div>

        {/* AI Advice Cards */}
        {activeTab === 'overview' && aiAdvice.length > 0 && (
          <motion.div className="ai-advice-grid" variants={fadeInUp}>
            {aiAdvice.slice(0, 3).map((advice, index) => (
              <AnimatedCard
                key={index}
                animation="scaleIn"
                delay={index * 0.1}
                className={`advice-card ${advice.type}`}
              >
                <div className="advice-header">
                  <span className="advice-icon">{advice.icon}</span>
                  <h4>{advice.title}</h4>
                </div>
                <p>{advice.message}</p>
              </AnimatedCard>
            ))}
          </motion.div>
        )}

        {/* Tab Content */}
        <div className="tab-content">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                className="overview-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Financial Summary */}
                <div className="financial-summary">
                  <AnimatedCard animation="scaleIn" delay={0.1} className="summary-card income">
                    <div className="card-header">
                      <DollarSign className="card-icon" />
                      <h3>Monthly Income</h3>
                    </div>
                    <p className="amount">${financeData.monthlyIncome.toLocaleString()}</p>
                  </AnimatedCard>

                  <AnimatedCard animation="scaleIn" delay={0.2} className="summary-card expenses">
                    <div className="card-header">
                      <TrendingUp className="card-icon" />
                      <h3>Total Expenses</h3>
                    </div>
                    <p className="amount">${totalExpenses.toLocaleString()}</p>
                  </AnimatedCard>

                  <AnimatedCard animation="scaleIn" delay={0.3} className="summary-card balance">
                    <div className="card-header">
                      <Target className="card-icon" />
                      <h3>Remaining</h3>
                    </div>
                    <p className="amount">${remainingBalance.toLocaleString()}</p>
                    <div className="savings-rate">
                      {savingsPercentage.toFixed(1)}% savings rate
                    </div>
                  </AnimatedCard>
                </div>

                {/* Charts and Forms */}
                <div className="main-content-grid">
                  <div className="charts-section">
                    <AnimatedCard animation="fadeInUp" delay={0.4} className="chart-card">
                      <h3>Monthly Expenses</h3>
                      <ExpenseBarChart expenses={financeData.expenses} />
                    </AnimatedCard>

                    <AnimatedCard animation="fadeInUp" delay={0.5} className="chart-card">
                      <h3>Budget Allocation</h3>
                      <BudgetDoughnutChart categories={financeData.categories} />
                    </AnimatedCard>
                  </div>

                  <div className="sidebar-section">
                    <AnimatedCard animation="fadeInUp" delay={0.6} className="expense-form-card">
                      <ExpenseForm />
                    </AnimatedCard>

                    <AnimatedCard animation="fadeInUp" delay={0.7} className="recent-expenses-card">
                      <h3>Recent Expenses</h3>
                      {recentExpenses.length > 0 ? (
                        <div className="expenses-list">
                          {recentExpenses.map(expense => (
                            <div key={expense.id} className="expense-item"> {/* ✅ FIXED: Add key */}
                              <div className="expense-info">
                                <span className="description">{expense.description}</span>
                                <span className="category">{expense.category}</span>
                              </div>
                              <span className="amount">-${expense.amount.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="no-expenses">No expenses recorded yet</p>
                      )}
                    </AnimatedCard>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'budget' && (
              <motion.div
                key="budget"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <BudgetPlanner />
              </motion.div>
            )}

            {activeTab === 'ai' && (
              <motion.div
                key="ai"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <AIAssistant />
              </motion.div>
            )}

            {activeTab === 'savings' && (
              <motion.div
                key="savings"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Savings />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export default Dashboard