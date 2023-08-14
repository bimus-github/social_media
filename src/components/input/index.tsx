"use client";

import { HTMLInputTypeAttribute } from "react";
import "@/styles/input/index.css";

interface InputProps {
  title: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  isTextarea?: boolean;
  value: string;
  setValue: (v: string) => void;
  error?: boolean;
}

function Input(props: InputProps) {
  const {
    title,
    placeholder,
    type,
    isTextarea,
    value,
    setValue,
    error = false,
  } = props;

  return (
    <div className="input-div  column">
      <p className="font-s-16px">{title}</p>
      <input
        style={{
          borderColor: error ? "red" : "",
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        className="input b-r-10px padding-l-10px sh-x-s"
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
