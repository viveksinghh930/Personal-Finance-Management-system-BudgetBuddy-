import Sidebar from "../Shared/SideBar";
import { FileText, Download, Calendar, TrendingUp } from "lucide-react";
import { darkThemeColor } from "../DarkLiteMood/ThemeProvider";
import DeshboardNavbar from "./DeshboardNavbar";
import { useGetIncomeQuery } from "@/redux/api/incomeApi";
import { useGetExpenseQuery } from "@/redux/api/expenseApi";
import { useGetBorrowQuery } from "@/redux/api/borrowApi";
import { useGetDebtsQuery } from "@/redux/api/debtApi";
import { useMemo, useState, useEffect } from "react";
import { toast } from "sonner";
import { HandleMessageUISuccess, HandleMessageUIError } from '../DarkLiteMood/ThemeProvider';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Reports = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [yearlyYear, setYearlyYear] = useState(new Date().getFullYear());
    const [categoryFilters, setCategoryFilters] = useState({
        income: false,
        expense: false,
        debt: false,
        borrow: false
    });
    const [recentReports, setRecentReports] = useState([]);
    
    useEffect(() => {
        const saved = localStorage.getItem('recentReports');
        if (saved) setRecentReports(JSON.parse(saved));
    }, []);
    
    const { data: incomeData } = useGetIncomeQuery();
    const { data: expenseData } = useGetExpenseQuery();
    const { data: borrowData } = useGetBorrowQuery();
    const { data: debtData } = useGetDebtsQuery();

    const totalIncome = useMemo(() => {
        return incomeData?.income?.reduce((sum, item) => sum + item.amount, 0) || 0;
    }, [incomeData]);

    const totalExpense = useMemo(() => {
        return expenseData?.expense?.reduce((sum, item) => sum + item.amount, 0) || 0;
    }, [expenseData]);

    const totalDebt = useMemo(() => {
        return debtData?.debts?.reduce((sum, item) => sum + item.amount, 0) || 0;
    }, [debtData]);

    const totalBorrow = useMemo(() => {
        return borrowData?.borrows?.reduce((sum, item) => sum + (item.totalAmount || item.amount), 0) || 0;
    }, [borrowData]);

    const filterDataByDate = (data, start, end) => {
        if (!start || !end) return data;
        return data.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate >= new Date(start) && itemDate <= new Date(end);
        });
    };

    const generatePDF = (type) => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;
        
        // Title
        doc.setFontSize(20);
        doc.text(`${type} Report`, pageWidth / 2, 20, { align: 'center' });
        
        // Date
        doc.setFontSize(10);
        doc.text(`Generated: ${new Date().toLocaleDateString('en-IN')}`, pageWidth / 2, 30, { align: 'center' });
        
        if (type === 'Monthly') {
            const monthlyIncome = incomeData?.income?.filter(item => {
                const d = new Date(item.date);
                return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
            }) || [];
            const monthlyExpense = expenseData?.expense?.filter(item => {
                const d = new Date(item.date);
                return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
            }) || [];
            
            const monthIncome = monthlyIncome.reduce((sum, item) => sum + item.amount, 0);
            const monthExpense = monthlyExpense.reduce((sum, item) => sum + item.amount, 0);
            
            doc.setFontSize(12);
            doc.text(`Month: ${new Date(selectedYear, selectedMonth).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}`, 14, 45);
            doc.text(`Total Income: ₹${monthIncome.toLocaleString('en-IN')}`, 14, 55);
            doc.text(`Total Expense: ₹${monthExpense.toLocaleString('en-IN')}`, 14, 65);
            doc.text(`Net Savings: ₹${(monthIncome - monthExpense).toLocaleString('en-IN')}`, 14, 75);
            
            // Income Table
            autoTable(doc, {
                startY: 85,
                head: [['Date', 'Category', 'Amount', 'Payment Method']],
                body: monthlyIncome.map(item => [
                    new Date(item.date).toLocaleDateString('en-IN'),
                    item.category,
                    `₹${item.amount.toLocaleString('en-IN')}`,
                    item.paymentMethod
                ]),
                headStyles: { fillColor: [37, 124, 138] },
                margin: { top: 85 }
            });
            
            // Expense Table
            autoTable(doc, {
                startY: doc.lastAutoTable.finalY + 10,
                head: [['Date', 'Category', 'Amount', 'Payment Method']],
                body: monthlyExpense.map(item => [
                    new Date(item.date).toLocaleDateString('en-IN'),
                    item.category,
                    `₹${item.amount.toLocaleString('en-IN')}`,
                    item.paymentMethod
                ]),
                headStyles: { fillColor: [239, 68, 68] }
            });
        } else if (type === 'Yearly') {
            const yearlyIncome = incomeData?.income?.filter(item => new Date(item.date).getFullYear() === yearlyYear) || [];
            const yearlyExpense = expenseData?.expense?.filter(item => new Date(item.date).getFullYear() === yearlyYear) || [];
            
            const yearIncome = yearlyIncome.reduce((sum, item) => sum + item.amount, 0);
            const yearExpense = yearlyExpense.reduce((sum, item) => sum + item.amount, 0);
            
            doc.setFontSize(12);
            doc.text(`Year: ${yearlyYear}`, 14, 45);
            doc.text(`Total Income: ₹${yearIncome.toLocaleString('en-IN')}`, 14, 55);
            doc.text(`Total Expense: ₹${yearExpense.toLocaleString('en-IN')}`, 14, 65);
            doc.text(`Net Savings: ₹${(yearIncome - yearExpense).toLocaleString('en-IN')}`, 14, 75);
            
            autoTable(doc, {
                startY: 85,
                head: [['Month', 'Income', 'Expense', 'Savings']],
                body: Array.from({ length: 12 }, (_, i) => {
                    const monthIncome = yearlyIncome.filter(item => new Date(item.date).getMonth() === i).reduce((sum, item) => sum + item.amount, 0);
                    const monthExpense = yearlyExpense.filter(item => new Date(item.date).getMonth() === i).reduce((sum, item) => sum + item.amount, 0);
                    return [
                        new Date(yearlyYear, i).toLocaleDateString('en-IN', { month: 'long' }),
                        `₹${monthIncome.toLocaleString('en-IN')}`,
                        `₹${monthExpense.toLocaleString('en-IN')}`,
                        `₹${(monthIncome - monthExpense).toLocaleString('en-IN')}`
                    ];
                }),
                headStyles: { fillColor: [37, 124, 138] }
            });
        } else if (type === 'Category') {
            const hasFilter = Object.values(categoryFilters).some(v => v);
            if (!hasFilter) {
                toast.error('Please select at least one category filter', HandleMessageUIError());
                return;
            }
            
            let startY = 45;
            
            if (categoryFilters.income) {
                const incomeByCategory = {};
                incomeData?.income?.forEach(item => {
                    incomeByCategory[item.category] = (incomeByCategory[item.category] || 0) + item.amount;
                });
                doc.setFontSize(14);
                doc.text('Income by Category', 14, startY);
                autoTable(doc, {
                    startY: startY + 5,
                    head: [['Category', 'Amount']],
                    body: Object.entries(incomeByCategory).map(([cat, amt]) => [cat, `₹${amt.toLocaleString('en-IN')}`]),
                    headStyles: { fillColor: [37, 124, 138] }
                });
                startY = doc.lastAutoTable.finalY + 15;
            }
            
            if (categoryFilters.expense) {
                const expenseByCategory = {};
                expenseData?.expense?.forEach(item => {
                    expenseByCategory[item.category] = (expenseByCategory[item.category] || 0) + item.amount;
                });
                doc.setFontSize(14);
                doc.text('Expense by Category', 14, startY);
                autoTable(doc, {
                    startY: startY + 5,
                    head: [['Category', 'Amount']],
                    body: Object.entries(expenseByCategory).map(([cat, amt]) => [cat, `₹${amt.toLocaleString('en-IN')}`]),
                    headStyles: { fillColor: [239, 68, 68] }
                });
                startY = doc.lastAutoTable.finalY + 15;
            }
            
            if (categoryFilters.debt) {
                const debtTotal = debtData?.debts?.reduce((sum, item) => sum + item.amount, 0) || 0;
                doc.setFontSize(14);
                doc.text('Debt Summary', 14, startY);
                autoTable(doc, {
                    startY: startY + 5,
                    head: [['Borrower', 'Amount', 'Paid', 'Start Date', 'Due Date', 'Payment Method', 'Status']],
                    body: debtData?.debts?.map(item => [
                        item.borrowerName,
                        `₹${item.amount.toLocaleString('en-IN')}`,
                        `₹${item.paidAmount.toLocaleString('en-IN')}`,
                        new Date(item.startDate).toLocaleDateString('en-IN'),
                        new Date(item.dueDate).toLocaleDateString('en-IN'),
                        item.paymentMethod,
                        item.status
                    ]) || [],
                    headStyles: { fillColor: [220, 38, 38] },
                    foot: [['Total Debt', `₹${debtTotal.toLocaleString('en-IN')}`, '', '', '', '', '']]
                });
                startY = doc.lastAutoTable.finalY + 15;
            }
            
            if (categoryFilters.borrow) {
                const borrowTotal = borrowData?.borrows?.reduce((sum, item) => sum + item.amount, 0) || 0;
                doc.setFontSize(14);
                doc.text('Borrow Summary', 14, startY);
                autoTable(doc, {
                    startY: startY + 5,
                    head: [['Lender', 'Amount', 'Paid', 'Interest', 'Total', 'Start Date', 'Due Date', 'Payment Method', 'Status']],
                    body: borrowData?.borrows?.map(item => [
                        item.lenderName,
                        `₹${item.amount.toLocaleString('en-IN')}`,
                        `₹${item.paidAmount.toLocaleString('en-IN')}`,
                        `${item.interestRate}% (${item.interestType})`,
                        `₹${item.totalAmount.toLocaleString('en-IN')}`,
                        new Date(item.startDate).toLocaleDateString('en-IN'),
                        new Date(item.dueDate).toLocaleDateString('en-IN'),
                        item.paymentMethod,
                        item.status
                    ]) || [],
                    headStyles: { fillColor: [59, 130, 246] },
                    foot: [['Total Borrowed', `₹${borrowTotal.toLocaleString('en-IN')}`, '', '', '', '', '', '', '']]
                });
            }
        } else if (type === 'Custom') {
            if (!startDate || !endDate) {
                toast.error('Please select start and end dates', HandleMessageUIError());
                return;
            }
            
            const filteredIncome = filterDataByDate(incomeData?.income || [], startDate, endDate);
            const filteredExpense = filterDataByDate(expenseData?.expense || [], startDate, endDate);
            
            const customIncome = filteredIncome.reduce((sum, item) => sum + item.amount, 0);
            const customExpense = filteredExpense.reduce((sum, item) => sum + item.amount, 0);
            
            doc.setFontSize(12);
            doc.text(`Period: ${new Date(startDate).toLocaleDateString('en-IN')} - ${new Date(endDate).toLocaleDateString('en-IN')}`, 14, 45);
            doc.text(`Total Income: ₹${customIncome.toLocaleString('en-IN')}`, 14, 55);
            doc.text(`Total Expense: ₹${customExpense.toLocaleString('en-IN')}`, 14, 65);
            doc.text(`Net Savings: ₹${(customIncome - customExpense).toLocaleString('en-IN')}`, 14, 75);
            
            autoTable(doc, {
                startY: 85,
                head: [['Date', 'Type', 'Category', 'Amount']],
                body: [
                    ...filteredIncome.map(item => [
                        new Date(item.date).toLocaleDateString('en-IN'),
                        'Income',
                        item.category,
                        `₹${item.amount.toLocaleString('en-IN')}`
                    ]),
                    ...filteredExpense.map(item => [
                        new Date(item.date).toLocaleDateString('en-IN'),
                        'Expense',
                        item.category,
                        `₹${item.amount.toLocaleString('en-IN')}`
                    ])
                ],
                headStyles: { fillColor: [37, 124, 138] }
            });
        }
        
        doc.save(`${type}_Report_${new Date().toISOString().split('T')[0]}.pdf`);
        
        const newReport = {
            id: Date.now(),
            name: `${type}_Report_${new Date().toISOString().split('T')[0]}.pdf`,
            date: new Date().toLocaleDateString('en-IN'),
            type: type
        };
        const updated = [newReport, ...recentReports].slice(0, 5);
        setRecentReports(updated);
        localStorage.setItem('recentReports', JSON.stringify(updated));
        
        toast.success(`${type} report downloaded successfully!`, HandleMessageUISuccess());
    };

    return (
        <div className={`${darkThemeColor} flex min-h-screen md:ml-72 bg-gray-50 dark:bg-gray-900`}>
            <Sidebar />
            <div className="flex-1 overflow-x-hidden">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <DeshboardNavbar 
                        title="Financial Reports" 
                        subtitle="Generate and download comprehensive financial reports" 
                    />
                    
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Income</p>
                        <h2 className="text-2xl font-bold mt-2 text-green-600">₹{totalIncome.toLocaleString('en-IN')}</h2>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Expense</p>
                        <h2 className="text-2xl font-bold mt-2 text-red-600">₹{totalExpense.toLocaleString('en-IN')}</h2>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Debt (You Lent)</p>
                        <h2 className="text-2xl font-bold mt-2 text-blue-600">₹{totalDebt.toLocaleString('en-IN')}</h2>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Borrow (You Owe)</p>
                        <h2 className="text-2xl font-bold mt-2 text-orange-600">₹{totalBorrow.toLocaleString('en-IN')}</h2>
                    </div>
                </div>

                {/* Report Types */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="text-[#257c8a]" size={28} />
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Monthly Report</h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">Complete overview of monthly transactions</p>
                        <div className="space-y-2 mb-4">
                            <select 
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m, i) => (
                                    <option key={i} value={i}>{m}</option>
                                ))}
                            </select>
                            <select 
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(Number(e.target.value))}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                {Array.from({length: 5}, (_, i) => new Date().getFullYear() - i).map(y => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>
                        <button 
                            onClick={() => generatePDF('Monthly')}
                            className="w-full bg-[#257c8a] hover:bg-[#1f6a77] text-white py-2 rounded-lg flex items-center justify-center gap-2"
                        >
                            <Download size={18} />
                            Download Report
                        </button>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-4">
                            <Calendar className="text-[#257c8a]" size={28} />
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Yearly Report</h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">Annual financial summary and trends</p>
                        <div className="mb-4">
                            <select 
                                value={yearlyYear}
                                onChange={(e) => setYearlyYear(Number(e.target.value))}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                {Array.from({length: 5}, (_, i) => new Date().getFullYear() - i).map(y => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>
                        <button 
                            onClick={() => generatePDF('Yearly')}
                            className="w-full bg-[#257c8a] hover:bg-[#1f6a77] text-white py-2 rounded-lg flex items-center justify-center gap-2"
                        >
                            <Download size={18} />
                            Download Report
                        </button>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-4">
                            <TrendingUp className="text-[#257c8a]" size={28} />
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Category Report</h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">Select categories to include</p>
                        <div className="space-y-2 mb-4">
                            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                <input 
                                    type="checkbox" 
                                    checked={categoryFilters.income}
                                    onChange={(e) => setCategoryFilters({...categoryFilters, income: e.target.checked})}
                                    className="w-4 h-4"
                                />
                                Income
                            </label>
                            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                <input 
                                    type="checkbox" 
                                    checked={categoryFilters.expense}
                                    onChange={(e) => setCategoryFilters({...categoryFilters, expense: e.target.checked})}
                                    className="w-4 h-4"
                                />
                                Expense
                            </label>
                            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                <input 
                                    type="checkbox" 
                                    checked={categoryFilters.debt}
                                    onChange={(e) => setCategoryFilters({...categoryFilters, debt: e.target.checked})}
                                    className="w-4 h-4"
                                />
                                Debt
                            </label>
                            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                <input 
                                    type="checkbox" 
                                    checked={categoryFilters.borrow}
                                    onChange={(e) => setCategoryFilters({...categoryFilters, borrow: e.target.checked})}
                                    className="w-4 h-4"
                                />
                                Borrow
                            </label>
                        </div>
                        <button 
                            onClick={() => generatePDF('Category')}
                            className="w-full bg-[#257c8a] hover:bg-[#1f6a77] text-white py-2 rounded-lg flex items-center justify-center gap-2"
                        >
                            <Download size={18} />
                            Download Report
                        </button>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="text-[#257c8a]" size={28} />
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Custom Report</h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">Generate custom date range reports</p>
                        <div className="space-y-2 mb-4">
                            <input 
                                type="date" 
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="Start Date"
                            />
                            <input 
                                type="date" 
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="End Date"
                            />
                        </div>
                        <button 
                            onClick={() => generatePDF('Custom')}
                            className="w-full bg-[#257c8a] hover:bg-[#1f6a77] text-white py-2 rounded-lg flex items-center justify-center gap-2"
                        >
                            <Download size={18} />
                            Generate Report
                        </button>
                    </div>
                </div>

                {/* Recent Reports */}
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 mt-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Recent Reports</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 dark:border-gray-700">
                                <tr className="text-left text-gray-600 dark:text-gray-400">
                                    <th className="pb-3">REPORT NAME</th>
                                    <th className="pb-3">DATE GENERATED</th>
                                    <th className="pb-3">TYPE</th>
                                    <th className="pb-3">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentReports.length > 0 ? recentReports.map(report => (
                                    <tr key={report.id} className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="py-3 text-gray-900 dark:text-white">{report.name}</td>
                                        <td className="py-3 text-gray-600 dark:text-gray-400">{report.date}</td>
                                        <td className="py-3 text-gray-600 dark:text-gray-400">{report.type}</td>
                                        <td className="py-3">
                                            <button className="text-red-600 hover:text-red-700" onClick={() => {
                                                const updated = recentReports.filter(r => r.id !== report.id);
                                                setRecentReports(updated);
                                                localStorage.setItem('recentReports', JSON.stringify(updated));
                                            }}>Delete</button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-8 text-gray-500 dark:text-gray-400">No reports generated yet</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
            </div>
            </div>
       
    );
};

export default Reports;
