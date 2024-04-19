
import CategoryClient from "@/components/admin/categories/CategoryClient";
import useFetchCollection from "@/firebase/useFetchCollection";

const Categories = () => {
  const { data } = useFetchCollection('categories', 'desc')
  return (
    <div className="w-full">
      <div className="space-y-4 p-2 md:p-8 pt-6">
        <CategoryClient data={data} />
      </div>
    </div>
  );
}

export default Categories;