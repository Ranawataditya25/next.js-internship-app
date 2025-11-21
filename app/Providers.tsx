"use client";

import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider, AbstractIntlMessages } from "next-intl";

export default function Providers({
  children,
  messages,
}: {
  children: React.ReactNode;
  messages: AbstractIntlMessages;
}) {
  return (
    <SessionProvider>
      <NextIntlClientProvider locale="en" messages={messages}>
        {children}
      </NextIntlClientProvider>
    </SessionProvider>
  );
}
