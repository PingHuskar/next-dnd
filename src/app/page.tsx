"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export default function Home() {
  const [count, setCount] = useState(0);

  useHotkeys("shift+r", () => setCount((count) => count + 1));
  useHotkeys("K", () => setCount((count) => count - 1));
  // useHotkeys("shift+r", () => setCount((count) => count + 1));
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className={`text-5xl capitalize`}>Choose a DnD lib</h1>
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            <Link href={"/FormKitDnD"}>@formkit/drag-and-drop</Link>
          </li>
          {/* <li className="tracking-[-.01em]">
            <Link href={"/ReactDnD"}>react-dnd</Link>
          </li> */}
          <li className="mb-2 tracking-[-.01em]">
            <Link href={"/dndkit"}>dndkit</Link>
          </li>
          <li className="mb-2 tracking-[-.01em]">
            <Link href={"/pragmatic-drag-and-drop"}>
              pragmatic-drag-and-drop
            </Link>
          </li>
        </ol>
        <span>Pressed 'a' key {count} times.</span>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>

        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
