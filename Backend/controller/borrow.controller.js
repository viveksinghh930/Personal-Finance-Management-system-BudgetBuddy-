import { Borrow } from "../models/borrow.model.js";

const calculateInterest = (amount, interestType, interestRate, timePeriod) => {
    let totalAmount = 0;
    
    if (interestType === 'simple') {
        const simpleInterest = (amount * interestRate * timePeriod) / 100;
        totalAmount = amount + simpleInterest;
    } else if (interestType === 'compound') {
        totalAmount = amount * Math.pow(1 + (interestRate / 100), timePeriod);
    }
    
    return Math.floor(totalAmount);
};

export const addBorrow = async (req, resp) => {
    try {
        const { lenderName, amount, interestType, interestRate, timePeriod, startDate, dueDate, paymentMethod, paidAmount, status } = req.body;
        const userId = req.userId;

        if (!lenderName || !amount || !interestType || !interestRate || !timePeriod || !startDate || !dueDate || !paymentMethod) {
            return resp.status(400).json({ message: "Required fields missing", success: false });
        }

        if (!['simple', 'compound'].includes(interestType)) {
            return resp.status(400).json({ message: "Invalid interest type. Choose 'simple' or 'compound'", success: false });
        }

        const totalAmount = calculateInterest(amount, interestType, interestRate, timePeriod);

        const borrow = await Borrow.create({
            borrower: userId,
            lenderName,
            amount,
            interestType,
            interestRate,
            timePeriod,
            startDate,
            dueDate,
            paymentMethod,
            totalAmount,
            paidAmount: paidAmount || 0,
            status: status || "borrowed"
        });

        return resp.status(201).json({ message: "Borrow record added successfully", borrow, success: true });
    } catch (error) {
        return resp.status(500).json({ message: "Internal server error", success: false });
    }
};

export const getBorrowByID = async (req, resp) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return resp.status(400).json({ message: "User ID is missing", success: false });
        }

        const borrow = await Borrow.find({ borrower: userId });
        
        if (!borrow || borrow.length === 0) {
            return resp.status(404).json({ message: "No borrow records found", success: false });
        }
        
        return resp.status(200).json({ message: "Borrow records retrieved successfully", borrows: borrow, success: true });
    } catch (error) {
        return resp.status(500).json({ message: "Internal server error", success: false });
    }
}

export const updateBorrow = async (req, resp) => {
    try {
        const { lenderName, amount, interestType, interestRate, timePeriod, startDate, dueDate, paymentMethod, paidAmount, status } = req.body;

        if (!['simple', 'compound'].includes(interestType)) {
            return resp.status(400).json({ message: "Invalid interest type. Choose 'simple' or 'compound'", success: false });
        }

        const totalAmount = calculateInterest(amount, interestType, interestRate, timePeriod);

        const updateData = { lenderName, amount, interestType, interestRate, timePeriod, startDate, dueDate, paymentMethod, totalAmount, paidAmount, status };
        const borrowData = await Borrow.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!borrowData) {
            return resp.status(404).json({ message: "Borrow record not found", success: false });
        }

        return resp.status(200).json({ message: "Borrow record updated successfully", borrowData, success: true });
    } catch (error) {
        return resp.status(500).json({ message: "Internal server error", success: false });
    }
};

export const borrowDelete = async (req, resp) => {
    try {
        const deletedBorrow = await Borrow.findByIdAndDelete(req.params.id);
        
        if (!deletedBorrow) {
            return resp.status(404).json({ message: "Borrow record not found", success: false });
        }

        return resp.status(200).json({ message: "Borrow record deleted successfully", success: true });
    } catch (error) {
        return resp.status(500).json({ message: "Internal server error", success: false });
    }
}

export const calculateTotalBorrow = async (req, resp) => {
    try {
        const userId = req.userId;
        const userBorrow = await Borrow.find({ borrower: userId });

        if (!userBorrow || userBorrow.length === 0) {
            return resp.status(404).json({ message: "No borrow records found for this user", success: false });
        }

        const totalBorrow = userBorrow.reduce((sum, borrow) => sum + (borrow.amount || 0), 0);

        return resp.status(200).json({ message: "Total borrowed amount calculated successfully", totalBorrow, success: true });
    } catch (error) {
        return resp.status(500).json({ message: "Internal server error", success: false });
    }
};