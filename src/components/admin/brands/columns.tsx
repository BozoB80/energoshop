import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import CellAction from "./cell-action"
import { Brands } from "@/types"
import { Timestamp } from "firebase/firestore"

export const columns: ColumnDef<Brands>[] = [
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
      <span className="flex max-w-40 max-sm:text-xs max-sm:justify-start truncate">{row.original.description}</span>
    )
  },
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => (
      <img 
        src={row.original.logo}
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
