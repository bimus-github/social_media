"use client";
import "@/styles/button/index.css";

interface ButtonProps {
  text: string;
  isBgWhite?: boolean;
}

function Button(props: ButtonProps) {
  const { text, isBgWhite } = props;

  if (isBgWhite)
    return (
      <button type="submit" className="button bg-white b-r-10px sh-x-s">
        <p className="button-p font-s-20px c">{text}</p>
      </button>
    );
  return (
    <button type="submit" className="button bg-black b-r-10px sh-x-s">
      <p className="button-p font-s-20px c-w">{text}</p>
    </button>
  );
}

export default Button;
