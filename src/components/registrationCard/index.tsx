"use client";

import { FormEvent } from "react";
import Button from "../button";
import Input from "../input";
import "@/styles/registartionCard/index.scss";
import { ErrorMessages } from "@/types";

interface RegistartionCardProps {
  title: string;
  description: string;
  btnText: string;
  onClick: () => void;
  goToMsg: string;
  goTo: string;
  password: string;
  email: string;
  setPassword: (v: string) => void;
  setEmail: (v: string) => void;
  error?: ErrorMessages;
  loading?: boolean;
}

function RegistartionCard(props: RegistartionCardProps) {
  const {
    btnText,
    description,
    onClick,
    title,
    goTo,
    goToMsg,
    email,
    password,
    setEmail,
    setPassword,
    error,
    loading,
  } = props;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClick();
  };
  return (
    <div className="login-main-div column d-f j-c-c a-i-c width-100vw height-100vh bg-c">
      <div className="bg-div bg-top bg-l-c b-r-20px" />
      <div className="bg-div bg-bottom bg-l-c b-r-20px"></div>
      <form
        onSubmit={onSubmit}
        className="card-div  bg-l-g-c b-r-20px j-c-f-s a-i-c column sh-x-s"
      >
        <div className="title margin-t-20px">
          <p>{title}</p>
        </div>
        <div className="description">
          <p>{description}</p>
        </div>
        <Input
          placeholder="eg: muhammad@min.uz"
          title="Email Address"
          type="email"
          value={email}
          setValue={setEmail}
          error={error === ErrorMessages.USER_NOT_FOUND}
        />

        <Input
          placeholder="******"
          title="Password"
          type="password"
          value={password}
          setValue={setPassword}
          error={
            error === ErrorMessages.PASSWORD_INCORRECT ||
            error === ErrorMessages.PASSWORD_SHORT
          }
        />
        <Button text={btnText} loading={loading} />

        <div className="got-div">
          <p>
            {goToMsg} <a href={goTo === "Login" ? "/" : "signup"}>{goTo}</a>
          </p>
        </div>
        <div className="got-div">
          <p style={{ color: "red" }}>
            {error === ErrorMessages.PASSWORD_INCORRECT &&
              "Incorrect password!"}
            {error === ErrorMessages.PASSWORD_SHORT &&
              "Password should contain at least 6 symbols!"}
            {error === ErrorMessages.USER_NOT_FOUND &&
              "There is no user with this email!"}
            {error === ErrorMessages.ALREADY_HAVE_USER &&
              "The email already in use!"}
            {error === ErrorMessages.NETWORK_REQUEST_FAILED &&
              "It seems your network is working slowly. Please, tey again!"}
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegistartionCard;
