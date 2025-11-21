"use client";

import { useTranslations } from "next-intl";
import { Button } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ServicePage() {
  const t = useTranslations("Landing");

  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return null;

  // User NOT logged in → redirect to login page
  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex h-screen font-sans relative">
      {/* Top Right Corner */}
      <div className="absolute top-8 right-12 z-50 flex items-center gap-4">
        {/* Sign Out Button */}
        <Button
          variant="contained"
          color="error"
          onClick={() => signOut({ callbackUrl: "/login" })}
          style={{
            padding: "6px 20px",
            fontSize: "14px",
          }}
        >
          Sign Out
        </Button>

        {/* Profile Icon */}
        <div className="w-10 h-10 rounded-full overflow-hidden border relative border-gray-300 cursor-pointer">
          <Image
            src="/images/profile.jpg"
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Left panel - 33% */}
      <div className="w-1/3 flex flex-col justify-between p-15 bg-white">
        <div>
          <h1 className="text-red-500 m-0 text-4xl">{t("title")}</h1>
          <p className="mt-2 ml-4 text-base text-gray-950">{t("subtitle")}</p>

          <p className="mt-20 ml-4 text-3xl text-gray-800">{t("info1")}</p>
          <p className="mt-5 ml-4 text-xl text-gray-700">{t("info2")}</p>
        </div>

        <p className="text-xl text-center">
          <span className="font-light text-black">{t("trouble")} </span>
          <span className="font-bold underline cursor-pointer">
            {t("contactUs")}
          </span>
        </p>
      </div>

      {/* RIGHT PANEL (67%) */}
      <div
        className="w-2/3 flex flex-col justify-center px-24"
        style={{ background: "#EAEAEA" }}
      >
        <h2 className="text-2xl font-bold mb-2 text-gray-700">
          Select the type of service you offer
        </h2>

        <div className="w-full max-w-md"></div>
      </div>
    </div>
  );
}
