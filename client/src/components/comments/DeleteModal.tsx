import { MutableRefObject, useEffect } from "react";
import { EndButton } from "./BigButton";
import { ContainerShell } from "./ContainerShell";

interface DeleteModalProps {
  modalRef: MutableRefObject<HTMLDialogElement | null>;
  notDeleting: () => void;
  handleDelete: () => void;
}

export function DeleteModal({
  modalRef,
  notDeleting,
  handleDelete,
}: DeleteModalProps) {
  useEffect(() => {
    modalRef.current?.showModal();
  }, [modalRef]);

  return (
    <dialog
      ref={modalRef}
      className=" max-w-[26rem] p-4 border-none bg-transparent w-full"
    >
      <ContainerShell
        onBuild="opacity-100"
        additionalStyles=" px-7 py-6 opacity-0 transition-all duration-300"
      >
        <div className="flex flex-col gap-4 w-full">
          <h4 className=" text-base-500 font-medium text-xl">Delete comment</h4>
          <p className=" text-base-400 text-md">
            {
              "Are you sure you want to delete this comment? This will remove the comment and can't be undone."
            }
          </p>
          <div className=" flex flex-row gap-x-3 gap-y-1 justify-between flex-wrap-reverse">
            <EndButton
              type="CANCEL"
              onClick={() => {
                modalRef.current?.close();
                notDeleting();
              }}
              additionalStyles=" flex-1"
            />
            <EndButton
              type="DELETE"
              onClick={() => {
                modalRef.current?.close();
                notDeleting();
                handleDelete();
              }}
              additionalStyles=" flex-1"
            />
          </div>
        </div>
      </ContainerShell>
    </dialog>
  );
}
