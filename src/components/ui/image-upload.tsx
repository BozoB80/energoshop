import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "./button";
import { Trash } from "lucide-react";
import { Input } from "./input";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebase/firebase";


interface ImageUploadProps {
  onChange: (value: string[]) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const uploadedUrls: string[] = [];

      const uploadFile = (file: File) => {
        const storageRef = ref(storage, `images/${Date.now()}${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.log("upload error", error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("Image uploaded successfully", downloadURL);
              uploadedUrls.push(downloadURL);

              // If all files have been uploaded, call the onChange function with the array of URLs
              if (uploadedUrls.length === files.length) {
                onChange(uploadedUrls);
              }
            });
          }
        );
      };

      // Upload each file
      for (const file of Array.from(files)) {
        uploadFile(file);
      }
    }
  };

  const handleRemove = async (url: string) => {
    // Log the URL to verify it
    console.log("Deleting image with URL:", url);
  
    // Call the onRemove callback to remove the image from the parent component
    onRemove(url);
  
    try {
      // Extract the path from the URL (remove the hostname and query parameters)
      const path = new URL(url).pathname;
  
      // Construct the reference to the image in Firebase storage
      const imageRef = ref(storage, path);
  
      // Delete the image from storage
      await deleteObject(imageRef);
  
      console.log("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image from storage:", error);
    }
  };
  

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-1 max-w-lg grid grid-cols-3 gap-4">
        {value?.map((url, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => handleRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <img
              src={url}
              alt={`Image ${index}`}
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <Input
        type="file"
        multiple
        accept="image/*"
        onChange={onUpload}
        placeholder="učitaj slike"
        className="cursor-pointer max-w-lg"
      />
    </div>
  );
};

export default ImageUpload;
