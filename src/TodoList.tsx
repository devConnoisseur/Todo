import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { type Todo } from "./Todo.types";
import TodoItem from "./TodoItem";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

type CreateTodoPropos = {
  todo: Todo[];
  handleDeleteTodo: (value: number) => void;
  handleToggle: (value: number) => void;
  setTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export default function TodoList({
  todo,
  handleDeleteTodo,
  handleToggle,
  setTodo,
}: CreateTodoPropos) {
  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;

    if (over && active && active.id !== over.id) {
      setTodo((prevTodo) => {
        const oldIndex = prevTodo.findIndex((item) => item.id === active.id);
        const newIndex = prevTodo.findIndex((item) => item.id === over.id);
        return arrayMove(prevTodo, oldIndex, newIndex);
      });
    }
  }
  return (
    <div className="mt-10">
      <ul className="mt-5 flex flex-col gap-4">
        <DndContext
         
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext items={todo}>
            {todo.map((tdx) => (
              <TodoItem
                key={tdx.id}
                handleToggle={handleToggle}
                handleDeleteTodo={handleDeleteTodo}
                tdx={tdx}
              />
            ))}
          </SortableContext>
        </DndContext>
      </ul>
    </div>
  );
}
