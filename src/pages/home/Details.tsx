import { useParams } from "react-router-dom";

import ProductDetails from "@/components/product/ProductDetails";
import useFetchDocument from "@/firebase/useFetchDocument";

const Details = () => {
  const params = useParams()  
  const categoryId = params.categoryId
  const productId = params.productId

  const { document: category } = useFetchDocument("categories", categoryId ?? "")
  const { document: product } = useFetchDocument("products", productId ?? "") 
  const brandId = product?.brandId && product.brandId
  const { document: brand } = useFetchDocument("brands", brandId!) 

  if (!brand) return null

  return (
    <div className="max-w-7xl mx-auto">
      {/* <BreadCrumbs page="parfemi" /> */}
      {/* @ts-ignore */}
      <ProductDetails category={category} product={product} brand={brand} />
    </div>
  );
}

export default Details;