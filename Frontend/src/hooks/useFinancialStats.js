import { useState, useEffect } from 'react';

const useFinancialStats = (data, viewMode, type = 'income') => {
    const [stats, setStats] = useState({
        total: 0,
        average: 0,
        budgetLeft: 0,
        highest: { category: 'N/A', amount: 0 }
    });

    useEffect(() => {
        calculateStats(data);
    }, [data, viewMode]);

    const filterByViewMode = (data, viewMode) => {
        const now = new Date();
        return data.filter(item => {
            const itemDate = new Date(item.date);
            if (viewMode === 'monthly') {
                return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
            } else {
                return itemDate.getFullYear() === now.getFullYear();
            }
        });
    };

    const getCategoryMap = (data) => {
        const categoryMap = {};
        data.forEach(item => {
            categoryMap[item.category] = (categoryMap[item.category] || 0) + item.amount;
        });
        return categoryMap;
    };

    const getHighestCategory = (categoryMap) => {
        return Object.entries(categoryMap).reduce((max, [cat, amt]) => 
            amt > max.amount ? { category: cat, amount: amt } : max, 
            { category: 'N/A', amount: 0 }
        );
    };

    const calculateStats = (data) => {
        const filtered = filterByViewMode(data, viewMode);
        const total = filtered.reduce((sum, item) => sum + item.amount, 0);
        const categoryMap = getCategoryMap(filtered);
        const highest = getHighestCategory(categoryMap);
        
        setStats({
            total,
            average: type === 'income' ? (filtered.length > 0 ? total / filtered.length : 0) : 0,
            budgetLeft: type === 'expense' ? Math.max(0, total * 0.2) : 0,
            highest
        });
    };

    const getChartData = () => {
        const filtered = filterByViewMode(data, viewMode);
        const categoryMap = getCategoryMap(filtered);
        const result = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
        
        if (result.length === 0) {
            if (type === 'income') {
                return [
                    { name: 'Salary', value: 0 },
                    { name: 'Freelance', value: 0 },
                    { name: 'Business', value: 0 },
                    { name: 'Investment', value: 0 },
                    { name: 'Rental Income', value: 0 },
                    { name: 'Other Income', value: 0 }
                ];
            } else {
                return [
                    { name: 'Food & Dining', value: 0 },
                    { name: 'Transportation', value: 0 },
                    { name: 'Shopping', value: 0 },
                    { name: 'Entertainment', value: 0 },
                    { name: 'Bills & Utilities', value: 0 },
                    { name: 'Healthcare', value: 0 },
                    { name: 'Education', value: 0 },
                    { name: 'Rent', value: 0 },
                    { name: 'Other Expense', value: 0 }
                ];
            }
        }
        
        return result;
    };

    return { stats, getChartData };
};

export default useFinancialStats;
