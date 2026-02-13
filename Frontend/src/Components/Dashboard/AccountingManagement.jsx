import { useState } from "react";
import Sidebar from "../Shared/SideBar";
import { TrendingUp, TrendingDown, DollarSign, Users } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import AddBorrow from "./AddBorrow";
import { AddDebt } from "./AddDebt";

const AccountingManagement = () => {
    const [activeTab, setActiveTab] = useState("debt");
    const [isAddOpen, setIsAddOpen] = useState(false);

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6 space-y-6 overflow-auto">
                <div>
                    <h1 className="text-3xl font-bold">Accounting Dashboard</h1>
                    <p className="text-gray-600 dark:text-gray-400">Manage your borrowings and debts in one place</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">TOTAL DEBT (OWED)</p>
                                <h2 className="text-4xl font-bold mt-2">$14,250.00</h2>
                            </div>
                            <div className="bg-red-100 dark:bg-red-900 p-3 rounded-lg">
                                <TrendingDown className="text-red-600" size={28} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-600 dark:text-gray-400">Repayment Progress</span>
                                <span className="font-semibold text-[#257c8a]">45% Paid</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div className="bg-[#257c8a] h-2 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">TOTAL BORROWED (LENT OUT)</p>
                                <h2 className="text-4xl font-bold mt-2">$8,230.00</h2>
                            </div>
                            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                                <TrendingUp className="text-green-600" size={28} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-600 dark:text-gray-400">Recovery Progress</span>
                                <span className="font-semibold text-green-600">72% Collected</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{ width: '72%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* New Entry Section */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2">New Entry</h2>
                        <p className="text-gray-600 dark:text-gray-400">Record a debt or a loan transaction</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-4 mb-6">
                        <button
                            onClick={() => setActiveTab("debt")}
                            className={`px-6 py-2 rounded-lg font-semibold transition ${
                                activeTab === "debt"
                                    ? "bg-[#257c8a] text-white"
                                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            }`}
                        >
                            Record Debt
                        </button>
                        <button
                            onClick={() => setActiveTab("loan")}
                            className={`px-6 py-2 rounded-lg font-semibold transition ${
                                activeTab === "loan"
                                    ? "bg-[#257c8a] text-white"
                                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            }`}
                        >
                            Record Loan
                        </button>
                    </div>

                    {/* Add Button */}
                    <button
                        onClick={() => setIsAddOpen(true)}
                        className="w-full bg-[#257c8a] hover:bg-[#1f6a77] text-white font-bold py-4 rounded-lg transition flex items-center justify-center gap-2"
                    >
                        <span className="text-2xl">+</span>
                        <span>Create Entry</span>
                    </button>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Recent Activity</h2>
                        <button className="text-[#257c8a] hover:underline">View Full Report →</button>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b">
                                <tr className="text-left text-gray-600 dark:text-gray-400 text-sm">
                                    <th className="pb-3">COUNTERPARTY</th>
                                    <th className="pb-3">NATURE</th>
                                    <th className="pb-3">DUE DATE</th>
                                    <th className="pb-3">AMOUNT</th>
                                    <th className="pb-3">STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-[#257c8a] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                                                AM
                                            </div>
                                            <div>
                                                <p className="font-semibold">Alice Morgan</p>
                                                <p className="text-sm text-gray-500">Business</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                                            DEBT (OWED)
                                        </span>
                                    </td>
                                    <td className="py-4 text-gray-700 dark:text-gray-300">Dec 28, 2023</td>
                                    <td className="py-4 font-bold text-lg">$2,500.00</td>
                                    <td className="py-4">
                                        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                                            Outstanding
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="5" className="text-center py-8 text-gray-500">No more transactions</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add Form Sheet */}
                <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
                        {activeTab === "loan" ? (
                            <AddBorrow onClose={() => setIsAddOpen(false)} />
                        ) : (
                            <AddDebt onClose={() => setIsAddOpen(false)} />
                        )}
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
};

export default AccountingManagement;
