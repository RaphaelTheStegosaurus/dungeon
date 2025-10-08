"use client";
import { useEffect, useRef, useState } from "react";
interface Props {
  nearValue: NPC_Id | -1;
  onClose: () => void;
}
import Style from "./dialog.module.css";
import { NPC_Id } from "../types";
import { DIALOGS, OUR_DIALOG } from "../lib/npc-data";
const Dialog = ({ nearValue, onClose }: Props) => {
  const [displayedText, setDisplayedText] = useState("");
  const currentDialog = nearValue >= 0 ? DIALOGS[nearValue] : OUR_DIALOG;
  const words = currentDialog.text.split(" ");
  const wordCount = currentDialog.text.split(" ").length;
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
    }, 200);

    return () => clearInterval(interval);
  }, [currentDialog.text]);
  return (
    <div className={`${Style.BoxDialog}`}>
      <h2 className={`${Style.Character}`}>-{currentDialog.name}-</h2>
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
