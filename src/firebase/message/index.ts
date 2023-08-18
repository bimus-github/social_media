import { Message_Type, User_Type } from "@/types";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { database } from "..";

const collection = "messages";

export async function createMessage(message: Message_Type) {
  try {
    await setDoc(doc(database, collection, message.id), message);
  } catch (error) {
    console.log(error);
    return { ok: false, e: error };
  }
}
