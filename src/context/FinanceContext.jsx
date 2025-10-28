// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useAuth } from './AuthContext'; // ✅ FIXED IMPORT

// const FinanceContext = createContext();
// const API_URL = 'http://localhost:5000/api';

// export function useFinance() {
//   const context = useContext(FinanceContext);
//   if (!context) {
//     throw new Error('useFinance must be used within a FinanceProvider');
//   }
//   return context;
// }

// export function FinanceProvider({ children }) {
//   const { user, token, getAuthHeaders } = useAuth();
//   const [financeData, setFinanceData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Load finance data from backend
//   const loadFinanceData = async () => {
//     if (!user || !token) {
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await fetch(`${API_URL}/finance`, {
//         headers: getAuthHeaders(),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setFinanceData(data);
//       } else {
//         throw new Error('Failed to load finance data');
//       }
//     } catch (error) {
//       console.error('Load finance data error:', error);
//       setError('Failed to load financial data');
//       // Initialize with empty data as fallback
//       setFinanceData(getDefaultData());
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getDefaultData = () => ({
//     monthlyIncome: 0,
//     savingsGoal: 0,
//     expenses: [],
//     categories: [
//       { _id: 1, name: 'Health', limit: 0, spent: 0, color: '#FF6B6B' },
//       { _id: 2, name: 'Rent', limit: 0, spent: 0, color: '#4ECDC4' },
//       { _id: 3, name: 'Utilities', limit: 0, spent: 0, color: '#45B7D1' },
//       { _id: 4, name: 'Food', limit: 0, spent: 0, color: '#96CEB4' },
//       { _id: 5, name: 'Transportation', limit: 0, spent: 0, color: '#FFEAA7' },
//       { _id: 6, name: 'Entertainment', limit: 0, spent: 0, color: '#DDA0DD' },
//       { _id: 7, name: 'Shopping', limit: 0, spent: 0, color: '#98D8C8' },
//       { _id: 8, name: 'Education', limit: 0, spent: 0, color: '#F7DC6F' }
//     ]
//   });

//   // Load data when user changes
//   useEffect(() => {
//     if (user && token) {
//       loadFinanceData();
//     } else {
//       setFinanceData(null);
//       setLoading(false);
//     }
//   }, [user, token]);

//   // Update monthly income
//   const updateMonthlyIncome = async (income) => {
//     try {
//       const response = await fetch(`${API_URL}/finance/income`, {
//         method: 'PUT',
//         headers: getAuthHeaders(),
//         body: JSON.stringify({ monthlyIncome: income }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setFinanceData(data);
//         return { success: true };
//       } else {
//         throw new Error('Failed to update income');
//       }
//     } catch (error) {
//       console.error('Update income error:', error);
//       return { success: false, message: 'Failed to update income' };
//     }
//   };

//   // Update savings goal
//   const updateSavingsGoal = async (goal) => {
//     try {
//       const response = await fetch(`${API_URL}/finance/savings-goal`, {
//         method: 'PUT',
//         headers: getAuthHeaders(),
//         body: JSON.stringify({ savingsGoal: goal }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setFinanceData(data);
//         return { success: true };
//       } else {
//         throw new Error('Failed to update savings goal');
//       }
//     } catch (error) {
//       console.error('Update savings goal error:', error);
//       return { success: false, message: 'Failed to update savings goal' };
//     }
//   };

//   // Update category limit
//   const updateCategoryLimit = async (categoryId, limit) => {
//     try {
//       const response = await fetch(`${API_URL}/finance/categories/${categoryId}`, {
//         method: 'PUT',
//         headers: getAuthHeaders(),
//         body: JSON.stringify({ limit }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setFinanceData(data);
//         return { success: true };
//       } else {
//         throw new Error('Failed to update category limit');
//       }
//     } catch (error) {
//       console.error('Update category limit error:', error);
//       return { success: false, message: 'Failed to update category limit' };
//     }
//   };

//   // Add new expense
//   const addExpense = async (expense) => {
//     try {
//       const response = await fetch(`${API_URL}/finance/expenses`, {
//         method: 'POST',
//         headers: getAuthHeaders(),
//         body: JSON.stringify(expense),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setFinanceData(data);
//         return { success: true };
//       } else {
//         throw new Error('Failed to add expense');
//       }
//     } catch (error) {
//       console.error('Add expense error:', error);
//       return { success: false, message: 'Failed to add expense' };
//     }
//   };

//   // Add new category
//   const addCategory = async (categoryName, limit = 0) => {
//     try {
//       const response = await fetch(`${API_URL}/finance/categories`, {
//         method: 'POST',
//         headers: getAuthHeaders(),
//         body: JSON.stringify({ name: categoryName, limit }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setFinanceData(data);
//         return { success: true };
//       } else {
//         throw new Error('Failed to add category');
//       }
//     } catch (error) {
//       console.error('Add category error:', error);
//       return { success: false, message: 'Failed to add category' };
//     }
//   };

//   // Delete expense
//   const deleteExpense = async (expenseId) => {
//     try {
//       const response = await fetch(`${API_URL}/finance/expenses/${expenseId}`, {
//         method: 'DELETE',
//         headers: getAuthHeaders(),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setFinanceData(data);
//         return { success: true };
//       } else {
//         throw new Error('Failed to delete expense');
//       }
//     } catch (error) {
//       console.error('Delete expense error:', error);
//       return { success: false, message: 'Failed to delete expense' };
//     }
//   };

//   // Reset all data
//   const resetUserData = async () => {
//     try {
//       const response = await fetch(`${API_URL}/finance/reset`, {
//         method: 'DELETE',
//         headers: getAuthHeaders(),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setFinanceData(data);
//         return { success: true };
//       } else {
//         throw new Error('Failed to reset data');
//       }
//     } catch (error) {
//       console.error('Reset data error:', error);
//       return { success: false, message: 'Failed to reset data' };
//     }
//   };

//   const value = {
//     financeData: financeData || getDefaultData(),
//     loading,
//     error,
//     updateMonthlyIncome,
//     updateSavingsGoal,
//     updateCategoryLimit,
//     addExpense,
//     addCategory,
//     deleteExpense,
//     resetUserData,
//     refreshData: loadFinanceData,
//   };

//   return (
//     <FinanceContext.Provider value={value}>
//       {children}
//     </FinanceContext.Provider>
//   );
// }

// export { FinanceContext };


import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const FinanceContext = createContext();
const API_URL = 'http://localhost:5000/api';

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
}

export function FinanceProvider({ children }) {
  const { user, token } = useAuth();
  const [financeData, setFinanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ REMOVED DUPLICATE getAuthHeaders - using the one from AuthContext

  // Load finance data from backend
  const loadFinanceData = async () => {
    if (!user || !token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // For now, use local data until backend is ready
      const savedData = localStorage.getItem(`financeData_${user.id}`);
      if (savedData) {
        setFinanceData(JSON.parse(savedData));
      } else {
        setFinanceData(getDefaultData());
      }
      
    } catch (error) {
      console.error('Load finance data error:', error);
      setError('Failed to load financial data');
      setFinanceData(getDefaultData());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultData = () => ({
    monthlyIncome: 0,
    savingsGoal: 0,
    expenses: [],
    categories: [
      { _id: 1, name: 'Health', limit: 0, spent: 0, color: '#FF6B6B' },
      { _id: 2, name: 'Rent', limit: 0, spent: 0, color: '#4ECDC4' },
      { _id: 3, name: 'Utilities', limit: 0, spent: 0, color: '#45B7D1' },
      { _id: 4, name: 'Food', limit: 0, spent: 0, color: '#96CEB4' },
      { _id: 5, name: 'Transportation', limit: 0, spent: 0, color: '#FFEAA7' },
      { _id: 6, name: 'Entertainment', limit: 0, spent: 0, color: '#DDA0DD' },
      { _id: 7, name: 'Shopping', limit: 0, spent: 0, color: '#98D8C8' },
      { _id: 8, name: 'Education', limit: 0, spent: 0, color: '#F7DC6F' }
    ]
  });

  // Load data when user changes
  useEffect(() => {
    if (user && token) {
      loadFinanceData();
    } else {
      setFinanceData(null);
      setLoading(false);
    }
  }, [user, token]);

  // Helper function to save data to localStorage
  const saveToLocalStorage = (data) => {
    if (user && data) {
      localStorage.setItem(`financeData_${user.id}`, JSON.stringify(data));
    }
  };

  // Update monthly income - FIXED TO WORK WITHOUT API
  const updateMonthlyIncome = async (income) => {
    try {
      setFinanceData(prev => {
        const updatedData = {
          ...prev,
          monthlyIncome: income
        };
        saveToLocalStorage(updatedData);
        return updatedData;
      });
      
      return { success: true };
    } catch (error) {
      console.error('Update income error:', error);
      return { success: false, message: 'Failed to update income' };
    }
  };

  // Update savings goal
  const updateSavingsGoal = async (goal) => {
    try {
      setFinanceData(prev => {
        const updatedData = {
          ...prev,
          savingsGoal: goal
        };
        saveToLocalStorage(updatedData);
        return updatedData;
      });
      
      return { success: true };
    } catch (error) {
      console.error('Update savings goal error:', error);
      return { success: false, message: 'Failed to update savings goal' };
    }
  };

  // Update category limit
  const updateCategoryLimit = async (categoryId, limit) => {
    try {
      setFinanceData(prev => {
        const updatedData = {
          ...prev,
          categories: prev.categories.map(cat =>
            cat._id === categoryId ? { ...cat, limit } : cat
          )
        };
        saveToLocalStorage(updatedData);
        return updatedData;
      });
      
      return { success: true };
    } catch (error) {
      console.error('Update category limit error:', error);
      return { success: false, message: 'Failed to update category limit' };
    }
  };

  // Add new expense - FIXED TO WORK WITHOUT API
  const addExpense = async (expense) => {
    try {
      const newExpense = {
        id: Date.now().toString(),
        ...expense,
        amount: parseFloat(expense.amount),
        date: new Date().toISOString().split('T')[0]
      };
      
      setFinanceData(prev => {
        const updatedData = {
          ...prev,
          expenses: [...prev.expenses, newExpense]
        };
        saveToLocalStorage(updatedData);
        return updatedData;
      });
      
      return { success: true };
    } catch (error) {
      console.error('Add expense error:', error);
      return { success: false, message: 'Failed to add expense' };
    }
  };

  // Add new category
  const addCategory = async (categoryName, limit = 0) => {
    try {
      const newCategory = {
        _id: Date.now(),
        name: categoryName,
        limit: limit,
        spent: 0,
        color: '#' + Math.floor(Math.random()*16777215).toString(16)
      };
      
      setFinanceData(prev => {
        const updatedData = {
          ...prev,
          categories: [...prev.categories, newCategory]
        };
        saveToLocalStorage(updatedData);
        return updatedData;
      });
      
      return { success: true };
    } catch (error) {
      console.error('Add category error:', error);
      return { success: false, message: 'Failed to add category' };
    }
  };

  // Delete expense
  const deleteExpense = async (expenseId) => {
    try {
      setFinanceData(prev => {
        const updatedData = {
          ...prev,
          expenses: prev.expenses.filter(exp => exp.id !== expenseId)
        };
        saveToLocalStorage(updatedData);
        return updatedData;
      });
      
      return { success: true };
    } catch (error) {
      console.error('Delete expense error:', error);
      return { success: false, message: 'Failed to delete expense' };
    }
  };

  // Reset all data
  const resetUserData = async () => {
    try {
      const defaultData = getDefaultData();
      setFinanceData(defaultData);
      saveToLocalStorage(defaultData);
      return { success: true };
    } catch (error) {
      console.error('Reset data error:', error);
      return { success: false, message: 'Failed to reset data' };
    }
  };

  // ✅ Get user transactions function
  const getUserTransactions = async (userId) => {
    try {
      // For now, return expenses as transactions
      const currentData = financeData || getDefaultData();
      if (currentData.expenses) {
        return { 
          success: true, 
          transactions: currentData.expenses.map(expense => ({
            ...expense,
            type: 'expense', // Default to expense for now
            category: expense.category || 'other'
          }))
        };
      }
      
      return { success: true, transactions: [] };
    } catch (error) {
      console.error('Get user transactions error:', error);
      return { success: false, message: 'Failed to fetch user transactions' };
    }
  };

  // ✅ Add user transaction function
  const addUserTransaction = async (userId, transactionData) => {
    try {
      const newTransaction = {
        id: Date.now().toString(),
        ...transactionData,
        amount: parseFloat(transactionData.amount),
        date: new Date().toISOString().split('T')[0]
      };
      
      // If it's an expense, add to expenses
      if (transactionData.type === 'expense') {
        setFinanceData(prev => {
          const updatedData = {
            ...prev,
            expenses: [...prev.expenses, newTransaction]
          };
          saveToLocalStorage(updatedData);
          return updatedData;
        });
      }
      
      return { success: true, message: 'Transaction added successfully' };
    } catch (error) {
      console.error('Add user transaction error:', error);
      return { success: false, message: 'Failed to add transaction' };
    }
  };

  const value = {
    financeData: financeData || getDefaultData(),
    loading,
    error,
    updateMonthlyIncome,
    updateSavingsGoal,
    updateCategoryLimit,
    addExpense,
    addCategory,
    deleteExpense,
    resetUserData,
    refreshData: loadFinanceData,
    getUserTransactions, // ✅ Now included
    addUserTransaction,  // ✅ Now included
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
}

export { FinanceContext };