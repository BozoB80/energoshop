import {
  Award,
  Backpack,
  BookMarked,
  Contact,
  Home,
  LogOut,
  Menu,
  ShieldCheck,
  UserCircle2,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ScrollArea } from "../ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase/firebase";
import useFetchCollection from "@/firebase/useFetchCollection";
import { Brands, Category } from "@/types";

const MobileMenu = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const { data: categories } = useFetchCollection("categories", "desc");
  const { data: brands } = useFetchCollection("brands", "desc");

  return (
    <div className="flex sm:hidden items-center gap-4">
      <Sheet>
        <SheetTrigger asChild>
          <Menu size={34} className="mr-8" />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>
              {user ? (
                <div className="flex items-center justify-start gap-2 pb-2">
                  <img
                    src={user.photoURL!}
                    alt="user"
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="text-md">{user.displayName}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate("/admin")}
                    className="lg:hidden text-md font-medium uppercase"
                  >
                    <ShieldCheck fill="red" className="h-6 w-6 mr-2" />
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    variant="link"
                    onClick={() => navigate("/sign-in")}
                    className="text-md font-medium gap-2 underline"
                  >
                    <UserCircle2 size={24} />
                    Prijava
                  </Button>
                </div>
              )}
            </SheetTitle>
          </SheetHeader>

          <ScrollArea className="max-h-full overflow-y-scroll">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <SheetClose
                  onClick={() => navigate("/")}
                  className="w-full flex justify-between items-center py-4 text-black font-medium"
                >
                  Početna
                  <Home size={20} />
                </SheetClose>
              </AccordionItem>

              <AccordionItem value="item-2">
                <SheetClose
                  onClick={() => navigate("/proizvodi")}
                  className="w-full flex justify-between items-center py-4 text-black font-medium"
                >
                  Proizvodi
                  <Backpack size={20} />
                </SheetClose>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Kategorije</AccordionTrigger>
                <ScrollArea className="max-h-64 overflow-y-scroll">
                  <AccordionContent className="flex flex-col space-y-2">
                    {categories.map((item: Category) => (
                      <SheetClose
                        key={item.id}
                        onClick={() =>
                          navigate(
                            `/proizvodi/${item.label
                              .toLowerCase()
                              .replace(/\s/g, "-")}`
                          )
                        }
                        className="uppercase py-1"
                      >
                        {item.label}
                      </SheetClose>
                    ))}
                  </AccordionContent>
                </ScrollArea>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Brendovi</AccordionTrigger>
                <ScrollArea className="max-h-64 overflow-y-scroll">
                  <AccordionContent className="flex flex-col space-y-2">
                    {brands.map((item: Brands) => (
                      <SheetClose
                        key={item.id}
                        onClick={() =>
                          navigate(
                            `/brend/${item.label
                              .toLowerCase()
                              .replace(/\s/g, "-")}`
                          )
                        }
                        className="uppercase py-1"
                      >
                        {item.label}
                      </SheetClose>
                    ))}
                  </AccordionContent>
                </ScrollArea>
              </AccordionItem>

              <AccordionItem value="item-5">
                <SheetClose
                  onClick={() => navigate("/racun")}
                  className="w-full flex justify-between items-center py-4 text-black font-medium"
                >
                  Moj račun
                  <Award size={20} />
                </SheetClose>
              </AccordionItem>

              <AccordionItem value="item-6">
                <SheetClose
                  onClick={() => navigate("/onama")}
                  className="w-full flex justify-between items-center py-4 text-black font-medium"
                >
                  O Nama
                  <BookMarked size={20} />
                </SheetClose>
              </AccordionItem>

              <AccordionItem value="item-7">
                <SheetClose
                  onClick={() => navigate("/kontakt")}
                  className="w-full flex justify-between items-center py-4 text-black font-medium"
                >
                  Kontakt
                  <Contact size={20} />
                </SheetClose>
              </AccordionItem>

              <AccordionItem value="item-8">
                <SheetClose
                  onClick={() => navigate("/")}
                  className="w-full text-start py-4 text-black font-medium"
                >
                  <div className="flex justify-between items-center cursor-pointer gap-4">
                    <p className="">Odjava</p>
                    <LogOut size={20} />
                  </div>
                </SheetClose>
              </AccordionItem>
            </Accordion>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
