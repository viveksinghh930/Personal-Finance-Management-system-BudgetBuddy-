import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { addOnlinePayment, getPaymentsByUserId, deletePayment } from "../controller/onlinePayment.controller.js";

const router = express.Router();

router.post("/", isAuthenticated, addOnlinePayment);
router.get("/", isAuthenticated, getPaymentsByUserId);
router.delete("/:id", isAuthenticated, deletePayment);

export default router;
