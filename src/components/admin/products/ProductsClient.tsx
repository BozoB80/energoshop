import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Product } from "@/types";
import { useNavigate } from "react-router-dom";

interface ProductClientProps {
  data: Product[]
}

const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
  const navigate = useNavigate() 

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading 
          title={`Artikli (${data.length})`}
          description="Unesite artikle"
        />
        <Button onClick={() => navigate(`/admin/artikli/novi`)}>
          <Plus className="h-4 w-4 mr-2" />
          Novi artikal
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="title" />
    </>
  );
}

export default ProductClient;