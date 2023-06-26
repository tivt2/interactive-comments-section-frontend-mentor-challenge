"use client";

import { MutableRefObject, useCallback, useEffect } from "react";

interface CommentTextAreaProps {
  textRef: MutableRefObject<HTMLTextAreaElement | null>;
  additionalStyles?: string;
  text?: string;
}

export function CommentTextArea({
  textRef,
  additionalStyles = "",
  text = "",
}: CommentTextAreaProps) {
  const handleAreaResize = useCallback(() => {
    if (textRef.current) {
      textRef.current.style.height = "auto";
      textRef.current.style.height = textRef.current.scrollHeight + 2 + "px";
    }
  }, [textRef]);

  useEffect(() => {
    handleAreaResize();
    if (textRef.current) {
      textRef.current.setSelectionRange(
        textRef.current.value.length,
        textRef.current.value.length
      );
      textRef.current.focus();
    }
  }, [textRef, handleAreaResize]);

  return (
    <textarea
      ref={textRef}
      placeholder="Add a comment..."
      maxLength={200}
      className={`${additionalStyles} min-h-[5.6rem] outline-none caret-primaryBlue cursor-pointer px-6 py-2 resize-none border text-base-400 border-base-300 focus:border-primaryBlue rounded-md comment-text-area`}
      onChange={() => handleAreaResize()}
      defaultValue={text}
    ></textarea>
  );
}
