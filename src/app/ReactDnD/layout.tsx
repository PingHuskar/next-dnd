"use client";

import Link from "next/link";

export default function ReactDnDLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={`absolute top-0 left-0`}>
        <h1>
          <Link href={`/ReactDnD`}>react-dnd</Link>
        </h1>
        <ul className={`list-disc ml-8`}>
          <li>
            <Link href={`/ReactDnD/Chess`}>Chess</Link>
          </li>
          <li>
            <Link
              href={`/ReactDnD/Dustbin`}
            >
              Dustbin
            </Link>
          </li>
        </ul>
      </div>
      {children}
    </>
  );
}
