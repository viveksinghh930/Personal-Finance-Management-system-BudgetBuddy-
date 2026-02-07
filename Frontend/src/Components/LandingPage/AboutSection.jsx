import React from 'react';
import { darkThemeColor } from '../DarkLiteMood/ThemeProvider';
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="container max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          id="about-section"
          className={`${darkThemeColor} bg-gray-50 py-20 px-4 sm:px-8 lg:px-16`}
        >
          <div className="container mx-auto max-w-6xl text-center" id="about">

            {/* Heading */}
            <motion.h2
              initial={{ y: -30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`${darkThemeColor} text-4xl font-extrabold text-gray-800 mb-6`}
            >
              About Budget
              <span className="text-[#2a8e9e] hover:text-[#257c8a] cursor-pointer">
                Buddy
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className={`${darkThemeColor} text-lg text-gray-700 leading-relaxed mb-12`}
            >
              BudgetBuddy is your ultimate companion for financial success.
              Whether you want to track your expenses, set savings goals, or monitor your income, BudgetBuddy provides an easy-to-use platform to help you stay on top of your finances.
              Our mission is to empower individuals and families to take control of their money and achieve financial freedom.
            </motion.p>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`${darkThemeColor} p-6 bg-white shadow-md rounded-lg dark:shadow-gray-950 dark:hover:shadow-gray-300 transition`}
                >
                  {index === 0 && (
                    <>
                      <h3 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-white">
                        Track Your Finances
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Easily monitor where your money is going and make informed decisions to improve your financial health.
                      </p>
                    </>
                  )}

                  {index === 1 && (
                    <>
                      <h3 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-white">
                        Achieve Savings Goals
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Set realistic goals, save more efficiently, and watch your savings grow over time.
                      </p>
                    </>
                  )}

                  {index === 2 && (
                    <>
                      <h3 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-white">
                        Stay in Control
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Gain financial clarity and peace of mind with personalized insights and simple tools.
                      </p>
                    </>
                  )}
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutSection;
