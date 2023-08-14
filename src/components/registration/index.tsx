"use client";

import { auth } from "@/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

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
    <div className="width-full bg-c">
      {isLoggedIn ? (
        <div className="bg-c">
          {/* if there is user */}
          {props.children[1]}
        </div>
      ) : (
        <div className="bg-c">{props.children[0]}</div>
      )}
    </div>
  );
}

export default Registration;
