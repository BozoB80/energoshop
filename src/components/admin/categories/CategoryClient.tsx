'use client'

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Category } from "@/types";
import { useNavigate } from "react-router-dom";

interface CategoryClientProps {
  data: Category[]
}

const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  const navigate = useNavigate() 

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading 
          title={`Kategorije (${data.length})`}
          description="Unesite kategorije"
        />
        <Button onClick={() => navigate(`/admin/kategorije/novi`)}>
          <Plus className="h-4 w-4 mr-2" />
          Nova kategorija
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="label" />
    </>
  );
}

export default CategoryClient;