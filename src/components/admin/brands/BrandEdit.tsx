import useFetchDocument from "@/firebase/useFetchDocument";
import { useParams } from "react-router-dom";
import BrendForm from "./BrandForm";
import { Brands } from "@/types";

const BrandEdit = () => {
  const params = useParams();
  const { document } = useFetchDocument('brands', params.id || ''); // Provide a default value
  let brand: Brands | null = null;

  if (params.id && params.id !== 'novi') {
    brand = {
      id: document?.id,
      label: document?.label,
      logo: document?.logo,
      description: document?.description,
    };
  }

  return (
    <div className="flex-1 flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BrendForm 
          initialData={brand ?? null}
        />
      </div>      
    </div>
  );
}

export default BrandEdit;