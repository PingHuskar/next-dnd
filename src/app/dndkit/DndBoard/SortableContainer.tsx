// components/SortableContainer.tsx
"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { DraggableCard } from "./DraggableCard";
import { SortableList } from "./SortableList";

export function SortableContainer({
  initialCards,
  children,
}: {
  initialCards: { id: string; title: string; items: string[] }[];
  children?: React.ReactNode;
}) {
  const [cards, setCards] = useState(initialCards);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    // Handle card sorting
    if (
      active.id.toString().startsWith("card-") &&
      over.id.toString().startsWith("card-")
    ) {
      if (active.id !== over.id) {
        setCards((cards) => {
          const oldIndex = cards.findIndex((card) => card.id === active.id);
          const newIndex = cards.findIndex((card) => card.id === over.id);
          return arrayMove(cards, oldIndex, newIndex);
        });
      }
      return;
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={cards} strategy={verticalListSortingStrategy}>
        {cards.map((card) => (
          <DraggableCard key={card.id} id={card.id}>
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                margin: "10px 0",
                backgroundColor: "#fff",
              }}
            >
              <h3>{card.title}</h3>
              <SortableList items={card.items} cardId={card.id} />
            </div>
          </DraggableCard>
        ))}
        <div className="">{JSON.stringify(cards)}</div>
      </SortableContext>
    </DndContext>
  );
}
