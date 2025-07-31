"use client";
import "@atlaskit/css-reset";
import AppProvider from "@atlaskit/app-provider";

export default function PragmaticLayout({children}: {children: React.ReactNode}) {
    return <AppProvider>
    {children}
  </AppProvider>
}
