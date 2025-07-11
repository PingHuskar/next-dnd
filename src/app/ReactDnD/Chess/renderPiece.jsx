"use client";

import Knight from "./Knight";

export default function renderPiece(x, y, [knightX, knightY]) {
  if (x === knightX && y === knightY) {
    return <Knight />;
  }
}
