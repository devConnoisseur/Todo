import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import Button from "./Button";
import { type Todo } from "./Todo.types";

type CreateTodoPropos = {
  todo: Todo[];
  handleDeleteTodo: (value: number) => void;
  handleToggle: (value: number) => void;
};

export default function TodoItem({
  todo,
  handleDeleteTodo,
  handleToggle,
}: CreateTodoPropos) {
  return (
    <div className="mt-10">
      <ul className="mt-5 flex flex-col gap-4">
        {todo.map((tdx) => (
          <li className="flex items-center justify-between not-last:border-b not-last:pb-2 not-last:border-b-[#6C63FF]">
            <div className="flex items-center gap-1">
              <input
                onClick={() => handleToggle(tdx.id)}
                type="checkbox"
                checked={tdx.isCompleted}
                className="bg-emerald-700"
              />
              <span
                style={
                  tdx.isCompleted
                    ? { textDecorationLine: "line-through", opacity: "50%" }
                    : {}
                }
                className="first-letter:capitalize"
              >
                {tdx.title}
              </span>
            </div>

            <div className="opacity-30 flex items-center gap-2">
              <Button>
                <FaPencilAlt size={12} />
              </Button>
              <Button onClick={() => handleDeleteTodo(tdx.id)}>
                <FaRegTrashAlt size={12} />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
