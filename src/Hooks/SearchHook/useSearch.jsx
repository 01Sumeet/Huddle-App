import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../Firebase/firebaseConfig";

const useSearch = (serachKeyword) => {
  const [foundUser, setFoundUser] = useState("");
  const [error, setError] = useState(false);

  const handleSearch = async () => {
    alert(serachKeyword);
    const q = query(
      collection(db, "user"),
      where("displayName", "==", serachKeyword)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setFoundUser(doc.data());
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
      });
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  // useEffect(() => {
  //   handleSearch();
  // }, []);
  return { foundUser, error, handleSearch, handleKey };
};
export default useSearch;
