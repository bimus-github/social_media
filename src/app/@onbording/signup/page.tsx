"use client";

import RegistartionCard from "@/components/registrationCard";
import { auth } from "@/firebase";
import { ErrorMessages } from "@/types";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(ErrorMessages.NOT_ERROR);

  const onClick = () => {
    setError(ErrorMessages.NOT_ERROR);
    if (password.length < 6) return setError(ErrorMessages.PASSWORD_SHORT);

    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        // user created
        return <Link href={"/"} />;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (errorCode === "auth/email-already-in-use") {
          setError(ErrorMessages.ALREADY_HAVE_USER);
        }
      })
      .finally(() => {
        return <Link href={"/"} />;
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
    />
  );
}

export default SignUp;
