"use client";

import mockFileNames from "./mockFileNames";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";

export default function FormKitDnDMultiDrag() {
  const splitby = 1;
  const [parent1, files1] = useDragAndDrop(mockFileNames.slice(0, splitby), {
    group: "A",
    multiDrag: true,
    selectedClass: "bg-blue-500 text-white",
  });
  const [parent2, files2] = useDragAndDrop(
    mockFileNames.slice(splitby, mockFileNames.length),
    {
      group: "A",
      multiDrag: true,
      selectedClass: "bg-blue-500 text-white",
    }
  );

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <h1 className={`text-5xl`}>FormKit DnD Multi Drag Tutorial</h1>
      <div
        className={`kanban-board w-[40%] justify-around items-center flex flex-row flex-wrap border-2`}
      >
        <h2>Todo</h2>
        <h2>Done</h2>
      </div>
      <div
        className={`kanban-board w-[40%] justify-around items-center flex flex-row flex-wrap border-2`}
      >
        <ul ref={parent1} className="file-list min-h-96 min-w-60">
          {files1.map((file) => (
            <li key={file} className="file">
              {file}
            </li>
          ))}
        </ul>
        <ul ref={parent2} className="file-list min-h-96 min-w-60">
          {files2.map((file) => (
            <li key={file} className="file">
              {file}
            </li>
          ))}
        </ul>
      </div>
      <div className="">
        {JSON.stringify(files1)}
      </div>
      <div className="">
        {JSON.stringify(files2)}
      </div>
    </div>
  );
}
