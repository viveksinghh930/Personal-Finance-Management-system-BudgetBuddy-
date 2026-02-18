import React from "react";
import { Link } from "react-router-dom";
import DarkMode from "@/components/ui/Darkmode";
import { FiBell, FiUser } from "react-icons/fi";

const DeshboardNavbar = ({ title, subtitle }) => {
  // If title is provided, show title with icons on same line
  if (title) {
    return (
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
          {subtitle && <p className="text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-5">
          <Link to="/notifications">
            <FiBell className="text-2xl cursor-pointer text-gray-700 dark:text-white hover:text-[#257c8a]" />
          </Link>
          <DarkMode />
          <Link to="/profile">
            <FiUser className="text-2xl cursor-pointer text-gray-700 dark:text-white hover:text-[#257c8a]" />
          </Link>
        </div>
      </div>
    );
  }

  // Default layout for Dashboard (no title)
  return (
    <div className="flex items-center justify-between mb-6 py-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      <div className="flex items-center gap-3 sm:gap-5">
        <Link to="/notifications">
          <FiBell className="text-xl sm:text-2xl cursor-pointer dark:text-white hover:text-[#257c8a]" />
        </Link>
        <DarkMode />
        <Link to="/profile">
          <FiUser className="text-xl sm:text-2xl cursor-pointer dark:text-white hover:text-[#257c8a]" />
        </Link>
      </div>
    </div>
  );
};

export default DeshboardNavbar;
