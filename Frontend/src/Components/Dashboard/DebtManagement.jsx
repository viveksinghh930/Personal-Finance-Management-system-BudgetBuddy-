import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Sidebar from "../Shared/SideBar";
import { AddDebt } from "./AddDebt";

const DebtManagement = () => {
    const [isAddDebtOpen, setIsAddDebtOpen] = useState(false);

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6 space-y-6 overflow-auto">
                <div>
                    <h1 className="text-3xl font-bold">Debt Management</h1>
                    <p className="text-gray-600 dark:text-gray-400">Track money others owe you</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total Lent</p>
                                <h2 className="text-3xl font-bold mt-2 text-red-600">$3,800.00</h2>
                            </div>
                            <div className="text-red-500 text-sm">5 Active</div>
                        </div>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Pending Collection</p>
                            <h2 className="text-3xl font-bold mt-2 text-orange-600">$1,500.00</h2>
                        </div>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Collected This Month</p>
                            <h2 className="text-3xl font-bold mt-2 text-blue-600">$600.00</h2>
                        </div>
                    </div>
                </div>

                {/* Add Debt Button */}
                <div className="flex justify-end">
                    <button
                        onClick={() => setIsAddDebtOpen(true)}
                        className="bg-[#257c8a] hover:bg-[#1f6a77] text-white px-6 py-3 rounded-lg font-semibold transition"
                    >
                        + Add New Debt
                    </button>
                </div>

                {/* Debt Visualization */}
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold mb-2">Debt Visualization</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Monthly breakdown of lent amounts</p>
                    <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded flex items-center justify-center">
                        <p className="text-gray-500">Chart will be displayed here</p>
                    </div>
                </div>

                {/* Debt Records Table */}
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Debt Records</h2>
                        <button className="text-[#257c8a] hover:underline">View All History →</button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Track all your lending transactions</p>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b">
                                <tr className="text-left text-gray-600 dark:text-gray-400">
                                    <th className="pb-3">BORROWER</th>
                                    <th className="pb-3">AMOUNT</th>
                                    <th className="pb-3">DATE</th>
                                    <th className="pb-3">DUE DATE</th>
                                    <th className="pb-3">STATUS</th>
                                    <th className="pb-3">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="6" className="text-center py-8 text-gray-500">No debt records found</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add Debt Sheet */}
                <Sheet open={isAddDebtOpen} onOpenChange={setIsAddDebtOpen}>
                    <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
                        <AddDebt onClose={() => setIsAddDebtOpen(false)} />
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
};

export default DebtManagement;
