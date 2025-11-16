import { FaRegTrashAlt } from "react-icons/fa";
import Button from "./Button";

import { type Todo } from "./Todo.types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type TodoItemProps = {
  tdx: Todo;
  handleDeleteTodo: (value: number) => void;
  handleToggle: (value: number) => void;
};

export default function TodoItem({
  tdx,
  handleDeleteTodo,
  handleToggle,
}: TodoItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: tdx.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white shadow-sm shadow-[#c3c1e5] flex items-center justify-between py-2 hover:cursor-grab"
    >
      <div className="flex items-center justify-center gap-2 w-full">
        <div className="p-2">
          <input
            onChange={() => handleToggle(tdx.id)}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            type="checkbox"
            checked={tdx.isCompleted}
            className="bg-emerald-700 size-4"
          />
        </div>

        <div className="first-letter:capitalize flex-1">
          <h3>
            <span
              style={
                tdx.isCompleted
                  ? { textDecorationLine: "line-through", opacity: "50%" }
                  : {}
              }
            >
              {tdx.title}
            </span>
          </h3>
        </div>
      </div>

      <div className="opacity-30 flex items-center gap-2 p-2">
        <Button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteTodo(tdx.id);
          }}
          // className={"cursor-crosshair"}
        >
          <FaRegTrashAlt size={18} />
        </Button>
      </div>
    </li>
  );
}
