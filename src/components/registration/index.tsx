"use client";

import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Navbar from "../navbar";

interface CheckingUserProps {
  children: React.ReactNode[];
}

function Registration(props: CheckingUserProps) {
  const [isLoggedIn, setIsUserLogged] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsUserLogged(true);
      } else {
        setIsUserLogged(false);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <div className="width-full height-full bg-c">
      {isLoggedIn ? (
        <div className="bg-c width-full height-full">
          {/* if there is user */}
          <Navbar>{props.children[1]}</Navbar>
        </div>
      ) : (
        <div className="bg-c">{props.children[0]}</div>
      )}
    </div>
  );
}

export default Registration;
