import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import CellAction from "./cell-action"
import { Timestamp } from "firebase/firestore"
import { Product } from '@/types';
import { Button } from "@/components/ui/button"

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "title",
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
      <span className="flex max-sm:text-xs max-sm:justify-start">{row.original.title}</span>
    )
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cijena
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <span className="flex max-sm:text-xs max-sm:justify-start">{row.original.price}</span>
    )
  },
  {
    accessorKey: "priceWithDiscount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cijena s popustom
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <span className="flex max-sm:text-xs max-sm:justify-start">{row.original.priceWithDiscount}</span>
    )
  },
  {
    accessorKey: "brand",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Brend
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <h1>{row.original.brand}</h1>
    )
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kategorija
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
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
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ažurirano
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const updatedAtTimestamp = row.original.updatedAt as Timestamp;
      const updatedAtDate = updatedAtTimestamp?.toDate(); // Convert Timestamp to Date
      const formattedDate = updatedAtDate?.toLocaleDateString(); // Format Date as String
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
