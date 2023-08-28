"use client";

import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Navbar from "../navbar";
import { getCurrentUser, getUsers } from "@/firebase/user";
import { currentUserActions } from "@/strore/slices/currentUser";
import { useAppDispatch } from "@/strore/hooks";
import { getMessages } from "@/firebase/message";
import { messagesActions } from "@/strore/slices/messages";
import { usersActions } from "@/strore/slices/users";
import { useRouter } from "next/navigation";

interface CheckingUserProps {
  children: React.ReactNode[];
}

function Registration(props: CheckingUserProps) {
  const [isLoggedIn, setIsUserLogged] = useState(false);

  const router = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsUserLogged(true);

        getCurrentUser(user.uid).then((currentUser) => {
          if (currentUser) {
            dispatch(currentUserActions.setUser(currentUser));
          }
        });

        getUsers(user.uid).then(({ data, e, ok }) => {
          if (ok) {
            dispatch(usersActions.setUsers(data));
          }
        });
      } else {
        setIsUserLogged(false);
      }
    });

    getMessages().then(({ data, e, ok }) => {
      if (ok) {
        dispatch(messagesActions.setMessages(data));
      }
    });

    if (isLoggedIn) {
      router.push("/home");
    }
    if (!isLoggedIn) {
      router.push("/");
    }

    return unsubscribe;
  }, [dispatch, isLoggedIn, router]);

  return (
    <div className="width-full height-full bg-c">
      {isLoggedIn ? (
        <Navbar>
          <div className="bg-c width-full height-full">
            {/* if there is user */}
            {props.children[1]}
          </div>
        </Navbar>
      ) : (
        <div className="bg-c">{props.children[0]}</div>
      )}
    </div>
  );
}

export default Registration;
