import { OnlinePayment } from "../models/onlinePayment.model.js";

export const addOnlinePayment = async (req, res) => {
    try {
        const { paymentMethod, transactionId, amount, description, status, date } = req.body;
        const userId = req.id;

        const payment = await OnlinePayment.create({
            userId,
            paymentMethod,
            transactionId,
            amount,
            description,
            status,
            date
        });

        return res.status(201).json({
            success: true,
            message: "Payment added successfully",
            payment
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getPaymentsByUserId = async (req, res) => {
    try {
        const userId = req.id;
        const payments = await OnlinePayment.find({ userId }).sort({ date: -1 });

        return res.status(200).json({
            success: true,
            payments
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        await OnlinePayment.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Payment deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
