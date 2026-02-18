import { Debt } from "../models/debt.model.js";

export const addDebt = async (req, resp) => {
    try {
        const { borrowerName, amount, startDate, dueDate, paymentMethod, paidAmount, status } = req.body;
        const userId = req.userId;

        if (!borrowerName || !amount || !startDate || !dueDate || !paymentMethod) {
            return resp.status(400).json({ message: "Required fields missing", success: false });
        }

        const debt = await Debt.create({
            lender: userId,
            borrowerName,
            amount,
            paidAmount: paidAmount || 0,
            startDate,
            dueDate,
            paymentMethod,
            status: status || "pending"
        });

        return resp.status(201).json({ message: "Debt added successfully", debt, success: true });
    } catch (error) {
        return resp.status(500).json({ message: "Internal server error", success: false });
    }
};

export const getDebtByID = async (req, resp) => {
    try {
        const userId = req.userId;
        const debts = await Debt.find({ lender: userId });
        return resp.status(200).json({ message: "Debts retrieved successfully", debts, success: true });
    } catch (error) {
        return resp.status(500).json({ message: "Internal server error", success: false });
    }
};

export const updateDebt = async (req, resp) => {
    try {
        const debt = await Debt.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!debt) return resp.status(404).json({ message: "Debt not found", success: false });
        return resp.status(200).json({ message: "Debt updated successfully", debt, success: true });
    } catch (error) {
        return resp.status(500).json({ message: "Internal server error", success: false });
    }
};

export const deleteDebt = async (req, resp) => {
    try {
        const debt = await Debt.findByIdAndDelete(req.params.id);
        if (!debt) return resp.status(404).json({ message: "Debt not found", success: false });
        return resp.status(200).json({ message: "Debt deleted successfully", success: true });
    } catch (error) {
        return resp.status(500).json({ message: "Internal server error", success: false });
    }
};

export const getDebtStats = async (req, resp) => {
    try {
        const userId = req.userId;
        const debts = await Debt.find({ lender: userId });
        
        const totalAmount = debts.reduce((sum, d) => sum + d.amount, 0);
        const totalPaid = debts.reduce((sum, d) => sum + d.paidAmount, 0);
        const remaining = totalAmount - totalPaid;
        
        const nextDue = debts
            .filter(d => d.status !== "paid" && new Date(d.dueDate) > new Date())
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0];

        return resp.status(200).json({
            totalAmount,
            totalPaid,
            remaining,
            nextDueDate: nextDue?.dueDate || null,
            success: true
        });
    } catch (error) {
        return resp.status(500).json({ message: "Internal server error", success: false });
    }
};
