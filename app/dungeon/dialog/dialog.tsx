"use client";
import { useEffect, useRef, useState } from "react";
interface Props {
  characterName: string;
  text: string;
}
import Style from "./dialog.module.css";
const Dialog = ({ characterName, text }: Props) => {
  const [displayedText, setDisplayedText] = useState("");
  const words = text.split(" ");
  useEffect(() => {
    let currentWordIndex = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      if (currentWordIndex < words.length) {
        // console.log(words[currentWordIndex]);
        setDisplayedText((prev) => prev + words[currentWordIndex] + ' ');
        currentWordIndex++;
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [text]);
  return (
    <div className={`${Style.BoxDialog}`}>
      <h2 className={`${Style.Character}`}>-{characterName}-</h2>
      <p className={`${Style.Text}`}>{displayedText}</p>
      {/* <button onClick={onClose}>Cerrar</button> */}
    </div>
  );
};
export default Dialog;
