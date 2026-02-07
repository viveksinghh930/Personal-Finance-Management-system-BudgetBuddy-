import React, { useState } from 'react'
import Sidebar from '../Shared/SideBar'
import { darkThemeColor } from '../DarkLiteMood/ThemeProvider'
import DeshboardNavbar from './DeshboardNavbar'
import { TrendingUp, TrendingDown, MoreVertical, Plus } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

const DeshBord = () => {
  // Top cards data with mini charts
  const topCardsData = [
    {
      id: 1,
      title: "Balance",
      amount: "$54,130.00",
      percentage: "12.2%",
      trend: "down",
      chartData: [
        { value: 30 }, { value: 45 }, { value: 35 }, { value: 50 }, 
        { value: 40 }, { value: 60 }, { value: 45 }, { value: 55 }
      ],
      color: "#EF4444"
    },
    {
      id: 2,
      title: "Savings",
      amount: "$2,333.00",
      percentage: "3.5%",
      trend: "up",
      chartData: [
        { value: 20 }, { value: 35 }, { value: 30 }, { value: 45 }, 
        { value: 50 }, { value: 40 }, { value: 55 }, { value: 60 }
      ],
      color: "#10B981"
    },
    {
      id: 3,
      title: "Income",
      amount: "$10,150.00",
      percentage: "2.8%",
      trend: "up",
      chartData: [
        { value: 25 }, { value: 30 }, { value: 40 }, { value: 35 }, 
        { value: 50 }, { value: 45 }, { value: 60 }, { value: 55 }
      ],
      color: "#10B981"
    },
    {
      id: 4,
      title: "Expenses",
      amount: "$7,817.00",
      percentage: "2.7%",
      trend: "up",
      chartData: [
        { value: 30 }, { value: 40 }, { value: 35 }, { value: 50 }, 
        { value: 45 }, { value: 55 }, { value: 50 }, { value: 60 }
      ],
      color: "#3B82F6",
      hasCircle: true,
      circleValue: "77%"
    }
  ]

  // Financial statistics bar chart data
  const financialStatsData = [
    { month: 'Jan', income: 40, expenses: 30 },
    { month: 'Feb', income: 45, expenses: 35 },
    { month: 'Mar', income: 50, expenses: 40 },
    { month: 'Apr', income: 55, expenses: 45 },
    { month: 'May', income: 60, expenses: 50 },
    { month: 'Jun', income: 55, expenses: 45 },
    { month: 'Jul', income: 65, expenses: 50 },
    { month: 'Aug', income: 60, expenses: 48 },
    { month: 'Sep', income: 70, expenses: 55 },
    { month: 'Oct', income: 65, expenses: 52 },
    { month: 'Nov', income: 75, expenses: 58 },
    { month: 'Dec', income: 80, expenses: 60 }
  ]

  // Recent activities area chart data
  const recentActivityData = [
    { month: 'Mar', amount: 3500 },
    { month: 'Apr', amount: 4000 },
    { month: 'May', amount: 4200 },
    { month: 'Jun', amount: 4100 },
    { month: 'Jul', amount: 4522 },
    { month: 'Aug', amount: 4800 },
    { month: 'Sep', amount: 5200 },
    { month: 'Oct', amount: 5500 },
    { month: 'Nov', amount: 5800 },
    { month: 'Dec', amount: 6000 }
  ]

  // Last transactions
  const transactions = [
    { id: 1, name: "Squarespace", type: "Subscription", amount: "$43.48", time: "20min ago", icon: "S", color: "bg-gray-200" },
    { id: 2, name: "PayPal", type: "Received money", amount: "$332.79", time: "52min ago", icon: "P", color: "bg-blue-500" },
    { id: 3, name: "Floyd Miles", type: "Send money", amount: "$19.89", time: "9h ago", icon: "FM", color: "bg-teal-500" },
    { id: 4, name: "Amazon", type: "Payment", amount: "$52.00", time: "20h ago", icon: "A", color: "bg-gray-800" },
    { id: 5, name: "Jerome Bell", type: "Send money", amount: "$62.91", time: "1d ago", icon: "JB", color: "bg-gray-200" }
  ]

  return (
    <div className={`${darkThemeColor} flex min-h-screen bg-gray-50 dark:bg-gray-900`}>
      <Sidebar />

      <div className='flex-1 overflow-x-hidden'>
        <div className='max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <DeshboardNavbar />

          {/* Top 4 Cards with Mini Charts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {topCardsData.map((card) => (
              <div key={card.id} className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
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
                    <div className="w-24 h-12">
                      <ResponsiveContainer width="100%" height="100%">
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
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Financial Statistics & Recent Activities */}
            <div className="xl:col-span-2 space-y-6">
              {/* Financial Statistics */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
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
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={financialStatsData} barGap={0}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                    <XAxis dataKey="month" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: 'none', 
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Bar dataKey="income" fill="#14B8A6" radius={[4, 4, 0, 0]} barSize={20} />
                    <Bar dataKey="expenses" fill="#D1D5DB" radius={[4, 4, 0, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Recent Activities */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent activities</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Last month</p>
                  </div>
                  <button className="text-sm text-teal-600 dark:text-teal-400 hover:underline">View more</button>
                </div>
                <div className="mb-4">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">$4,522.00</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">July 2023</p>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={recentActivityData}>
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7DD3C0" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#7DD3C0" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
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

            {/* Right Column - My Cards & Last Transactions */}
            <div className="space-y-6">
              {/* My Cards */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">My cards</h2>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Credit Card */}
                <div className="relative bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-6 text-white mb-4 overflow-hidden">
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm"></div>
                  </div>
                  <div className="mb-8">
                    <p className="text-sm opacity-80 mb-1">Credit</p>
                    <h3 className="text-xl font-semibold">Marvin McKinney</h3>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="text-lg tracking-wider">5242 - 4343 - 8348 - 4878</p>
                  </div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mb-16"></div>
                </div>

                {/* Add Card Button */}
                <button className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-6 flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 hover:border-teal-500 hover:text-teal-500 transition-colors">
                  <Plus className="w-5 h-5" />
                  <span>Add new card</span>
                </button>

                {/* Card Indicators */}
                <div className="flex justify-center gap-2 mt-4">
                  <div className="w-2 h-2 rounded-full bg-teal-600"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                </div>
              </div>

              {/* Last Transactions */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Last transaction</h2>
                  <button className="text-sm text-teal-600 dark:text-teal-400 hover:underline">View All</button>
                </div>
                
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${transaction.color} rounded-lg flex items-center justify-center text-white text-sm font-semibold`}>
                          {transaction.icon}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white text-sm">{transaction.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{transaction.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">{transaction.amount}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{transaction.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeshBord
