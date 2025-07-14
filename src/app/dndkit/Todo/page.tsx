"use client";

import { useState } from "react";
import { closestCorners, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { Column } from "./Column";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Input from "./Input";

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Add tests to homepage" },
    { id: 2, title: "Fixing styling in about section" },
    { id: 3, title: "Center a div" },
  ]);

  const addTask = (title: string) => {
    setTasks(tasks => [...tasks, { id: tasks.length + 1, title }]);
  }

  const getTaskPos = (id: number) => tasks.findIndex(task => task.id === id);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id === over!.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(Number(active.id));
      const newPos = getTaskPos(Number(over!.id));
      return arrayMove(tasks, originalPos, newPos);
    });
  }

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor), useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates,
  }));

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <h1 className={`text-5xl mb-4`}>My Tasks</h1>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
       <Input onSubmit={addTask} />
       <Column tasks={tasks} />
      </DndContext>
    </div>
  );
}
