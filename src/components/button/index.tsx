"use client";
import "@/styles/button/index.css";
import { CircularProgress } from "@mui/material";

interface ButtonProps {
  text: string;
  isBgWhite?: boolean;
  isUploadImageBtn?: boolean;
  setImage?: (v: FileList) => void;
  loading?: boolean;
  onClick?: () => void;
}

function Button(props: ButtonProps) {
  const { text, isBgWhite, isUploadImageBtn, setImage, loading, onClick } =
    props;

  if (loading)
    return (
      <button
        type="button"
        disabled
        className="button bg-black b-r-10px sh-x-s"
      >
        <CircularProgress color="success" />
      </button>
    );

  if (isUploadImageBtn) {
    return (
      <label className="button file bg-black b-r-10px sh-x-s">
        <p className="button-p font-s-20px c-w">{text}</p>
        <input
          type="file"
          hidden
          onChange={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (setImage && e.target.files) {
              setImage(e.target.files);
            }
          }}
        />
      </label>
    );
  }

  if (isBgWhite)
    return (
      <button
        onClick={onClick}
        type="reset"
        className="button bg-white b-r-10px sh-x-s"
      >
        <p className="button-p font-s-20px c">{text}</p>
      </button>
    );
  return (
    <button
      onClick={onClick}
      type="submit"
      className="button bg-black b-r-10px sh-x-s"
    >
      <p className="button-p font-s-20px c-w">{text}</p>
    </button>
  );
}

export default Button;
