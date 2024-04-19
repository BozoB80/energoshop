import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import CellAction from "./cell-action"
import { Category } from "@/types"
import { Timestamp } from "firebase/firestore"


export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "label",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Naziv
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <span className="flex max-sm:text-xs max-sm:justify-start">{row.original.label}</span>
    )
  },
  {
    accessorKey: "description",
    header: "Opis",
    cell: ({ row }) => (
      <span className="flex max-sm:text-xs max-sm:justify-start max-w-sm line-clamp-2">{row.original.description}</span>
    )
  },
  {
    accessorKey: "image",
    header: "Slika",
    cell: ({ row }) => (
      <img 
        // @ts-ignore
        src={row.original.image[0]}
        alt="logo"
        className="h-10 rounded-md"
      />
    )
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Datum izrade
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const createdAtTimestamp = row.original.createdAt as Timestamp;
      const createdAtDate = createdAtTimestamp.toDate(); // Convert Timestamp to Date
      const formattedDate = createdAtDate.toLocaleDateString(); // Format Date as String
      return (
        <span className="flex max-sm:text-xs max-sm:justify-center">{formattedDate}</span>
      );
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
