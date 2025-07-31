// components/LiveCursors.tsx
"use client";

import { useSpace } from "@ably-labs/spaces";
import { useCallback, useEffect, useState } from "react";

type Cursor = {
  position: { x: number; y: number };
  data: { username: string; color: string };
};

export default function LiveCursors() {
  const [cursors, setCursors] = useState<Record<string, Cursor>>({});
  const [self, setSelf] = useState<{
    connectionId: string;
    profileData: { username: string; color: string };
  } | null>(null);

  // Initialize the space
  const { space } = useSpace();

  useEffect(() => {
    if (!space) return;

    // Join the space with a random username and color
    const username = `User-${Math.floor(Math.random() * 1000)}`;
    const color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;

    space.enter({ username, color }).then((self) => {
      setSelf({
        connectionId: self.connectionId,
        profileData: { username, color },
      });
    });

    // Subscribe to cursor movements
    space.subscribe("cursorMove", (cursorUpdate) => {
      setCursors((prev) => ({
        ...prev,
        [cursorUpdate.connectionId]: {
          position: cursorUpdate.position,
          data: cursorUpdate.profileData,
        },
      }));
    });

    // Handle when members leave
    space.subscribe("leave", (member) => {
      setCursors((prev) => {
        const newCursors = { ...prev };
        delete newCursors[member.connectionId];
        return newCursors;
      });
    });

    return () => {
      space.leave();
    };
  }, [space]);

  // Handle local cursor movement
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!space || !self) return;

      space.cursors.set({
        position: { x: e.clientX, y: e.clientY },
      });
    },
    [space, self]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
      {Object.entries(cursors).map(
        ([connectionId, cursor]) =>
          connectionId !== self?.connectionId && (
            <div
              key={connectionId}
              className="absolute flex items-center"
              style={{
                transform: `translate(${cursor.position.x}px, ${cursor.position.y}px)`,
                transition: "transform 0.1s ease",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: cursor.data.color }}
              >
                <path d="M5 5L15 3L19 9L13 13L5 5Z" fill="currentColor" />
                <path
                  d="M7 7L12 12M5 5L15 3L19 9L13 13L5 5Z"
                  stroke="black"
                  strokeWidth="0.5"
                />
              </svg>
              <span
                className="ml-1 px-2 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: cursor.data.color }}
              >
                {cursor.data.username}
              </span>
            </div>
          )
      )}
    </div>
  );
}
