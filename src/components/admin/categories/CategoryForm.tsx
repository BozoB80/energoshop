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
import { Category } from "@/types";
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

const formSchema = z.object({
  label: z.string().min(1),
  description: z.string().min(1),
  image: z.array(z.object({ url: z.string() })),
  subcategories: z.object({ label: z.string() }).array(),
});

type CategoryFormValues = z.infer<typeof formSchema> & {
  subcategories: Array<{ label: string }>;
};

interface CategoryFormProps {
  initialData: Category | null;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Uredi kategoriju" : "Dodaj kategoriju";
  const description = initialData
    ? "Uredi kategoriju"
    : "Dodaj novi kategoriju";
  const toastMessage = initialData
    ? "Kategorija ažurirana"
    : "Kategorija kreirana";
  const action = initialData ? "Sačuvaj izmjene" : "Dodaj";

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      description: "",
      image: [],
      subcategories: [{ label: "" }],
    },
  });

  useEffect(() => {
    if (initialData && initialData.image) {
      form.setValue("label", initialData.label || "");
      form.setValue("description", initialData.description || "");
      // @ts-ignore
      form.setValue("image", initialData.image.map((imageUrl) => ({ url: imageUrl })) || [])
      form.setValue("subcategories", initialData.subcategories || []);
    }
  }, [initialData, form]);

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      const uploadedImages = data.image.map((image) => image.url);

      if (initialData) {
        const categoryId = params?.id || "";

        await updateDoc(doc(db, "categories", categoryId), {
          ...data,
          image: uploadedImages,
          updatedAt: Timestamp.now().toDate(),
        });
      } else {
        await addDoc(collection(db, "categories"), {
          ...data,
          image: uploadedImages,
          createdAt: Timestamp.now().toDate(),
        });
      }
      toast.success(toastMessage, {
        description: "Nastavite s radom",
      });
      navigate(`/admin/kategorije`);
    } catch (error) {
      toast.error("Nešto nije u redu.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, "categories", params.id || ""));
      navigate(`/admin/kategorije`);
      toast.success("Kategorija izbrisana");
    } catch (error) {
      toast.error("Kategorija nije izbrisana");
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
        Natrag na kategorije
      </Button>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Naziv</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Unesite naziv kategorije"
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Opis</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={loading}
                    placeholder="Unesite opis kategorije"
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
            name="subcategories"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Podkategorije</FormLabel>
                {field.value?.map((sub, index) => (
                  <div key={index} className="flex space-x-2">
                    <FormControl>
                      <Input
                        type="text"
                        value={sub.label}
                        onChange={(e) => {
                          const newOtherOffers = [...field.value];
                          newOtherOffers[index] = {
                            ...newOtherOffers[index],
                            label: e.target.value,
                          };
                          field.onChange(newOtherOffers);
                        }}
                        placeholder="Unesite podkategoriju"
                        className="max-w-lg"
                      />
                    </FormControl>

                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => {
                        const newOtherOffers = [...field.value];
                        newOtherOffers.splice(index, 1);
                        field.onChange(newOtherOffers);
                      }}
                    >
                      Izbriši
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  className="w-1/3"
                  onClick={() => {
                    const newOtherOffers = [...field.value, { label: "" }];
                    field.onChange(newOtherOffers);
                  }}
                >
                  Dodaj podkategoriju
                </Button>
                <FormMessage />
              </FormItem>
            )}
          />
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

export default CategoryForm;
