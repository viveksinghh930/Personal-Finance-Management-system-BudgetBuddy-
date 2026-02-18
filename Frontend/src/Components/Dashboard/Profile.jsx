import Sidebar from "../Shared/SideBar";
import { darkThemeColor } from "../DarkLiteMood/ThemeProvider";
import DeshboardNavbar from "./DeshboardNavbar";
import { User, Mail, Phone, Camera } from "lucide-react";
import { useSelector } from "react-redux";
import { useGetTotalIncomeQuery } from "@/redux/api/incomeApi";
import { useGetTotalExpenseQuery } from "@/redux/api/expenseApi";
import { useGetDebtStatsQuery } from "@/redux/api/debtApi";
import { useGetTotalBorrowQuery } from "@/redux/api/borrowApi";

const Profile = () => {
    const { user } = useSelector(store => store.auth);
    const { data: incomeData } = useGetTotalIncomeQuery();
    const { data: expenseData } = useGetTotalExpenseQuery();
    const { data: debtStats } = useGetDebtStatsQuery();
    const { data: borrowTotal } = useGetTotalBorrowQuery();

    const totalIncome = incomeData?.totalIncome || 0;
    const totalExpense = expenseData?.totalExpense || 0;
    const totalDebt = debtStats?.remaining || 0;
    const totalBorrow = borrowTotal?.totalBorrow || 0;

    const getInitials = (name) => {
        return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
    };

    if (!user) {
        return (
            <div className={`${darkThemeColor} flex min-h-screen md:ml-72 bg-gray-50 dark:bg-gray-900 items-center justify-center`}>
                <div className="text-gray-900 dark:text-white">Loading...</div>
            </div>
        );
    }
    return (
        <div className={`${darkThemeColor} flex min-h-screen md:ml-72 bg-gray-50 dark:bg-gray-900`}>
            <Sidebar />
            <div className="flex-1 overflow-x-hidden">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <DeshboardNavbar 
                        title="Profile" 
                        subtitle="Manage your personal information" 
                    />

                    {/* Profile Header Card */}
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center text-white text-4xl font-bold">
                                    {getInitials(user?.fullName || user?.fullname)}
                                </div>
                                <button className="absolute bottom-0 right-0 bg-[#257c8a] hover:bg-[#1f6a77] text-white p-2 rounded-full">
                                    <Camera size={20} />
                                </button>
                            </div>

                            {/* User Info */}
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    {user?.fullName || user?.fullname || 'User'}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">Finance Manager</p>
                                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                    <span className="px-4 py-2 bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 rounded-full text-sm font-semibold">
                                        {user?.isGoogleUser ? 'Google User' : 'Premium Member'}
                                    </span>
                                    <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold">
                                        Verified
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Personal Information */}
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <User size={24} className="text-[#257c8a]" />
                                Personal Information
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm text-gray-600 dark:text-gray-400">Full Name</label>
                                    <input 
                                        type="text" 
                                        value={user?.fullName || user?.fullname || ''}
                                        className="w-full mt-1 p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-600 dark:text-gray-400">Email Address</label>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Mail size={20} className="text-gray-500" />
                                        <input 
                                            type="email" 
                                            value={user?.email || ''}
                                            className="flex-1 p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-600 dark:text-gray-400">Phone Number</label>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Phone size={20} className="text-gray-500" />
                                        <input 
                                            type="tel" 
                                            value={user?.phoneNumber || 'Not provided'}
                                            className="flex-1 p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Account Statistics */}
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Account Statistics</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Income</p>
                                        <p className="text-2xl font-bold text-green-600">₹{totalIncome.toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Expenses</p>
                                        <p className="text-2xl font-bold text-red-600">₹{totalExpense.toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Debt (Owed)</p>
                                        <p className="text-2xl font-bold text-orange-600">₹{totalDebt.toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Borrowed (Given)</p>
                                        <p className="text-2xl font-bold text-blue-600">₹{totalBorrow.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
