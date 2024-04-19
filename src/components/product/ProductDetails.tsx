import { Separator } from "../ui/separator";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Brands, Category, Product } from "@/types";
import DetailsCarousel from "../carousels/DetailsCarousel";
import AddToCartButton from "../AddToCartButton";

interface ProductDetailProps {
  category: Category
  product: Product
  brand: Brands
}

const ProductDetails = ({ category, product, brand }: ProductDetailProps) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  //const [product, setProduct] = useState<Product | null>(null)
  

  // const combinedData: Product & {
  //   images: Images[];
  //   category: Category | null;
  //   brand: Brand | null;
  //   priceVariant: PriceVariant | null; // Make priceVariant optional
  // } = {
  //   id: selectedPriceVariant?.id || '',
  //   title: product?.title || '',
  //   description: product?.description || '',
  //   discount: product?.discount || 0,
  //   rating: product?.rating || 0,
  //   createdAt: product?.createdAt || new Date(),
  //   updateAt: product?.updateAt || new Date(),
  //   categoryId: product?.categoryId || '',
  //   brandId: product?.brandId || '',
  //   images: product?.images || [],
  //   category: product?.category || null,
  //   brand: product?.brand || null,
  //   priceVariant: selectedPriceVariant, // Make priceVariant optional
  // };

  
  

  return (
    <div className="pt-36">
      <Separator />
      <div className="py-1 sm:py-2 flex justify-center sm:justify-between items-center">
        <Link
          to={`/brend/${brand.id}`}
        >
          <img
            src={brand.logo || ""}
            alt={brand.label || ""}
            width={100}
            height={100}
            className="hover:scale-105 transition duration-500"
          />
        </Link>
        <div className="hidden sm:flex flex-col items-end">
          <h1 className="font-semibold capitalize">
            {product?.category}
          </h1>
          <h1 className="font-bold text-xl">{product?.title}</h1>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-1 sm:grid-cols-2 max-sm:pb-44">
        <div className="flex flex-col p-2">
          {product?.image ? (
            // @ts-ignore
            <DetailsCarousel images={product?.image} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="p-2">
          <h1 className="flex justify-center items-center md:hidden text-xl font-bold underline underline-offset-4 mb-4">
            {product?.title}
          </h1>
          <div>
            <p className="font-semibold text-lg">Opis:</p>
            <h1 className="text-sm md:text-base">{product?.description}</h1>
          </div>

          <h3 className="pt-3">Izaberite vaš artikal:</h3>
          
          
            <div className="pt-8">            
              <AddToCartButton product={product} selectedQuantity={selectedQuantity} />
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
