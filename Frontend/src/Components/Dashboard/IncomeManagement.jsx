import { useState } from "react";
import { AddIncome } from "./AddIncome";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import Sidebar from "../Shared/SideBar";
import { darkThemeColor } from "../DarkLiteMood/ThemeProvider";
import DeshboardNavbar from "./DeshboardNavbar";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useGetIncomeQuery, useDeleteIncomeMutation, useUpdateIncomeMutation } from "@/redux/api/incomeApi";
import ViewModeToggle from "../Shared/ViewModeToggle";
import useFinancialStats from "@/hooks/useFinancialStats";
import { Eye, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

const IncomeManagement = () => {
    const [isAddIncomeOpen, setIsAddIncomeOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [viewData, setViewData] = useState(null);
    const [viewMode, setViewMode] = useState('monthly');
    const [showAll, setShowAll] = useState(false);

    const { data, isLoading } = useGetIncomeQuery();
    const [deleteIncome] = useDeleteIncomeMutation();
    const [updateIncome] = useUpdateIncomeMutation();
    const incomeData = data?.income || [];

    const { stats, getChartData } = useFinancialStats(incomeData, viewMode, 'income');

    const displayedIncome = showAll ? incomeData : incomeData.slice(0, 8);

    const handleDelete = async (id) => {
        try {
            await deleteIncome(id).unwrap();
            toast.success('Income deleted successfully!');
        } catch (error) {
            toast.error(error?.data?.message || 'Failed to delete');
        }
    };

    const handleEdit = (item) => {
        setEditData(item);
        setIsEditOpen(true);
    };

    const handleView = (item) => {
        setViewData(item);
        setIsViewOpen(true);
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

    return (
        <div className={`${darkThemeColor} flex min-h-screen md:ml-72 bg-gray-50 dark:bg-gray-900`}>
            <Sidebar />
            <div className="flex-1 overflow-x-hidden">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <DeshboardNavbar 
                        title="Income Management" 
                        subtitle="Detailed breakdown of your earnings and sources." 
                    />
                    
                    {/* Toggle Button */}
                    <div className="flex justify-end mb-4">
                        <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total Income ({viewMode === 'monthly' ? 'Monthly' : 'Yearly'})</p>
                                <h2 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">₹{stats.total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                            </div>
                        </div>

                        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Average Income</p>
                                <h2 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">₹{stats.average.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Per transaction</p>
                            </div>
                        </div>

                        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Highest Income Source</p>
                                <h2 className="text-xl font-bold mt-2 text-gray-900 dark:text-white">{stats.highest.category}</h2>
                                <p className="text-2xl font-semibold text-green-500 mt-1">₹{stats.highest.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            </div>
                        </div>
                    </div>

                    {/* Add Income Button */}
                    <div className="flex justify-end mt-6">
                        <button
                            onClick={() => setIsAddIncomeOpen(true)}
                            className="bg-[#257c8a] hover:bg-[#1f6a77] text-white px-6 py-3 rounded-lg font-semibold transition"
                        >
                            + Add New Income
                        </button>
                    </div>

                    {/* Income Visualization - Combined Charts */}
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 mt-6">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Income Visualization</h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{viewMode === 'monthly' ? 'Monthly' : 'Yearly'} breakdown by category</p>
                            </div>
                            <div className="inline-flex rounded-lg border border-gray-300 dark:border-gray-600">
                                <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Bar Chart */}
                            <div>
                                <h3 className="text-md font-semibold mb-2 text-gray-800 dark:text-gray-200">Bar Chart</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={getChartData()}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                                        <Legend />
                                        <Bar dataKey="value" fill="#257c8a" name="Income" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            {/* Pie Chart */}
                            <div>
                                <h3 className="text-md font-semibold mb-2 text-gray-800 dark:text-gray-200">Pie Chart</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={getChartData()}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {getChartData().map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Income Sources Table */}
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 mt-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Income Sources</h2>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">All income transactions</p>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="border-b border-gray-200 dark:border-gray-700">
                                    <tr className="text-left text-gray-600 dark:text-gray-400 text-sm">
                                        <th className="pb-3">PAYMENT METHOD</th>
                                        <th className="pb-3">CATEGORY</th>
                                        <th className="pb-3">AMOUNT</th>
                                        <th className="pb-3">DATE</th>
                                        <th className="pb-3">DESCRIPTION</th>
                                        <th className="pb-3 text-center">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-800 dark:text-gray-200">
                                    {displayedIncome.length > 0 ? (
                                        displayedIncome.map((item) => (
                                            <tr key={item._id} className="border-b border-gray-200 dark:border-gray-700">
                                                <td className="py-3">{item.paymentMethod}</td>
                                                <td className="py-3">{item.category}</td>
                                                <td className="py-3 font-semibold text-green-600">₹{item.amount.toLocaleString('en-IN')}</td>
                                                <td className="py-3">{new Date(item.date).toLocaleDateString('en-IN')}</td>
                                                <td className="py-3 text-sm">{item.description || 'N/A'}</td>
                                                <td className="py-3">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button 
                                                            onClick={() => handleView(item)}
                                                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
                                                            title="View"
                                                        >
                                                            <Eye size={16} className="text-gray-600 dark:text-gray-400" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleEdit(item)}
                                                            className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-full transition"
                                                            title="Edit"
                                                        >
                                                            <Edit size={16} className="text-blue-600" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(item._id)}
                                                            className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full transition"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={16} className="text-red-600" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center py-8 text-gray-500 dark:text-gray-400">No income records found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {incomeData.length > 8 && (
                            <div className="mt-4 text-center">
                                <button
                                    onClick={() => setShowAll(!showAll)}
                                    className="px-6 py-2 bg-[#257c8a] hover:bg-[#1f6a77] text-white rounded-lg font-semibold transition"
                                >
                                    {showAll ? 'Show Less' : `Show All (${incomeData.length})`}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Add Income Sheet */}
                    <Sheet open={isAddIncomeOpen} onOpenChange={setIsAddIncomeOpen}>
                        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
                            <SheetTitle className="sr-only">Add Income</SheetTitle>
                            <SheetDescription className="sr-only">Add a new income transaction to your account</SheetDescription>
                            <AddIncome onClose={() => setIsAddIncomeOpen(false)} />
                        </SheetContent>
                    </Sheet>

                    {/* Edit Income Sheet */}
                    <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
                        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
                            <SheetTitle className="sr-only">Edit Income</SheetTitle>
                            <SheetDescription className="sr-only">Edit income transaction</SheetDescription>
                            <AddIncome 
                                onClose={() => {
                                    setIsEditOpen(false);
                                    setEditData(null);
                                }} 
                                editData={editData}
                                updateIncome={updateIncome}
                            />
                        </SheetContent>
                    </Sheet>

                    {/* View Income Sheet */}
                    <Sheet open={isViewOpen} onOpenChange={setIsViewOpen}>
                        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
                            <SheetTitle className="sr-only">View Details</SheetTitle>
                            <SheetDescription className="sr-only">Income transaction details</SheetDescription>
                            {viewData && (
                                <div className="p-6">
                                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Income Details</h2>
                                    <div className="space-y-4">
                                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Category</p>
                                            <p className="text-lg font-semibold text-gray-900 dark:text-white">{viewData.category}</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Amount</p>
                                            <p className="text-2xl font-bold text-green-600">₹{viewData.amount.toLocaleString('en-IN')}</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Payment Method</p>
                                            <p className="text-lg font-semibold text-gray-900 dark:text-white">{viewData.paymentMethod}</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Date</p>
                                            <p className="text-lg font-semibold text-gray-900 dark:text-white">{new Date(viewData.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Description</p>
                                            <p className="text-lg font-semibold text-gray-900 dark:text-white">{viewData.description || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    );
};

export default IncomeManagement;
