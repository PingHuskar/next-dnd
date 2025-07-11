"use client";

import Link from "next/link";

export default function FormKitDnDLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={`absolute top-0 left-0`}>
        <h1>
          <Link href={`/FormKitDnD`}>
            FormKit DnD
          </Link>
        </h1>
        <ul className={`list-disc ml-8`}>
          <li>
            <Link href={`/FormKitDnD/FormKitDnD`}>Simple</Link>
          </li>
          <li>
            <Link href={`/FormKitDnD/Transferability`}>Transferability</Link>
          </li>
          <li>
            <Link href={`/FormKitDnD/MultiDrag`}>MultiDrag</Link>
          </li>
        </ul>
      </div>
      {children}
    </>
  );
}
