import Sidebar from "../Shared/SideBar";
import { BarChart, TrendingUp, PieChart, Activity } from "lucide-react";
import { darkThemeColor } from "../DarkLiteMood/ThemeProvider";
import DeshboardNavbar from "./DeshboardNavbar";

const Analytics = () => {
    return (
        <div className={`${darkThemeColor} flex min-h-screen md:ml-72 bg-gray-50 dark:bg-gray-900`}>
            <Sidebar />
            <div className="flex-1 overflow-x-hidden">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <DeshboardNavbar 
                        title="Analytics" 
                        subtitle="Detailed insights into your financial patterns" 
                    />
                    
                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Avg Monthly Income</p>
                                <h2 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">$12,450</h2>
                            </div>
                            <TrendingUp className="text-green-500" size={32} />
                        </div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Avg Monthly Expense</p>
                                <h2 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">$8,320</h2>
                            </div>
                            <Activity className="text-red-500" size={32} />
                        </div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Highest Expense</p>
                                <h2 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">Food</h2>
                            </div>
                            <PieChart className="text-orange-500" size={32} />
                        </div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Growth Rate</p>
                                <h2 className="text-2xl font-bold mt-2 text-green-600">+12.5%</h2>
                            </div>
                            <BarChart className="text-blue-500" size={32} />
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Income vs Expense Trend</h2>
                        <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                            <p className="text-gray-500 dark:text-gray-400">Line Chart</p>
                        </div>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Expense by Category</h2>
                        <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                            <p className="text-gray-500 dark:text-gray-400">Pie Chart</p>
                        </div>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Monthly Comparison</h2>
                        <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                            <p className="text-gray-500 dark:text-gray-400">Bar Chart</p>
                        </div>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Savings Growth</h2>
                        <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                            <p className="text-gray-500 dark:text-gray-400">Area Chart</p>
                        </div>
                    </div>
                </div>

                {/* Insights */}
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 mt-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Financial Insights</h2>
                    <div className="space-y-4">
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                            <p className="font-semibold text-green-800 dark:text-green-300">Great Job!</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Your savings increased by 15% this month</p>
                        </div>
                        <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                            <p className="font-semibold text-orange-800 dark:text-orange-300">Watch Out</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Food expenses are 20% higher than last month</p>
                        </div>
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                            <p className="font-semibold text-blue-800 dark:text-blue-300">Tip</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">You can save $200 more by reducing shopping expenses</p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        
    );
};

export default Analytics;
