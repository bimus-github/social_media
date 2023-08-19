import { User_Type } from "@/types";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { database } from "..";

const collection = "users";

export async function addUser(user: User_Type) {
  try {
    // Add a new document in collection "cities"
    await setDoc(doc(database, collection, user.id), user);
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser(userId: string) {
  const docRef = doc(database, collection, userId);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const user = docSnap.data() as User_Type;
    return user;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

export async function updateUser(user: User_Type) {
  try {
    const updatedRef = doc(database, collection, user.id);

    updateDoc(updatedRef, user);
  } catch (error) {
    console.log(error);
  }
}
