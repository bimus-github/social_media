"use client";

import { HTMLInputTypeAttribute } from "react";
import "@/styles/input/index.css";

interface InputProps {
  title: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  isTextarea?: boolean;
}
function Input(props: InputProps) {
  const { title, placeholder, type, isTextarea } = props;
  return (
    <div className="input-div  column">
      <p className="font-s-16px">{title}</p>
      <input
        type={type}
        className="input b-r-10px padding-l-10px sh-x-s"
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
