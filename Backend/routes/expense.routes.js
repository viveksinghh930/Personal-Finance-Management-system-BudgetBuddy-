import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { validateExpense } from "../middlewares/validation.js";
import { addExpense, getExpenseByUserId, updateExpense, deleteExpense, calculateTotalExpense } from "../controller/expense.controller.js";

const router = express.Router();
router.get("/total", isAuthenticated, calculateTotalExpense);
router.post("/", isAuthenticated, validateExpense, addExpense);
router.get("/", isAuthenticated, getExpenseByUserId);
router.put("/:id", isAuthenticated, validateExpense, updateExpense);
router.delete("/:id", isAuthenticated, deleteExpense);
export default router;