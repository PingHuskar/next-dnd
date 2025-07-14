"use client";

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
        <h1>
          <Link href={relativePath}>FormKit DnD</Link>
        </h1>
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
