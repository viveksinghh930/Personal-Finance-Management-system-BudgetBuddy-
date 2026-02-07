import React from 'react';
import { darkThemeColor } from '../DarkLiteMood/ThemeProvider';
import { motion } from "framer-motion";

const Contact = () => {
  const labelStyleClass = 'block text-sm font-medium text-gray-700';
  const inputStyleClass =
    'w-full mt-2 p-3 border dark:text-[#2a8e9e] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#257c8a]';

  const formFields = [
    { title: "Your Name", label: "name", type: "text", placeholder: "Enter your name" },
    { title: "Email Address", label: "email", type: "email", placeholder: "Enter your email" },
    { title: "Message", label: "message", type: "textarea", placeholder: "Enter your message" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="container max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8"
    >
      <section className={`${darkThemeColor} bg-white py-20`} id="contact-section">
        <div className="container mx-auto px-6 lg:px-20" id="contact">

          {/* Heading */}
          <motion.h2
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-gray-800 mb-10 dark:text-white"
          >
            Contact Us
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className={`${darkThemeColor} text-center text-gray-600 mb-12`}
          >
            Have any questions or feedback? We'd love to hear from you!
          </motion.p>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center">

            {/* Form */}
            <motion.form
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-100 rounded-lg p-8 shadow-lg w-full max-w-lg"
            >
              {formFields.map((field, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.15 }}
                  viewport={{ once: true }}
                >
                  <FormField
                    title={field.title}
                    label={field.label}
                    type={field.type}
                    placeholder={field.placeholder}
                    labelStyle={labelStyleClass}
                    inputStyle={inputStyleClass}
                  />
                </motion.div>
              ))}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-[#257c8a] text-white py-3 px-6 rounded-md hover:bg-[#2a8e9e] transition duration-300 w-full"
              >
                Send Message
              </motion.button>
            </motion.form>

            {/* Image */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center items-center text-center md:text-left"
            >
              <img src="/images/Contact.png" alt="" className="w-128" />
            </motion.div>

          </div>
        </div>
      </section>
    </motion.div>
  );
};

const FormField = ({ title, label, type, placeholder, labelStyle, inputStyle }) => {
  return (
    <div className="mb-6">
      <label htmlFor={label} className={labelStyle}>
        {title}
      </label>
      {type === "textarea" ? (
        <textarea id={label} placeholder={placeholder} rows="4" className={inputStyle}></textarea>
      ) : (
        <input type={type} id={label} placeholder={placeholder} className={inputStyle} />
      )}
    </div>
  );
};

export default Contact;
