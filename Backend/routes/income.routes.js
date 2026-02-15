import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { addIncome, incomeDelete, getIncomeByUserId, updateIncome, calculateTotalIncome } from "../controller/income.controller.js";

const router = express.Router();

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'Income routes working!' });
});

router.post("/", isAuthenticated, addIncome);
router.get('/', isAuthenticated, getIncomeByUserId);
router.put('/:id', isAuthenticated, updateIncome);
router.delete('/:id', isAuthenticated, incomeDelete);
router.get('/total', isAuthenticated, calculateTotalIncome);

export default router;