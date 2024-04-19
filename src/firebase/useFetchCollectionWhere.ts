import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase"; 

const useFetchCollectionWhere = (collectionName: string, sort: any, collectionLine: string, name: string) => {
  const [data, setData] = useState([]);
  
  const getCollection = () => {    
    try {
      const docRef = collection(db, collectionName);
      const q = query(docRef, where(collectionLine, "==", name), orderBy("createdAt", sort));
      onSnapshot(q, (snapshot) => {
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setData(allData as any)        
      })
    } catch (error) {
      console.log('No data displayed')
    }
  }

  useEffect(() => {
    getCollection()
  }, [name])

  return { data }
}

export default useFetchCollectionWhere;