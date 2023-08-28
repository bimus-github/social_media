"use client";

import RegistartionCard from "@/components/registrationCard";
import { auth } from "@/firebase";
import { addUser } from "@/firebase/user";
import { ErrorMessages, User_Type } from "@/types";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(ErrorMessages.NOT_ERROR);
  const [loading, setLoading] = useState(false);

  const onClick = () => {
    setLoading(true);
    setError(ErrorMessages.NOT_ERROR);
    if (password.length < 6) return setError(ErrorMessages.PASSWORD_SHORT);

    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        // user created
        if (user.uid) {
          const newUser: User_Type = {
            id: user.uid,
            about: "",
            firstname: "",
            lastname: "",
            location: "",
            username: email,
            imageUrl: "",
            job: "",
          };
          await addUser(newUser);
        }

        router.push("/posts");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/network-request-failed") {
          setError(ErrorMessages.NETWORK_REQUEST_FAILED);
        }
        setLoading(false);
        if (errorCode === "auth/email-already-in-use") {
          setError(ErrorMessages.ALREADY_HAVE_USER);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <RegistartionCard
      btnText="Create Accaunt"
      description="Create an account to enjoy all the services without any ads for free!"
      goTo="Login"
      goToMsg="Already Have An Account?"
      onClick={onClick}
      title="Create An Account"
      password={password}
      email={email}
      setPassword={setPassword}
      setEmail={setEmail}
      error={error}
      loading={loading}
    />
  );
}

export default SignUp;
