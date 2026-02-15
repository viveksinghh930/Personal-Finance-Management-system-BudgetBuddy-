import React, { useState } from "react";
import CategorySelector from "./CategorySelector";
import { X } from "lucide-react";
import { useAddExpanceMutation } from "@/redux/api/expenseApi";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { HandleMessageUIError, HandleMessageUISuccess } from "../DarkLiteMood/ThemeProvider";
import { setLoading } from "@/redux/authSlice";
const AddExpance = ({ onClose }) => {

  const [formData, setFormData] = useState({
    amount: "",
    date: "",
    description: "",
    category: "",
    paymentMethod: "Cash",
  });
 const dispatch = useDispatch();
  const [addExpense, { isLoading }] = useAddExpanceMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Expense Data Submitted:", formData);

  try {
    dispatch(setLoading(true));
    const result = await addExpense(formData).unwrap();
    if (result.success) {
      toast.success(result.message,HandleMessageUISuccess());
      setFormData({
        amount:"",
        date:"",
        category:"",
        description:"",
        paymentMethod:"Cash",
      });
        if (onClose) onClose();
    }
    
  } catch (error) {
    console.error("Error adding expense:", error);
    toast.error(error?.data?.message || "Error adding expense",HandleMessageUIError());
    
  }
  finally {
    dispatch(setLoading(false));
  }
  };

  const LabelStyle = "block font-semibold text-gray-700 dark:text-gray-300";
  const InputStyle =
    "w-full p-2 border focus:ring focus:ring-[#257c8a] dark:bg-gray-700 dark:text-white rounded-md transition";

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Add Expense
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 flex-1">
        <AddComponent
          label="Amount"
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          LabelStyle={LabelStyle}
          InputStyle={InputStyle}
          required={true}
        />

        <AddComponent
          label="Date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          LabelStyle={LabelStyle}
          InputStyle={InputStyle}
          required={true}
        />

        <div>
          <label className={LabelStyle}>Payment Method:</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className={InputStyle}
          >
            <option value="Cash">Cash</option>
            <option value="Bank">Bank</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className={LabelStyle}>Category:</label>
          <CategorySelector
            type="Expense"
            value={formData.category}
            onChange={(value) => setFormData({ ...formData, category: value })}
          />
        </div>

        <AddComponent
          label="Description"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          LabelStyle={LabelStyle}
          InputStyle={`${InputStyle} h-20`}
          required={true}
        />

        <button
          type="submit"
          className="w-full bg-[#14B8A6] hover:bg-[#0d9488] text-white font-bold py-3 rounded-lg transition mt-6"
        >
            {isLoading ? "Adding..." : "Add Expense"}
        </button>
      </form>
    </div>
  );
};

const AddComponent = ({
  label,
  type,
  LabelStyle,
  name,
  value,
  onChange,
  InputStyle,
  required,
}) => {
  return (
    <div>
      <label className={LabelStyle}>{label}:</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={InputStyle}
        required={required}
      />
    </div>
  );
};

export { AddExpance, AddComponent };