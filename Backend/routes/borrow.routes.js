import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { validateBorrow } from "../middlewares/validation.js";
import { addBorrow, borrowDelete, calculateTotalBorrow, getBorrowByID, updateBorrow } from "../controller/borrow.controller.js";

const router = express.Router();
router.get("/total", isAuthenticated, calculateTotalBorrow);
router.post("/", isAuthenticated, validateBorrow, addBorrow);
router.get("/", isAuthenticated, getBorrowByID);
router.put("/:id", isAuthenticated, validateBorrow, updateBorrow);
router.delete("/:id", isAuthenticated, borrowDelete);

export default router;