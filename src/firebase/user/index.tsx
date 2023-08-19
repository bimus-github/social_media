import { User_Type } from "@/types";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { database } from "..";

const collection_name = "users";

export async function addUser(user: User_Type) {
  try {
    // Add a new document in collection_name "cities"
    await setDoc(doc(database, collection_name, user.id), user);
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser(userId: string) {
  const docRef = doc(database, collection_name, userId);

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
    const updatedRef = doc(database, collection_name, user.id);

    updateDoc(updatedRef, user);
  } catch (error) {
    console.log(error);
  }
}

export async function getUsers(id: string) {
  try {
    const q = query(
      collection(database, collection_name),
      where("userId", "!=", id)
    );
    const querySnapshot = await getDocs(q);

    const data: User_Type[] = [];

    querySnapshot.forEach((doc) => {
      data.push(doc.data() as User_Type);
    });

    return { ok: true, e: [], data };
  } catch (error) {
    console.log(error);

    return { ok: false, e: error, data: [] as User_Type[] };
  }
}
