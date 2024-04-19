import { Link } from "react-router-dom";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {  
  const firstImageUrl = product.image.length > 0 ? product.image[0] : "";
  const percentage = product.priceWithDiscount && ((product.price - product.priceWithDiscount) / product.price) * 100;

  return (
    <Card className="group cursor-pointer shadow-lg relative">
      <CardHeader className="p-0 py-3">
        <Link
          to={`/artikli/${product.categoryId}/${product.id}`}
          className="overflow-hidden"
        >
          <img
            //@ts-ignore
            src={firstImageUrl}
            alt={product.title}
            className="aspect-square object-contain hover:scale-105 transition duration-400 rounded-sm hover:rounded-sm"
          />
        </Link>
      </CardHeader>
      {product.priceWithDiscount ? (
        <Badge className="absolute top-0 left-0 aspect-square text-sm md:text-xl">
          {percentage?.toFixed(0)}%
        </Badge>
      ) : (
        ""
      )}
      {/* <div className="absolute top-0 right-0 lg:opacity-0 group-hover:opacity-100 transition ease-in-out duration-500">
        <WishlistButton product={product} />
      </div> */}
      <CardContent className="text-center p-0 py-2">
        <Link
          to={`/brend/${product.brandId}`}
          className="text-xl font-bold"
        >
          {product.brand}
        </Link>
        <p className="text-sm sm:text-sm truncate px-1">{product.title}</p>
      </CardContent>
      <CardFooter className="flex justify-center items-center max-lg:px-0.5 max-lg:py-2 px-0.5 gap-1">
        {product.priceWithDiscount ? (
          <>
            <p className="text-xs md:text-sm text-secondary-foreground/50 line-through">
              {product.price.toFixed(2)} KM
            </p>
            <p className="text-xs font-bold md:text-sm">
              {product.priceWithDiscount.toFixed(2)} KM
            </p>
          </>
        ) : (
          <p className="text-xs md:text-sm font-bold">
            {product.price.toFixed(2)} KM
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
