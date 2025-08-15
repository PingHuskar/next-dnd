"use client";

import { Dispatch, SetStateAction } from "react";

export type GameProps = {
  knightPosition: [number, number];
  observers: number;
  observe: (a: Dispatch<SetStateAction<[number, number]>>) => void;
  moveKnight: (toX: number, toY: number) => void;
  canMoveKnight: (toX: number, toY: number) => boolean;
  emitChange: () => void;
};

export class Game {
  knightPosition = [1, 7];
  observers = [];

  observe(o: never) {
    this.observers.push(o);
    this.emitChange();
    return () => {
      this.observers = this.observers.filter((t) => t !== o);
    };
  }

  moveKnight(toX: number, toY: number) {
    this.knightPosition = [toX, toY];
    this.emitChange();
  }

  canMoveKnight(toX: number, toY: number) {
    const [x, y] = this.knightPosition;
    const dx = toX - x;
    const dy = toY - y;

    return (
      (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
      (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    );
  }

  emitChange() {
    const pos = this.knightPosition;
    this.observers.forEach((o: any) => o?.(pos));
  }
}
