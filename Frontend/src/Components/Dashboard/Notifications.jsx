import Sidebar from "../Shared/SideBar";
import { darkThemeColor } from "../DarkLiteMood/ThemeProvider";
import DeshboardNavbar from "./DeshboardNavbar";
import { Bell, CheckCheck, Trash2, DollarSign, TrendingUp, AlertCircle, Info } from "lucide-react";

const Notifications = () => {
    const notifications = [
        {
            id: 1,
            type: "success",
            icon: CheckCheck,
            title: "Payment Received",
            message: "You received $332.79 from PayPal",
            time: "5 minutes ago",
            read: false,
            color: "text-green-600",
            bgColor: "bg-green-100 dark:bg-green-900"
        },
        {
            id: 2,
            type: "info",
            icon: DollarSign,
            title: "New Income Added",
            message: "Freelance payment of $1,250 has been recorded",
            time: "1 hour ago",
            read: false,
            color: "text-blue-600",
            bgColor: "bg-blue-100 dark:bg-blue-900"
        },
        {
            id: 3,
            type: "warning",
            icon: AlertCircle,
            title: "Budget Alert",
            message: "You've spent 85% of your monthly food budget",
            time: "3 hours ago",
            read: false,
            color: "text-orange-600",
            bgColor: "bg-orange-100 dark:bg-orange-900"
        },
        {
            id: 4,
            type: "success",
            icon: TrendingUp,
            title: "Savings Goal Achieved",
            message: "Congratulations! You've reached your savings goal of $5,000",
            time: "1 day ago",
            read: true,
            color: "text-green-600",
            bgColor: "bg-green-100 dark:bg-green-900"
        },
        {
            id: 5,
            type: "info",
            icon: Info,
            title: "Monthly Report Ready",
            message: "Your financial report for December is now available",
            time: "2 days ago",
            read: true,
            color: "text-blue-600",
            bgColor: "bg-blue-100 dark:bg-blue-900"
        },
        {
            id: 6,
            type: "warning",
            icon: AlertCircle,
            title: "Debt Payment Due",
            message: "Payment of $2,500 to Alice Morgan is due in 3 days",
            time: "3 days ago",
            read: true,
            color: "text-orange-600",
            bgColor: "bg-orange-100 dark:bg-orange-900"
        }
    ];

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className={`${darkThemeColor} flex min-h-screen md:ml-72 bg-gray-50 dark:bg-gray-900`}>
            <Sidebar />
            <div className="flex-1 overflow-x-hidden">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <DeshboardNavbar 
                        title="Notifications" 
                        subtitle="Stay updated with your financial activities" 
                    />

                    {/* Notification Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Notifications</p>
                                    <h2 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{notifications.length}</h2>
                                </div>
                                <Bell className="text-[#257c8a]" size={32} />
                            </div>
                        </div>

                        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Unread</p>
                                    <h2 className="text-3xl font-bold mt-2 text-orange-600">{unreadCount}</h2>
                                </div>
                                <AlertCircle className="text-orange-600" size={32} />
                            </div>
                        </div>

                        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Read</p>
                                    <h2 className="text-3xl font-bold mt-2 text-green-600">{notifications.length - unreadCount}</h2>
                                </div>
                                <CheckCheck className="text-green-600" size={32} />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 mb-6">
                        <button className="bg-[#257c8a] hover:bg-[#1f6a77] text-white px-6 py-3 rounded-lg flex items-center gap-2">
                            <CheckCheck size={20} />
                            Mark All as Read
                        </button>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center gap-2">
                            <Trash2 size={20} />
                            Clear All
                        </button>
                    </div>

                    {/* Notifications List */}
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">All Notifications</h2>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-[#257c8a] text-white rounded-lg text-sm">All</button>
                                <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm">Unread</button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {notifications.map((notification) => {
                                const IconComponent = notification.icon;
                                return (
                                    <div 
                                        key={notification.id} 
                                        className={`flex items-start gap-4 p-4 rounded-lg border transition hover:shadow-md ${
                                            notification.read 
                                                ? 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600' 
                                                : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                                        }`}
                                    >
                                        {/* Icon */}
                                        <div className={`${notification.bgColor} p-3 rounded-full`}>
                                            <IconComponent className={notification.color} size={24} />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                        {notification.title}
                                                        {!notification.read && (
                                                            <span className="ml-2 inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                                                        )}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                        {notification.message}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-500">
                                                        {notification.time}
                                                    </p>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex gap-2">
                                                    {!notification.read && (
                                                        <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg">
                                                            <CheckCheck size={18} className="text-green-600" />
                                                        </button>
                                                    )}
                                                    <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg">
                                                        <Trash2 size={18} className="text-red-600" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Empty State (if no notifications) */}
                        {notifications.length === 0 && (
                            <div className="text-center py-12">
                                <Bell size={64} className="mx-auto text-gray-400 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Notifications</h3>
                                <p className="text-gray-600 dark:text-gray-400">You're all caught up!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notifications;
