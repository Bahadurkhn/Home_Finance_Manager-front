// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useAuth } from './AuthContext';

// const FinanceContext = createContext();

// export function useFinance() {
//   const context = useContext(FinanceContext);
//   if (!context) {
//     throw new Error('useFinance must be used within a FinanceProvider');
//   }
//   return context;
// }

// export function FinanceProvider({ children }) {
//   const { user, token } = useAuth();
//   const [financeData, setFinanceData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

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

//   const loadFinanceData = async () => {
//     if (!user || !token) {
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);
      
//       const savedData = localStorage.getItem(`financeData_${user.id}`);
//       if (savedData) {
//         setFinanceData(JSON.parse(savedData));
//       } else {
//         setFinanceData(getDefaultData());
//       }
      
//     } catch (error) {
//       console.error('Load finance data error:', error);
//       setError('Failed to load financial data');
//       setFinanceData(getDefaultData());
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user && token) {
//       loadFinanceData();
//     } else {
//       setFinanceData(null);
//       setLoading(false);
//     }
//   }, [user, token]);

//   const updateMonthlyIncome = async (income) => {
//     try {
//       setFinanceData(prev => ({
//         ...prev,
//         monthlyIncome: income
//       }));
      
//       if (user) {
//         localStorage.setItem(`financeData_${user.id}`, JSON.stringify(financeData));
//       }
      
//       return { success: true };
//     } catch (error) {
//       console.error('Update income error:', error);
//       return { success: false, message: 'Failed to update income' };
//     }
//   };

//   const updateSavingsGoal = async (goal) => {
//     try {
//       setFinanceData(prev => ({
//         ...prev,
//         savingsGoal: goal
//       }));
      
//       return { success: true };
//     } catch (error) {
//       console.error('Update savings goal error:', error);
//       return { success: false, message: 'Failed to update savings goal' };
//     }
//   };

//   const updateCategoryLimit = async (categoryId, limit) => {
//     try {
//       setFinanceData(prev => ({
//         ...prev,
//         categories: prev.categories.map(cat =>
//           cat._id === categoryId ? { ...cat, limit } : cat
//         )
//       }));
      
//       return { success: true };
//     } catch (error) {
//       console.error('Update category limit error:', error);
//       return { success: false, message: 'Failed to update category limit' };
//     }
//   };

//   const addExpense = async (expense) => {
//     try {
//       const newExpense = {
//         id: Date.now().toString(),
//         ...expense,
//         amount: parseFloat(expense.amount),
//         date: new Date().toISOString().split('T')[0]
//       };
      
//       setFinanceData(prev => ({
//         ...prev,
//         expenses: [...prev.expenses, newExpense]
//       }));
      
//       return { success: true };
//     } catch (error) {
//       console.error('Add expense error:', error);
//       return { success: false, message: 'Failed to add expense' };
//     }
//   };

//   const addCategory = async (categoryName, limit = 0) => {
//     try {
//       const newCategory = {
//         _id: Date.now(),
//         name: categoryName,
//         limit: limit,
//         spent: 0,
//         color: '#' + Math.floor(Math.random()*16777215).toString(16)
//       };
      
//       setFinanceData(prev => ({
//         ...prev,
//         categories: [...prev.categories, newCategory]
//       }));
      
//       return { success: true };
//     } catch (error) {
//       console.error('Add category error:', error);
//       return { success: false, message: 'Failed to add category' };
//     }
//   };

//   const deleteExpense = async (expenseId) => {
//     try {
//       setFinanceData(prev => ({
//         ...prev,
//         expenses: prev.expenses.filter(exp => exp.id !== expenseId)
//       }));
      
//       return { success: true };
//     } catch (error) {
//       console.error('Delete expense error:', error);
//       return { success: false, message: 'Failed to delete expense' };
//     }
//   };

//   const resetUserData = async () => {
//     try {
//       setFinanceData(getDefaultData());
//       return { success: true };
//     } catch (error) {
//       console.error('Reset data error:', error);
//       return { success: false, message: 'Failed to reset data' };
//     }
//   };

//   const getUserTransactions = async (userId) => {
//     try {
//       if (financeData && financeData.expenses) {
//         return financeData.expenses.map(expense => ({
//           ...expense,
//           type: 'expense',
//           category: expense.category || 'other'
//         }));
//       }
//       return [];
//     } catch (error) {
//       console.error('Get user transactions error:', error);
//       return [];
//     }
//   };

//   const addUserTransaction = async (userId, transactionData) => {
//     try {
//       const newTransaction = {
//         id: Date.now().toString(),
//         ...transactionData,
//         amount: parseFloat(transactionData.amount),
//         date: new Date().toISOString().split('T')[0]
//       };
      
//       if (transactionData.type === 'expense') {
//         setFinanceData(prev => ({
//           ...prev,
//           expenses: [...prev.expenses, newTransaction]
//         }));
//       }
      
//       return { success: true, message: 'Transaction added successfully' };
//     } catch (error) {
//       console.error('Add user transaction error:', error);
//       return { success: false, message: 'Failed to add transaction' };
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
//     getUserTransactions,
//     addUserTransaction,
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

  // Use useCallback to prevent unnecessary recreations
  const loadFinanceData = React.useCallback(async () => {
    if (!user || !token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
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
  }, [user, token]);

  useEffect(() => {
    if (user && token) {
      loadFinanceData();
    } else {
      setFinanceData(null);
      setLoading(false);
    }
  }, [user, token, loadFinanceData]);

  // Use useCallback for all functions that are part of the context value
  const updateMonthlyIncome = React.useCallback(async (income) => {
    try {
      setFinanceData(prev => {
        const updatedData = {
          ...prev,
          monthlyIncome: income
        };
        
        if (user) {
          localStorage.setItem(`financeData_${user.id}`, JSON.stringify(updatedData));
        }
        
        return updatedData;
      });
      
      return { success: true };
    } catch (error) {
      console.error('Update income error:', error);
      return { success: false, message: 'Failed to update income' };
    }
  }, [user]);

  const updateSavingsGoal = React.useCallback(async (goal) => {
    try {
      setFinanceData(prev => {
        const updatedData = {
          ...prev,
          savingsGoal: goal
        };
        
        if (user) {
          localStorage.setItem(`financeData_${user.id}`, JSON.stringify(updatedData));
        }
        
        return updatedData;
      });
      
      return { success: true };
    } catch (error) {
      console.error('Update savings goal error:', error);
      return { success: false, message: 'Failed to update savings goal' };
    }
  }, [user]);

  const updateCategoryLimit = React.useCallback(async (categoryId, limit) => {
    try {
      setFinanceData(prev => {
        const updatedData = {
          ...prev,
          categories: prev.categories.map(cat =>
            cat._id === categoryId ? { ...cat, limit } : cat
          )
        };
        
        if (user) {
          localStorage.setItem(`financeData_${user.id}`, JSON.stringify(updatedData));
        }
        
        return updatedData;
      });
      
      return { success: true };
    } catch (error) {
      console.error('Update category limit error:', error);
      return { success: false, message: 'Failed to update category limit' };
    }
  }, [user]);

  const addExpense = React.useCallback(async (expense) => {
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
        
        if (user) {
          localStorage.setItem(`financeData_${user.id}`, JSON.stringify(updatedData));
        }
        
        return updatedData;
      });
      
      return { success: true };
    } catch (error) {
      console.error('Add expense error:', error);
      return { success: false, message: 'Failed to add expense' };
    }
  }, [user]);

  const addCategory = React.useCallback(async (categoryName, limit = 0) => {
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
        
        if (user) {
          localStorage.setItem(`financeData_${user.id}`, JSON.stringify(updatedData));
        }
        
        return updatedData;
      });
      
      return { success: true };
    } catch (error) {
      console.error('Add category error:', error);
      return { success: false, message: 'Failed to add category' };
    }
  }, [user]);

  const deleteExpense = React.useCallback(async (expenseId) => {
    try {
      setFinanceData(prev => {
        const updatedData = {
          ...prev,
          expenses: prev.expenses.filter(exp => exp.id !== expenseId)
        };
        
        if (user) {
          localStorage.setItem(`financeData_${user.id}`, JSON.stringify(updatedData));
        }
        
        return updatedData;
      });
      
      return { success: true };
    } catch (error) {
      console.error('Delete expense error:', error);
      return { success: false, message: 'Failed to delete expense' };
    }
  }, [user]);

  const resetUserData = React.useCallback(async () => {
    try {
      const defaultData = getDefaultData();
      setFinanceData(defaultData);
      
      if (user) {
        localStorage.setItem(`financeData_${user.id}`, JSON.stringify(defaultData));
      }
      
      return { success: true };
    } catch (error) {
      console.error('Reset data error:', error);
      return { success: false, message: 'Failed to reset data' };
    }
  }, [user]);

  const getUserTransactions = React.useCallback(async (userId) => {
    try {
      const currentData = financeData || getDefaultData();
      if (currentData.expenses) {
        return currentData.expenses.map(expense => ({
          ...expense,
          type: 'expense',
          category: expense.category || 'other'
        }));
      }
      return [];
    } catch (error) {
      console.error('Get user transactions error:', error);
      return [];
    }
  }, [financeData]);

  const addUserTransaction = React.useCallback(async (userId, transactionData) => {
    try {
      const newTransaction = {
        id: Date.now().toString(),
        ...transactionData,
        amount: parseFloat(transactionData.amount),
        date: new Date().toISOString().split('T')[0]
      };
      
      if (transactionData.type === 'expense') {
        setFinanceData(prev => {
          const updatedData = {
            ...prev,
            expenses: [...prev.expenses, newTransaction]
          };
          
          if (user) {
            localStorage.setItem(`financeData_${user.id}`, JSON.stringify(updatedData));
          }
          
          return updatedData;
        });
      }
      
      return { success: true, message: 'Transaction added successfully' };
    } catch (error) {
      console.error('Add user transaction error:', error);
      return { success: false, message: 'Failed to add transaction' };
    }
  }, [user]);

  const value = React.useMemo(() => ({
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
    getUserTransactions,
    addUserTransaction,
  }), [
    financeData,
    loading,
    error,
    updateMonthlyIncome,
    updateSavingsGoal,
    updateCategoryLimit,
    addExpense,
    addCategory,
    deleteExpense,
    resetUserData,
    loadFinanceData,
    getUserTransactions,
    addUserTransaction,
  ]);

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
}

export { FinanceContext };