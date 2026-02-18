import Sidebar from "../Shared/SideBar";
import { darkThemeColor } from "../DarkLiteMood/ThemeProvider";
import DeshboardNavbar from "./DeshboardNavbar";
import { Bell, CheckCheck, Trash2, AlertCircle, Calendar } from "lucide-react";
import { useGetDebtsQuery } from "@/redux/api/debtApi";
import { useGetBorrowQuery } from "@/redux/api/borrowApi";
import { useMemo, useState } from "react";

const Notifications = () => {
    const { data: debtData } = useGetDebtsQuery();
    const { data: borrowData } = useGetBorrowQuery();
    const [readNotifications, setReadNotifications] = useState([]);
    const [deletedNotifications, setDeletedNotifications] = useState([]);
    const [filter, setFilter] = useState('all');

    const debts = debtData?.debts || [];
    const borrows = borrowData?.borrow || [];

    const allNotifications = useMemo(() => {
        const now = new Date();
        const notifs = [];

        debts.forEach(debt => {
            if (debt.status === 'paid') return;
            const dueDate = new Date(debt.dueDate);
            const diffTime = dueDate - now;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays >= 0 && diffDays <= 2) {
                const notifId = `debt-${debt._id}`;
                if (deletedNotifications.includes(notifId)) return;

                let title, time, color, bgColor;
                if (diffDays === 0) {
                    title = "Debt Payment Due Today";
                    time = "Today";
                    color = "text-red-600";
                    bgColor = "bg-red-100 dark:bg-red-900";
                } else if (diffDays === 1) {
                    title = "Debt Payment Due Tomorrow";
                    time = "Tomorrow";
                    color = "text-orange-600";
                    bgColor = "bg-orange-100 dark:bg-orange-900";
                } else {
                    title = "Upcoming Debt Payment";
                    time = "In 2 days";
                    color = "text-yellow-600";
                    bgColor = "bg-yellow-100 dark:bg-yellow-900";
                }

                notifs.push({
                    id: notifId,
                    title,
                    message: `Payment of ₹${debt.amount.toLocaleString()} to ${debt.borrowerName} is due ${time.toLowerCase()}`,
                    time,
                    read: readNotifications.includes(notifId),
                    color,
                    bgColor,
                    dueDate: debt.dueDate,
                    category: "debt",
                    priority: diffDays
                });
            }
        });

        borrows.forEach(borrow => {
            if (borrow.status === 'paid') return;
            const dueDate = new Date(borrow.dueDate);
            const diffTime = dueDate - now;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays >= 0 && diffDays <= 2) {
                const notifId = `borrow-${borrow._id}`;
                if (deletedNotifications.includes(notifId)) return;

                let title, time, color, bgColor;
                if (diffDays === 0) {
                    title = "Borrowed Amount Due Today";
                    time = "Today";
                    color = "text-red-600";
                    bgColor = "bg-red-100 dark:bg-red-900";
                } else if (diffDays === 1) {
                    title = "Borrowed Amount Due Tomorrow";
                    time = "Tomorrow";
                    color = "text-orange-600";
                    bgColor = "bg-orange-100 dark:bg-orange-900";
                } else {
                    title = "Upcoming Borrowed Amount";
                    time = "In 2 days";
                    color = "text-yellow-600";
                    bgColor = "bg-yellow-100 dark:bg-yellow-900";
                }

                notifs.push({
                    id: notifId,
                    title,
                    message: `Expected to receive ₹${borrow.amount.toLocaleString()} from ${borrow.lenderName} ${time.toLowerCase()}`,
                    time,
                    read: readNotifications.includes(notifId),
                    color,
                    bgColor,
                    dueDate: borrow.dueDate,
                    category: "borrow",
                    priority: diffDays
                });
            }
        });

        return notifs.sort((a, b) => a.priority - b.priority);
    }, [debts, borrows, readNotifications, deletedNotifications]);

    const notifications = filter === 'unread' 
        ? allNotifications.filter(n => !n.read) 
        : allNotifications;

    const unreadCount = allNotifications.filter(n => !n.read).length;
    const readCount = allNotifications.filter(n => n.read).length;

    const handleMarkAllRead = () => {
        setReadNotifications(allNotifications.map(n => n.id));
    };

    const handleMarkRead = (id) => {
        if (!readNotifications.includes(id)) {
            setReadNotifications([...readNotifications, id]);
        }
    };

    const handleDelete = (id) => {
        setDeletedNotifications([...deletedNotifications, id]);
    };

    const handleClearAll = () => {
        setDeletedNotifications(allNotifications.map(n => n.id));
    };

    return (
        <div className={`${darkThemeColor} flex min-h-screen md:ml-72 bg-gray-50 dark:bg-gray-900`}>
            <Sidebar />
            <div className="flex-1 overflow-x-hidden">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <DeshboardNavbar 
                        title="Notifications" 
                        subtitle="Stay updated with your financial activities" 
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Notifications</p>
                                    <h2 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{allNotifications.length}</h2>
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
                                    <h2 className="text-3xl font-bold mt-2 text-green-600">{readCount}</h2>
                                </div>
                                <CheckCheck className="text-green-600" size={32} />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-6">
                        <button 
                            onClick={handleMarkAllRead}
                            disabled={unreadCount === 0}
                            className="bg-[#257c8a] hover:bg-[#1f6a77] text-white px-6 py-3 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <CheckCheck size={20} />
                            Mark All as Read
                        </button>
                        <button 
                            onClick={handleClearAll}
                            disabled={allNotifications.length === 0}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Trash2 size={20} />
                            Clear All
                        </button>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Payment Reminders</h2>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => setFilter('all')}
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                                        filter === 'all' 
                                            ? 'bg-[#257c8a] text-white' 
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                    }`}
                                >
                                    All ({allNotifications.length})
                                </button>
                                <button 
                                    onClick={() => setFilter('unread')}
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                                        filter === 'unread' 
                                            ? 'bg-[#257c8a] text-white' 
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                    }`}
                                >
                                    Unread ({unreadCount})
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {notifications.map((notification) => (
                                <div 
                                    key={notification.id} 
                                    className={`flex items-start gap-4 p-4 rounded-lg border transition hover:shadow-md ${
                                        notification.read 
                                            ? 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600' 
                                            : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                                    }`}
                                >
                                    <div className={`${notification.bgColor} p-3 rounded-full`}>
                                        <AlertCircle className={notification.color} size={24} />
                                    </div>

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
                                                <div className="flex items-center gap-4">
                                                    <p className="text-xs text-gray-500 dark:text-gray-500">
                                                        {notification.time}
                                                    </p>
                                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                                        notification.category === 'debt' 
                                                            ? 'bg-red-100 dark:bg-red-900/30 text-red-600' 
                                                            : 'bg-green-100 dark:bg-green-900/30 text-green-600'
                                                    }`}>
                                                        {notification.category === 'debt' ? 'Debt (Owed)' : 'Borrowed (Given)'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                {!notification.read && (
                                                    <button 
                                                        onClick={() => handleMarkRead(notification.id)}
                                                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition"
                                                        title="Mark as read"
                                                    >
                                                        <CheckCheck size={18} className="text-green-600" />
                                                    </button>
                                                )}
                                                <button 
                                                    onClick={() => handleDelete(notification.id)}
                                                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} className="text-red-600" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {notifications.length === 0 && (
                            <div className="text-center py-12">
                                <Bell size={64} className="mx-auto text-gray-400 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    {filter === 'unread' ? 'No Unread Notifications' : 'No Upcoming Payments'}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {filter === 'unread' 
                                        ? 'All notifications have been read!' 
                                        : 'You have no debt or borrow payments due in the next 2 days!'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notifications;
