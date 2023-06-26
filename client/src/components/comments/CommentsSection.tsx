import { TComment } from "@/types/user-comments";
import { Comment } from "./Comment";
import { ReplySend } from "./ReplySend";
import { api } from "@/services/queryClient";
import { useQuery, useQueryClient } from "react-query";
import { CommentLoading } from "./loading/CommentLoading";
import { useContext } from "react";
import { LocalStorageContext } from "./contexts/LocalStorageContext";

export function CommentsSection() {
  const { setCurrentUser } = useContext(LocalStorageContext);
  const { data: comments, isLoading } = useQuery<TComment[]>(
    "comments",
    async () => {
      const res = await api.get("/comments");

      setCurrentUser(res.data.currentUser);
      return res.data.comments;
    },
    {
      staleTime: 60 * 1000, // 1 minute to refetch
    }
  );

  const queryClient = useQueryClient();
  const handleReset = async () => {
    await api.post("/reset");
    queryClient.invalidateQueries("comments");
  };

  return (
    <div className=" flex flex-col gap-4 resp:gap-5 max-w-sm resp:max-w-[45rem] w-full">
      {isLoading &&
        Array(4)
          .fill("")
          .map((_, idx) => {
            return <CommentLoading key={idx} />;
          })}
      {!isLoading &&
        comments?.map((comment, idx) => {
          return (
            <Comment
              key={comment.id}
              possibleReplyingTo={comments.map(
                (comment) => comment.user.username
              )}
              comment={comment}
              parentIdx={[idx]}
            />
          );
        })}
      <ReplySend
        type="SEND"
        possibleReplyingTo={comments?.map((comment) => comment.user.username)}
        handleReply={() => {}}
        parentIdx={[]}
      />
      <button
        className="text-xl font-medium text-base-100 bg-primaryRed p-4 rounded-lg mt-4 transition-all duration-100 hover:opacity-60 active:scale-105"
        onClick={() => handleReset()}
      >
        RESET COMMENTS
      </button>
    </div>
  );
}
