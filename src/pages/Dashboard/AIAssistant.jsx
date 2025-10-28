import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
// import { useFinance } from '../../context/AuthContext'
import { useFinance } from '../../context/FinanceContext'
import { AIFinancialAdvisor } from '../../utils/aiEngine'
import { fadeInUp, scaleIn } from '../../utils/animations'
import AnimatedCard from '../../components/AnimatedCard/AnimatedCard'
import { Brain, Lightbulb, TrendingUp, AlertTriangle, CheckCircle, Target } from 'lucide-react'
import './AIAssistant.css'

export const AIAssistant = () => {
  const { financeData } = useFinance()
  const [activeInsight, setActiveInsight] = useState('advice')

  const aiAdvice = AIFinancialAdvisor.generateFinancialAdvice(financeData)
  const spendingAnalysis = AIFinancialAdvisor.analyzeSpendingPatterns(
    financeData.expenses, 
    financeData.categories
  )
  const prediction = AIFinancialAdvisor.predictNextMonthExpenses(financeData.expenses)
  const budgetSuggestions = AIFinancialAdvisor.suggestBudgetAllocation(financeData.monthlyIncome)

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="icon high" />
      case 'medium': return <TrendingUp className="icon medium" />
      case 'low': return <CheckCircle className="icon low" />
      default: return <Lightbulb className="icon" />
    }
  }

  const insights = [
    { id: 'advice', label: 'Smart Advice', icon: Lightbulb },
    { id: 'analysis', label: 'Spending Analysis', icon: TrendingUp },
    { id: 'prediction', label: 'Predictions', icon: Target },
    { id: 'suggestions', label: 'Budget Tips', icon: Brain }
  ]

  return (
    <div className="ai-assistant">
      <motion.div className="ai-header" variants={fadeInUp}>
        <div className="ai-title">
          <Brain className="ai-icon" />
          <div>
            <h1>AI Financial Assistant</h1>
            <p>Get personalized insights and smart recommendations</p>
          </div>
        </div>
      </motion.div>

      <motion.div className="ai-navigation" variants={fadeInUp}>
        {insights.map(insight => {
          const IconComponent = insight.icon
          return (
            <button
              key={insight.id}
              className={`ai-tab ${activeInsight === insight.id ? 'active' : ''}`}
              onClick={() => setActiveInsight(insight.id)}
            >
              <IconComponent size={18} />
              {insight.label}
            </button>
          )
        })}
      </motion.div>

      <div className="ai-content">
        <AnimatePresence mode="wait">
          {activeInsight === 'advice' && (
            <motion.div
              key="advice"
              className="advice-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2>Personalized Financial Advice</h2>
              <div className="advice-grid">
                {aiAdvice.length > 0 ? (
                  aiAdvice.map((advice, index) => (
                    <AnimatedCard
                      key={index}
                      animation="scaleIn"
                      delay={index * 0.1}
                      className={`advice-card ${advice.type}`}
                    >
                      <div className="advice-header">
                        {getPriorityIcon(advice.priority)}
                        <h3>{advice.title}</h3>
                        <span className="advice-icon">{advice.icon}</span>
                      </div>
                      <p>{advice.message}</p>
                      <div className="priority-badge">{advice.priority} priority</div>
                    </AnimatedCard>
                  ))
                ) : (
                  <AnimatedCard className="no-advice">
                    <Lightbulb className="no-advice-icon" />
                    <h3>No Advice Available</h3>
                    <p>Add your income and expenses to get personalized financial advice.</p>
                  </AnimatedCard>
                )}
              </div>
            </motion.div>
          )}

          {activeInsight === 'analysis' && (
            <motion.div
              key="analysis"
              className="analysis-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2>Spending Analysis</h2>
              <div className="analysis-grid">
                {spendingAnalysis.map((category, index) => (
                  <AnimatedCard
                    key={category.category}
                    animation="fadeInUp"
                    delay={index * 0.1}
                    className="analysis-card"
                  >
                    <div className="category-header">
                      <div 
                        className="category-color"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <h3>{category.category}</h3>
                      <span className={`status ${category.isOverBudget ? 'over' : 'under'}`}>
                        {category.isOverBudget ? 'Over Budget' : 'Within Budget'}
                      </span>
                    </div>
                    <div className="category-numbers">
                      <div className="amounts">
                        <span>Spent: ${category.spent.toFixed(2)}</span>
                        <span>Limit: ${category.limit.toFixed(2)}</span>
                      </div>
                      {category.limit > 0 && (
                        <div className="progress-container">
                          <div 
                            className="progress-bar"
                            style={{
                              width: `${Math.min((category.spent / category.limit) * 100, 100)}%`,
                              backgroundColor: category.isOverBudget ? '#ff6b6b' : '#4ECDC4'
                            }}
                          ></div>
                          <span className="percentage">
                            {((category.spent / category.limit) * 100).toFixed(1)}%
                          </span>
                        </div>
                      )}
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            </motion.div>
          )}

          {activeInsight === 'prediction' && (
            <motion.div
              key="prediction"
              className="prediction-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2>Next Month Prediction</h2>
              <div className="prediction-cards">
                <AnimatedCard className="prediction-card main">
                  <div className="prediction-header">
                    <TrendingUp className="prediction-icon" />
                    <div>
                      <h3>Expected Expenses</h3>
                      <p>Based on your spending patterns</p>
                    </div>
                  </div>
                  <div className="prediction-amount">
                    ${prediction.predictedAmount.toFixed(2)}
                  </div>
                  <div className="prediction-details">
                    <div className="detail-item">
                      <span>Confidence:</span>
                      <span className={`confidence ${prediction.confidence}`}>
                        {prediction.confidence}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span>Trend:</span>
                      <span className={`trend ${prediction.trend}`}>
                        {prediction.trend}
                      </span>
                    </div>
                  </div>
                  <div className="prediction-message">
                    {prediction.message}
                  </div>
                </AnimatedCard>

                <div className="prediction-insights">
                  <AnimatedCard className="insight-card">
                    <Target className="insight-icon" />
                    <div>
                      <h4>Smart Saving Tip</h4>
                      <p>Based on your patterns, consider setting aside 20% of your income for unexpected expenses.</p>
                    </div>
                  </AnimatedCard>
                </div>
              </div>
            </motion.div>
          )}

          {activeInsight === 'suggestions' && (
            <motion.div
              key="suggestions"
              className="suggestions-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2>Budget Allocation Suggestions</h2>
              <div className="suggestions-grid">
                {Object.entries(budgetSuggestions).map(([strategy, allocation], index) => (
                  <AnimatedCard
                    key={strategy}
                    animation="scaleIn"
                    delay={index * 0.1}
                    className="suggestion-card"
                  >
                    <h3>{strategy}</h3>
                    <p className="strategy-description">{allocation.description}</p>
                    <div className="allocation-breakdown">
                      <div className="allocation-item needs">
                        <span className="label">Needs (Essentials)</span>
                        <span className="amount">${allocation.needs.toFixed(2)}</span>
                        <div className="percentage">({((allocation.needs / financeData.monthlyIncome) * 100).toFixed(0)}%)</div>
                      </div>
                      <div className="allocation-item wants">
                        <span className="label">Wants (Lifestyle)</span>
                        <span className="amount">${allocation.wants.toFixed(2)}</span>
                        <div className="percentage">({((allocation.wants / financeData.monthlyIncome) * 100).toFixed(0)}%)</div>
                      </div>
                      <div className="allocation-item savings">
                        <span className="label">Savings & Investments</span>
                        <span className="amount">${allocation.savings.toFixed(2)}</span>
                        <div className="percentage">({((allocation.savings / financeData.monthlyIncome) * 100).toFixed(0)}%)</div>
                      </div>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AIAssistant