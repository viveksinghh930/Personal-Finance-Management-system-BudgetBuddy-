import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Button } from "@/Components/ui/button"
import DarkMode from "@/Components/ui/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet"
import { Menu } from 'lucide-react';
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const StyleNavLinks =
    'hover:text-[#257c8a] transition duration-300 cursor-pointer dark:text-white dark:hover:text-[#257c8a]';

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="container max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="flex items-center justify-between mx-auto max-w-[100%] h-24">

        {/* Logo and Name */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <h1 className="text-2xl font-bold dark:text-white">
            Budget
            <span className="text-[#2a8e9e] hover:text-[#257c8a] cursor-pointer transition duration-300">
              Buddy
            </span>
          </h1>
        </motion.div>

        {/* Navbar Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`md:block flex-grow justify-center ${isMobileMenuOpen ? 'block' : 'hidden'} lg:flex mt-280 md:mt-0`}
        >
          <ul className="flex justify-center items-center flex-col font-medium text-xl md:flex-row lg:gap-10 md:gap-15 gap-2">
            <li>
              <NavbarLinks title="Home" offsets={0} StyleNavLink={StyleNavLinks} links={[{ path: "hero-section" }]} />
            </li>
            <li>
              <NavbarLinks title="Features" offsets={-50} StyleNavLink={StyleNavLinks} links={[{ path: "features-section" }]} />
            </li>
            <li>
              <NavbarLinks title="About" offsets={-50} StyleNavLink={StyleNavLinks} links={[{ path: "about-section" }]} />
            </li>
            <li>
              <NavbarLinks title="Contact" offsets={-50} StyleNavLink={StyleNavLinks} links={[{ path: "contact-section" }]} />
            </li>
          </ul>
        </motion.div>

        {/* Mobile */}
        <div className="flex md:hidden items center justify-between px-5 mt-7 h-full">
          <MobileNavbar />
        </div>

        {/* Get Started */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="hidden md:flex"
        >
          <Link
            to="/register"
            className="bg-[#257c8a] text-white py-2 px-7 rounded-md hover:bg-[#2a8e9e] transition duration-300"
          >
            Get Started
          </Link>
        </motion.div>

        {/* Dark Mode */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="hidden md:flex py-2 px-2"
        >
          <DarkMode />
        </motion.div>

      </div>

      <div className="hidden justify-center mt-4">
        <Link
          to="/register"
          className="bg-[#257c8a] text-white py-2 px-7 rounded-md hover:bg-[#2a8e9e] transition duration-300"
        >
          Get Started
        </Link>
      </div>
    </motion.div>
  );
};

export default Navbar;

/* ================= MOBILE NAVBAR (UNCHANGED) ================= */

const MobileNavbar = () => {
  const role = "instructor"
  const StyleNavLinks = 'hover:text-[#257c8a] transition duration-300 cursor-pointer'

  return (
    <Sheet>
      <SheetTrigger asChild className="my-4">
        <Button size="icon" className="dark:text-black rounded-full bg-gray-200 hover:bg-gray-200" variant="ghost">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col bg-white text-black">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>
            Budget
            <span className="text-[#2a8e9e] hover:text-[#257c8a] cursor-pointer transition duration-300">
              Buddy
            </span>
          </SheetTitle>
          <DarkMode />
        </SheetHeader>

        <Separator className="mr-2" />

        <nav className="flex flex-col space-y-4 font-medium">
          <ul className="flex flex-col space-y-4">
            <li><NavbarLinks title="Home" offsets={0} StyleNavLink={StyleNavLinks} links={[{ path: "hero-section" }]} /></li>
            <li><NavbarLinks title="Features" offsets={-50} StyleNavLink={StyleNavLinks} links={[{ path: "features-section" }]} /></li>
            <li><NavbarLinks title="About" offsets={-50} StyleNavLink={StyleNavLinks} links={[{ path: "about-section" }]} /></li>
            <li><NavbarLinks title="Contact" offsets={-50} StyleNavLink={StyleNavLinks} links={[{ path: "contact-section" }]} /></li>
          </ul>
        </nav>

        {role === "instructor" && (
          <SheetFooter>
            <SheetClose asChild>
              <div className="flex justify-center mt-4 w-full">
                <Link
                  to="/register"
                  className="bg-[#2d717b] text-white py-2 px-16 rounded-md hover:bg-[#2a8e9e] transition duration-300"
                >
                  Get Started
                </Link>
              </div>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

/* ================= NAVBAR LINKS ================= */

const NavbarLinks = ({ title, StyleNavLink, links, offsets }) => {
  return (
    links.map((link, index) => (
      <ScrollLink
        key={index}
        to={link.path}
        smooth={true}
        duration={500}
        offset={offsets}
        className={StyleNavLink}
      >
        {title}
      </ScrollLink>
    ))
  );
};
