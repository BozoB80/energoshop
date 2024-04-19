import banner from "@/assets/banner.jpg";
import { fadeIn } from "@/lib/motion";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div className="relative">
      <img src={banner} alt="banner" className="max-sm:h-96 h-[80vh] w-full object-cover" />
      <motion.div 
        variants={fadeIn({ direction: 'right', type: 'tween', delay: 0.1, duration: 0.8 })} 
        initial="hidden"
        whileInView="show"
        className="absolute hidden lg:block top-36 left-24 bg-gradient-to-r from-secondary-foreground via-orange-500 to-primary text-transparent bg-clip-text"
      >
        <h1 className="text-[120px] xl:text-[200px] font-bold">
          energo
        </h1>
        <h2 className="text-xl xl:text-2xl font-semibold">
          Vaš partner za solarna rješenja
        </h2>
      </motion.div>      
    </div>
  );
};

export default Banner;
