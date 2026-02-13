import { useState } from "react";
import { AddIncome } from "./AddIncome";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Sidebar from "../Shared/SideBar";

const IncomeManagement = () => {
    const [isAddIncomeOpen, setIsAddIncomeOpen] = useState(false);

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6 space-y-6 overflow-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">Income Management</h1>
                <p className="text-gray-600 dark:text-gray-400">Detailed breakdown of your earnings and sources.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Income (MTD)</p>
                            <h2 className="text-3xl font-bold mt-2">$12,450.00</h2>
                        </div>
                        <div className="text-green-500 text-sm">↑ 12.5%</div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">4 Sources</p>
                        <h2 className="text-3xl font-bold mt-2">Projected Income</h2>
                        <p className="text-2xl font-semibold mt-1">$15,200.00</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">82% Savings Rate</p>
                        <h2 className="text-3xl font-bold mt-2">Net Flow</h2>
                        <p className="text-2xl font-semibold text-green-500 mt-1">+$8,930.00</p>
                    </div>
                </div>
            </div>

            {/* Add Income Button */}
            <div className="flex justify-end">
                <button
                    onClick={() => setIsAddIncomeOpen(true)}
                    className="bg-[#257c8a] hover:bg-[#1f6a77] text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                    + Add New Income
                </button>
            </div>

            {/* Income Visualization */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-2">Income Visualization</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Monthly breakdown of revenue across all sources</p>
                {/* Chart placeholder - integrate with Recharts */}
                <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                    <p className="text-gray-500">Chart will be displayed here</p>
                </div>
            </div>

            {/* Income Sources Table */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Income Sources</h2>
                    <button className="text-[#257c8a] hover:underline">View All History →</button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Track performance by revenue channel</p>
                
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="border-b">
                            <tr className="text-left text-gray-600 dark:text-gray-400">
                                <th className="pb-3">SOURCE</th>
                                <th className="pb-3">CATEGORY</th>
                                <th className="pb-3">DATE</th>
                                <th className="pb-3">AMOUNT</th>
                                <th className="pb-3">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Table data will be populated from API */}
                            <tr>
                                <td colSpan="5" className="text-center py-8 text-gray-500">No income records found</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Income Sheet */}
            <Sheet open={isAddIncomeOpen} onOpenChange={setIsAddIncomeOpen}>
                <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
                    <AddIncome onClose={() => setIsAddIncomeOpen(false)} />
                </SheetContent>
            </Sheet>
            </div>
        </div>
    );
};

export default IncomeManagement;
