import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { darkThemeColor } from '../DarkLiteMood/ThemeProvider';

const HeroSection = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="container max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8"
        >
            <div id="hero-section" className="py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 justify-between">

                    {/* Text Section */}
                    <motion.section
                        initial={{ x: -60, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="md:w-fit flex flex-col justify-center"
                    >
                        <h1 className="text-4xl font-extrabold text-gray-800 leading-tight dark:text-white sm:text-6xl">
                            Simplify Your Budgeting with Budget
                            <span className="text-[#2a8e9e] hover:text-[#257c8a] transition duration-300 cursor-pointer">
                                Buddy
                            </span>
                        </h1>

                        <p className="text-gray-700 mt-6 text-lg md:text-xl leading-relaxed dark:text-gray-400">
                            Take control of your finances and achieve your savings goals effortlessly with BudgetBuddy's intuitive budgeting tools.
                        </p>

                        <motion.div
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center flex-col sm:flex-row sm:justify-around mt-10 gap-4"
                        >
                            {/* CTA Button */}
                            <Link
                                to="/register"
                                className="bg-[#257c8a] dark:bg-[#257c8a] text-white px-[100px] py-[15px] lg:py-4 lg:px-10 whitespace-nowrap rounded-full hover:bg-[#2a8e9e] hover:shadow-xl transition duration-300 ease-in-out text-center lg:max-w-72"
                                aria-label="Create Account"
                            >
                                Create Account
                            </Link>

                            {/* Reviews Section */}
                            <div className="flex flex-col gap-3 lg:items-center lg:gap-6 lg:flex-row">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, index) => (
                                        <svg
                                            key={index}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill={index < 4 ? "currentColor" : "none"}
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            className={`w-6 h-6 ${index < 4 ? "text-yellow-400" : "text-gray-300"}`}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                            />
                                        </svg>
                                    ))}
                                </div>

                                <p className="dark:text-gray-300 text-gray-600 text-sm text-center">
                                    4.8 from <span className="font-semibold">500+ reviews</span>
                                </p>

                                <div className="flex -space-x-2">
                                    <img className="w-10 h-10 rounded-full border-2 border-white transition-transform transform hover:scale-110" src="https://randomuser.me/api/portraits/women/1.jpg" alt="Customer Review 1" />
                                    <img className="w-10 h-10 rounded-full border-2 border-white transition-transform transform hover:scale-110" src="https://randomuser.me/api/portraits/men/2.jpg" alt="Customer Review 2" />
                                    <img className="w-10 h-10 rounded-full border-2 border-white transition-transform transform hover:scale-110" src="https://randomuser.me/api/portraits/women/3.jpg" alt="Customer Review 3" />
                                    <img className="w-10 h-10 rounded-full border-2 border-white transition-transform transform hover:scale-110" src="https://randomuser.me/api/portraits/men/4.jpg" alt="Customer Review 4" />
                                </div>
                            </div>
                        </motion.div>
                    </motion.section>

                    {/* Image Section */}
                    <motion.section
                        initial={{ x: 60, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="p-6 bg-white bg-opacity-80 rounded-lg hidden lg:block"
                    >
                        <img
                            src="/images/ProfessionalCollaboration.jpg"
                            alt="Financial Features Grid"
                            className="rounded-lg w-full h-[380px] sm:h-[480px] md:h-[480px] lg:h-[480px] object-cover hidden lg:block"
                        />
                    </motion.section>

                </div>
            </div>
        </motion.div>
    );
};

export default HeroSection;
