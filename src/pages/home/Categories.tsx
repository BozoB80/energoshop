import { useParams } from "react-router-dom";
import ProductList from "@/components/product/ProductList";
import useFetchCollectionWhere from "@/firebase/useFetchCollectionWhere";
import useFetchDocument from "@/firebase/useFetchDocument";

const CategoriesPage = () => {  
  const params = useParams()
  const categoryId = params.id && params.id
  if (!categoryId) return <p>No results</p>

  const { document: category } = useFetchDocument("categories", categoryId);
  const categoryName = category?.label
  const { data: products } = useFetchCollectionWhere("products", "desc", "category", categoryName);

  return (
    <div className="max-w-7xl mx-auto">
      {/* <BreadCrumbs page="parfemi" /> */}
      <ProductList products={products} />
    </div>
  );
}

export default CategoriesPage;