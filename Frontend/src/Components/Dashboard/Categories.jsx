import { useState, useEffect } from "react";
import Sidebar from "../Shared/SideBar";
import { Tag, Plus, Edit, Trash2 } from "lucide-react";
import { darkThemeColor } from "../DarkLiteMood/ThemeProvider";
import DeshboardNavbar from "./DeshboardNavbar";
import { useGetIncomeQuery } from "@/redux/api/incomeApi";
import { useGetExpenseQuery } from "@/redux/api/expenseApi";
import { toast } from "sonner";
import { HandleMessageUISuccess } from '../DarkLiteMood/ThemeProvider';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    const { data: incomeData } = useGetIncomeQuery();
    const { data: expenseData } = useGetExpenseQuery();

    useEffect(() => {
        const incomeList = incomeData?.income || [];
        const expenseList = expenseData?.expense || [];

        const categoryMap = {};

        incomeList.forEach(item => {
            if (!categoryMap[item.category]) {
                categoryMap[item.category] = { name: item.category, type: "Income", count: 0, color: "#10b981" };
            }
            categoryMap[item.category].count++;
        });

        expenseList.forEach(item => {
            if (!categoryMap[item.category]) {
                categoryMap[item.category] = { name: item.category, type: "Expense", count: 0, color: "#ef4444" };
            }
            categoryMap[item.category].count++;
        });

        const categoriesArray = Object.values(categoryMap).map((cat, index) => ({
            id: index + 1,
            ...cat
        }));

        setCategories(categoriesArray);
    }, [incomeData, expenseData]);

    return (
        <div className={`${darkThemeColor} flex min-h-screen md:ml-72 bg-gray-50 dark:bg-gray-900`}>
            <Sidebar />
            <div className="flex-1 overflow-x-hidden">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <DeshboardNavbar 
                        title="Categories" 
                        subtitle="Manage your income and expense categories" 
                    />
                    
                    {/* Add Category Button */}
                    <div className="flex justify-end mb-6">
                        <button 
                            onClick={() => toast.info('Add Category feature coming soon!', HandleMessageUISuccess())}
                            className="bg-[#257c8a] hover:bg-[#1f6a77] text-white px-6 py-3 rounded-lg flex items-center gap-2"
                        >
                            <Plus size={20} />
                            Add Category
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Categories</p>
                            <h2 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{categories.length}</h2>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Income Categories</p>
                            <h2 className="text-3xl font-bold mt-2 text-green-600">
                                {categories.filter(c => c.type === "Income").length}
                            </h2>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Expense Categories</p>
                            <h2 className="text-3xl font-bold mt-2 text-red-600">
                                {categories.filter(c => c.type === "Expense").length}
                            </h2>
                        </div>
                    </div>

                    {/* Categories Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {categories.map((category) => (
                        <div key={category.id} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg transition">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div 
                                        className="w-12 h-12 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: category.color + '20' }}
                                    >
                                        <Tag style={{ color: category.color }} size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{category.name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{category.type}</p>
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
        </div>
    );
};

export default Categories;
