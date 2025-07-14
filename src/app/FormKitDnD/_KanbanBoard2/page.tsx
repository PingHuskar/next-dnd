"use client";

import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { animations } from "@formkit/drag-and-drop";
import { useState } from "react";

export default function DraggableCards() {
  // Card state management
  const [cards, setCards] = useState([
    {
      id: "card-1",
      title: "Card 1",
      items: ["Item 1-1", "Item 1-2", "Item 1-3", "Item 1-4"],
    },
    {
      id: "card-2",
      title: "Card 2",
      items: ["Item 2-1", "Item 2-2", "Item 2-3", "Item 2-4"],
    },
    {
      id: "card-3",
      title: "Card 3",
      items: ["Item 3-1", "Item 3-2", "Item 3-3", "Item 3-4"],
    },
    {
      id: "card-4",
      title: "Card 4",
      items: ["Item 4-1", "Item 4-2", "Item 4-3", "Item 4-4"],
    },
  ]);

  // Handle moving items between cards
  const handleMoveItem = (fromCardId, toCardId, item) => {
    setCards((prevCards) => {
      const newCards = [...prevCards];
      const fromCardIndex = newCards.findIndex(
        (card) => card.id === fromCardId
      );
      const toCardIndex = newCards.findIndex((card) => card.id === toCardId);

      if (fromCardIndex !== -1 && toCardIndex !== -1) {
        // Remove from source card
        newCards[fromCardIndex] = {
          ...newCards[fromCardIndex],
          items: newCards[fromCardIndex].items.filter((i) => i !== item),
        };

        // Add to target card (without duplicates)
        if (!newCards[toCardIndex].items.includes(item)) {
          newCards[toCardIndex] = {
            ...newCards[toCardIndex],
            items: [...newCards[toCardIndex].items, item],
          };
        }
      }

      return newCards;
    });
  };

  // Handle card reordering
  const [cardsRef, cardsOrder] = useDragAndDrop(
    cards.map((card) => card.id),
    {
      group: "cards",
      plugins: [animations()],
      draggable: (el) => el.classList.contains("draggable-card"),
    }
  );

  // Get ordered cards based on drag-and-drop
  const orderedCards = cardsOrder
    .map((cardId) => cards.find((card) => card.id === cardId))
    .filter((card) => card !== undefined);

  return (
    <div
      ref={cardsRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4"
    >
      {orderedCards.map((card) => (
        <Card key={card.id} card={card} onMoveItem={handleMoveItem} />
      ))}
      <div className="">{JSON.stringify(orderedCards)}</div>
    </div>
  );
}

function Card({ card, onMoveItem }) {
  const [items, setItems] = useDragAndDrop(card.items, {
    group: "shared-items",
    plugins: [animations()],
    draggable: (el) => el.classList.contains("draggable-item"),
    dropZone: (el) => el.classList.contains("draggable-card"),
    onDragEnd: (data) => {
      if (!data.isExternal) return;

      const item = data.dragged.dataset.label;
      const toCardElement = data.target.closest(".draggable-card");
      const toCardId = toCardElement?.dataset.cardId;

      if (toCardId && toCardId !== card.id) {
        onMoveItem(card.id, toCardId, item);
      }
    },
  });

  return (
    <div
      className="draggable-card max-w-md p-4 bg-white rounded-lg shadow-md"
      data-card-id={card.id}
    >
      <h2 className="text-lg font-semibold mb-3">{card.title}</h2>
      <ul ref={items} className="space-y-2">
        {setItems.map((item) => (
          <li
            key={item}
            data-label={item}
            className="draggable-item p-3 bg-gray-100 rounded-md cursor-move hover:bg-gray-200 transition-colors"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
