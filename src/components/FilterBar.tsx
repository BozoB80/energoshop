//import ReactSlider from "react-slider";
import { X } from "lucide-react";

import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

interface FilterbarProps {
  brands: (string | null)[];
  categories: (string | null)[];
  selectedBrands: (string | null)[];
  selectedCategories: (string | null)[];
  searchQuery: string
  minPrice: number
  maxPrice: number
  sliderValues: number[];
  onBrandChange: (brand: string | null) => void;
  onCategoryChange: (category: string | null) => void;
  onSearchChange: (searchQuery: string) => void
  onSliderChange: (newValues: number[]) => void;
}

export const Filterbar = ({
  brands,
  categories,
  selectedBrands,
  selectedCategories,
  searchQuery,
  //minPrice,
  //maxPrice,
  //sliderValues,
  onBrandChange,
  onCategoryChange,
  onSearchChange,
  //onSliderChange,
}: FilterbarProps) => {

  return (
    <div className="flex flex-col gap-2 sm:gap-6 max-lg:p-4 lg:pr-2">
      <div className="relative">
        {/* <h1 className="text-center font-semibold sm:hidden">Filteri</h1> */}
        <p className="font-semibold">Pretražite:</p>
        <Separator className="hidden sm:block sm:my-2" />
        <Input
          value={searchQuery}
          placeholder="Upišite tekst..."
          onChange={(e) => onSearchChange(e.target.value)}
          className="relative border p-2"
        />
        {searchQuery && (
          <X onClick={() => onSearchChange("")} className="h-4 w-4 absolute bottom-3 right-2 cursor-pointer" />
        )}
      </div>

      <div>
        <p className="font-semibold">Kategorije:</p>
        <Separator className="my-1 sm:my-2" />
        {categories.sort((a, b) => (a || '').localeCompare(b || '')).map((category) => (
          <label key={category} className="flex gap-2 capitalize cursor-pointer hover:text-primary">
            <input
              type="checkbox"
              value={category || ''}
              checked={selectedCategories.includes(category || '')}
              onChange={() => onCategoryChange(category || '')}
            />
            {category}
          </label>
        ))}
      </div>

      <div>
        <p className="font-semibold">Brend:</p>
        <Separator className="my-1 sm:my-2" />
        <ScrollArea className="max-lg:h-60 overflow-y-scroll">
          {brands.sort((a, b) => (a || '').localeCompare(b || '')).map((brand) => (
            <label key={brand} className="flex gap-2 cursor-pointer hover:text-primary">
              <input
                type="checkbox"
                value={brand || ''}
                checked={selectedBrands.includes(brand || '')}
                onChange={() => onBrandChange(brand || '')}
              />
              <p>{brand}</p>              
            </label>
          ))}
        </ScrollArea>
      </div>      

      <div>
        <p className="font-semibold">Cijena:</p>
        <Separator className="my-2" />
    
        {/* <ReactSlider 
          min={minPrice}
          max={maxPrice}
          value={sliderValues}
          onAfterChange={(newValues) => {
            onSliderChange(newValues); // Call the callback on slider change
          }}
          ariaLabel={['Lower thumb', 'Upper thumb']}
          ariaValuetext={state => `Thumb value ${state.valueNow}`}
          className="pt-4 pb-8 w-full flex justify-center items-center"        
          trackClassName="h-2 rounded-lg bg-secondary track-0:bg-primary"
          renderThumb={(props, state) => 
            <div {...props} className="w-4 h-4 rounded-full bg-white ring-2 ring-primary active:bg-primary">
              <p className="mt-5 flex justify-end border-none">
                {String(state.valueNow)}
              </p>
            </div>
          }
          pearling
          minDistance={20}
        /> */}
        
      </div>
    </div>
  );
};