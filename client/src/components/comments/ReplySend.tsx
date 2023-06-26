import { ContainerShell } from "./ContainerShell";
import { SendReplyContent } from "./SendReplyContent";

interface ReplySendProps {
  type: "REPLY" | "SEND";
  possibleReplyingTo?: string[];
  handleReply: (state: boolean) => void;
  parentIdx: number[];
  onBuild?: string;
  additionalStyles?: string;
  contentAdditionalStyles?: string;
}

export function ReplySend({
  type,
  possibleReplyingTo = [""],
  handleReply,
  parentIdx,
  onBuild = "",
  additionalStyles = "",
  contentAdditionalStyles = "",
}: ReplySendProps) {
  return (
    <ContainerShell additionalStyles={additionalStyles} onBuild={onBuild}>
      <SendReplyContent
        type={type}
        possibleReplyingTo={possibleReplyingTo}
        handleReply={handleReply}
        additionalStyles={contentAdditionalStyles}
        parentIdx={parentIdx}
      />
    </ContainerShell>
  );
}
