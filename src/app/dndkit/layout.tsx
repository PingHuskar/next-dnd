"use client";

import Image from "next/image";
import Link from "next/link";

export default function DndKitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={`absolute top-0 left-0`}>
        {/* <h1>
          <Link href={`/dndkit`}>dndkit</Link>
        </h1> */}
        <Link href={`https://dndkit.com/`} target={`_blank`} className={`text-blue-500`}>
          <Image
            src={`https://dndkit.com/dnd-kit-logo.svg`}
            alt={`logo`}
            width={100}
            height={100}
            />
        </Link>
        <ul className={`list-disc ml-8`}>
          <li>
            <Link href={`/dndkit/Todo`}>Todo</Link>
          </li>
          <li>
            <Link href={`/dndkit/MultipleContainers`}>MultipleContainers</Link>
          </li>
        </ul>
      </div>
      {children}
    </>
  );
}
