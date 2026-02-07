import React from "react";
import { Link } from "react-router-dom";
import DarkMode from "@/components/ui/Darkmode";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Menu } from "lucide-react";
import { FiBell, FiUser } from "react-icons/fi";

const DeshboardNavbar = () => {
  return (
  
      <div className="flex items-center justify-between h-24">

        {/* Notification Icon */}
        <div className="md:flex items-center gap-4 hidden ">
            <Link to="/notifications">
           
          <FiBell className="text-2xl cursor-pointer dark:text-white hover:text-[#257c8a]" />
           </Link>
        </div>

        {/* Mobile Menu */}
        {/* <div className="flex md:hidden">
          <MobileNavbar />
        </div> */}

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center gap-5">
          <DarkMode />

          {/* User Profile */}
          <Link to="/profile">
            <FiUser className="text-2xl cursor-pointer dark:text-white hover:text-[#257c8a]" />
          </Link>
        </div>
      </div>
    
  );
};

export default DeshboardNavbar;

/* ================= MOBILE NAVBAR ================= */

// const MobileNavbar = () => {
//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button
//           size="icon"
//           className="rounded-full bg-gray-200 hover:bg-gray-200"
//           variant="ghost"
//         >
//           <Menu />
//         </Button>
//       </SheetTrigger>

//       <SheetContent className="flex flex-col bg-white text-black">
//         <SheetHeader className="flex flex-row items-center justify-between mt-2">
//           <SheetTitle>Menu</SheetTitle>
//           <DarkMode />
//         </SheetHeader>

//         <Separator />

//         <nav className="flex flex-col space-y-6 mt-6 text-xl">
//           <Link
//             to="/notifications"
//             className="flex items-center gap-3 hover:text-[#257c8a]"
//           >
//             <FiBell /> Notifications
//           </Link>

//           <Link
//             to="/profile"
//             className="flex items-center gap-3 hover:text-[#257c8a]"
//           >
//             <FiUser /> Profile
//           </Link>
//         </nav>

//         <SheetFooter className="mt-auto">
//           <SheetClose asChild />
//         </SheetFooter>
//       </SheetContent>
//     </Sheet>
//   );
// };
