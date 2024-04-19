import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { Brands, Category, Product } from "@/types";
import { useNavigate, useParams } from "react-router-dom";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { toast } from "sonner";
import AlertModal from "@/components/ui/alert-modal";
import ImageUpload from "@/components/ui/image-upload";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useFetchCollection from "@/firebase/useFetchCollection";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.array(z.object({ url: z.string() })),
  brand: z.string().min(1),
  category: z.string().min(1),
  price: z.coerce.number(),
  priceWithDiscount: z.coerce.number().optional()
});

type ProductFormValues = z.infer<typeof formSchema>

interface ProductFormProps {
  initialData: Product | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const { data: categories } = useFetchCollection("categories", "desc");
  const { data: brands } = useFetchCollection("brands", "desc");

  const params = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Uredi artikal" : "Dodaj artikal";
  const description = initialData
    ? "Uredi artikal"
    : "Dodaj novi artikal";
  const toastMessage = initialData
    ? "Artikal ažuriran"
    : "Artikal kreiran";
  const action = initialData ? "Sačuvaj izmjene" : "Dodaj";

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      image: [],
      brand: "",
      category: "",
      price: 0,
      priceWithDiscount: 0
    },
  });

  useEffect(() => {
    if (initialData && initialData.image) {
      form.setValue("title", initialData.title || "");
      form.setValue("description", initialData.description || "");
      // @ts-ignore
      form.setValue("image", initialData.image.map((imageUrl) => ({ url: imageUrl })) || []);
      form.setValue("brand", initialData.brand || "");
      form.setValue("category", initialData.category || "");
      form.setValue("price", initialData.price || 0);
      form.setValue("priceWithDiscount", initialData.priceWithDiscount || 0);
    }
  }, [initialData, form]);

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      const uploadedImages = data.image.map((image) => image.url);

      const selectedBrand = (brands as Brands[] | undefined)?.find(brand => brand.label === data.brand);
      const selectedCategory = (categories as Category[] | undefined)?.find(category => {
        // Check if the selected category matches the label
        if (category.label === data.category) {
          return true;
        }
        // If subcategories exist, check if any of them match the label
        if (category.subcategories) {
          return category.subcategories.some(sub => sub.label === data.category);
        }
        return false;
      });
      
      const categoryId = selectedCategory
        ? selectedCategory.id
        : undefined;

      if (initialData) {
        const productId = params?.id || "";

        await updateDoc(doc(db, "products", productId), {
          ...data,
          brandId: selectedBrand?.id,
          categoryId: categoryId,
          image: uploadedImages,
          updatedAt: Timestamp.now().toDate(),
        });
      } else {
        await addDoc(collection(db, "products"), {
          ...data,
          brandId: selectedBrand?.id,
          categoryId: selectedCategory?.id,
          image: uploadedImages,
          createdAt: Timestamp.now().toDate(),
        });
      }
      toast.success(toastMessage, {
        description: "Nastavite s radom",
      });
      navigate(`/admin/artikli`);
    } catch (error) {
      toast.error("Nešto nije u redu.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, "products", params.id || ""));
      navigate(`/admin/artikli`);
      toast.success("Artikal izbrisan");
    } catch (error) {
      toast.error("Artikal nije izbrisan");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Button variant="link" onClick={() => navigate(-1)} className="pl-0">
        <ArrowLeft className="mr-2" />
        Natrag na artikle
      </Button>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="md:grid grid-cols-2 gap-4">     
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Naziv</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Unesite naziv artikla"
                    className="max-w-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />            

          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brend</FormLabel>
                <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="max-w-lg" >
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Izaberite brend"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brands?.map((brand: Brands) => (
                        <SelectItem key={brand.id} value={brand.label} >
                          <p className="capitalize">{brand.label}</p>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategorija</FormLabel>
                <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="max-w-lg" >
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Izaberite kategoriju"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map((category: Category) => (
                        <SelectGroup key={category.id}>
                          <SelectItem key={category.id} value={category.label}>
                            <p className="capitalize font-bold">{category.label}</p>
                          </SelectItem>
                          {category.subcategories && 
                            category.subcategories.map((sub, i) => (
                              sub.label &&
                              <SelectItem key={sub.label + i} value={sub.label}>
                                <p className="capitalize">{sub.label}</p>
                              </SelectItem>
                            ))
                          }
                          <Separator />
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="max-w-lg">
                <FormLabel>Cijena</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    type="number"
                    placeholder="Unesite cijenu"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priceWithDiscount"
            render={({ field }) => (
              <FormItem className="max-w-lg">
                <FormLabel>Cijena s popustom (opcija)</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    type="number"
                    placeholder="Unesite cijenu s popustom"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slike</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value?.map((image) => image.url)}
                    onChange={(urls) => {
                      const images = urls.map((url) => ({ url }));
                      field.onChange(images);
                    }}
                    onRemove={(url) =>
                      field.onChange([
                        ...(field.value || []).filter(
                          (current) => current.url !== url
                        ),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Opis</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={loading}
                    rows={10}
                    placeholder="Unesite opis artikla"
                    className="max-w-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>

          <Button
            disabled={loading}
            size="lg"
            className="ml-auto"
            type="submit"
          >
            {isSubmitting && (
              <Loader2 size={24} className="animate-spin mr-2" />
            )}
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};

export default ProductForm;
