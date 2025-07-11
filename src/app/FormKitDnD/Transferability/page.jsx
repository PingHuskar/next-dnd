"use client";

import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import todoItems from "./todoItems";
import doneItems from "./doneItems";

export default function FormKitDnDTransferability() {
  const [todoList, todos] = useDragAndDrop(todoItems, { group: "todoList" });
  const [doneList, dones] = useDragAndDrop(doneItems, { group: "todoList" });
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <h1 className={`text-5xl`}>FormKit DnD Transferability Tutorial</h1>
      <div
        className={`kanban-board w-[40%] justify-around items-center flex flex-row flex-wrap border-2`}
      >
        <h2>Todo</h2>
        <h2>Done</h2>
      </div>
      <div
        className={`kanban-board w-[40%] justify-around items-center flex flex-row flex-wrap border-2`}
      >
        <ul ref={todoList} className={`formkitdnd todo min-h-96 min-w-60`}>
          {todos.map((todo) => (
            <li className="kanban-item" key={todo}>
              {todo}
            </li>
          ))}
        </ul>
        <ul ref={doneList} className={`formkitdnd done min-h-96 min-w-60`}>
          {/* <h2>Done</h2> */}
          {dones.map((done) => (
            <li className="kanban-item" key={done}>
              {done}
            </li>
          ))}
        </ul>
      </div>
      <div className="">{JSON.stringify(todos)}</div>
      <div className="">{JSON.stringify(dones)}</div>
    </div>
  );
}
