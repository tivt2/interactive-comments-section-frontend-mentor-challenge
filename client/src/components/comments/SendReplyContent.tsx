import { useContext, useRef } from "react";
import { CommentTextArea } from "./CommentTextArea";
import { EndButton } from "./BigButton";
import { TNewComment, TUser } from "@/types/user-comments";
import { useMutation, useQueryClient } from "react-query";
import { api } from "@/services/queryClient";
import { ImageLoading } from "./loading/ImageLoading";
import { LocalStorageContext } from "./contexts/LocalStorageContext";
import Image from "next/image";

interface SendReplyContentProps {
  type: "SEND" | "REPLY";
  possibleReplyingTo?: string[];
  handleReply: (state: boolean) => void;
  parentIdx: number[];
  additionalStyles?: string;
}

export function SendReplyContent({
  type,
  possibleReplyingTo = [""],
  handleReply,
  parentIdx,
  additionalStyles = "",
}: SendReplyContentProps) {
  const { currentUser } = useContext(LocalStorageContext);
  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    "comments",
    async (postData: TNewComment) => {
      const res = await api.post("/comments", postData);

      return res.data.comments;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("comments");
      },
    }
  );

  const handleSendReply = () => {
    if (textRef.current) {
      const trimmedText = textRef.current.value.trim();
      if (!trimmedText) {
        textRef.current.value = "";
        textRef.current.focus();
        return;
      }
      const regex = /^(@\w+\s?)?(.*)$/;
      const textSeparated = regex.exec(trimmedText);

      if (textSeparated) {
        const replyingToUser = textSeparated[1]?.substring(1).trim() || "";
        const onlyContent = textSeparated[2];

        const postData: TNewComment = {
          content: trimmedText,
          user: currentUser as TUser,
          parentIdx,
        };

        if (replyingToUser && possibleReplyingTo.includes(replyingToUser)) {
          postData.replyingTo = replyingToUser;
          postData.content = onlyContent;
        }

        handleReply(false);
        mutate(postData);
        textRef.current.value = "";
        textRef.current.focus();
      }
    }
  };

  return (
    <div
      className={` w-full grid grid-cols-2 resp:grid-cols-sendReplyDesktop gap-4 ${additionalStyles}`}
    >
      {!currentUser ? (
        <ImageLoading />
      ) : (
        <div className=" relative w-8 aspect-square resp:w-10">
          <Image
            src={currentUser.image.webp.substring(1)}
            fill
            alt="Avatar image"
          />
        </div>
      )}
      <CommentTextArea
        textRef={textRef}
        text={type === "REPLY" ? `@${possibleReplyingTo[0]} ` : ""}
        additionalStyles=" col-span-2 -order-1 resp:order-none resp:col-span-1"
      />
      <EndButton
        type={type}
        onClick={handleSendReply}
        additionalStyles=" justify-self-end self-start"
      />
    </div>
  );
}
