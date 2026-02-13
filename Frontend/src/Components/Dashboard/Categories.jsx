import { useState } from "react";
import Sidebar from "../Shared/SideBar";
import { Tag, Plus, Edit, Trash2 } from "lucide-react";

const Categories = () => {
    const [categories] = useState([
        { id: 1, name: "Salary", type: "Income", color: "#10b981", count: 12 },
        { id: 2, name: "Food", type: "Expense", color: "#ef4444", count: 45 },
        { id: 3, name: "Transport", type: "Expense", color: "#f59e0b", count: 28 },
        { id: 4, name: "Shopping", type: "Expense", color: "#8b5cf6", count: 15 },
        { id: 5, name: "Freelance", type: "Income", color: "#06b6d4", count: 8 },
    ]);

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6 space-y-6 overflow-auto">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Categories</h1>
                        <p className="text-gray-600 dark:text-gray-400">Manage your income and expense categories</p>
                    </div>
                    <button className="bg-[#257c8a] hover:bg-[#1f6a77] text-white px-6 py-3 rounded-lg flex items-center gap-2">
                        <Plus size={20} />
                        Add Category
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Categories</p>
                        <h2 className="text-3xl font-bold mt-2">{categories.length}</h2>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Income Categories</p>
                        <h2 className="text-3xl font-bold mt-2 text-green-600">
                            {categories.filter(c => c.type === "Income").length}
                        </h2>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Expense Categories</p>
                        <h2 className="text-3xl font-bold mt-2 text-red-600">
                            {categories.filter(c => c.type === "Expense").length}
                        </h2>
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <div key={category.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div 
                                        className="w-12 h-12 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: category.color + '20' }}
                                    >
                                        <Tag style={{ color: category.color }} size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{category.name}</h3>
                                        <p className="text-sm text-gray-500">{category.type}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 dark:text-gray-400">{category.count} transactions</span>
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                                        <Edit size={18} className="text-[#257c8a]" />
                                    </button>
                                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                                        <Trash2 size={18} className="text-red-500" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Categories;
