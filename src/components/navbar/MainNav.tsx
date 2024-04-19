import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Button as MovingButton } from "@/components/special/moving-border"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import useFetchCollection from "@/firebase/useFetchCollection";
import { Brands, Category } from "@/types";
import { fadeIn } from "@/lib/motion";

const MainNav = () => {
  const { data: kategorije } = useFetchCollection("categories", "asc");
  const { data: brendovi } = useFetchCollection("brands", "asc");  
  const [open, setOpen] = useState(false)
  const [openBrend, setOpenBrend] = useState(false)
  const navigate = useNavigate()

  return (
    <motion.div 
      variants={fadeIn({direction: "left", type: "tween", delay: 0.5, duration: 0.8 })}
      initial="hidden"
      whileInView="show"
      className="hidden bg-secondary-foreground/10 text-primary max-w-7xl  mx-auto md:flex justify-between items-center space-x-3"
    >
      <Link to="/artikli">
        <Button variant="ghost" className="uppercase text-md hover:bg-white/30">Artikli</Button>
      </Link>

      <HoverCard open={open} onOpenChange={setOpen} openDelay={100} closeDelay={100}>
        <HoverCardTrigger asChild>
          <Button variant="ghost" className="uppercase text-md hover:bg-white/30">Kategorije</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-full flex flex-col p-4 gap-4 bg-white/95 dark:bg-secondary">
          {kategorije.map((kategorija: Category) => {
            const handleClick = () => {
              navigate(`/kategorije/${kategorija.id}`)
              setOpen(open => !open)
            }

            return (
              <div key={kategorija.id}>
                <MovingButton onClick={handleClick} borderRadius="0.50rem" className="flex justify-start items-center bg-transparent border-none text-black dark:text-white/60 gap-8 hover:border-primary transition duration-500 cursor-pointer">
                     <img 
                      // @ts-expect-error ignore
                      src={kategorija?.image}
                      alt={kategorija.label}
                      className="aspect-square h-16 object-cover"
                    />
                    <h1 className="uppercase font-semibold">{kategorija.label}</h1>
                  
                </MovingButton>
              </div>
            )})}
        </HoverCardContent>
      </HoverCard>      

      <HoverCard open={openBrend} onOpenChange={setOpenBrend} openDelay={100} closeDelay={100}>
        <HoverCardTrigger asChild>
          <Button variant="ghost" className="uppercase text-md hover:bg-white/30">Brendovi</Button>
        </HoverCardTrigger>
        <HoverCardContent className="space-y-2 w-fit bg-white/95 dark:bg-secondary">
          <MovingButton onClick={() => {navigate("/brend"), setOpenBrend(openBrend => !openBrend)}} borderRadius="0.50rem" className="w-full font-semibold text-center text-base py-0 bg-transparent border border-secondary-foreground/10 text-black dark:text-white/60 hover:border-primary transition duration-500 cursor-pointer">Svi brendovi</MovingButton>
          {/* <Button variant="ghost" onClick={() => {navigate("/brend"), setOpenBrend(openBrend => !openBrend)}} className="w-full text-center text-base border border-secondary-foreground/10">Svi brendovi</Button> */}
          <div className="grid grid-cols-3 gap-4">
            {brendovi.map((brend: Brands) => {
              const handleClick = () => {
                navigate(`/brend/${brend.id}`)
                setOpenBrend(openBrend => !openBrend)
              }

              return (
              <MovingButton key={brend.id} onClick={handleClick} borderRadius="0.50rem" className="flex justify-start items-center bg-transparent border border-secondary-foreground/10 text-black dark:text-white/60 gap-8 hover:border-primary transition duration-500 cursor-pointer">
                <img 
                 // @ts-ignore
                 src={brend?.logo}
                 alt={brend.label}
                 className="aspect-square h-16 object-cover"
               />
               <h1 className="uppercase font-semibold">{brend.label}</h1>
             
              </MovingButton>
            )})}
          </div>
        </HoverCardContent>
      </HoverCard>
      
      <Button variant="ghost" onClick={() => navigate('/onama')} className="uppercase text-md hover:bg-white/30">O Nama</Button>
      <Button variant="ghost" onClick={() => navigate('/kontakt')} className="uppercase text-md hover:bg-white/30">Kontakt</Button>
      <Button variant="ghost" onClick={() => navigate('/racun')} className="uppercase text-md hover:bg-white/30">Moj račun</Button>
    </motion.div>
  );
}

export default MainNav;