"use client";

import Link from "next/link";

export default function DndKitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={`absolute top-0 left-0`}>
        <h1>
          <Link href={`/dndkit`}>dndkit</Link>
        </h1>
        <ul className={`list-disc ml-8`}>
          <li>
            <Link href={`/dndkit/simple`}>simple</Link>
          </li>
        </ul>
      </div>
      {children}
    </>
  );
}
