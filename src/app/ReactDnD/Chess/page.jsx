"use client";

import { useMemo } from "react";
import { Board } from "./Board";
import { Game } from "./Game";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const containerStyle = {
  width: 500,
  height: 500,
  border: "1px solid gray",
};

export default function ReactDNDTutorial() {
  const game = useMemo(() => new Game(), []);

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <h1 className={`text-5xl`}>react-dnd demo</h1>
      <div style={containerStyle}>
        <DndProvider backend={HTML5Backend}>
          <Board game={game} />
        </DndProvider>
      </div>
      <div className="">
        <a
          href="https://github.com/react-dnd/react-dnd/tree/main/packages/examples/src/00-chessboard"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://opengraph.githubassets.com/c2129590685864deec0c5883969095d0589f6e87d29d0a82c06da5f6fdd44fd6/react-dnd/react-dnd"
            alt="react-dnd github repo"
            style={{ height: `120px` }}
          />
        </a>
      </div>
    </div>
  );
}
