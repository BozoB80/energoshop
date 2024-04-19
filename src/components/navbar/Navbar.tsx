import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Searchbar from "./Searchbar";
import logo from "@/assets/logo.png";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";
import MobileMenu from "./MobileMenu";
import MainNav from "./MainNav";
import { cn } from "@/lib/utils";


const Navbar = () => {
  const [navbarBg, setNavbarBg] = useState("transparent")

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setNavbarBg("bg-white/90 transition-all duration-500")
      } else {
        setNavbarBg("transparent transition-all duration-500")
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  

  return (
    <nav className={cn("fixed top-0 right-0 left-0 z-50", navbarBg)}>
      <div className="relative p-4 flex items-center justify-between z-10">
        <MobileMenu />
        <div className="hidden sm:block">
          <Searchbar />
        </div>
        <Link to={'/'} className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
          <img src={logo} alt="logo" className="h-8 sm:h-14 object-contain hover:scale-105 transition-all duration-500" />
        </Link>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Link to={'/admin'}>
            <Button>
              Admin
            </Button>
          </Link>
        </div>
      </div>
      <MainNav />
    </nav>
  );
}

export default Navbar;