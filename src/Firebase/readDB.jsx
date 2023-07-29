import { getDatabase, ref, onValue } from "firebase/database";

const db = getDatabase();
const starCountRef = ref(db, "posts/" + postId + "/starCount");
onValue(starCountRef, (snapshot) => {
  // hjhj@#$!56U
// Web@!1234
  const data = snapshot.val();
  // updateStarCount(postElement, data);
});
