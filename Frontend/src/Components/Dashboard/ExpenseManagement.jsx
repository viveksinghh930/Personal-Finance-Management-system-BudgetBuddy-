import { useState } from "react";
import { AddExpance } from "./AddExpance";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Sidebar from "../Shared/SideBar";
import { darkThemeColor } from "../DarkLiteMood/ThemeProvider";
import DeshboardNavbar from "./DeshboardNavbar";

const ExpenseManagement = () => {
    const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

    return (
        <div className={`${darkThemeColor} flex min-h-screen md:ml-72 bg-gray-50 dark:bg-gray-900`}>
            <Sidebar />
            <div className="flex-1 overflow-x-hidden">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <DeshboardNavbar 
                        title="Expense Management" 
                        subtitle="Track and manage your spending habits." 
                    />
                    
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Expenses</p>
                            <h2 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">$7,817.00</h2>
                            <p className="text-red-500 text-sm mt-1">↑ 2.7% higher than last month</p>
                        </div>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Budgets Left</p>
                            <h2 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">$2,333.00</h2>
                            <p className="text-green-500 text-sm mt-1">↑ 3.5% under budget</p>
                        </div>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Category Breakdown</p>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-700 dark:text-gray-300">Rent & Utilities</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">$3,500</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-700 dark:text-gray-300">Food & Dining</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">$1,950</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-700 dark:text-gray-300">Entertainment</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">$1,550</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add Expense Button */}
                <div className="flex justify-end mt-6">
                    <button
                        onClick={() => setIsAddExpenseOpen(true)}
                        className="bg-[#257c8a] hover:bg-[#1f6a77] text-white px-6 py-3 rounded-lg font-semibold transition"
                    >
                        + Add Expense
                    </button>
                </div>

                {/* Spending Trends */}
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 mt-6">
                    <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Spending Trends</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Last 6 months</p>
                    <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                        <p className="text-gray-500 dark:text-gray-400">Chart will be displayed here</p>
                    </div>
                </div>

                {/* All Expenses Table */}
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 mt-6">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">All Expenses</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Review your latest transactions</p>
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 dark:border-gray-700">
                                <tr className="text-left text-gray-600 dark:text-gray-400">
                                    <th className="pb-3">MERCHANT</th>
                                    <th className="pb-3">DATE</th>
                                    <th className="pb-3">CATEGORY</th>
                                    <th className="pb-3">AMOUNT</th>
                                    <th className="pb-3">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="5" className="text-center py-8 text-gray-500 dark:text-gray-400">No expense records found</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add Expense Sheet */}
                <Sheet open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
                    <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
                        <AddExpance onClose={() => setIsAddExpenseOpen(false)} />
                    </SheetContent>
                </Sheet>
                </div>
            </div>
        </div>
    );
};

export default ExpenseManagement;
