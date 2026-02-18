export const validateIncome = (req, res, next) => {
    const { category, amount, date, description, paymentMethod } = req.body;
    if (!category || !amount || !date || !description || !paymentMethod) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }
    next();
};

export const validateExpense = (req, res, next) => {
    const { category, amount, date, description, paymentMethod } = req.body;
    if (!category || !amount || !date || !description || !paymentMethod) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }
    next();
};

export const validateDebt = (req, res, next) => {
    const { borrowerName, amount, dueDate } = req.body;
    if (!borrowerName || !amount || !dueDate) {
        return res.status(400).json({ message: "Required fields missing", success: false });
    }
    next();
};

export const validateBorrow = (req, res, next) => {
    const { lenderName, interestType, amount, interestRate, timePeriod, dueDate, paidAmount, status } = req.body;
    if (!lenderName || !interestType || !amount || !interestRate || !timePeriod || !dueDate || paidAmount === undefined || status === undefined) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }
    next();
};
