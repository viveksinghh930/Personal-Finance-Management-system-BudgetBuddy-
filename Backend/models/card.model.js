
import mongoose from 'mongoose'

const cardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    cardHolderName: String,
    bankName: String,
    last4Digits: String,
    cardType: { type: String, enum: ['Credit', 'Debit'] },
    razorpayCustomerId: String,
}, { timestamps: true })