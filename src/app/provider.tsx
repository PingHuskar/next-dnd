// app/providers.tsx
"use client";

import { SpacesProvider } from "@ably-labs/spaces-react";
import { AblyProvider } from "ably/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AblyProvider client={new Ably.Realtime.Promise({ authUrl: "/api/ably" })}>
      <SpacesProvider>{children}</SpacesProvider>
    </AblyProvider>
  );
}
