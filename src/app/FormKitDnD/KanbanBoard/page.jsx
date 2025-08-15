"use client";

import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { useState, useEffect } from "react";

export default function KanbanBoard() {
  // Initial board data structure
  const [board, setBoard] = useState({
    columns: [
      {
        id: "todo",
        title: "Todo",
        items: ["Task 1", "Task 2", "Task 3"],
      },
      {
        id: "done",
        title: "Done",
        items: ["Task 4", "Task 5"],
      },
    ],
  });

  // State for column order
  const [columnOrder, setColumnOrder] = useState(
    board.columns.map((col) => col.id)
  );

  // Drag and drop for COLUMNS (swapping positions)
  const [columnsRef] = useDragAndDrop(columnOrder, {
    group: "columns",
    dragHandle: ".column-drag-handle",
    setData: (newOrder) => {
      setColumnOrder(newOrder);
      setBoard((prev) => ({
        ...prev,
        columns: newOrder
          .map((columnId) => prev.columns.find((col) => col.id === columnId))
          .filter(Boolean), // Filter out any undefined entries
      }));
    },
  });

  // Drag and drop for ITEMS within each column
  const columnRefs = {};
  const columnItems = {};

  board.columns.forEach((column) => {
    const [ref, items, setItems] = useDragAndDrop(column.items, {
      group: "tasks",
      setData: (newItems) => {
        setBoard((prev) => ({
          ...prev,
          columns: prev.columns.map((col) =>
            col.id === column.id ? { ...col, items: newItems } : col
          ),
        }));
      },
    });
    columnRefs[column.id] = ref;
    columnItems[column.id] = items;
  });

  return (
    <div className="flex flex-col items-center p-4 min-h-screen">
      <h1 className="text-3xl mb-8">Kanban Board</h1>

      <div ref={columnsRef} className="flex gap-4 w-full max-w-4xl">
        {columnOrder.map((columnId) => {
          const column = board.columns.find((col) => col.id === columnId);
          if (!column) return null;

          return (
            <div
              key={column.id}
              className="flex-1 border rounded-lg p-4 bg-gray-50"
            >
              <div className="column-drag-handle flex justify-between items-center mb-4 cursor-move">
                <h2 className="text-xl font-semibold">{column.title}</h2>
                <span>☰</span>
              </div>

              <ul
                ref={columnRefs[column.id]}
                className="space-y-2 min-h-[300px]"
              >
                {columnItems[column.id]?.map((item) => (
                  <li
                    key={item}
                    className="p-3 bg-white rounded border cursor-move hover:shadow"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <button
          onClick={() => console.log(board.columns)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Log Board State
        </button>
      </div>
      {JSON.stringify(board, null, 2)}
    </div>
  );
}
