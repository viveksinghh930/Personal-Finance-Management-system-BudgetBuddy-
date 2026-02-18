import mongoose from "mongoose";

const debtSchema = new mongoose.Schema({
    lender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    borrowerName: { type: String, required: true },
    amount: { type: Number, required: true },
    paidAmount: { type: Number, default: 0 },
    startDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, enum: ["pending", "partially paid", "paid", "overdue"], default: "pending" }
}, { timestamps: true });

export const Debt = mongoose.model('Debt', debtSchema);
