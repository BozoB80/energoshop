import { DocumentData, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase"; 

const useFetchDocument = (collectionName: string, documentID: string) => {
  const [document, setDocument] = useState<DocumentData | undefined>([]);

  const getDocument = async () => {
    const docRef = doc(db, collectionName, documentID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const obj = {
        id: documentID,
        ...docSnap.data(),
      };
      setDocument(obj);

    } else {
      'Document does not exist';
    }
  };

  useEffect(() => {
    if (collectionName && documentID) {
      getDocument();
    }
  }, [collectionName, documentID]);

  return { document };
};

export default useFetchDocument;