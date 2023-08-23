import { Message_Type } from "@/types";
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

const collection_name = "messages";

export async function createMessage(message: Message_Type) {
  try {
    const newId = (Math.random() * 1000000).toString();

    await setDoc(doc(database, collection_name, newId), {
      ...message,
      id: newId,
    });
    return {
      ok: true,
      e: null,
      data: { ...message, id: newId } as Message_Type,
    };
  } catch (error) {
    console.log(error);
    return { ok: false, e: error, data: {} as Message_Type };
  }
}

export async function getMessagesByUser(id: string) {
  try {
    const q = query(
      collection(database, collection_name),
      where("userId", "==", id)
    );
    const querySnapshot = await getDocs(q);

    const data: Message_Type[] = [];

    querySnapshot.forEach((doc) => {
      data.push(doc.data() as Message_Type);
    });

    return { ok: true, e: [], data };
  } catch (error) {
    console.log(error);

    return { ok: false, e: error, data: [] as Message_Type[] };
  }
}

export async function getMessages() {
  try {
    const querySnapshot = await getDocs(collection(database, collection_name));

    const data: Message_Type[] = [];

    querySnapshot.forEach((doc) => {
      data.push(doc.data() as Message_Type);
    });

    return { ok: true, e: [], data };
  } catch (error) {
    console.log(error);

    return { ok: false, e: error, data: [] as Message_Type[] };
  }
}
