// const handleSent = async () => {
//     const combinedId =
//       currentUser.uid > sender?.uid
//         ? currentUser.uid + sender?.uid
//         : sender?.uid + currentUser.uid;

//     try {
//       const res = await getDoc(doc(db, "chats", combinedId));
//       if (!res.exists()) {
//         setDoc(doc(db, "chats", combinedId), { messages: [] });
//         debugger;
//         // here we update chat between two user
//         updateDoc(doc(db, "chats", combinedId), {
//           messages: arrayUnion({
//             id: uuidv4(),
//             text: text,
//             senderId: currentUser?.uid,
//             date: Timestamp.now(),
//           }),
//         });

//         updateDoc(doc(db, "chats", combinedId), {
//           lastMessage: text,
//           date: Timestamp.now(),
//           senderId: sender?.uid,
//         });

        // ? for recent chats
        // setDoc(doc(db, "userChatsData", sender?.uid), {
        //   chatList: [],
        // });
        // ?  Here we update the last message of the current user in the sender's chat list
        // await updateDoc(doc(db, "userChatsData", sender?.uid), {
        //   chatList: arrayUnion({
        //     [currentUser?.uid]: {
        //       id: uuidv4(),
        //       uid: currentUser?.uid,
        //       displayName: currentUser?.displayName,
        //       photoURL: currentUser?.photoURL,
        //       lastMessage: text,
        //       timestamp: Timestamp.now(),
        //     },
        //   }),
        // });

        // ? setDoc(doc(db, "userChatsData", currentUser?.uid), {
        //   chatList: [],
        // });
        // Here we Update the last message of the Sender in the Current user's Chat List
        // await updateDoc(doc(db, "userChatsData", currentUser?.uid), {
        //   chatList: arrayUnion({
        //     [sender?.uid]: {
        //       id: uuidv4(),
        //       uid: sender?.uid,
        //       displayName: sender?.displayName,
        //       photoURL: sender?.photoURL,
        //       lastMessage: text,
        //       timestamp: Timestamp.now(),
        //     },
        //   }),
        // });

        // // for recent chats
        // await setDoc(doc(db, "userChats", currentUser.uid), {
        //   [combinedId + ".date"]: serverTimestamp(),
        //   userInfo: {
        //     uid: sender?.uid,
        //     displayName: sender.displayName,
        //     photoURL: sender.photoURL,
        //   },
        // });
        // setText("");
        // here we update last messages
        // updateDoc(doc(db, "userChats", currentUser?.uid), {
        //   date: serverTimestamp(),
        //   userLastMsg: {
        //     lastMessage: text,
        //   },
        // });

        // // here we update for second user
        // updateDoc(doc(db, "userChats", sender?.uid), {
        //   date: serverTimestamp(),
        //   userLastMsg: {
        //     lastMessage: text,
        //   },
        // });
    //   } else {
    //     // here we update chat between two user
    //     updateDoc(doc(db, "chats", combinedId), {
    //       messages: arrayUnion({
    //         id: uuidv4(),
    //         text: text,
    //         senderId: currentUser?.uid,
    //         date: Timestamp.now(),
    //       }),
    //     });

    //     updateDoc(doc(db, "chats", combinedId), {
    //       lastMessage: text,
    //       date: Timestamp.now(),
    //       senderId: sender?.uid,
    //     });

        // Create an initial document to update.
        // debugger;
        // const frankDocRef = doc(db, "chats", combinedId);

        // const q = query(frankDocRef, "2tWQSpRtezeIyCQHSFsWiiqHalT2");

        // console.log("frank", q);

        // await updateDoc(frankDocRef, {
        //   lastMessage: text,
        //   // "favorites.color": "Red"
        // });
        // await setDoc(frankDocRef, {
        //     name: "Frank",
        //     favorites: { food: "Pizza", color: "Blue", subject: "recess" },
        //     age: 12
        // });

        // // To update age and favorite color:
        // await updateDoc(frankDocRef, {
        //     "age": 13,
        //     "favorites.color": "Red"
        // });

        // here we update chat between two user
        // updateDoc(frankDocRef, {
        //   messages: arrayUnion({
        //     id: uuidv4(),
        //     text: text,
        //     senderId: currentUser?.uid,
        //     date: Timestamp.now(),
        //   }),
        // });
        // await updateDoc(frankDocRef, {
        //   lastMessage: text,
        // });

        //   Here we update last message of current user in sender list
        // await updateDoc(doc(db, "userChatsData", sender?.uid), {
        //   chatList: arrayUnion({
        //     [currentUser?.uid]: {
        //       id: uuidv4(),
        //       uid: currentUser?.uid,
        //       displayName: currentUser?.displayName,
        //       photoURL: currentUser?.photoURL,
        //       lastMessage: text,
        //       timestamp: Timestamp.now(),
        //     },
        //   }),
        // });

        // Here we Update the last message of the Sender in the Current user's Chat List
        // await updateDoc(doc(db, "userChatsData", currentUser?.uid), {
        //   chatList: arrayUnion({
        //     [sender?.uid]: {
        //       id: uuidv4(),
        //       uid: sender?.uid,
        //       displayName: sender?.displayName,
        //       photoURL: sender?.photoURL,
        //       lastMessage: text,
        //       timestamp: Timestamp.now(),
        //     },
        //   }),
        // });

        // // Here we Update last message of Sender in Current user Chat List
        // await updateDoc(doc(db, "userChatsData", currentUser?.uid), {
        //   chatList: arrayUnion({
        //     id: uuidv4(),
        //     senderUID: sender?.uid,
        //     displayName: sender?.displayName,
        //     photoURLL: sender?.photoURL,
        //     lastMessage: text,
        //     timestamp: Timestamp.now(),
        //     unreadCount: 3,
        //   }),
        // });

        // // here we update chat between two user
        // updateDoc(doc(db, "chats", combinedId), {
        //   messages: arrayUnion({
        //     id: uuidv4(),
        //     text: imgFile,
        //     senderId: currentUser.uid,
        //     date: Timestamp.now(),
        //   }),
        // });
        // // here we update last messages
        // updateDoc(doc(db, "userChats", currentUser?.uid), {
        //   date: serverTimestamp(),
        //   userLastMsg: {
        //     lastMessage: text,
        //   },
        // });

        // // here we update for second user
        // updateDoc(doc(db, "userChats", sender?.uid), {
        //   date: serverTimestamp(),
        //   userLastMsg: {
        //     lastMessage: text,
        //   },
        // });
//       }
//       setText("");
//       setImgFile(null);
//     } catch (error) {
//       console.log(error);
//     }
//   };


  // 👇️ check if an element is focused on mount
  // useEffect(() => {
  //   if (document.activeElement === ref.current) {
  //     console.log("element has focus");
  //   } else {
  //     console.log("element does NOT have focus");
  //   }
  // }, []);