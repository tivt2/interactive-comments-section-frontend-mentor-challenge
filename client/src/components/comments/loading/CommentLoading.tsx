import { ContainerShell } from "../ContainerShell";

export function CommentLoading() {
  return (
    <ContainerShell>
      <div className=" flex flex-col gap-5 animate-pulse">
        <div className=" flex flex-row gap-4 items-center">
          <div className=" w-8 h-8 rounded-full bg-loading"></div>
          <div className=" w-[30%] h-[1ch] rounded-full bg-loading"></div>
          <div className=" w-[20%] h-[1ch] rounded-full bg-loading"></div>
        </div>
        <div className=" flex flex-col gap-2">
          <div className="w-full h-[1ch] rounded-full bg-loading"></div>
          <div className="w-[80%] h-[1ch] rounded-full bg-loading"></div>
          <div className="w-[80%] h-[1ch] self-end rounded-full bg-loading"></div>
          <div className="w-full h-[1ch] rounded-full bg-loading"></div>
        </div>
      </div>
    </ContainerShell>
  );
}
