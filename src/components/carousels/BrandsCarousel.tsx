import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Brands } from "@/types";
import Autoplay from "embla-carousel-autoplay"
import { useNavigate } from "react-router-dom";
import { Button } from "../special/moving-border";

interface BrandsProps {
  brands: Brands[]
}

const BrandsCarousel = ({ brands }: BrandsProps) => {
  const navigate = useNavigate()

  return (
    <Carousel 
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
          stopOnMouseEnter: true,
          stopOnInteraction: false
        })
      ]}
      className="max-w-7xl mx-auto py-5 md:py-10"
    >
      <CarouselContent>
        {brands.map((item) => (
          <CarouselItem key={item.id} className="basis-1/3 lg:basis-1/5 flex justify-center">
            <Button
              borderRadius="0.50rem"
              className="max-sm:hidden bg-transparent dark:bg-secondary-foreground/10 text-black dark:text-white border-transparent dark:border-transparent"
            >
              <img 
                src={item.logo || ''}
                alt={item.id}
                onClick={() => navigate(`/brend/${item.label.toLowerCase().replace(/\s/g, '-')}`)}
                className="w-full h-24 sm:h-28 object-contain object-center cursor-pointer hover:scale-105 transition duration-500"
              />
            </Button>

            <img 
              src={item.logo || ''}
              alt={item.id}
              onClick={() => navigate(`/brend/${item.label.toLowerCase().replace(/\s/g, '-')}`)}
              className="sm:hidden w-full h-24 sm:h-28 object-contain object-center cursor-pointer hover:scale-105 transition duration-500"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default BrandsCarousel;