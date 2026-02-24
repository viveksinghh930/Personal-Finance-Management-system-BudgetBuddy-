import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.routes.js";
import incomeRoutes from "./routes/income.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import borrowRoutes from "./routes/borrow.routes.js";
import debtRoutes from "./routes/debt.routes.js";
import onlinePaymentRoutes from "./routes/onlinePayment.routes.js";
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();

// Middleware FIRST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: [
        'http://localhost:5173', 
        'http://localhost:3000', 
        'http://localhost:3001',
        'https://budget-buddy-nu-two.vercel.app',
        'https://personal-finance-management-system-weld.vercel.app'
    ],
    credentials: true,
}
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// Routes AFTER middleware
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

app.use('/api/user', userRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/borrow', borrowRoutes);
app.use('/api/debt', debtRoutes);
app.use('/api/payment', onlinePaymentRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: `Route ${req.url} not found` });
});
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});