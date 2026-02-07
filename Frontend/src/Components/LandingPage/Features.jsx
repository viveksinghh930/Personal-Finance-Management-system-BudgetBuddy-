import React from 'react';
import { darkThemeColor } from '../DarkLiteMood/ThemeProvider';
import { motion } from "framer-motion";

const Features = () => {
    const features = [
        {
            icon: '💰',
            title: 'Expense Tracking',
            description: 'Track your daily expenses and manage your spending habits effectively.',
        },
        {
            icon: '📈',
            title: 'Financial Insights',
            description: 'Get personalized insights and reports to improve your financial health.',
        },
        {
            icon: '🏦',
            title: 'Savings Goals',
            description: 'Set savings goals and monitor your progress to achieve them effortlessly.',
        },
        {
            icon: '💼',
            title: 'Income Tracking',
            description: 'Monitor your income sources and keep a detailed record of your earnings.',
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="container max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8"
        >
            <div id="features-section" className={`${darkThemeColor} bg-gray-50 py-20`}>
                <div className="container mx-auto px-10" id="features">

                    {/* Heading */}
                    <motion.h2
                        initial={{ y: -30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="dark:text-gray-300 text-4xl font-extrabold text-gray-800 text-center mb-10"
                    >
                        Why Choose Budget
                        <span className="text-[#2a8e9e] hover:text-[#257c8a] cursor-pointer">
                            Buddy
                        </span>
                    </motion.h2>

                    {/* Sub text */}
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="dark:text-gray-300 text-lg text-gray-600 text-center mb-16"
                    >
                        Explore the powerful features designed to help you manage your finances better.
                    </motion.p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 40, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: index * 0.15 }}
                                viewport={{ once: true }}
                                className={`${darkThemeColor} p-8 bg-white shadow-md rounded-lg text-center transform hover:scale-105 transition-transform duration-300 dark:shadow-gray-950 dark:hover:shadow-gray-300`}
                            >
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className={`${darkThemeColor} text-xl font-semibold text-gray-800 mb-2`}>
                                    {feature.title}
                                </h3>
                                <p className={`${darkThemeColor}text-gray-600`}>
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </motion.div>
    );
};

export default Features;
