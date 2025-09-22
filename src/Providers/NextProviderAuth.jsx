"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function NextProviderAuth({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
