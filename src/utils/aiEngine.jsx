export class AIFinancialAdvisor {
  static analyzeSpendingPatterns(expenses, categories) {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    
    const monthlyExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date)
      return expenseDate.getMonth() === currentMonth && 
             expenseDate.getFullYear() === currentYear
    })

    const categorySpending = categories.map(category => {
      const categoryExpenses = monthlyExpenses.filter(
        expense => expense.category === category.name
      )
      const totalSpent = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0)
      
      return {
        category: category.name,
        spent: totalSpent,
        limit: category.limit,
        percentage: category.limit > 0 ? (totalSpent / category.limit) * 100 : 0,
        isOverBudget: category.limit > 0 && totalSpent > category.limit,
        color: category.color
      }
    })

    return categorySpending
  }

  static generateFinancialAdvice(financeData) {
    const analysis = this.analyzeSpendingPatterns(
      financeData.expenses, 
      financeData.categories
    )
    
    const totalIncome = financeData.monthlyIncome
    const totalSpent = analysis.reduce((sum, cat) => sum + cat.spent, 0)
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalSpent) / totalIncome) * 100 : 0

    const advice = []

    // Budget overruns
    const overBudgetCategories = analysis.filter(cat => cat.isOverBudget)
    if (overBudgetCategories.length > 0) {
      advice.push({
        type: 'warning',
        title: 'Budget Overruns Detected',
        message: `You're over budget in ${overBudgetCategories.map(cat => cat.category).join(', ')}. Consider reducing spending in these areas.`,
        priority: 'high',
        icon: '🚨'
      })
    }

    // Savings advice
    if (savingsRate < 20 && savingsRate > 0) {
      advice.push({
        type: 'info',
        title: 'Boost Your Savings',
        message: `Your savings rate is ${savingsRate.toFixed(1)}%. Try to save at least 20% for better financial security.`,
        priority: 'medium',
        icon: '💰'
      })
    } else if (savingsRate >= 20) {
      advice.push({
        type: 'success',
        title: 'Excellent Savings!',
        message: `Great job! You're saving ${savingsRate.toFixed(1)}% of your income.`,
        priority: 'low',
        icon: '🎉'
      })
    }

    // High spending categories
    const highSpending = analysis
      .filter(cat => totalIncome > 0 && cat.spent > totalIncome * 0.3)
      .sort((a, b) => b.spent - a.spent)

    if (highSpending.length > 0) {
      advice.push({
        type: 'warning',
        title: 'High Spending Alert',
        message: `${highSpending[0].category} is taking ${((highSpending[0].spent / totalIncome) * 100).toFixed(1)}% of your income. Review this category.`,
        priority: 'medium',
        icon: '📊'
      })
    }

    // No income set
    if (totalIncome === 0) {
      advice.push({
        type: 'info',
        title: 'Set Your Income',
        message: 'Add your monthly income to get personalized financial insights and budget recommendations.',
        priority: 'high',
        icon: '💡'
      })
    }

    return advice.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })
  }

  static predictNextMonthExpenses(expenses) {
    if (expenses.length === 0) {
      return {
        predictedAmount: 0,
        confidence: 'low',
        trend: 'stable',
        message: 'Not enough data for prediction'
      }
    }

    const lastThreeMonths = []
    const currentDate = new Date()
    
    for (let i = 1; i <= 3; i++) {
      const month = currentDate.getMonth() - i
      const year = month < 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear()
      
      const monthExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date)
        return expenseDate.getMonth() === ((month + 12) % 12) && 
               expenseDate.getFullYear() === year
      })
      
      const total = monthExpenses.reduce((sum, exp) => sum + exp.amount, 0)
      lastThreeMonths.push(total)
    }

    // Simple moving average prediction
    const validMonths = lastThreeMonths.filter(amount => amount > 0)
    const predicted = validMonths.length > 0 
      ? validMonths.reduce((sum, val) => sum + val, 0) / validMonths.length
      : 0

    return {
      predictedAmount: predicted,
      confidence: validMonths.length >= 2 ? 'high' : 'low',
      trend: this.calculateTrend(validMonths),
      message: this.generatePredictionMessage(predicted, validMonths.length)
    }
  }

  static calculateTrend(amounts) {
    if (amounts.length < 2) return 'stable'
    
    const last = amounts[amounts.length - 1]
    const previous = amounts[amounts.length - 2]
    
    if (last > previous * 1.1) return 'increasing'
    if (last < previous * 0.9) return 'decreasing'
    return 'stable'
  }

  static generatePredictionMessage(predictedAmount, dataPoints) {
    if (dataPoints === 0) return "Start adding expenses to get predictions"
    if (dataPoints === 1) return "Add more expense data for accurate predictions"
    
    const trends = {
      increasing: "Your spending is trending upward",
      decreasing: "Your spending is trending downward", 
      stable: "Your spending pattern is stable"
    }
    
    return trends[this.calculateTrend] || "Analyzing your spending patterns"
  }

  static suggestBudgetAllocation(monthlyIncome) {
    if (monthlyIncome === 0) {
      return {
        'Basic Budget': {
          needs: 0,
          wants: 0,
          savings: 0
        }
      }
    }

    return {
      '50-30-20 Rule': {
        needs: monthlyIncome * 0.5,
        wants: monthlyIncome * 0.3,
        savings: monthlyIncome * 0.2,
        description: '50% Needs, 30% Wants, 20% Savings - Balanced approach'
      },
      'Aggressive Savings': {
        needs: monthlyIncome * 0.4,
        wants: monthlyIncome * 0.3,
        savings: monthlyIncome * 0.3,
        description: '40% Needs, 30% Wants, 30% Savings - Fast wealth building'
      },
      'Conservative': {
        needs: monthlyIncome * 0.6,
        wants: monthlyIncome * 0.25,
        savings: monthlyIncome * 0.15,
        description: '60% Needs, 25% Wants, 15% Savings - Comfort focused'
      }
    }
  }

  static getOverspendingAlerts(categories) {
    return categories
      .filter(cat => cat.limit > 0 && cat.spent > cat.limit)
      .map(cat => ({
        category: cat.name,
        overspentAmount: cat.spent - cat.limit,
        percentage: ((cat.spent / cat.limit) * 100).toFixed(1),
        color: cat.color
      }))
  }
}