import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="dark:bg-gray-900 dark:text-white bg-[#14515a] text-gray-300"
    >
      <div className="container max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.footer
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="py-8"
        >
          <div className="container mx-auto px-6 lg:px-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* About Section */}
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-bold mb-4">
                  About Budget
                  <span className="text-[#2a8e9e] hover:text-[#257c8a] cursor-pointer">
                    Buddy
                  </span>
                </h3>
                <p className="text-sm">
                  BudgetBuddy helps you manage your finances effectively with
                  features like expense tracking, savings goals, and financial
                  insights. Stay in control of your budget effortlessly!
                </p>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                <ul className="text-sm">
                  {["home", "features", "about", "contact"].map((item) => (
                    <li key={item} className="mb-2 hover:underline">
                      <ScrollLink
                        to={item}
                        smooth={true}
                        duration={500}
                        offset={-80}
                        className="cursor-pointer"
                      >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </ScrollLink>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact Section */}
              <motion.div
                initial={{ x: 40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                <p className="text-sm mb-2">
                  <strong>Email:</strong> support@budgetbuddy.com
                </p>
                <p className="text-sm mb-2">
                  <strong>Phone:</strong> +91 9090909090
                </p>
                <p className="text-sm">
                  <strong>Address:</strong> India
                </p>
              </motion.div>
            </div>

            {/* Footer Bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-8 border-t border-black/50 pt-4 text-center text-sm dark:border-white/50"
            >
              <p>
                &copy; {new Date().getFullYear()} BudgetBuddy. All rights reserved.
              </p>
            </motion.div>
          </div>
        </motion.footer>
      </div>
    </motion.div>
  );
};

export default Footer;

