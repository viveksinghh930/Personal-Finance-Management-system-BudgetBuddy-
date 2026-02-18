import mongoose from 'mongoose';

const onlinePaymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: String,
    status: {
        type: String,
        enum: ['Success', 'Pending', 'Failed'],
        default: 'Success'
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export const OnlinePayment = mongoose.model('OnlinePayment', onlinePaymentSchema);
