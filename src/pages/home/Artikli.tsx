import ProductList from "@/components/product/ProductList";
import useFetchCollection from "@/firebase/useFetchCollection";

const Artikli = () => {
  const { data: products } = useFetchCollection("products", "asc");

  return (
    <div className="max-w-7xl mx-auto">
      {/* <BreadCrumbs page="parfemi" /> */}
      <ProductList products={products} />
    </div>
  );
}

export default Artikli;