import Sidebar from "../Shared/SideBar";
import { FileText, Download, Calendar, TrendingUp } from "lucide-react";

const Reports = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6 space-y-6 overflow-auto">
                <div>
                    <h1 className="text-3xl font-bold">Financial Reports</h1>
                    <p className="text-gray-600 dark:text-gray-400">Generate and download comprehensive financial reports</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Income</p>
                        <h2 className="text-2xl font-bold mt-2">$12,450.00</h2>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Expense</p>
                        <h2 className="text-2xl font-bold mt-2 text-red-600">$8,320.00</h2>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Net Savings</p>
                        <h2 className="text-2xl font-bold mt-2 text-green-600">$4,130.00</h2>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Savings Rate</p>
                        <h2 className="text-2xl font-bold mt-2">33.2%</h2>
                    </div>
                </div>

                {/* Report Types */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="text-[#257c8a]" size={28} />
                            <h2 className="text-xl font-bold">Monthly Report</h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">Complete overview of monthly transactions</p>
                        <button className="w-full bg-[#257c8a] hover:bg-[#1f6a77] text-white py-2 rounded-lg flex items-center justify-center gap-2">
                            <Download size={18} />
                            Download Report
                        </button>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <div className="flex items-center gap-3 mb-4">
                            <Calendar className="text-[#257c8a]" size={28} />
                            <h2 className="text-xl font-bold">Yearly Report</h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">Annual financial summary and trends</p>
                        <button className="w-full bg-[#257c8a] hover:bg-[#1f6a77] text-white py-2 rounded-lg flex items-center justify-center gap-2">
                            <Download size={18} />
                            Download Report
                        </button>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <div className="flex items-center gap-3 mb-4">
                            <TrendingUp className="text-[#257c8a]" size={28} />
                            <h2 className="text-xl font-bold">Category Report</h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">Spending breakdown by categories</p>
                        <button className="w-full bg-[#257c8a] hover:bg-[#1f6a77] text-white py-2 rounded-lg flex items-center justify-center gap-2">
                            <Download size={18} />
                            Download Report
                        </button>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="text-[#257c8a]" size={28} />
                            <h2 className="text-xl font-bold">Custom Report</h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">Generate custom date range reports</p>
                        <button className="w-full bg-[#257c8a] hover:bg-[#1f6a77] text-white py-2 rounded-lg flex items-center justify-center gap-2">
                            <Download size={18} />
                            Generate Report
                        </button>
                    </div>
                </div>

                {/* Recent Reports */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">Recent Reports</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b">
                                <tr className="text-left text-gray-600 dark:text-gray-400">
                                    <th className="pb-3">REPORT NAME</th>
                                    <th className="pb-3">DATE GENERATED</th>
                                    <th className="pb-3">TYPE</th>
                                    <th className="pb-3">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="4" className="text-center py-8 text-gray-500">No reports generated yet</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
