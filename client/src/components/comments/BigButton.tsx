type TbuttonCfg = { [key: string]: { color: string; text: string } };

const buttonCfg: TbuttonCfg = {
  SEND: { color: "bg-primaryBlue", text: "SEND" },
  REPLY: { color: "bg-primaryBlue", text: "REPLY" },
  UPDATE: { color: "bg-primaryBlue", text: "UPDATE" },
  DELETE: { color: "bg-primaryRed", text: "YES, DELETE" },
  CANCEL: { color: "bg-base-400", text: "NO, CANCEL" },
};

interface EndButtonProps {
  type: string;
  additionalStyles?: string;
  onClick: () => void;
}

export function EndButton({
  type,
  additionalStyles = "",
  onClick,
}: EndButtonProps) {
  return (
    <button
      onClick={() => onClick()}
      className={`${additionalStyles} min-w-max w-[6.5rem] py-3 px-5 rounded-lg ${buttonCfg[type].color} text-base-100 font-medium hover:opacity-60 active:scale-105 transition-all duration-100`}
    >
      {buttonCfg[type].text}
    </button>
  );
}
