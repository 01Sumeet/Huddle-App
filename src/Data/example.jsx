// First, initialize the Firestore instance. Assuming 'db' is your Firestore instance.

import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";

// Function to add a new message to the specified chat (identified by 'combinedId')
async function addMessageToChat(combinedId, sender, content, type) {
  try {
    const chatRef = doc(db, "chats", combinedId);

    // Creating a new message object
    const newMessage = {
      id: uuidv4(), // Generating a new unique ID for the message
      sender: sender,
      content: content,
      type: type,
      date: new Date().getTime(), // You can use serverTimestamp() as well
    };

    // Adding the new message to the 'messages' array using arrayUnion
    await updateDoc(chatRef, {
      messages: arrayUnion(newMessage),
      lastMessage: {
        sender: sender,
      },
    });

    console.log("Message added successfully.");
  } catch (error) {
    console.error("Error adding message:", error);
  }
}

// Usage example:
const combinedId = "UUID-1";
const sender = "user1";
const content = "Hello, this is a dynamic message!";
const type = "text";

addMessageToChat(combinedId, sender, content, type);
