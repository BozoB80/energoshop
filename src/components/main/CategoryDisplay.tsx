import { Category } from "@/types";
import { LayoutGrid } from "../special/layout-grid";

interface CategoriesProps {
  categories: Category[];
}

const CategoryDisplay = ({ categories }: CategoriesProps) => {
  const cards = categories.map((category, index) => ({
    id: category.id,
    content: (
      <div>
        <p className="font-bold text-4xl text-white">{category.label}</p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          {category.description}
        </p>
      </div>
    ),
    title: category.label,
    className: index % 4 === 0 || index % 4 === 3 ? "md:col-span-2" : "md:col-span-1",
    thumbnail: category.image[0],
  }));

  return (
    <div className="h-screen py-10 w-full">
      {/* @ts-expect-error sdsad */}
      <LayoutGrid cards={cards} />
    </div>
  );
};

export default CategoryDisplay;
