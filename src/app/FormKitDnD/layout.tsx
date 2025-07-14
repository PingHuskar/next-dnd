"use client";

import Image from "next/image";
import Link from "next/link";

export default function FormKitDnDLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const relativePath = "/FormKitDnD";
  const items = [
    {
      title: "Simple",
      path: `/FormKitDnD`,
    },
    {
      title: "Transferability",
      path: `/Transferability`,
    },
    {
      title: "MultiDrag",
      path: `/MultiDrag`,
    },
    {
      title: "KanbanBoard",
      path: `/KanbanBoard`,
    },
  ];
  return (
    <>
      <div className={`absolute top-0 left-0`}>
        {/* <h1>
          <Link href={relativePath}>FormKit DnD</Link>
        </h1> */}
        <Link
          href={`https://drag-and-drop.formkit.com/`}
          target={`_blank`}
          className={`text-blue-500`}
        >
          <Image
            src={`https://avatars.githubusercontent.com/u/76744415?v=4`}
            alt={`logo`}
            width={100}
            height={100}
          />
        </Link>
        <ul className={`list-disc ml-8`}>
          {items.map((item) => {
            return (
              <li key={item.title}>
                <Link href={relativePath + item.path}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      {children}
    </>
  );
}
