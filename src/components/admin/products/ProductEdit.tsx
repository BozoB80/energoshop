import useFetchDocument from "@/firebase/useFetchDocument";
import { Product } from "@/types";
import { useParams } from "react-router-dom";
import ProductForm from "./ProductForm";


const ProductEdit = () => {
  const params = useParams();
  const { document } = useFetchDocument('products', params.id || '')
  let product: Product | null = null;

  if (params.id && params.id !== 'novi') {
    product = {
      id: document?.id,
      title: document?.title,
      image: document?.image,
      description: document?.description,
      brand: document?.brand,
      category: document?.category,
      price: document?.price,
      priceWithDiscount: document?.priceWithDiscount,
    };
  }

  return (
    <div className="flex-1 flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm 
          initialData={product ?? null}
        />
      </div>      
    </div>
  );
}

export default ProductEdit;