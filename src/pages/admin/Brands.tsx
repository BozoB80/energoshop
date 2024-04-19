import BrandsClient from "@/components/admin/brands/BrandsClient";
import useFetchCollection from "@/firebase/useFetchCollection";

const Brands = () => {
  const { data } = useFetchCollection('brands', 'desc')
  return (
    <div className="w-full">
      <div className="space-y-4 p-2 md:p-8 pt-6">
        <BrandsClient data={data} />
      </div>
    </div>
  );
}

export default Brands;