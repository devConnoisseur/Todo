import NoTodoImg from "./NoTodoImg";

import { useEffect, useRef, useState } from "react";
import Modal, { type DialogHandle } from "./Modal";

import { type Todo } from "./Todo.types";
import ToggleTodo from "./ToggleTodo";
import Header from "./Header";
import TodoList from "./TodoList";

export default function App() {
  const [todo, setTodo] = useState<Todo[]>(() => {
    const isExisting = localStorage.getItem("todo");

    if (isExisting) {
      const parsedJson = JSON.parse(isExisting);
      return parsedJson;
    } else {
      localStorage.setItem("todo", JSON.stringify([]));
      return [];
    }
  });
  const dialogRef = useRef<DialogHandle>(null);


  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  function handleTodo(todoState: Todo) {
    setTodo((prevTodo) => {
      const isExisting = prevTodo.find(
        (tdx) => tdx.title.toLowerCase() === todoState.title.toLowerCase()
      );
      if (isExisting) return prevTodo;
      return [...prevTodo, todoState];
    });
  }

  function handleDeleteTodo(id: number) {
    setTodo((prevTodo) => {
      const isExisting = prevTodo.filter((tdx) => tdx.id !== id);
      return isExisting;
    });
  }

  function handleToggle(id: number) {
    setTodo((prevTodo) =>
      prevTodo.map((tdx) =>
        tdx.id === id ? { ...tdx, isCompleted: !tdx.isCompleted } : tdx
      )
    );
  }
  const todoLength = todo.length === 0;
  return (
    <>
      <Header
        className="mt-10 flex flex-col gap-2 px-8"
        todoLength={todoLength}
      />
      <main className="relative">
        <section className="flex flex-col h-[80dvh] px-8">
          <div className="flex-1 overflow-y-auto">
            {todoLength && (
              <div className="flex flex-col items-center mt-30">
                <NoTodoImg />
                <p style={{ fontWeight: "bold" }}>Empty...</p>
              </div>
            )}

            <TodoList
              handleToggle={handleToggle}
              todo={todo}
              handleDeleteTodo={handleDeleteTodo}
              setTodo={setTodo}
            />

            <Modal
              ref={dialogRef}
              // showModal={showModal}
              // mode="add"
              handleTodo={handleTodo}
            />
          </div>
          <ToggleTodo onClick={() => dialogRef.current?.open()} />
        </section>
      </main>
    </>
  );
}
