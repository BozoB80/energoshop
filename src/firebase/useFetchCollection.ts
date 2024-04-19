import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase"; 

const useFetchCollection = (collectionName: string, sort: any) => {
  const [data, setData] = useState([]);
  
  const getCollection = async () => {    
    try {
      const docRef = collection(db, collectionName);
      const q = query(docRef, orderBy("createdAt", sort));
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
  }, [])

  return { data }
}

export default useFetchCollection;