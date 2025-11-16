import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { type Todo } from "./Todo.types";
import Button from "./Button";

export type DialogHandle = {
  close: () => void;
  open: () => void;
};

type ModalProps = {
  handleTodo: (value: Todo) => void;
};

const Modal = forwardRef<DialogHandle, ModalProps>(function (
  { handleTodo },
  ref
) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [todoNote, setTodoNote] = useState("");

  function handleSetTodo() {
    if (!todoNote || todoNote.length < 3) return;
    handleTodo({
      id: Date.now(),
      title: todoNote,
      isCompleted: false,
    });

    setTodoNote("");

    dialogRef.current?.close();
  }

  useImperativeHandle(ref, () => ({
    close() {
      dialogRef.current?.close();
    },
    open() {
      dialogRef.current?.showModal();
    },
  }));

  return (
    <dialog
      className="my-auto mx-auto backdrop:opacity-50 backdrop:bg-[#252525] "
      ref={dialogRef}
    >
      <div className="flex flex-col gap-2 bg-white w-full max-w-xs p-4 my-auto mx-0">
        <div className="flex items-center justify-center">
          <h2>New Note</h2>
        </div>
        <div className="flex flex-col gap-2">
          <input
            value={todoNote}
            onChange={(event) => setTodoNote(event.target.value)}
            className="border px-3 py-1 border-[#6c63ff]"
            type="text"
            placeholder="Note..."
          />
        </div>

        <div className="flex items-center justify-between mt-2">
          <form method="dialog">
            <Button>Cancel</Button>
          </form>
          <Button onClick={() => handleSetTodo()}>Apply</Button>
        </div>
      </div>
    </dialog>
  );
});

export default Modal;
