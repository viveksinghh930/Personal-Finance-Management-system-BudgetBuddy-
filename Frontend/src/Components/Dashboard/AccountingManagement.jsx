// import { useState } from "react";
// import Sidebar from "../Shared/SideBar";
// import { TrendingUp, TrendingDown, DollarSign, Users } from "lucide-react";
// import { Sheet, SheetContent } from "@/components/ui/sheet";
// import AddBorrow from "./AddBorrow";
// import { AddDebt } from "./AddDebt";
// import { darkThemeColor } from "../DarkLiteMood/ThemeProvider";
// import DeshboardNavbar from "./DeshboardNavbar";

// const AccountingManagement = () => {
//     const [activeTab, setActiveTab] = useState("debt");
//     const [isAddOpen, setIsAddOpen] = useState(false);

//     return (
//         <div className={`${darkThemeColor} flex min-h-screen md:ml-72 bg-gray-50 dark:bg-gray-900`}>
//             <Sidebar />
//             <div className="flex-1 overflow-x-hidden">
//                 <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
//                     <DeshboardNavbar 
//                         title="Accounting Dashboard" 
//                         subtitle="Manage your borrowings and debts in one place" 
//                     />
                    
//                     {/* Stats Cards */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
//                         <div className="flex items-center justify-between mb-4">
//                             <div>
//                                 <p className="text-sm text-gray-600 dark:text-gray-400">TOTAL DEBT (OWED)</p>
//                                 <h2 className="text-4xl font-bold mt-2 text-gray-900 dark:text-white">$14,250.00</h2>
//                             </div>
//                             <div className="bg-red-100 dark:bg-red-900 p-3 rounded-lg">
//                                 <TrendingDown className="text-red-600" size={28} />
//                             </div>
//                         </div>
//                         <div className="mt-4">
//                             <div className="flex justify-between text-sm mb-2">
//                                 <span className="text-gray-600 dark:text-gray-400">Repayment Progress</span>
//                                 <span className="font-semibold text-[#257c8a]">45% Paid</span>
//                             </div>
//                             <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
//                                 <div className="bg-[#257c8a] h-2 rounded-full" style={{ width: '45%' }}></div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
//                         <div className="flex items-center justify-between mb-4">
//                             <div>
//                                 <p className="text-sm text-gray-600 dark:text-gray-400">TOTAL BORROWED (LENT OUT)</p>
//                                 <h2 className="text-4xl font-bold mt-2 text-gray-900 dark:text-white">$8,230.00</h2>
//                             </div>
//                             <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
//                                 <TrendingUp className="text-green-600" size={28} />
//                             </div>
//                         </div>
//                         <div className="mt-4">
//                             <div className="flex justify-between text-sm mb-2">
//                                 <span className="text-gray-600 dark:text-gray-400">Recovery Progress</span>
//                                 <span className="font-semibold text-green-600">72% Collected</span>
//                             </div>
//                             <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
//                                 <div className="bg-green-600 h-2 rounded-full" style={{ width: '72%' }}></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* New Entry Section */}
//                 <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 mt-6">
//                     <div className="mb-6">
//                         <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">New Entry</h2>
//                         <p className="text-gray-600 dark:text-gray-400">Record a debt or a loan transaction</p>
//                     </div>

//                     {/* Tabs */}
//                     <div className="flex gap-4 mb-6">
//                         <button
//                             onClick={() => setActiveTab("debt")}
//                             className={`px-6 py-2 rounded-lg font-semibold transition ${
//                                 activeTab === "debt"
//                                     ? "bg-[#257c8a] text-white"
//                                     : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
//                             }`}
//                         >
//                             Record Debt
//                         </button>
//                         <button
//                             onClick={() => setActiveTab("loan")}
//                             className={`px-6 py-2 rounded-lg font-semibold transition ${
//                                 activeTab === "loan"
//                                     ? "bg-[#257c8a] text-white"
//                                     : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
//                             }`}
//                         >
//                             Record Loan
//                         </button>
//                     </div>

//                     {/* Add Button */}
//                     <button
//                         onClick={() => setIsAddOpen(true)}
//                         className="w-full bg-[#257c8a] hover:bg-[#1f6a77] text-white font-bold py-4 rounded-lg transition flex items-center justify-center gap-2"
//                     >
//                         <span className="text-2xl">+</span>
//                         <span>Create Entry</span>
//                     </button>
//                 </div>

//                 {/* Recent Activity */}
//                 <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 mt-6">
//                     <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
//                         <button className="text-[#257c8a] hover:underline">View Full Report →</button>
//                     </div>
                    
//                     <div className="overflow-x-auto">
//                         <table className="w-full">
//                             <thead className="border-b border-gray-200 dark:border-gray-700">
//                                 <tr className="text-left text-gray-600 dark:text-gray-400 text-sm">
//                                     <th className="pb-3">COUNTERPARTY</th>
//                                     <th className="pb-3">NATURE</th>
//                                     <th className="pb-3">DUE DATE</th>
//                                     <th className="pb-3">AMOUNT</th>
//                                     <th className="pb-3">STATUS</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr className="border-b border-gray-200 dark:border-gray-700">
//                                     <td className="py-4">
//                                         <div className="flex items-center gap-3">
//                                             <div className="bg-[#257c8a] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
//                                                 AM
//                                             </div>
//                                             <div>
//                                                 <p className="font-semibold text-gray-900 dark:text-white">Alice Morgan</p>
//                                                 <p className="text-sm text-gray-500 dark:text-gray-400">Business</p>
//                                             </div>
//                                         </div>
//                                     </td>
//                                     <td className="py-4">
//                                         <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
//                                             DEBT (OWED)
//                                         </span>
//                                     </td>
//                                     <td className="py-4 text-gray-700 dark:text-gray-300">Dec 28, 2023</td>
//                                     <td className="py-4 font-bold text-lg text-gray-900 dark:text-white">$2,500.00</td>
//                                     <td className="py-4">
//                                         <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
//                                             Outstanding
//                                         </span>
//                                     </td>
//                                 </tr>
//                                 <tr>
//                                     <td colSpan="5" className="text-center py-8 text-gray-500 dark:text-gray-400">No more transactions</td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>

//                 {/* Add Form Sheet */}
//                 <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
//                     <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
//                         {activeTab === "loan" ? (
//                             <AddBorrow onClose={() => setIsAddOpen(false)} />
//                         ) : (
//                             <AddDebt onClose={() => setIsAddOpen(false)} />
//                         )}
//                     </SheetContent>
//                 </Sheet>
//                 </div>
//             </div>
//        </div>
//     );
// };

// export default AccountingManagement;

import { useState, useMemo } from "react";
import Sidebar from "../Shared/SideBar";
import { 
    TrendingUp, 
    TrendingDown, 
    Calendar, 
    Edit,
    Trash2,
    Filter,
    Eye
} from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/Components/ui/sheet";
import AddBorrow from "./AddBorrow";
import { AddDebt } from "./AddDebt";
import { darkThemeColor } from "../DarkLiteMood/ThemeProvider";
import DeshboardNavbar from "./DeshboardNavbar";
import { useGetDebtsQuery, useGetDebtStatsQuery, useDeleteDebtMutation, useUpdateDebtMutation } from "@/redux/api/debtApi";
import { useGetBorrowQuery, useGetTotalBorrowQuery, useDeleteBorrowMutation, useUpdateBorrowMutation } from "@/redux/api/borrowApi";
import { toast } from "sonner";

const AccountingManagement = () => {
    const [activeTab, setActiveTab] = useState("debt");
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [viewData, setViewData] = useState(null);
    const [typeFilter, setTypeFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [showAll, setShowAll] = useState(false);

    const { data: debtData } = useGetDebtsQuery();
    const { data: debtStats } = useGetDebtStatsQuery();
    const { data: borrowData } = useGetBorrowQuery();
    const { data: borrowTotal } = useGetTotalBorrowQuery();
    const [deleteDebt] = useDeleteDebtMutation();
    const [deleteBorrow] = useDeleteBorrowMutation();
    const [updateDebt] = useUpdateDebtMutation();
    const [updateBorrow] = useUpdateBorrowMutation();

    const debts = debtData?.debts || [];
    const borrows = borrowData?.borrows || [];

    const totalDebt = debtStats?.totalAmount || 0;
    const totalDebtPaid = debtStats?.totalPaid || 0;
    const debtRemaining = debtStats?.remaining || 0;
    const nextDueDate = debtStats?.nextDueDate;

    const totalBorrowed = borrowTotal?.totalBorrow || 0;
    const totalBorrowReceived = useMemo(() => {
        return borrows.reduce((sum, b) => sum + (b.paidAmount || 0), 0);
    }, [borrows]);
    const borrowRemaining = totalBorrowed - totalBorrowReceived;
    
    const nextBorrowDueDate = useMemo(() => {
        const upcomingBorrows = borrows
            .filter(b => b.status !== 'paid' && new Date(b.dueDate) > new Date())
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        return upcomingBorrows[0]?.dueDate || null;
    }, [borrows]);

    const allTransactions = useMemo(() => {
        const debtTrans = debts.map(d => ({ ...d, type: 'debt' }));
        const borrowTrans = borrows.map(b => ({ ...b, type: 'borrow' }));
        return [...debtTrans, ...borrowTrans].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }, [debts, borrows]);

    const filteredTransactions = useMemo(() => {
        return allTransactions.filter(t => {
            if (typeFilter !== 'all' && t.type !== typeFilter) return false;
            if (statusFilter !== 'all') {
                if (statusFilter === 'paid' && t.status !== 'paid') return false;
                if (statusFilter === 'unpaid' && t.status === 'paid') return false;
            }
            if (startDate && endDate) {
                const dueDate = new Date(t.dueDate);
                const start = new Date(startDate);
                const end = new Date(endDate);
                if (dueDate < start || dueDate > end) return false;
            }
            return true;
        });
    }, [allTransactions, typeFilter, statusFilter, startDate, endDate]);

    const displayedTransactions = showAll ? filteredTransactions : filteredTransactions.slice(0, 8);

    const handleDelete = async (id, type) => {
        try {
            if (type === 'debt') {
                await deleteDebt(id).unwrap();
                toast.success('Debt deleted successfully!');
            } else {
                await deleteBorrow(id).unwrap();
                toast.success('Borrow deleted successfully!');
            }
        } catch (error) {
            toast.error(error?.data?.message || 'Failed to delete');
        }
    };

    const handleEdit = (item) => {
        setEditData(item);
        setActiveTab(item.type);
        setIsEditOpen(true);
    };

    const handleView = (item) => {
        setViewData(item);
        setIsViewOpen(true);
    };

    return (
        <div className={`${darkThemeColor} flex min-h-screen md:ml-72 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
            <Sidebar />
            
            <div className="flex-1 overflow-x-hidden">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <DeshboardNavbar 
                        title="Accounting Dashboard" 
                        subtitle="Detailed tracking of your financial liabilities and assets" 
                    />

                    {/* --- STATS SECTION --- */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
                        
                        {/* DEBT SECTION (Money You Owe) */}
                        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <TrendingDown className="text-red-500" /> DEBT SUMMARY (OWED)
                                </h3>
                                <span className="text-xs font-mono bg-red-50 dark:bg-red-900/20 text-red-600 px-2 py-1 rounded">LIABILITY</span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Total Debt</p>
                                    <p className="text-xl font-bold">₹{totalDebt.toLocaleString('en-IN')}</p>
                                </div>
                                <div className="space-y-1 border-l pl-4 dark:border-gray-700">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Total Paid</p>
                                    <p className="text-xl font-bold text-green-500">₹{totalDebtPaid.toLocaleString('en-IN')}</p>
                                </div>
                                <div className="space-y-1 border-l pl-4 dark:border-gray-700">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Remaining</p>
                                    <p className="text-xl font-bold text-red-500">₹{debtRemaining.toLocaleString('en-IN')}</p>
                                </div>
                                <div className="space-y-1 border-l pl-4 dark:border-gray-700">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Next Due</p>
                                    <p className="text-sm font-semibold flex items-center gap-1">
                                        <Calendar size={14} /> {nextDueDate ? new Date(nextDueDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }) : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* BORROWED SECTION (Money Given to Others) */}
                        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <TrendingUp className="text-green-500" /> BORROWED SUMMARY (GIVEN)
                                </h3>
                                <span className="text-xs font-mono bg-green-50 dark:bg-green-900/20 text-green-600 px-2 py-1 rounded">ASSET</span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Total Given</p>
                                    <p className="text-xl font-bold">₹{totalBorrowed.toLocaleString('en-IN')}</p>
                                </div>
                                <div className="space-y-1 border-l pl-4 dark:border-gray-700">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Received</p>
                                    <p className="text-xl font-bold text-green-500">₹{totalBorrowReceived.toLocaleString('en-IN')}</p>
                                </div>
                                <div className="space-y-1 border-l pl-4 dark:border-gray-700">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Remaining</p>
                                    <p className="text-xl font-bold text-[#257c8a]">₹{borrowRemaining.toLocaleString('en-IN')}</p>
                                </div>
                                <div className="space-y-1 border-l pl-4 dark:border-gray-700">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Expected</p>
                                    <p className="text-sm font-semibold flex items-center gap-1">
                                        <Calendar size={14} /> {nextBorrowDueDate ? new Date(nextBorrowDueDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }) : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- COMPARISON CHART (Tailwind-based) --- */}
                    <div className="mt-6 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-bold mb-4">Debt vs Borrowed Comparison</h3>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Total Owed (Debt)</span>
                                    <span className="font-bold">₹{totalDebt.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="w-full bg-gray-100 dark:bg-gray-700 h-4 rounded-full overflow-hidden">
                                    <div className="bg-red-500 h-full rounded-full" style={{ width: `${totalDebt > 0 ? Math.min((totalDebt / (totalDebt + totalBorrowed)) * 100, 100) : 0}%` }}></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Total Receivable (Borrowed)</span>
                                    <span className="font-bold">₹{totalBorrowed.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="w-full bg-gray-100 dark:bg-gray-700 h-4 rounded-full overflow-hidden">
                                    <div className="bg-green-500 h-full rounded-full" style={{ width: `${totalBorrowed > 0 ? Math.min((totalBorrowed / (totalDebt + totalBorrowed)) * 100, 100) : 0}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- ACTIONS & FILTERS --- */}
                    <div className="mt-8 flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h2 className="text-xl font-bold">Recent Activity</h2>
                                    <p className="text-sm text-gray-500">Filter and manage transactions</p>
                                </div>
                                
                                <div className="flex flex-wrap gap-2">
                                    <div className="relative">
                                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <select 
                                            value={typeFilter}
                                            onChange={(e) => setTypeFilter(e.target.value)}
                                            className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#257c8a]"
                                        >
                                            <option value="all">All Types</option>
                                            <option value="debt">Debt (Owed)</option>
                                            <option value="borrow">Borrowed (Given)</option>
                                        </select>
                                    </div>
                                    <select 
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#257c8a]"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="paid">Given/Paid</option>
                                        <option value="unpaid">Not Given/Not Paid</option>
                                    </select>
                                    <input 
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        placeholder="Start Date"
                                        className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#257c8a]"
                                    />
                                    <input 
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        placeholder="End Date"
                                        className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#257c8a]"
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                        <thead>
                                        <tr className="border-b border-gray-100 dark:border-gray-700 text-gray-400 text-xs uppercase tracking-wider font-semibold">
                                            <th className="pb-4 px-2">Person / Type</th>
                                            <th className="pb-4 px-2">Payment Method</th>
                                            <th className="pb-4 px-2">Due Date</th>
                                            <th className="pb-4 px-2">Status</th>
                                            <th className="pb-4 px-2 text-right">Amount</th>
                                            <th className="pb-4 px-2 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                                        {displayedTransactions.length > 0 ? displayedTransactions.map((item) => (
                                            <tr key={item._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-colors">
                                                <td className="py-4 px-2">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-9 h-9 rounded-full ${item.type === 'debt' ? 'bg-red-500/10 text-red-600' : 'bg-green-500/10 text-green-600'} flex items-center justify-center font-bold text-xs`}>
                                                            {item.type === 'debt' ? item.borrowerName?.substring(0, 2).toUpperCase() : item.lenderName?.substring(0, 2).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-sm">{item.type === 'debt' ? item.borrowerName : item.lenderName}</p>
                                                            <p className={`text-[10px] font-bold uppercase ${item.type === 'debt' ? 'text-red-500' : 'text-green-600'}`}>
                                                                {item.type === 'debt' ? 'Debt (Owed)' : 'Borrowed (Given)'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-2 text-sm text-gray-500 font-medium">{item.paymentMethod || 'N/A'}</td>
                                                <td className="py-4 px-2 text-sm text-gray-500">{new Date(item.dueDate).toLocaleDateString('en-IN')}</td>
                                                <td className="py-4 px-2">
                                                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                                                        item.status === 'paid' 
                                                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600' 
                                                            : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600'
                                                    }`}>
                                                        {item.status === 'paid' ? (item.type === 'debt' ? 'Paid' : 'Given') : (item.type === 'debt' ? 'Not Paid' : 'Not Given')}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-2 text-right font-bold">₹{item.amount.toLocaleString('en-IN')}</td>
                                                <td className="py-4 px-2">
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
                                                            onClick={() => handleDelete(item._id, item.type)}
                                                            className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full transition"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={16} className="text-red-600" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="6" className="text-center py-8 text-gray-500 dark:text-gray-400">No transactions found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {filteredTransactions.length > 8 && (
                                <div className="mt-4 text-center">
                                    <button
                                        onClick={() => setShowAll(!showAll)}
                                        className="px-6 py-2 bg-[#257c8a] hover:bg-[#1f6a77] text-white rounded-lg font-semibold transition"
                                    >
                                        {showAll ? 'Show Less' : `Show All (${filteredTransactions.length})`}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* --- NEW ENTRY CARD --- */}
                        <div className="w-full lg:w-96 bg-gray-900 text-white p-6 rounded-xl shadow-xl border border-gray-800 self-start">
                            <h2 className="text-xl font-bold mb-2">New Entry</h2>
                            <p className="text-gray-400 text-sm mb-6">Select a type and create a record</p>
                            
                            <div className="flex p-1 bg-gray-800 rounded-lg mb-6">
                                <button 
                                    onClick={() => setActiveTab("debt")}
                                    className={`flex-1 py-2 text-sm rounded-md transition-all ${activeTab === "debt" ? "bg-[#257c8a] text-white shadow" : "text-gray-400 hover:text-white"}`}
                                >
                                    Debt
                                </button>
                                <button 
                                    onClick={() => setActiveTab("loan")}
                                    className={`flex-1 py-2 text-sm rounded-md transition-all ${activeTab === "loan" ? "bg-[#257c8a] text-white shadow" : "text-gray-400 hover:text-white"}`}
                                >
                                    Borrow
                                </button>
                            </div>

                            <button
                                onClick={() => setIsAddOpen(true)}
                                className="w-full bg-[#257c8a] hover:bg-[#1f6a77] py-4 rounded-xl font-bold flex items-center justify-center gap-2 group transition-all"
                            >
                                <span className="bg-white/20 p-1 rounded-md group-hover:scale-110 transition-transform">+</span>
                                <span>Create Entry</span>
                            </button>
                        </div>
                    </div>

                    {/* Add Form Sheet */}
                    <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
                        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto bg-white dark:bg-gray-900 border-l dark:border-gray-800">
                            <SheetTitle className="sr-only">Add {activeTab === 'loan' ? 'Borrow' : 'Debt'}</SheetTitle>
                            <SheetDescription className="sr-only">Add a new {activeTab === 'loan' ? 'borrow' : 'debt'} transaction</SheetDescription>
                            {activeTab === "loan" ? (
                                <AddBorrow onClose={() => setIsAddOpen(false)} />
                            ) : (
                                <AddDebt onClose={() => setIsAddOpen(false)} />
                            )}
                        </SheetContent>
                    </Sheet>

                    {/* Edit Form Sheet */}
                    <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
                        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto bg-white dark:bg-gray-900 border-l dark:border-gray-800">
                            <SheetTitle className="sr-only">Edit {editData?.type === 'borrow' ? 'Borrow' : 'Debt'}</SheetTitle>
                            <SheetDescription className="sr-only">Edit {editData?.type === 'borrow' ? 'borrow' : 'debt'} transaction</SheetDescription>
                            {editData?.type === "borrow" ? (
                                <AddBorrow 
                                    onClose={() => {
                                        setIsEditOpen(false);
                                        setEditData(null);
                                    }} 
                                    editData={editData}
                                    updateBorrow={updateBorrow}
                                />
                            ) : (
                                <AddDebt 
                                    onClose={() => {
                                        setIsEditOpen(false);
                                        setEditData(null);
                                    }} 
                                    editData={editData}
                                    updateDebt={updateDebt}
                                />
                            )}
                        </SheetContent>
                    </Sheet>

                    {/* View Details Sheet */}
                    <Sheet open={isViewOpen} onOpenChange={setIsViewOpen}>
                        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto bg-white dark:bg-gray-900 border-l dark:border-gray-800">
                            <SheetTitle className="sr-only">View Details</SheetTitle>
                            <SheetDescription className="sr-only">Transaction details</SheetDescription>
                            {viewData && (
                                <div className="p-6">
                                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                                        {viewData.type === 'debt' ? 'Debt Details' : 'Borrow Details'}
                                    </h2>
                                    <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
                                        {viewData.type === 'debt' ? 'Money you owe' : 'Money you lent'}
                                    </p>

                                    <div className="space-y-4">
                                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Name</p>
                                            <p className="text-lg font-semibold text-gray-900 dark:text-white">{viewData.type === 'debt' ? viewData.borrowerName : viewData.lenderName}</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Amount</p>
                                                <p className="text-lg font-semibold text-gray-900 dark:text-white">₹{viewData.amount.toLocaleString('en-IN')}</p>
                                            </div>
                                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{viewData.type === 'debt' ? 'Paid Amount' : 'Received Amount'}</p>
                                                <p className="text-lg font-semibold text-green-600">₹{(viewData.paidAmount || 0).toLocaleString('en-IN')}</p>
                                            </div>
                                        </div>

                                        {viewData.type === 'borrow' && (
                                            <>
                                                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Amount (with Interest)</p>
                                                    <p className="text-lg font-semibold text-[#257c8a]">₹{(viewData.totalAmount || 0).toLocaleString('en-IN')}</p>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Interest Type</p>
                                                        <p className="text-lg font-semibold capitalize text-gray-900 dark:text-white">{viewData.interestType}</p>
                                                    </div>
                                                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Interest Rate</p>
                                                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{viewData.interestRate}%</p>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Time Period</p>
                                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{viewData.timePeriod} Years</p>
                                                </div>
                                            </>
                                        )}

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Start Date</p>
                                                <p className="text-lg font-semibold text-gray-900 dark:text-white">{new Date(viewData.startDate).toLocaleDateString('en-IN')}</p>
                                            </div>
                                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Due Date</p>
                                                <p className="text-lg font-semibold text-gray-900 dark:text-white">{new Date(viewData.dueDate).toLocaleDateString('en-IN')}</p>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Payment Method</p>
                                            <p className="text-lg font-semibold text-gray-900 dark:text-white">{viewData.paymentMethod}</p>
                                        </div>

                                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Status</p>
                                            <span className={`inline-block text-sm px-3 py-1 rounded-full font-semibold ${
                                                viewData.status === 'paid' 
                                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600' 
                                                    : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600'
                                            }`}>
                                                {viewData.status === 'paid' ? (viewData.type === 'debt' ? 'Paid' : 'Given') : (viewData.type === 'debt' ? 'Not Paid' : 'Not Given')}
                                            </span>
                                        </div>

                                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Created On</p>
                                            <p className="text-lg font-semibold text-gray-900 dark:text-white">{new Date(viewData.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
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

export default AccountingManagement;
