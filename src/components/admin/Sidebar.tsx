import { LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { Separator } from "../ui/separator";
import { sidebarLinks } from "@/constants";
import logo from "@/assets/logo.png";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <section className="sticky left-0 top-0 h-screen z-20 md:w-fit xl:w-[300px] flex flex-col justify-between overflow-auto py-5 max-md:hidden">
      <div>
        <Link to={"/"} className="lg:flex justify-center pb-5 md:hidden">
          <img
            src={logo}
            alt="logo"
            width={150}
            height={150}
            className="cursor-pointer"
          />
        </Link>

        <Separator />
        <div className="flex flex-col justify-start w-full gap-2 p-6">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.route;

            return (
              <Link
                key={link.label}
                to={link.route}
                className={`relative flex justify-start gap-4 rounded-md p-4 hover:text-primary ${
                  isActive &&
                  "bg-primary text-white/90 hover:text-white/60 transition"
                }`}
              >
                <link.icon className="w-6 h-6" />
                <p className="max-lg:hidden font-medium text-lg whitespace-nowrap">{link.label}</p>
              </Link>
            );
          })}
        </div>

      </div>
      <Separator />

      <div className="flex flex-col gap-y-4 px-6 pt-6">
        <div className=" w-full flex justify-between items-center">
          <ModeToggle />
          <p className="font-semibold">Izaberi način osvjetljenja</p>
        </div>
        <Button variant="ghost" className="pl-2 flex justify-start items-center gap-8">
          <LogOut className="w-6 h-6" />
          <p className="font-semibold">Odjava</p>
        </Button>
      </div>
    </section>
  );
};

export default Sidebar;
