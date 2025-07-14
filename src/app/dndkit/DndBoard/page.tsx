// app/page.tsx
import {DndBoard} from "./DndBoard";

const initialCards = [
  {
    id: "card-1",
    title: "Backlog",
    items: ["Task 1", "Task 2", "Task 3"],
  },
  {
    id: "card-2",
    title: "In Progress",
    items: ["Task 4", "Task 5"],
  },
  {
    id: "card-3",
    title: "Done",
    items: ["Task 6"],
  },
];

export default function Home() {
  return (
    <main style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Project Board</h1>
      <DndBoard initialCards={initialCards} />
    </main>
  );
}
