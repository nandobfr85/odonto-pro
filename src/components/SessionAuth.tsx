"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface SessionAuthProviderProps {
  children: ReactNode;
}

export function SessionAuthProvider({ children }: SessionAuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
