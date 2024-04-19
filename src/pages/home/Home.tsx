import BrandsCarousel from "@/components/carousels/BrandsCarousel";
import Banner from "@/components/main/Banner";
import CategoryDisplay from "@/components/main/CategoryDisplay";
import { Separator } from "@/components/ui/separator";
import useFetchCollection from "@/firebase/useFetchCollection";
import { fadeIn } from "@/lib/motion";
import { motion } from "framer-motion";

const Home = () => {
  const { data: brands } = useFetchCollection('brands', 'desc')
  const { data: categories } = useFetchCollection('categories', 'asc')
  
  return (
    <div>
      <Banner />
      <motion.div
        variants={fadeIn({ direction: 'up', type: 'tween', delay: 0.1, duration: 0.8 })} 
        initial="hidden"
        whileInView="show"
      >
        <BrandsCarousel brands={brands} />
      </motion.div>
      <Separator  />
      <motion.div
        variants={fadeIn({ direction: 'up', type: 'tween', delay: 0.1, duration: 0.8 })} 
        initial="hidden"
        whileInView="show"
        className="h-full"
      >
        <CategoryDisplay categories={categories} />
      </motion.div>

      
    </div>
  );
}

export default Home;