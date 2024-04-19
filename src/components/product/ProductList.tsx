import { Filterbar } from "@/components/FilterBar";
import { Product } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/product/ProductCard";
import LoadMore from "../LoadMore";

interface ProductListProps {
  products: Product[]
}

const ProductList = ({ products }: ProductListProps) => {
  const { pathname } = useLocation();

  const [selectedBrands, setSelectedBrands] = useState<(string | null)[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<(string | null)[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleProducts, setVisibleProducts] = useState<number>(8);
  const [totalProducts, setTotalProducts] = useState<number>(products.length);

  // Min and max prices for slider
  const minPricesForProducts = products.map((product: Product) => {
    const allPrices = product.priceWithDiscount
      ? [product.priceWithDiscount]
      : [product.price];
    const minPrice = Math.min(...allPrices);
    return minPrice;
  });
  const overallMinPrice = Math.floor(Math.min(...minPricesForProducts));

  // Find the maximum price for each perfume
  const maxPricesForProducts = products.map((product: Product) => {
    const allPrices = product.priceWithDiscount
      ? [product.priceWithDiscount]
      : [product.price];
    const maxPrice = Math.max(...allPrices);
    return maxPrice;
  });
  const overallMaxPrice = Math.floor(Math.max(...maxPricesForProducts));
  const [sliderValues, setSliderValues] = useState([
    overallMinPrice,
    overallMaxPrice,
  ]);

  const filteredProducts = products
    .filter((product: Product) => {
      const titleMatch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const brandLabelMatch = product.brand
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Check if the perfume price is within the slider range
      //const priceInRange =
      (product.priceWithDiscount
        ? product.priceWithDiscount
        : product.price) >= sliderValues[0] &&
      (product.priceWithDiscount
        ? product.priceWithDiscount
        : product.price) <= sliderValues[1] ||
        (!product.priceWithDiscount && product.price >= sliderValues[0] && product.price <= sliderValues[1]);         

      return (
        (selectedBrands.length === 0 ||
          selectedBrands.includes(product.brand || "")) &&
        (selectedCategories.length === 0 ||
          selectedCategories.includes(product.category || "")) &&
        (searchQuery === "" || titleMatch || brandLabelMatch) 
        //priceInRange
      );
    })
    .slice(0, visibleProducts);

  const loadMoreItems = useCallback(() => {
    // Increase the number of visible items by 4 (or any other desired amount)
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 4);
  }, []);

  useEffect(() => {
    // Update the total number of items when the products prop changes
    setTotalProducts(products.length);
  }, [products]);

  useEffect(() => {
    const handleScroll = () => {
      // Load more items when the user reaches the bottom
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50;

      if (isBottom) {
        loadMoreItems();
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Detach the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleProducts, totalProducts, loadMoreItems]);

  const onSliderChange = useCallback(
    (newSliderValues: number[]) => {
      setSliderValues(newSliderValues);

      const filteredBySliderProducts = filteredProducts.filter((product: Product) => {
        const price = product.priceWithDiscount || product.price; // Using discounted price if available
        return price >= newSliderValues[0] && price <= newSliderValues[1];
      });

      // Update the visibleProducts state based on the filtered results
      setVisibleProducts(
        filteredBySliderProducts.length > visibleProducts
          ? visibleProducts + 4
          : visibleProducts
      );
    },
    [filteredProducts, visibleProducts]
  );

  const onFilterReset = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSearchQuery("");
    setVisibleProducts(8);
    setSliderValues([overallMinPrice, overallMaxPrice]);
  };

  return (
    <div className="flex w-full max-lg:p-0 max-xl:px-2 max-sm:pb-20 pb-2 pt-36">
      <div className="lg:w-1/6 hidden lg:block">
        <Filterbar
          brands={products
            .map((p: any) => p.brand)
            .filter(
              (brand, index, self) =>
                brand !== null && index === self.findIndex((b) => b === brand)
            )}
          categories={products
            .map((p: any) => p.category)
            .filter(
              (brand, index, self) =>
                brand !== null && index === self.findIndex((b) => b === brand)
            )}
          selectedBrands={selectedBrands}
          selectedCategories={selectedCategories}
          onBrandChange={(brand) =>
            setSelectedBrands((prevBrands) =>
              prevBrands.includes(brand)
                ? prevBrands.filter((b) => b !== brand)
                : [...prevBrands, brand]
            )
          }
          onCategoryChange={(category) =>
            setSelectedCategories((prevCategories) =>
              prevCategories.includes(category)
                ? prevCategories.filter((c) => c !== category)
                : [...prevCategories, category]
            )
          }
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          minPrice={overallMinPrice}
          maxPrice={overallMaxPrice}
          sliderValues={sliderValues}
          onSliderChange={onSliderChange}
        />
      </div>

      <div className="flex flex-col w-full lg:w-5/6 max-lg:px-2">
        <div className="flex justify-between items-center">
          <h1 className="hidden lg:block capitalize font-semibold">
            {decodeURIComponent(pathname.replace(/\s/g, " ").replace(/\/$/, " ").substring(1))}
          </h1>
          <Drawer>
            <DrawerTrigger className="lg:hidden flex gap-2">
              <ListFilter size={24} />
              Filteri
            </DrawerTrigger>
            <DrawerContent>
              <Filterbar
                brands={products
                  .map((p: any) => p.brand)
                  .filter(
                    (brand, index, self) =>
                      brand !== null &&
                      index === self.findIndex((b) => b === brand)
                  )}
                categories={products
                  .map((p: any) => p.category)
                  .filter(
                    (brand, index, self) =>
                      brand !== null &&
                      index === self.findIndex((b) => b === brand)
                  )}
                selectedBrands={selectedBrands}
                selectedCategories={selectedCategories}
                onBrandChange={(brand) =>
                  setSelectedBrands((prevBrands) =>
                    prevBrands.includes(brand)
                      ? prevBrands.filter((b) => b !== brand)
                      : [...prevBrands, brand]
                  )
                }
                onCategoryChange={(category) =>
                  setSelectedCategories((prevCategories) =>
                    prevCategories.includes(category)
                      ? prevCategories.filter((c) => c !== category)
                      : [...prevCategories, category]
                  )
                }
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                minPrice={overallMinPrice}
                maxPrice={overallMaxPrice}
                sliderValues={sliderValues}
                onSliderChange={onSliderChange}
              />
              <div className="w-full h-auto flex justify-between rounded-xs max-lg:px-4 py-2">
                <Button variant="destructive" onClick={onFilterReset}>
                  Resetiraj
                </Button>
                <DrawerClose asChild>
                  <Button disabled={filteredProducts.length === 0}>
                    Potvrdi
                  </Button>
                </DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>
          <h1 className="font-semibold">
            {selectedBrands.length === 0 &&
            selectedCategories.length === 0 &&
            searchQuery === "" &&
            sliderValues[0] === overallMinPrice &&
            sliderValues[1] === overallMaxPrice
              ? `${products.length} ${
                  products.length === 1 ? "artikal" : "artikla"
                }`
              : `${filteredProducts.length} ${
                  filteredProducts.length === 1 ? "artikal" : "artikla"
                }`}
          </h1>
        </div>

        <Separator className="my-2" />

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[500px]">
            Nema rezultata
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2">
            {filteredProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {visibleProducts < totalProducts && (
          <LoadMore onLoadMore={loadMoreItems} />
        )}
      </div>
    </div>
  );
};

export default ProductList;
