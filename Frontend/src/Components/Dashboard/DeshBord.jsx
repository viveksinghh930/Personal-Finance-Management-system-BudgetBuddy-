import React, { useState, useMemo } from 'react'
import Sidebar from '../Shared/SideBar'
import { darkThemeColor } from '../DarkLiteMood/ThemeProvider'
import DeshboardNavbar from './DeshboardNavbar'
import { TrendingUp, TrendingDown, MoreVertical, Plus, Eye, Edit, Trash2 } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { useGetIncomeQuery } from '@/redux/api/incomeApi'
import { useGetExpenseQuery } from '@/redux/api/expenseApi'
import { useGetBorrowQuery } from '@/redux/api/borrowApi'
import { useGetDebtsQuery } from '@/redux/api/debtApi'
import { useGetPaymentsQuery, useDeletePaymentMutation, useUpdatePaymentMutation } from '@/redux/api/paymentApi'
import AddOnlinePayment from './AddOnlinePayment'
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/Components/ui/sheet'
import { toast } from 'sonner'

const DeshBord = () => {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [editData, setEditData] = useState(null);
  
  const { data: incomeData } = useGetIncomeQuery();
  const { data: expenseData } = useGetExpenseQuery();
  const { data: borrowData } = useGetBorrowQuery();
  const { data: debtData } = useGetDebtsQuery();
  const { data: paymentData } = useGetPaymentsQuery();
  const [deletePayment] = useDeletePaymentMutation();
  const [updatePayment] = useUpdatePaymentMutation();

  const totalIncome = useMemo(() => {
    return incomeData?.income?.reduce((sum, item) => sum + item.amount, 0) || 0;
  }, [incomeData]);

  const totalExpense = useMemo(() => {
    return expenseData?.expense?.reduce((sum, item) => sum + item.amount, 0) || 0;
  }, [expenseData]);

  const totalDebt = useMemo(() => {
    return debtData?.debts?.reduce((sum, item) => sum + item.amount, 0) || 0;
  }, [debtData]);

  const totalBorrowed = useMemo(() => {
    return borrowData?.borrows?.reduce((sum, item) => sum + (item.totalAmount || item.amount), 0) || 0;
  }, [borrowData]);

  const calculatePercentageChange = (currentData, type) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    
    const currentMonthTotal = currentData?.filter(item => {
      const d = new Date(item.date);
      return d.getMonth() === currentMonth && d.getFullYear() === now.getFullYear();
    }).reduce((sum, item) => sum + (type === 'borrow' ? item.totalAmount || item.amount : item.amount), 0) || 0;
    
    const lastMonthTotal = currentData?.filter(item => {
      const d = new Date(item.date);
      const year = currentMonth === 0 ? now.getFullYear() - 1 : now.getFullYear();
      return d.getMonth() === lastMonth && d.getFullYear() === year;
    }).reduce((sum, item) => sum + (type === 'borrow' ? item.totalAmount || item.amount : item.amount), 0) || 0;
    
    if (lastMonthTotal === 0) return { percentage: '0.0%', trend: 'up' };
    const change = ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;
    return {
      percentage: `${Math.abs(change).toFixed(1)}%`,
      trend: change >= 0 ? 'up' : 'down'
    };
  };

  const debtChange = calculatePercentageChange(debtData?.debts, 'debt');
  const borrowChange = calculatePercentageChange(borrowData?.borrows, 'borrow');
  const incomeChange = calculatePercentageChange(incomeData?.income, 'income');
  const expenseChange = calculatePercentageChange(expenseData?.expense, 'expense');

  const getMonthlyData = (data, type) => {
    const monthlyMap = {};
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    months.forEach(m => monthlyMap[m] = 0);
    
    data?.forEach(item => {
      const date = new Date(item.date);
      const month = months[date.getMonth()];
      monthlyMap[month] += item.amount;
    });
    
    return monthlyMap;
  };

  const financialStatsData = useMemo(() => {
    const incomeMonthly = getMonthlyData(incomeData?.income, 'income');
    const expenseMonthly = getMonthlyData(expenseData?.expense, 'expense');
    
    return Object.keys(incomeMonthly).map(month => ({
      month,
      income: incomeMonthly[month] / 1000,
      expenses: expenseMonthly[month] / 1000
    }));
  }, [incomeData, expenseData]);

  const recentActivityData = useMemo(() => {
    const combined = [...(incomeData?.income || []), ...(expenseData?.expense || [])];
    const monthlyMap = {};
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    combined.forEach(item => {
      const date = new Date(item.date);
      const month = months[date.getMonth()];
      monthlyMap[month] = (monthlyMap[month] || 0) + item.amount;
    });
    
    return months.map(month => ({
      month,
      amount: monthlyMap[month] || 0
    })).filter(item => item.amount > 0);
  }, [incomeData, expenseData]);

  const currentMonthTotal = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const combined = [...(incomeData?.income || []), ...(expenseData?.expense || [])];
    
    return combined
      .filter(item => new Date(item.date).getMonth() === currentMonth)
      .reduce((sum, item) => sum + item.amount, 0);
  }, [incomeData, expenseData]);

  const topCardsData = [
    {
      id: 1,
      title: "Debt",
      amount: `₹${totalDebt.toLocaleString('en-IN')}`,
      percentage: debtChange.percentage,
      trend: debtChange.trend,
      chartData: [
        { value: 30 }, { value: 45 }, { value: 35 }, { value: 50 }, 
        { value: 40 }, { value: 60 }, { value: 45 }, { value: 55 }
      ],
      color: "#EF4444"
    },
    {
      id: 2,
      title: "Borrowed",
      amount: `₹${totalBorrowed.toLocaleString('en-IN')}`,
      percentage: borrowChange.percentage,
      trend: borrowChange.trend,
      chartData: [
        { value: 20 }, { value: 35 }, { value: 30 }, { value: 45 }, 
        { value: 50 }, { value: 40 }, { value: 55 }, { value: 60 }
      ],
      color: "#F59E0B"
    },
    {
      id: 3,
      title: "Income",
      amount: `₹${totalIncome.toLocaleString('en-IN')}`,
      percentage: incomeChange.percentage,
      trend: incomeChange.trend,
      chartData: [
        { value: 25 }, { value: 30 }, { value: 40 }, { value: 35 }, 
        { value: 50 }, { value: 45 }, { value: 60 }, { value: 55 }
      ],
      color: "#10B981"
    },
    {
      id: 4,
      title: "Expenses",
      amount: `₹${totalExpense.toLocaleString('en-IN')}`,
      percentage: expenseChange.percentage,
      trend: expenseChange.trend,
      chartData: [
        { value: 30 }, { value: 40 }, { value: 35 }, { value: 50 }, 
        { value: 45 }, { value: 55 }, { value: 50 }, { value: 60 }
      ],
      color: "#3B82F6",
      hasCircle: true,
      circleValue: totalExpense > 0 ? `${Math.min(Math.round((totalExpense / (totalIncome || 1)) * 100), 100)}%` : "0%"
    }
  ]

  const transactions = useMemo(() => {
    if (!paymentData?.payments) return [];
    return paymentData.payments.slice(0, 5).map((payment, index) => ({
      id: payment._id,
      name: payment.paymentMethod,
      type: payment.description || 'Online Payment',
      amount: `₹${payment.amount.toLocaleString('en-IN')}`,
      time: new Date(payment.date).toLocaleDateString('en-IN'),
      icon: payment.paymentMethod.charAt(0).toUpperCase(),
      color: payment.status === 'Success' ? 'bg-green-500' : payment.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500',
      fullData: payment
    }));
  }, [paymentData]);

  const handleDeletePayment = async (id) => {
    try {
      await deletePayment(id).unwrap();
      toast.success('Payment deleted successfully!');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to delete');
    }
  };

  const handleViewPayment = (transaction) => {
    setViewData(transaction.fullData);
    setIsViewOpen(true);
  };

  const handleEditPayment = (transaction) => {
    setEditData(transaction.fullData);
    setIsEditOpen(true);
  };

  return (
    <div className={`${darkThemeColor} flex min-h-screen bg-gray-50 dark:bg-gray-900`}>
      <Sidebar />

      <div className='flex-1 md:ml-72 overflow-x-hidden'>
        <div className='max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <DeshboardNavbar />

          {/* Top 4 Cards with Mini Charts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {topCardsData.map((card) => (
              <div key={card.id} className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{card.title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{card.amount}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {card.trend === "up" ? (
                        <TrendingUp className="w-3 h-3 text-green-500" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-500" />
                      )}
                      <span className={`text-xs ${card.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                        {card.percentage}
                      </span>
                    </div>
                  </div>
                  
                  {/* Mini Chart or Circle */}
                  {card.hasCircle ? (
                    <div className="relative w-16 h-16">
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle cx="32" cy="32" r="28" stroke="#E5E7EB" strokeWidth="6" fill="none" />
                        <circle 
                          cx="32" 
                          cy="32" 
                          r="28" 
                          stroke="#14B8A6" 
                          strokeWidth="6" 
                          fill="none"
                          strokeDasharray={`${77 * 1.76} ${100 * 1.76}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{card.circleValue}</span>
                      </div>
                    </div>
                  ) : (
                    <div style={{ width: 96, height: 48, minWidth: 96, minHeight: 48 }}>
                      <ResponsiveContainer>
                        <LineChart data={card.chartData}>
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke={card.color} 
                            strokeWidth={2} 
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Financial Statistics & Recent Activities */}
            <div className="lg:col-span-2 space-y-6">
              {/* Financial Statistics */}
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Financial statistics</h2>
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                      <span className="text-gray-600 dark:text-gray-400">Income</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      <span className="text-gray-600 dark:text-gray-400">Expenses</span>
                    </div>
                  </div>
                </div>
                <div style={{ width: '100%', height: 250, minHeight: 250 }}>
                  <ResponsiveContainer>
                    <BarChart data={financialStatsData} barGap={0}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                    <XAxis dataKey="month" stroke="#9CA3AF" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#9CA3AF" tick={{ fontSize: 11 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: 'none', 
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Bar dataKey="income" fill="#14B8A6" radius={[4, 4, 0, 0]} barSize={18} />
                    <Bar dataKey="expenses" fill="#D1D5DB" radius={[4, 4, 0, 0]} barSize={18} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent activities</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Current month</p>
                  </div>
                  <button className="text-sm text-teal-600 dark:text-teal-400 hover:underline">View more</button>
                </div>
                <div className="mb-4">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">₹{currentMonthTotal.toLocaleString('en-IN')}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
                </div>
                <div style={{ width: '100%', height: 180, minHeight: 180 }}>
                  <ResponsiveContainer>
                    <AreaChart data={recentActivityData}>
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7DD3C0" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#7DD3C0" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#9CA3AF" tick={{ fontSize: 11 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: 'none', 
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#14B8A6" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorAmount)" 
                    />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Right Column - Online Payment Form & Last Transactions */}
            <div className="space-y-6">
              {/* Online Payment Form */}
              <AddOnlinePayment />

              {/* Last Transactions */}
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Last transaction</h2>
                </div>
                
                <div className="space-y-4">
                  {transactions.length > 0 ? transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${transaction.color} rounded-lg flex items-center justify-center text-white text-sm font-semibold`}>
                          {transaction.icon}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white text-sm">{transaction.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{transaction.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">{transaction.amount}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{transaction.time}</p>
                        </div>
                        <div className="flex gap-1">
                          <button 
                            onClick={() => handleViewPayment(transaction)}
                            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition"
                            title="View"
                          >
                            <Eye size={14} className="text-gray-600 dark:text-gray-400" />
                          </button>
                          <button 
                            onClick={() => handleEditPayment(transaction)}
                            className="p-1.5 hover:bg-teal-100 dark:hover:bg-teal-900/30 rounded-full transition"
                            title="Edit"
                          >
                            <Edit size={14} className="text-[#257c8a]" />
                          </button>
                          <button 
                            onClick={() => handleDeletePayment(transaction.id)}
                            className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full transition"
                            title="Delete"
                          >
                            <Trash2 size={14} className="text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-4">No transactions yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* View Payment Sheet */}
          <Sheet open={isViewOpen} onOpenChange={setIsViewOpen}>
            <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
              <SheetTitle className="sr-only">Payment Details</SheetTitle>
              <SheetDescription className="sr-only">Online payment transaction details</SheetDescription>
              {viewData && (
                <div className="p-6">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Payment Details</h2>
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Payment Method</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{viewData.paymentMethod}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Transaction ID</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{viewData.transactionId}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Amount</p>
                      <p className="text-2xl font-bold text-green-600">₹{viewData.amount.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Status</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        viewData.status === 'Success' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 
                        viewData.status === 'Pending' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' : 
                        'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {viewData.status}
                      </span>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Date</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{new Date(viewData.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Description</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{viewData.description || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>

          {/* Edit Payment Sheet */}
          <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
            <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
              <SheetTitle className="sr-only">Edit Payment</SheetTitle>
              <SheetDescription className="sr-only">Edit online payment transaction</SheetDescription>
              <AddOnlinePayment 
                editData={editData} 
                updatePayment={updatePayment}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}

export default DeshBord
