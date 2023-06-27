import { TComment, TPatchComment } from "@/types/user-comments";
import { ContainerShell } from "./ContainerShell";
import { CommentTextArea } from "./CommentTextArea";
import { PlusMinusCounter } from "./PlusMinusCounter";
import { IconButton } from "./IconButton";
import { EndButton } from "./BigButton";
import { useContext, useRef, useState } from "react";
import { ReplySend } from "./ReplySend";
import { useMutation, useQueryClient } from "react-query";
import { api } from "@/services/queryClient";
import { LocalStorageContext } from "./contexts/LocalStorageContext";
import { DeleteModal } from "./DeleteModal";
import Image from "next/image";

interface CommentProps {
  comment: TComment;
  parentIdx: number[];
  possibleReplyingTo: string[];
}

export function Comment({
  comment: { content, createdAt, id, replyingTo, replies, score, user },
  parentIdx,
  possibleReplyingTo,
}: CommentProps) {
  const { currentUser } = useContext(LocalStorageContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isRepling, setIsRepling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const [isScore, setIsScore] = useState<"+" | "" | "-">("");
  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    "comments",
    async (patchData: TPatchComment) => {
      const res = await api.patch("/comments", patchData);

      return res.data.comments;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("comments");
      },
    }
  );

  const handleDelete = () => {
    const patchData: TPatchComment = {
      type: "DELETE",
      parentIdx,
    };
    mutate(patchData);
  };

  const handleEdit = () => {
    if (textRef.current) {
      const trimmedText = textRef.current.value.trim();

      const regex = /^(@\w+\s?)?(.*)$/;
      const textSeparated = regex.exec(trimmedText);

      if (textSeparated) {
        const replyingToUser = textSeparated[1]?.substring(1).trim() || "";
        const onlyContent = textSeparated[2];

        const patchData: TPatchComment = {
          type: "EDIT",
          content: trimmedText,
          parentIdx,
        };

        if (replyingToUser && possibleReplyingTo.includes(replyingToUser)) {
          patchData.replyingTo = replyingToUser;
          patchData.content = onlyContent;
        }
        mutate(patchData);
      }
    }
  };

  const handleScoreChange = (newScore: number) => {
    const patchData: TPatchComment = {
      type: "SCORE",
      parentIdx,
      score: newScore,
    };
    mutate(patchData);
  };

  return (
    <div className="flex flex-col gap-4 resp:gap-5">
      <div className="flex flex-col gap-2">
        <ContainerShell>
          <div className=" grid grid-cols-2 gap-5 resp:gap-x-6 resp:gap-y-4 resp:grid-cols-commentDesktop resp:grid-rows-commentDesktop">
            <div className=" flex flex-row items-center gap-4 col-span-2 resp:col-span-1 resp:row-span-1 resp:order-2">
              <Image
                src={user.image.webp.substring(1)}
                alt="Avatar image"
                width={32}
                height={32}
              />
              <div className=" flex items-center justify-center">
                <span className=" font-medium text-base-500">
                  {user.username}
                </span>
                {user.username === currentUser?.username ? (
                  <span className=" ml-2 px-[0.4rem] pt-[0.15rem] pb-[0.25rem] bg-primaryBlue rounded-sm text-base-100 text-[0.75rem] leading-none">
                    you
                  </span>
                ) : null}
              </div>
              <span className=" text-base-400">{createdAt}</span>
            </div>
            {!isEditing ? (
              <p className=" text-base-400 col-span-2 resp:col-span-2 resp:row-span-2 resp:order-4">
                {replyingTo ? (
                  <span className=" font-medium text-primaryBlue">
                    @{replyingTo}
                  </span>
                ) : null}{" "}
                {content}
              </p>
            ) : (
              <CommentTextArea
                text={(replyingTo ? `@${replyingTo} ` : "") + content}
                textRef={textRef}
                additionalStyles=" col-span-2 resp:col-span-2 resp:row-span-2 resp:order-4"
              />
            )}
            <PlusMinusCounter
              count={score}
              scoreMark={isScore}
              onPlus={() => {
                handleScoreChange(
                  isScore === "+"
                    ? score - 1
                    : isScore === "-"
                    ? score + 2
                    : score + 1
                );
                setIsScore((oldScore) => (oldScore === "+" ? "" : "+"));
              }}
              onMinus={() => {
                handleScoreChange(
                  isScore === "-"
                    ? score + 1
                    : isScore === "+"
                    ? score - 2
                    : score - 1
                );
                setIsScore((oldScore) => (oldScore === "-" ? "" : "-"));
              }}
              additionalStyles="col-span-1 resp:col-span-1 resp:row-span-2 resp:order-1"
            />
            {user.username === currentUser?.username ? (
              <div className=" flex flex-row item-center justify-between gap-4 justify-self-end resp:col-span-1 resp:row-span-1 resp:order-3">
                {isDeleting ? (
                  <DeleteModal
                    modalRef={modalRef}
                    notDeleting={() => setIsDeleting(false)}
                    handleDelete={handleDelete}
                  />
                ) : null}
                <IconButton
                  type="DELETE"
                  onClick={() => {
                    setIsDeleting(true);
                  }}
                />
                <IconButton
                  type="EDIT"
                  onClick={() => {
                    setIsEditing((state) => !state);
                  }}
                />
              </div>
            ) : (
              <IconButton
                additionalStyles="col-span-1 justify-self-end resp:col-span-1 resp:row-span-1 resp:order-3"
                type="REPLY"
                onClick={() => {
                  setIsRepling((state) => !state);
                }}
              />
            )}
            {isEditing ? (
              <EndButton
                type="UPDATE"
                onClick={() => {
                  setIsEditing(false);
                  handleEdit();
                }}
                additionalStyles=" justify-self-end col-span-2 resp:col-span-1 resp:row-span-1 resp:order-5 resp:col-start-3"
              />
            ) : null}
          </div>
        </ContainerShell>
        {isRepling ? (
          <ReplySend
            type="REPLY"
            possibleReplyingTo={
              replies
                ? [
                    user.username,
                    ...replies.map((reply) => reply.user.username),
                  ]
                : [user.username]
            }
            handleReply={setIsRepling}
            additionalStyles="opacity-0 transition-all duration-150"
            onBuild="opacity-100"
            parentIdx={parentIdx}
          />
        ) : null}
      </div>
      {replies && replies.length > 0 ? (
        <div className="flex flex-col gap-4 resp:gap-5 border-l-2 border-base-300 pl-4 resp:ml-10 resp:pl-10">
          {replies.map((reply, idx) => {
            return (
              <Comment
                key={reply.id}
                comment={reply}
                possibleReplyingTo={[
                  ...replies.map((reply) => reply.user.username),
                  user.username,
                ]}
                parentIdx={[...parentIdx, idx]}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
