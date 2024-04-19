import { getDownloadURL, ref, uploadBytes } from "firebase/storage"; 
import { storage } from "@/firebase/firebase";

export const useImageUpload = () => {

  const upload = async (file: File) => {
    const storageRef = ref(storage, `/files/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return getDownloadURL(snapshot.ref); 
  }

  return { upload };

}