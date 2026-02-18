import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema({
    borrower: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    lenderName: { type: String, required: true },
    amount: { type: Number, required: true },
    paidAmount: { type: Number, default: 0 },
    interestType: { type: String, enum: ["simple", "compound"], required: true },
    interestRate: { type: Number, required: true },
    timePeriod: { type: String, required: true },
    startDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    paymentMethod: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["borrowed", "partially paid", "paid", "overdue"], default: "borrowed" }
}, { timestamps: true });
export const Borrow = mongoose.model('Borrow', borrowSchema);
