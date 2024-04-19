import useFetchDocument from "@/firebase/useFetchDocument";
import { useParams } from "react-router-dom";
import CategoryForm from "./CategoryForm";
import { Category } from "@/types";

const CategoryEdit = () => {
  const params = useParams();
  const { document } = useFetchDocument('categories', params.id || '')
  let category: Category | null = null;

  if (params.id && params.id !== 'novi') {
    category = {
      id: document?.id,
      label: document?.label,
      image: document?.image,
      description: document?.description,
      subcategories: document?.subcategories
    };
  }

  return (
    <div className="flex-1 flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm 
          initialData={category ?? null}
        />
      </div>      
    </div>
  );
}

export default CategoryEdit;