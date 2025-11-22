"use client";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function LandingPage() {
  const router = useRouter();
  const t = useTranslations("Landing");
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [languageCode, setLanguageCode] = useState<"en" | "hi">(() => {
    if (typeof window === "undefined") return "en";
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("locale="))
      ?.split("=")[1];
    const stored = cookieLocale || localStorage.getItem("locale") || "en";
    return stored === "hi" ? "hi" : "en";
  });
  const language = (() => {
    const fallback = { en: "English", hi: "हिंदी" } as const;
    try {
      return languageCode === "hi" ? t("hindi") : t("english");
    } catch {
      return fallback[languageCode];
    }
  })();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setLangDropdownOpen(!langDropdownOpen);
  const selectLanguage = (code: "en" | "hi") => {
    document.cookie = `locale=${code}; path=/`;
    localStorage.setItem("locale", code);
    setLanguageCode(code);
    setLangDropdownOpen(false);

    try {
      window.dispatchEvent(new CustomEvent("localeChange", { detail: code }));
    } catch {
      window.location.reload();
    }
  };

  return (
    <div className="flex h-screen font-sans relative">
      {/* Language switcher */}
      <div className="absolute top-6 right-12 z-50" ref={dropdownRef}>
        <div
          onClick={toggleDropdown}
          className="flex items-center cursor-pointer select-none text-gray-400 font-medium"
        >
          <span>{language}</span>
          <ExpandMoreIcon className="text-gray-500" />
        </div>

        {langDropdownOpen && (
          <div className="absolute right-0 mt-1 w-32 bg-gray-200 shadow z-50">
            <div
              className="w-full text-left px-4 py-2 hover:bg-gray-400 cursor-pointer"
              onClick={() => selectLanguage("en")}
            >
              {t("english")}
            </div>
            <div
              className="w-full text-left px-4 py-2 hover:bg-gray-400 cursor-pointer"
              onClick={() => selectLanguage("hi")}
            >
              {t("hindi")}
            </div>
          </div>
        )}
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

      {/* Right panel - 67% */}
      <div
        className="w-2/3 flex flex-col items-center justify-center relative px-35"
        style={{ background: "#EAEAEA" }}
      >
        <h2 className="text-5xl font-bold mb-12 text-center text-[#5C5C5C]">
          {t("onboarding")}
        </h2>

        <Image
          src="/images/onboarding.png"
          alt={t("onboardingAlt")}
          width={400}
          height={300}
          className="mb-14"
        />

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FF523B",
            "&:hover": { backgroundColor: "#e04430" },
          }}
          color="error"
          onClick={() => router.push("/login")}
          style={{ padding: "8px 20px", fontSize: "14px" }}
        >
          {t("getStarted")}
        </Button>
      </div>
    </div>
  );
}
