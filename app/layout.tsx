import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import en from "../locales/en.json";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Internship App",
  description: "Example App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Providers messages={en}>{children}</Providers>
      </body>
    </html>
  );
}
