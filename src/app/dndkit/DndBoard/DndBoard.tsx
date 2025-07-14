// components/DndBoard.tsx
"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DraggableCard } from "./DraggableCard";
import { SortableList } from "./SortableList";

type CardType = {
  id: string;
  title: string;
  items: string[];
};

export function DndBoard({ initialCards }: { initialCards: CardType[] }) {
  const [cards, setCards] = useState<CardType[]>(initialCards);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleItemOrderChange = (cardId: string, newItems: string[]) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, items: newItems } : card
      )
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    // Card sorting
    if (active.id !== over.id) {
      if (
        active.id.toString().startsWith("card-") &&
        over.id.toString().startsWith("card-")
      ) {
        setCards((cards) => {
          const oldIndex = cards.findIndex((card) => card.id === active.id);
          const newIndex = cards.findIndex((card) => card.id === over.id);
          return arrayMove(cards, oldIndex, newIndex);
        });
        return;
      }

      // Item moving between cards
      const activeCardId = active.data.current?.cardId;
      const overCardId = over.data.current?.cardId;

      if (activeCardId && overCardId) {
        setCards((cards) => {
          const activeCardIndex = cards.findIndex(
            (card) => card.id === activeCardId
          );
          const overCardIndex = cards.findIndex(
            (card) => card.id === overCardId
          );

          const activeCard = { ...cards[activeCardIndex] };
          const overCard = { ...cards[overCardIndex] };

          const activeItemIndex = activeCard.items.indexOf(active.id as string);
          const overItemIndex = overCard.items.indexOf(over.id as string);

          if (activeItemIndex === -1) return cards;

          const [movedItem] = activeCard.items.splice(activeItemIndex, 1);

          // If dropping on another item, insert before it
          // If dropping on empty space, append to the end
          const insertIndex =
            overItemIndex !== -1 ? overItemIndex : overCard.items.length;
          overCard.items.splice(insertIndex, 0, movedItem);

          const newCards = [...cards];
          newCards[activeCardIndex] = activeCard;
          newCards[overCardIndex] = overCard;

          return newCards;
        });
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={cards} strategy={verticalListSortingStrategy}>
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
          {cards.map((card) => (
            <DraggableCard key={card.id} id={card.id}>
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "15px",
                  margin: "10px 0",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <h3 style={{ marginTop: 0 }}>{card.title}</h3>
                <SortableList
                  items={card.items}
                  cardId={card.id}
                  onChange={(newItems: string[]) =>
                    handleItemOrderChange(card.id, newItems)
                  }
                />
              </div>
            </DraggableCard>
          ))}
          <div className="">{JSON.stringify(cards)}</div>
        </div>
      </SortableContext>
    </DndContext>
  );
}
