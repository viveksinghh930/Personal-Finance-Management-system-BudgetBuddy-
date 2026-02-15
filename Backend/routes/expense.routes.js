import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { addExpense, getExpenseByUserId, updateExpense, deleteExpense, calculateTotalExpense } from "../controller/expense.controller.js";

const router = express.Router();
router.post("/", isAuthenticated, addExpense);
router.get("/", isAuthenticated, getExpenseByUserId);
router.put("/:id", isAuthenticated, updateExpense);
router.delete("/:id", isAuthenticated, deleteExpense);
router.get("/total", isAuthenticated, calculateTotalExpense);
export default router;