import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { validateIncome } from "../middlewares/validation.js";
import { addIncome, incomeDelete, getIncomeByUserId, updateIncome, calculateTotalIncome } from "../controller/income.controller.js";

const router = express.Router();

router.get('/total', isAuthenticated, calculateTotalIncome);
router.post("/", isAuthenticated, validateIncome, addIncome);
router.get('/', isAuthenticated, getIncomeByUserId);
router.put('/:id', isAuthenticated, validateIncome, updateIncome);
router.delete('/:id', isAuthenticated, incomeDelete);

export default router;