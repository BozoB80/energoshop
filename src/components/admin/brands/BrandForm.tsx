import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { Brands } from "@/types";
import { useNavigate, useParams } from "react-router-dom";
import { Timestamp, addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { toast } from "sonner";
import AlertModal from "@/components/ui/alert-modal";
import { useImageUpload } from "@/firebase/useImageUpload";

const formSchema = z.object({
  label: z.string().min(1),
  logo: z.string(),
  description: z.string().min(1)
})

type BrendFormValues = z.infer<typeof formSchema>

interface BrendFormProps {
  initialData: Brands | null
}


const BrendForm: React.FC<BrendFormProps> = ({ initialData }) => {
  const params = useParams()
  const navigate = useNavigate()
  const { upload } = useImageUpload()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const title = initialData ? "Uredi brend" : "Dodaj brend"
  const description = initialData ? "Uredi brend" : "Dodaj novi brend"
  const toastMessage = initialData ? "Brend ažuriran" : "Brend kreiran"
  const action = initialData ? "Sačuvaj izmjene" : "Dodaj"

  const form = useForm<BrendFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: '',
      logo: '',
      description: ''
    }
  })

  useEffect(() => {
    if (initialData) {
      form.setValue("label", initialData.label || "");
      form.setValue("description", initialData.description || "");
      form.setValue("logo", initialData.logo || "");      
    }
  }, [initialData, form]);

  const { isSubmitting } = form.formState
  
  const onSubmit = async (data: BrendFormValues) => {
    try {
      setLoading(true)  
      if (!logoFile) {
        throw new Error("Logo file is required");
      }
      const imageUrl = await upload(logoFile)    
      
      if (initialData) {
        const brandId = params?.id || ''

        await updateDoc(doc(db, "brands", brandId), {
          ...data,
          logo: imageUrl,
          updatedAt: Timestamp.now().toDate()
        })      
      } else {
        await addDoc(collection(db, "brands"), {
          ...data,
          logo: imageUrl,
          createdAt: Timestamp.now().toDate()
        })  
      }
      toast.success(toastMessage, {
        description: "Nastavite s radom"
      })
      navigate(`/admin/brendovi`)
      
    } catch (error) {
      toast.error("Nešto nije u redu.")
    } finally {
      setLoading(false)
    }    
  }

  const onDelete = async () => {
     try {
      setLoading(true)
      await deleteDoc(doc(db, "brands", params.id || ''))
      navigate(`/admin/brendovi`)
      toast.success("Brend izbrisan")      
     } catch (error) {
      toast.error("Brend nije izbrisan")
     } finally {
      setLoading(false)
      setOpen(false)
     }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
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
        <Heading 
          title={title}
          description={description}
        />
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
      <Button
        variant="link"
        onClick={() => navigate(-1)}
        className="pl-0"
      >
        <ArrowLeft className="mr-2" />
        Natrag na brendove
      </Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="max-w-lg">
            <FormField 
              control={form.control}
              name="label"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Tekst</FormLabel>
                  <FormControl>
                    <Input 
                      disabled={loading}
                      placeholder="Tekst brenda"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField 
              control={form.control}
              name="description"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Opis</FormLabel>
                  <FormControl>
                    <Textarea 
                      disabled={loading}
                      placeholder="Unesite opis brenda"
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
                name="logo"
                render={() => (
                  <FormItem>
                    <FormLabel>Logo</FormLabel>
                    <FormControl>
                      <Input 
                        disabled={loading}
                        type="file"
                        accept="image/*"
                        placeholder="Unesite sliku"
                        className="max-w-lg"
                        onChange={handleFileChange}                  
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          <Button disabled={loading} size="lg" className="ml-auto" type="submit">
            {isSubmitting && <Loader2 size={24} className="animate-spin mr-2" />}
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
}

export default BrendForm;