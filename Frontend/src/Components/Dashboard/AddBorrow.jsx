import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import axios from "axios";
import { INCOME_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { HandleMessageUIError, HandleMessageUISuccess } from "../DarkLiteMood/ThemeProvider";

const AddBorrow = ({ onClose }) => {
    const [formData, setFormData] = useState({
        lenderName: "",
        amount: "",
        date: "",
        dueDate: "",
        interestRate: "",
        description: "",
        paymentMethod: "UPI",
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const response = await axios.post(`${INCOME_API_END_POINT}/addBorrow`, formData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });
            if (response.data.success) {
                toast.success(response.data.message, HandleMessageUISuccess());
                setFormData({ lenderName: "", amount: "", date: "", dueDate: "", interestRate: "", description: "", paymentMethod: "UPI" });
                onClose && onClose();
            }
        } catch (error) {
            console.log("Network Error", error);
            toast.error(error?.response?.data?.message || "Something went wrong", HandleMessageUIError());
        } finally {
            dispatch(setLoading(false));
        }
    };

    const LabelStyle = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1";
    const InputStyle = "w-full p-2.5 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#257c8a] outline-none dark:bg-gray-700 dark:text-white rounded-md transition duration-200";

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Add Borrow</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Record money you've borrowed</p>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className={LabelStyle}>Lender Name</label>
                    <input
                        type="text"
                        name="lenderName"
                        value={formData.lenderName}
                        onChange={handleChange}
                        className={InputStyle}
                        required
                        placeholder="Who did you borrow from?"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className={LabelStyle}>Amount</label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className={InputStyle}
                            required
                            placeholder="0.00"
                        />
                    </div>

                    <div>
                        <label className={LabelStyle}>Interest Rate (%)</label>
                        <input
                            type="number"
                            name="interestRate"
                            value={formData.interestRate}
                            onChange={handleChange}
                            className={InputStyle}
                            placeholder="0.00"
                            step="0.01"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className={LabelStyle}>Borrow Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className={InputStyle}
                            required
                        />
                    </div>

                    <div>
                        <label className={LabelStyle}>Due Date</label>
                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            className={InputStyle}
                        />
                    </div>
                </div>

                <div>
                    <label className={LabelStyle}>Payment Method</label>
                    <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        className={InputStyle}
                    >
                        <option value="UPI">UPI</option>
                        <option value="Banking">Banking</option>
                        <option value="Cash">Cash</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label className={LabelStyle}>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className={`${InputStyle} h-28 resize-none`}
                        required
                        placeholder="Purpose of borrowing..."
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#257c8a] hover:bg-[#1b5d6a] text-white font-bold py-3 rounded-md transition duration-300 shadow-md active:scale-[0.98]"
                >
                    Add Borrow Record
                </button>
            </form>
        </div>
    );
};

export default AddBorrow;
