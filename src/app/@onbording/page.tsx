"use client";

import RegistartionCard from "@/components/registrationCard";
import { auth } from "@/firebase";
import { ErrorMessages } from "@/types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(ErrorMessages.NOT_ERROR);

  const onClick = () => {
    setError(ErrorMessages.NOT_ERROR);
    if (password.length < 6) return setError(ErrorMessages.PASSWORD_SHORT);

    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        // sign in
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        if (errorCode === "auth/user-not-found") {
          setError(ErrorMessages.USER_NOT_FOUND);
        }
        if (errorCode === "auth/wrong-password") {
          setError(ErrorMessages.PASSWORD_INCORRECT);
        }
      });
  };

  return (
    <RegistartionCard
      btnText="Open App"
      description="Create your account to enjoy all the services without any ads for free!"
      goTo="Sign Up"
      goToMsg="If you don't have an account?"
      onClick={onClick}
      title="Create Your Account"
      password={password}
      email={email}
      setPassword={setPassword}
      setEmail={setEmail}
      error={error}
    />
  );
}

export default Login;
