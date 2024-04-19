import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeIn } from "@/lib/motion";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

type Card = {
  id: number | string
  content: JSX.Element | React.ReactNode | string;
  title: string
  className: string;
  thumbnail: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);

  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div className="relative bg-secondary/50 shadow-xl rounded-md w-full h-full p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 ">
      {cards.slice(0, 4).map((card, i) => (
        <div key={i} className={cn(card.className, "")}>
          <motion.div
            variants={fadeIn({ direction: "right", type: "tween", delay: 0.3 * i, duration: 0.8 })}
            initial="hidden"
            whileInView="show"
            onClick={() => handleClick(card)}
            className={cn(
              card.className,
              "relative overflow-hidden",
              selected?.id === card.id
                ? "rounded-md cursor-pointer absolute inset-0 h-2/3 w-full md:w-2/3 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                : lastSelected?.id === card.id
                ? "z-40 bg-white shadow-xl dark:bg-secondary rounded-md h-full w-full"
                : "bg-white shadow-xl dark:bg-secondary rounded-md h-full w-full"
            )}
            layout
          >
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <BlurImage card={card} />
            <h1 className={cn("absolute left-5 bottom-5 uppercase text-lg sm:text-2xl font-semibold text-primary", 
            selected?.id === card.id ? "hidden" : "block")}>{card.title}</h1>
          </motion.div>
        </div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selected?.id ? 0.3 : 0 }}
      />
    </div>
  );
};

const BlurImage = ({ card }: { card: Card }) => {
  const [loaded, setLoaded] = useState(false);
  return (
      <img
        src={card.thumbnail}
        onLoad={() => setLoaded(true)}
        className={cn(
          "object-contain object-top absolute inset-0 h-full w-full transition duration-300 cursor-pointer hover:scale-110",
          loaded ? "blur-none" : "blur-md"
        )}
        alt="thumbnail"
      />
  );
};

const SelectedCard = ({ selected }: { selected: Card | null }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.6,
        }}
        className="absolute inset-0 h-full w-full bg-black opacity-60 z-10"
      />
      <motion.div
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="relative flex justify-between items-end px-8 pb-4 z-[70]"
      >
        {selected?.content}
        <Link to={`/kategorije/${selected?.title.toLowerCase().replace(/\s/g, "-")}`} className="text-white">
          <Button>
            Pregledajte
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};
