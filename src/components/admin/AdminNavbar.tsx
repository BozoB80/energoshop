"use client";

import { Link, useLocation } from "react-router-dom";
import { Menu, User2 } from "lucide-react";
import { sidebarLinks } from "@/constants";
import { Separator } from "../ui/separator";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import logo from "@/assets/logo.png";

const AdminNavbar = () => {
  const { pathname } = useLocation();

  return (
    <div className="md:hidden">
      <div className="h-16 relative flex justify-between items-center border-b shadow-lg px-2">
        <Sheet>
          <SheetTrigger>
            <Menu size={34} />
          </SheetTrigger>
          <SheetContent>
            <SheetTitle className="">Nadzorna ploča</SheetTitle>
            <Separator className="my-4" />
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.route;

              return (
                <SheetClose key={link.label} asChild>
                  <Link                    
                    to={link.route}
                    className={`relative dark:text-white/80 flex justify-start gap-4 rounded-md p-4 ${
                      isActive && "bg-primary text-white/90 font-bold"
                    }`}
                  >
                    <link.icon className="w-6 h-6" />
                    <p className="font-medium text-lg">{link.label}</p>
                  </Link>
                </SheetClose>
              );
            })}

            <Separator className="my-4" />

            <User2 className="w-6 h-6" />
          </SheetContent>
        </Sheet>
        <Link to={'/'} className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
          <img src={logo} alt="logo" className="h-8 sm:h-14 object-contain hover:scale-105 transition-all duration-500" />
        </Link>
      </div>
    </div>
  );
};

export default AdminNavbar;
