import { useState } from "react";
import { Plus } from "lucide-react";

const CategorySelector = ({ type = "Income", value, onChange }) => {
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [customCategory, setCustomCategory] = useState("");

    const incomeCategories = [
        "Salary",
        "Freelance",
        "Business",
        "Investment",
        "Rental Income",
        "Other Income"
    ];

    const expenseCategories = [
        "Food & Dining",
        "Transportation",
        "Shopping",
        "Entertainment",
        "Bills & Utilities",
        "Healthcare",
        "Education",
        "Rent",
        "Other Expense"
    ];

    const categories = type === "Income" ? incomeCategories : expenseCategories;

    const handleCategoryChange = (e) => {
        const selectedValue = e.target.value;
        
        if (selectedValue === "custom") {
            setShowCustomInput(true);
            onChange("");
        } else {
            setShowCustomInput(false);
            onChange(selectedValue);
        }
    };

    const handleCustomCategorySubmit = () => {
        if (customCategory.trim()) {
            onChange(customCategory);
            setShowCustomInput(false);
            setCustomCategory("");
        }
    };

    return (
        <div className="space-y-3">
            <select
                value={showCustomInput ? "custom" : value}
                onChange={handleCategoryChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring focus:ring-[#257c8a]"
            >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
                <option value="custom" className="text-[#257c8a] font-semibold">
                    + Add New Category
                </option>
            </select>

            {showCustomInput && (
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder="Enter custom category name"
                        className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        autoFocus
                    />
                    <button
                        type="button"
                        onClick={handleCustomCategorySubmit}
                        className="bg-[#257c8a] hover:bg-[#1f6a77] text-white px-4 rounded-lg flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Add
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setShowCustomInput(false);
                            setCustomCategory("");
                        }}
                        className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 rounded-lg"
                    >
                        Cancel
                    </button>
                </div>
            )}

            <p className="text-xs text-gray-500 dark:text-gray-400">
                {showCustomInput 
                    ? "Enter a custom category name and click Add" 
                    : "Select from existing categories or add a new one"
                }
            </p>
        </div>
    );
};

export default CategorySelector;
