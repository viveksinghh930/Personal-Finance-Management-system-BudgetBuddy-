import { useState } from "react";
import Sidebar from "../Shared/SideBar";
import { User, Bell, Lock, Globe, Palette, Database } from "lucide-react";
import DarkMode from "../ui/DarkMode";

const Settings = () => {
    const [settings, setSettings] = useState({
        emailNotifications: true,
        pushNotifications: false,
        monthlyReports: true,
        currency: "USD",
        language: "English",
    });

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6 space-y-6 overflow-auto">
                <div>
                    <h1 className="text-3xl font-bold">Settings</h1>
                    <p className="text-gray-600 dark:text-gray-400">Manage your account and preferences</p>
                </div>

                {/* Profile Settings */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <div className="flex items-center gap-3 mb-6">
                        <User className="text-[#257c8a]" size={28} />
                        <h2 className="text-xl font-bold">Profile Settings</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Email</label>
                                <input
                                    type="email"
                                    className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>
                        <button className="bg-[#257c8a] hover:bg-[#1f6a77] text-white px-6 py-2 rounded-lg">
                            Update Profile
                        </button>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <div className="flex items-center gap-3 mb-6">
                        <Bell className="text-[#257c8a]" size={28} />
                        <h2 className="text-xl font-bold">Notifications</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold">Email Notifications</p>
                                <p className="text-sm text-gray-500">Receive updates via email</p>
                            </div>
                            <input type="checkbox" checked={settings.emailNotifications} className="w-5 h-5" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold">Push Notifications</p>
                                <p className="text-sm text-gray-500">Get instant alerts</p>
                            </div>
                            <input type="checkbox" checked={settings.pushNotifications} className="w-5 h-5" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold">Monthly Reports</p>
                                <p className="text-sm text-gray-500">Receive monthly summaries</p>
                            </div>
                            <input type="checkbox" checked={settings.monthlyReports} className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Security */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <div className="flex items-center gap-3 mb-6">
                        <Lock className="text-[#257c8a]" size={28} />
                        <h2 className="text-xl font-bold">Security</h2>
                    </div>
                    <div className="space-y-4">
                        <button className="w-full md:w-auto bg-[#257c8a] hover:bg-[#1f6a77] text-white px-6 py-2 rounded-lg">
                            Change Password
                        </button>
                        <button className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg ml-0 md:ml-3">
                            Enable 2FA
                        </button>
                    </div>
                </div>

                {/* Preferences */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <div className="flex items-center gap-3 mb-6">
                        <Globe className="text-[#257c8a]" size={28} />
                        <h2 className="text-xl font-bold">Preferences</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Currency</label>
                                <select className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700">
                                    <option>USD ($)</option>
                                    <option>EUR (€)</option>
                                    <option>INR (₹)</option>
                                    <option>GBP (£)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Language</label>
                                <select className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700">
                                    <option>English</option>
                                    <option>Hindi</option>
                                    <option>Spanish</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Appearance */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <div className="flex items-center gap-3 mb-6">
                        <Palette className="text-[#257c8a]" size={28} />
                        <h2 className="text-xl font-bold">Appearance</h2>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold">Dark Mode</p>
                            <p className="text-sm text-gray-500">Toggle dark/light theme</p>
                        </div>
                        <DarkMode />
                    </div>
                </div>

                {/* Data Management */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <div className="flex items-center gap-3 mb-6">
                        <Database className="text-[#257c8a]" size={28} />
                        <h2 className="text-xl font-bold">Data Management</h2>
                    </div>
                    <div className="space-y-4">
                        <button className="w-full md:w-auto bg-[#257c8a] hover:bg-[#1f6a77] text-white px-6 py-2 rounded-lg">
                            Export Data
                        </button>
                        <button className="w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg ml-0 md:ml-3">
                            Import Data
                        </button>
                        <button className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg ml-0 md:ml-3">
                            Delete All Data
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
