import {
  collection,
  query,
  onSnapshot,
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../Firebase/firebaseConfig";
import { AuthContext } from "../../AuthContext/authContext";
const useSearch = (serachKeyword) => {
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    handleSearch();
  }, [serachKeyword]);
  const [foundUser, setFoundUser] = useState([]);
  const [error, setError] = useState(false);
  const [allUserData, setAlluserData] = useState();
  const handleSearch = async () => {
    const q = query(collection(db, "users"));
    try {
      //this snapshot will call db when anything updates in db
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
          setAlluserData(data);
        });
      });
      let newUserData = allUserData?.filter((user) => {
        return user.displayName
          .toLowerCase()
          .includes(serachKeyword?.toLowerCase());
      });
      setFoundUser(newUserData);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  
  };

  //

  const handleSelect = async () => {
    console.log(currentUser.uid, "====================", foundUser[0].uid);
    // Check whether the group(chats in firestore) exists, if not create

    const combinedUser =
      currentUser.uid > foundUser[0].uid
        ? currentUser.uid + foundUser[0]?.uid
        : foundUser[0].uid + currentUser?.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedUser));
      console.log("res", res, res.exists(), !res.exists());
      if (!res.exists()) {
        // Create a chat in the chats collection
        await setDoc(doc(db, "chats", combinedUser), { messages: [{

        }] });

        // Update userChats for currentUser
        // debugger
        await setDoc(doc(db, "userChats", currentUser.uid), {
          [combinedUser]: {
            userInfo: {
              uid: foundUser[0].uid,
              displayName: foundUser[0].displayName,
              photoURL: foundUser[0].photoURL,
            },
            date: serverTimestamp(),
          },
        });

        // Update userChats for foundUser
        console.log("foundUser[0].uid)", foundUser[0].uid);
        await setDoc(doc(db, "userChats", foundUser[0].uid), {
          [combinedUser]: {
            userInfo: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            date: serverTimestamp(),
          },
        });
      } else {
        alert("Already");
      }
    } catch (error) {
      console.log(error);
      alert("errrorrr");
    }
  };

  return { allUserData, foundUser, error, handleSearch, handleSelect };
};
export default useSearch;
