import { useState, useEffect } from "react";
import { toast } from "sonner";
import { HandleMessageUIError, HandleMessageUISuccess } from "../DarkLiteMood/ThemeProvider";
import { useAddBorrowMutation } from "@/redux/api/borrowApi";

const AddBorrow = ({ onClose, editData, updateBorrow }) => {
    const [formData, setFormData] = useState({
        lenderName: "",
        amount: "",
        interestType: "simple",
        interestRate: "",
        timePeriod: "",
        startDate: "",
        dueDate: "",
        paymentMethod: "UPI",
        paidAmount: "",
        status: "borrowed"
    });

    const [addBorrow, { isLoading }] = useAddBorrowMutation();
    const isEditMode = !!editData;

    useEffect(() => {
        if (editData) {
            setFormData({
                lenderName: editData.lenderName || "",
                amount: editData.amount || "",
                interestType: editData.interestType || "simple",
                interestRate: editData.interestRate || "",
                timePeriod: editData.timePeriod || "",
                startDate: editData.startDate?.split('T')[0] || "",
                dueDate: editData.dueDate?.split('T')[0] || "",
                paymentMethod: editData.paymentMethod || "UPI",
                paidAmount: editData.paidAmount || "",
                status: editData.status || "borrowed"
            });
        }
    }, [editData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (isEditMode) {
                const response = await updateBorrow({
                    id: editData._id,
                    lenderName: formData.lenderName,
                    amount: Number(formData.amount),
                    interestType: formData.interestType,
                    interestRate: Number(formData.interestRate),
                    timePeriod: Number(formData.timePeriod),
                    startDate: formData.startDate,
                    dueDate: formData.dueDate,
                    paymentMethod: formData.paymentMethod,
                    paidAmount: Number(formData.paidAmount) || 0,
                    status: formData.status
                }).unwrap();
                toast.success(response.message || "Borrow updated successfully!", HandleMessageUISuccess());
            } else {
                const response = await addBorrow({
                    lenderName: formData.lenderName,
                    amount: Number(formData.amount),
                    interestType: formData.interestType,
                    interestRate: Number(formData.interestRate),
                    timePeriod: Number(formData.timePeriod),
                    startDate: formData.startDate,
                    dueDate: formData.dueDate,
                    paymentMethod: formData.paymentMethod,
                    paidAmount: 0,
                    status: "borrowed"
                }).unwrap();
                toast.success(response.message || "Borrow added successfully!", HandleMessageUISuccess());
            }

            setFormData({
                lenderName: "",
                amount: "",
                interestType: "simple",
                interestRate: "",
                timePeriod: "",
                startDate: "",
                dueDate: "",
                paymentMethod: "UPI",
                paidAmount: "",
                status: "borrowed"
            });
            onClose?.();
        } catch (error) {
            toast.error(error?.data?.message || `Failed to ${isEditMode ? 'update' : 'add'} borrow`, HandleMessageUIError());
        }
    };

    const LabelStyle = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1";
    const InputStyle = "w-full p-2.5 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#257c8a] outline-none dark:bg-gray-700 dark:text-white rounded-md transition duration-200";

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{isEditMode ? 'Edit' : 'Add'} Borrow</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Record money you've lent to others</p>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className={LabelStyle}>Name</label>
                    <input
                        type="text"
                        name="lenderName"
                        value={formData.lenderName}
                        onChange={handleChange}
                        className={InputStyle}
                        required
                        placeholder="Who borrowed from you?"
                    />
                </div>

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
                        min="0"
                        step="0.01"
                    />
                </div>

                <div>
                    <label className={LabelStyle}>Interest Type</label>
                    <select
                        name="interestType"
                        value={formData.interestType}
                        onChange={handleChange}
                        className={InputStyle}
                        required
                    >
                        <option value="simple">Simple Interest</option>
                        <option value="compound">Compound Interest</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={LabelStyle}>Rate (%)</label>
                        <input
                            type="number"
                            name="interestRate"
                            value={formData.interestRate}
                            onChange={handleChange}
                            className={InputStyle}
                            required
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                        />
                    </div>
                    <div>
                        <label className={LabelStyle}>Time Period (Years)</label>
                        <input
                            type="number"
                            name="timePeriod"
                            value={formData.timePeriod}
                            onChange={handleChange}
                            className={InputStyle}
                            required
                            placeholder="1"
                            min="0"
                            step="0.1"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={LabelStyle}>Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
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
                            required
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
                        required
                    >
                        <option value="UPI">UPI</option>
                        <option value="Banking">Banking</option>
                        <option value="Cash">Cash</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {isEditMode && (
                    <>
                        <div>
                            <label className={LabelStyle}>Received Amount</label>
                            <input
                                type="number"
                                name="paidAmount"
                                value={formData.paidAmount}
                                onChange={handleChange}
                                className={InputStyle}
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className={LabelStyle}>Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className={InputStyle}
                            >
                                <option value="borrowed">Borrowed</option>
                                <option value="paid">Paid</option>
                                <option value="partially paid">Partially Paid</option>
                                <option value="overdue">Overdue</option>
                            </select>
                        </div>
                    </>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#257c8a] hover:bg-[#1b5d6a] text-white font-bold py-3 rounded-md transition duration-300 shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (isEditMode ? "Updating..." : "Adding...") : (isEditMode ? "Update Borrow" : "Add Borrow Record")}
                </button>
            </form>
        </div>
    );
};

export default AddBorrow;
