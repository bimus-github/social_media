"use client";

import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Home() {
  const router = useRouter();

  const onHandleLogOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      })
      .finally(() => {
        return <Link href={"/"} />;
      });
  };
  return (
    <div>
      <button onClick={onHandleLogOut}>log out</button>
    </div>
  );
}

export default Home;
