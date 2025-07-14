"use client";

import { rectSortingStrategy } from "@dnd-kit/sortable";
import { MultipleContainers } from "./Sortable/MultipleContainers";

export default function App() {
  return (
    <div className={`flex flex-col items-center`}>
      <MultipleContainers
        itemCount={5}
        strategy={rectSortingStrategy}
        vertical
      />
    </div>
  );
}
