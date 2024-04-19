import ProductClient from "@/components/admin/products/ProductsClient";
import useFetchCollection from "@/firebase/useFetchCollection";

const Products = () => {
  const { data } = useFetchCollection('products', 'desc')

  return (
    <div className="w-full">
      <div className="space-y-4 p-2 md:p-8 pt-6">
        <ProductClient data={data} />
      </div>
    </div>
  );
}

export default Products;