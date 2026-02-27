import { useState } from "react";
import Sidebar from "../Shared/SideBar";
import { User, Bell, Lock, Globe, Palette, Database } from "lucide-react";
import DarkMode from "../ui/DarkMode";
import { darkThemeColor } from "../DarkLiteMood/ThemeProvider";
import DeshboardNavbar from "./DeshboardNavbar";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { HandleMessageUISuccess, HandleMessageUIError } from '../DarkLiteMood/ThemeProvider';
import { useChangePasswordMutation, useUpdateProfileMutation } from "@/redux/api/userApi";
import { setUser } from "@/redux/authSlice";

const Settings = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [changePassword, { isLoading }] = useChangePasswordMutation();
    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
    
    const [formData, setFormData] = useState({
        fullName: user?.fullName || user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [settings, setSettings] = useState({
        emailNotifications: true,
        pushNotifications: false,
        monthlyReports: true,
        currency: "INR",
        language: "English",
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = async () => {
        if (!formData.fullName || !formData.email) {
            toast.error("Name and email are required!", HandleMessageUIError());
            return;
        }
        
        try {
            const response = await updateProfile({
                fullName: formData.fullName,
                email: formData.email,
                phoneNumber: formData.phoneNumber
            }).unwrap();
            
            dispatch(setUser(response.user));
            toast.success(response.message || "Profile updated successfully!", HandleMessageUISuccess());
        } catch (error) {
            toast.error(error?.data?.message || "Failed to update profile", HandleMessageUIError());
        }
    };

    const handleChangePassword = async () => {
        if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
            toast.error("All password fields are required!", HandleMessageUIError());
            return;
        }
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("New passwords do not match!", HandleMessageUIError());
            return;
        }
        if (formData.newPassword.length < 6) {
            toast.error("Password must be at least 6 characters!", HandleMessageUIError());
            return;
        }
        
        try {
            const response = await changePassword({
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            }).unwrap();
            
            toast.success(response.message || "Password changed successfully!", HandleMessageUISuccess());
            setFormData({ ...formData, currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (error) {
            toast.error(error?.data?.message || "Failed to change password", HandleMessageUIError());
        }
    };

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
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="9876543210"
                                />
                            </div>
                        </div>
                            <button 
                                onClick={handleUpdateProfile}
                                disabled={isUpdating}
                                className="bg-[#257c8a] hover:bg-[#1f6a77] text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isUpdating ? "Updating..." : "Update Profile"}
                            </button>
                        </div>
                    </div>

                    {/* Security */}
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 mt-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Lock className="text-[#257c8a]" size={28} />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Security</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Current Password</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleInputChange}
                                    className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="Enter current password"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                    className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="Confirm new password"
                                />
                            </div>
                        </div>
                        <button 
                            onClick={handleChangePassword} 
                            disabled={isLoading}
                            className="w-full md:w-auto bg-[#257c8a] hover:bg-[#1f6a77] text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Changing..." : "Change Password"}
                        </button>
                    </div>
                    </div>

                    {/* Notifications */}
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 mt-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Bell className="text-[#257c8a]" size={28} />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notifications</h2>
                    </div>
                    <p className="text-sm text-yellow-600 dark:text-yellow-400 mb-4 italic">⚠️ This feature is coming soon - Currently static</p>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">Email Notifications</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates via email</p>
                            </div>
                            <input type="checkbox" checked={settings.emailNotifications} className="w-5 h-5" disabled />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">Push Notifications</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Get instant alerts</p>
                            </div>
                            <input type="checkbox" checked={settings.pushNotifications} className="w-5 h-5" disabled />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">Monthly Reports</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Receive monthly summaries</p>
                            </div>
                            <input type="checkbox" checked={settings.monthlyReports} className="w-5 h-5" disabled />
                        </div>
                    </div>
                    </div>

                    {/* Preferences */}
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 mt-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Globe className="text-[#257c8a]" size={28} />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Preferences</h2>
                    </div>
                    <p className="text-sm text-yellow-600 dark:text-yellow-400 mb-4 italic">⚠️ This feature is coming soon - Currently static</p>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Currency</label>
                                <select className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 text-gray-900 dark:text-white" disabled>
                                    <option>USD ($)</option>
                                    <option>EUR (€)</option>
                                    <option>INR (₹)</option>
                                    <option>GBP (£)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Language</label>
                                <select className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 text-gray-900 dark:text-white" disabled>
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
                    <p className="text-sm text-yellow-600 dark:text-yellow-400 mb-4 italic">⚠️ This feature is coming soon - Currently static</p>
                    <div className="space-y-4">
                        <button className="w-full md:w-auto bg-[#257c8a] hover:bg-[#1f6a77] text-white px-6 py-2 rounded-lg" disabled>
                            Export Data
                        </button>
                        <button className="w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg ml-0 md:ml-3" disabled>
                            Import Data
                        </button>
                        <button className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg ml-0 md:ml-3" disabled>
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
