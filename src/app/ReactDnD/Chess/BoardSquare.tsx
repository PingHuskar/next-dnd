"use client";

import { useDrop } from "react-dnd";
import { Overlay, OverlayType } from "./Overlay";
import Square from "./Square";
import { ItemTypes } from "./ItemTypes";
import { GameProps } from "./Game";

type BoardSquareProps = {
  x: number;
  y: number;
  children: React.ReactNode;
  game: GameProps;
};
export const BoardSquare = ({ x, y, children, game }: BoardSquareProps) => {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.KNIGHT,
      canDrop: () => game.canMoveKnight(x, y),
      drop: () => game.moveKnight(x, y),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [game]
  );
  const black = (x + y) % 2 === 1;

  return (
    <div
      ref={drop as unknown as React.Ref<HTMLDivElement>} // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // role="Space"
      data-testid={`(${x},${y})`}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Square black={black}>{children}</Square>
      {isOver && !canDrop && <Overlay type={OverlayType.IllegalMoveHover} />}
      {!isOver && canDrop && <Overlay type={OverlayType.PossibleMove} />}
      {isOver && canDrop && <Overlay type={OverlayType.LegalMoveHover} />}
    </div>
  );
};
