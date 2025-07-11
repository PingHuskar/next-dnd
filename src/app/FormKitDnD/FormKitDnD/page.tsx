"use client";

import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import list from "./list";

export default function FormKitDnD() {
  const [parent, tapes] = useDragAndDrop(
    list,
    {
      draggable: (el) => {
        return el.id !== "no-drag";
      },
    }
  );

  return (
    <>
      <div className="flex flex-col justify-center items-center w-screen h-screen">
        <h1 className={`text-5xl`}>FormKit DnD Tutorial</h1>
        <ol ref={parent} className={`list-decimal`}>
          {tapes.map((tape) => (
            <li className="cassette" data-label={tape} key={tape}>
              {tape}
            </li>
          ))}
        </ol>
        <div
          ref={parent}
          className={`w-[40%] justify-center items-center flex flex-row flex-wrap`}
        >
          {tapes.map((tape, i) => (
            <span
              className={`cassette w-48 h-48 outline-2 bg-amber-100 text-black !bg-amber-${i+1}00 justify-center items-center flex flex-row flex-wrap`}
              data-label={tape}
              key={tape}
              id={`${tape === "Kraftwerk" ? "nodrag" : ""}`}
            >
              {i + 1}: {tape}
            </span>
          ))}
        </div>
        <div id="">I am NOT draggable</div>
        <div className="">{JSON.stringify(tapes)}</div>
      </div>
    </>
  );
}
