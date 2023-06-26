import Image from "next/image";

type TiconButton = {
  [key: string]: { icon: string; color: string; text: string };
};

const iconButtonCfg: TiconButton = {
  REPLY: {
    icon: "./images/icon-reply.svg",
    color: "text-primaryBlue",
    text: "Reply",
  },
  EDIT: {
    icon: "./images/icon-edit.svg",
    color: "text-primaryBlue",
    text: "Edit",
  },
  DELETE: {
    icon: "./images/icon-delete.svg",
    color: "text-primaryRed",
    text: "Delete",
  },
};

interface IconButtonProps {
  type: string;
  onClick: () => void;
  additionalStyles?: string;
}

export function IconButton({
  type,
  onClick,
  additionalStyles = "",
}: IconButtonProps) {
  return (
    <button
      onClick={() => onClick()}
      className={`${additionalStyles} flex flex-row items-center justify-center hover:opacity-60 active:scale-105 transition-all duration-100`}
    >
      <Image
        src={iconButtonCfg[type].icon.substring(1)}
        width={14}
        height={14}
        alt="Icon image"
      />
      <label
        className={`font-medium ml-2 cursor-pointer ${iconButtonCfg[type].color}`}
      >
        {iconButtonCfg[type].text}
      </label>
    </button>
  );
}
