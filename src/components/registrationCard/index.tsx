"use client";

import { FormEvent } from "react";
import Button from "../button";
import Input from "../input";
import "@/styles/registartionCard/index.scss";

interface RegistartionCardProps {
  title: string;
  description: string;
  btnText: string;
  onClick: () => void;
  goToMsg: string;
  goTo: string;
}

function RegistartionCard(props: RegistartionCardProps) {
  const { btnText, description, onClick, title, goTo, goToMsg } = props;

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
        />

        <Input placeholder="******" title="Password" type="password" />
        <Button text={btnText} />

        <div className="got-div">
          <p>
            {goToMsg} <a href={goTo === "Login" ? "/" : "signup"}>{goTo}</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegistartionCard;
