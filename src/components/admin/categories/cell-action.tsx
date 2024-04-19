
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"
import AlertModal from "@/components/ui/alert-modal";
import { Category } from "@/types";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

interface CellActionProps {
  data: Category
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const onDelete = async () => {
    try {
     setLoading(true)
     await deleteDoc(doc(db, "categories", data.id || ''))     
     toast.success("Kategorija izbrisana.")
    } catch (error) {
      toast.error("Nešto nije u redu.")
    } finally {
     setLoading(false)
     setOpen(false)
    }
 }

  return (
    <>
      <AlertModal 
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            Opcije
          </DropdownMenuLabel>     
          <DropdownMenuItem onClick={() => navigate(`/admin/kategorije/${data.id}`)}>
            <Edit className="mr-2 h-4 w-4" />  
            Ažuriraj
          </DropdownMenuItem>    
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />  
            Izbriši
          </DropdownMenuItem>    
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default CellAction;