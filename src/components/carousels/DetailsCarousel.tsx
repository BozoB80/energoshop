import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type CarouselProps = {
  images: string[]
}

const DetailsCarousel = ({ images }: CarouselProps) => {  
  return (
    <Carousel 
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {images.map((item, i) => (
          <CarouselItem key={i}>
            <img 
              src={item}
              alt="image"
              width={500}
              height={250}
              className="w-full aspect-square object-cover object-center"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="max-sm:hidden absolute left-2" />
      <CarouselNext className="max-sm:hidden absolute right-2" />
    </Carousel>
  );
}

export default DetailsCarousel;