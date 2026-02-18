import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { validateDebt } from "../middlewares/validation.js";
import { addDebt, deleteDebt, getDebtByID, getDebtStats, updateDebt } from "../controller/debt.controller.js";

const router = express.Router();
router.get("/stats", isAuthenticated, getDebtStats);
router.post("/", isAuthenticated, validateDebt, addDebt);
router.get("/", isAuthenticated, getDebtByID);
router.put("/:id", isAuthenticated, updateDebt);
router.delete("/:id", isAuthenticated, deleteDebt);

export default router;
