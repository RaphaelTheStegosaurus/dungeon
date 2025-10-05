"use client";
import { useEffect, useRef, useState } from "react";
interface Props {
  characterName: string;
  text: string;
  onClose: () => void;
}
import Style from "./dialog.module.css";
const Dialog = ({ characterName, text, onClose }: Props) => {
  const [displayedText, setDisplayedText] = useState("");
  const words = text.split(" ");
  const wordCount = text.split(" ").length;
  const textRef = useRef(null);
  useEffect(() => {
    let currentWordIndex = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      if (textRef.current != null) {
        const elementTag = textRef.current as HTMLParagraphElement;
        elementTag.scrollTop = elementTag.scrollHeight;
      }
      if (currentWordIndex < wordCount) {
        const newWord = words.shift();
        setDisplayedText((prev) => prev + newWord + " ");
        currentWordIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [text]);
  return (
    <div className={`${Style.BoxDialog}`}>
      <h2 className={`${Style.Character}`}>-{characterName}-</h2>
      <p ref={textRef} className={`${Style.Text}`}>
        {displayedText}
      </p>
      <button className={`${Style.CloseButton}`} onClick={onClose}>
        Cerrar
      </button>
    </div>
  );
};
export default Dialog;
