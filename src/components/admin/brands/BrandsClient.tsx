'use client'

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Brands } from "@/types";
import { useNavigate } from "react-router-dom";



interface BrandsClientProps {
  data: Brands[]
}

const BrandsClient: React.FC<BrandsClientProps> = ({ data }) => {
  const navigate = useNavigate()
 

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading 
          title={`Brendovi (${data.length})`}
          description="Unesite brendove"
        />
        <Button onClick={() => navigate(`/admin/brendovi/novi`)}>
          <Plus className="h-4 w-4 mr-2" />
          Novi brend
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="label" />
    </>
  );
}

export default BrandsClient;