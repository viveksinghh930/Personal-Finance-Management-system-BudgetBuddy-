import React, { useState, useEffect } from 'react';
import { useAddPaymentMutation } from '@/redux/api/paymentApi';
import { toast } from 'sonner';
import { HandleMessageUISuccess, HandleMessageUIError } from '../DarkLiteMood/ThemeProvider';

const AddOnlinePayment = ({ editData, updatePayment }) => {
    const [formData, setFormData] = useState({
        paymentMethod: '',
        transactionId: '',
        amount: '',
        description: '',
        status: 'Success',
        date: new Date().toISOString().split('T')[0]
    });

    const [addPayment, { isLoading }] = useAddPaymentMutation();

    useEffect(() => {
        if (editData) {
            setFormData({
                paymentMethod: editData.paymentMethod || '',
                transactionId: editData.transactionId || '',
                amount: editData.amount || '',
                description: editData.description || '',
                status: editData.status || 'Success',
                date: editData.date ? new Date(editData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
            });
        }
    }, [editData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editData && updatePayment) {
                const result = await updatePayment({ id: editData._id, data: { ...formData, amount: Number(formData.amount) } }).unwrap();
                if (result.success) {
                    toast.success('Payment updated successfully!', HandleMessageUISuccess());
                    setFormData({
                        paymentMethod: '',
                        transactionId: '',
                        amount: '',
                        description: '',
                        status: 'Success',
                        date: new Date().toISOString().split('T')[0]
                    });
                }
            } else {
                const result = await addPayment({
                    ...formData,
                    amount: Number(formData.amount)
                }).unwrap();
                
                if (result.success) {
                    toast.success(result.message, HandleMessageUISuccess());
                    setFormData({
                        paymentMethod: '',
                        transactionId: '',
                        amount: '',
                        description: '',
                        status: 'Success',
                        date: new Date().toISOString().split('T')[0]
                    });
                }
            }
        } catch (error) {
            toast.error(error?.data?.message || 'Failed to process payment', HandleMessageUIError());
        }
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{editData ? 'Edit Payment' : 'Add Online Payment'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Payment Method
                    </label>
                    <input
                        type="text"
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        placeholder="UPI, Net Banking, etc."
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Transaction ID
                    </label>
                    <input
                        type="text"
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleChange}
                        placeholder="TXN123456789"
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Amount
                    </label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="0.00"
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                    </label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Payment description"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Status
                    </label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="Success">Success</option>
                        <option value="Pending">Pending</option>
                        <option value="Failed">Failed</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Date
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                >
                    {isLoading ? (editData ? 'Updating...' : 'Adding...') : (editData ? 'Update Payment' : 'Add Payment')}
                </button>
            </form>
        </div>
    );
};

export default AddOnlinePayment;
