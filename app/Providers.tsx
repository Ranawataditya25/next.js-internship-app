"use client";

import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider, AbstractIntlMessages } from "next-intl";

export default function Providers({
  children,
  messages,
}: {
  children: React.ReactNode;
  messages: AbstractIntlMessages;
}) {
  const [locale, setLocale] = useState<string>("en");
  const [clientMessages, setClientMessages] = useState<AbstractIntlMessages>(
    messages || {}
  );

  useEffect(() => {
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("locale="))
      ?.split("=")[1];

    const initial =
      cookieLocale ||
      (typeof window !== "undefined" ? localStorage.getItem("locale") : null) ||
      "en";

    if (initial && initial !== locale) setLocale(initial);

    const loadMessages = async (code: string) => {
      try {
        const mod = await import(`../locales/${code}.json`);
        setClientMessages(mod.default || mod);
      } catch {
        setClientMessages(messages || {});
      }
    };

    loadMessages(initial);

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (!detail) return;
      setLocale(detail);
      loadMessages(detail);
    };

    window.addEventListener("localeChange", handler as EventListener);

    return () => {
      window.removeEventListener("localeChange", handler as EventListener);
    };
  }, [messages, locale]);

  return (
    <SessionProvider>
      <NextIntlClientProvider locale={locale} messages={clientMessages}>
        {children}
      </NextIntlClientProvider>
    </SessionProvider>
  );
}
