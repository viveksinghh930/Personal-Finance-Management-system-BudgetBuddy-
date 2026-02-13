import { useState } from "react";
import Sidebar from "../Shared/SideBar";
import { User, Bell, Lock, Globe, Palette, Database } from "lucide-react";
import DarkMode from "../ui/DarkMode";
import { darkThemeColor } from "../DarkLiteMood/ThemeProvider";
import DeshboardNavbar from "./DeshboardNavbar";

const Settings = () => {
    const [settings, setSettings] = useState({
        emailNotifications: true,
        pushNotifications: false,
        monthlyReports: true,
        currency: "USD",
        language: "English",
    });

    return (
        <div className={`${darkThemeColor} flex min-h-screen md:ml-72 bg-gray-50 dark:bg-gray-900`}>
            <Sidebar />
            <div className="flex-1 overflow-x-hidden">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <DeshboardNavbar
                        title="Settings"
                        subtitle="Manage your account and preferences"
                    />

                    {/* Profile Settings */}
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-6">
                            <User className="text-[#257c8a]" size={28} />
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile Settings</h2>
                        </div>
                        <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Email</label>
                                <input
                                    type="email"
                                    className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 text-gray-900 dark:text-white"
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
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 mt-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Bell className="text-[#257c8a]" size={28} />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notifications</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">Email Notifications</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates via email</p>
                            </div>
                            <input type="checkbox" checked={settings.emailNotifications} className="w-5 h-5" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">Push Notifications</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Get instant alerts</p>
                            </div>
                            <input type="checkbox" checked={settings.pushNotifications} className="w-5 h-5" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">Monthly Reports</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Receive monthly summaries</p>
                            </div>
                            <input type="checkbox" checked={settings.monthlyReports} className="w-5 h-5" />
                        </div>
                    </div>
                    </div>

                    {/* Security */}
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 mt-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Lock className="text-[#257c8a]" size={28} />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Security</h2>
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
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 mt-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Globe className="text-[#257c8a]" size={28} />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Preferences</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Currency</label>
                                <select className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 text-gray-900 dark:text-white">
                                    <option>USD ($)</option>
                                    <option>EUR (€)</option>
                                    <option>INR (₹)</option>
                                    <option>GBP (£)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Language</label>
                                <select className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 text-gray-900 dark:text-white">
                                    <option>English</option>
                                    <option>Hindi</option>
                                    <option>Spanish</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    </div>

                    {/* Appearance */}
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 mt-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Palette className="text-[#257c8a]" size={28} />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Appearance</h2>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-white">Dark Mode</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark/light theme</p>
                        </div>
                        <DarkMode />
                    </div>
                    </div>

                    {/* Data Management */}
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 mt-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Database className="text-[#257c8a]" size={28} />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Data Management</h2>
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
        </div>

    );
};

export default Settings;
