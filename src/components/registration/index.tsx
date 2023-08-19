"use client";

import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Navbar from "../navbar";
import { getCurrentUser } from "@/firebase/user";
import { currentUserActions } from "@/strore/slices/currentUser";
import { useAppDispatch } from "@/strore/hooks";
import { getMessages } from "@/firebase/message";
import { messagesActions } from "@/strore/slices/messages";

interface CheckingUserProps {
  children: React.ReactNode[];
}

function Registration(props: CheckingUserProps) {
  const [isLoggedIn, setIsUserLogged] = useState(false);

  const dispatch = useAppDispatch();

  console.log("registration use effect worked");
  useEffect(() => {
    console.log("registration worked");

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsUserLogged(true);

        getCurrentUser(user.uid).then((currentUser) => {
          if (currentUser) {
            dispatch(currentUserActions.setUser(currentUser));
          }
        });
      } else {
        setIsUserLogged(false);
      }
    });

    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    getMessages().then(({ data, e, ok }) => {
      console.log(data);

      if (ok) {
        dispatch(messagesActions.setMessages(data));
      }
    });
  }, [dispatch]);

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
