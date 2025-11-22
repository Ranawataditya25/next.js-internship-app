"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { signIn } from "next-auth/react";

export default function LoginPage() {
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

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePassword = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/service",
    });

    if (res?.error) {
      console.log("Login failed:", res.error);
      alert("Invalid email or password");
      return;
    }

    window.location.href = res?.url || "/service";
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex h-screen font-sans relative">
      {/* Language Dropdown */}
      <div className="absolute top-6 right-12 z-50" ref={dropdownRef}>
        <div
          onClick={() => setLangDropdownOpen(!langDropdownOpen)}
          className="flex items-center cursor-pointer text-gray-500"
        >
          <span>{language}</span>
          <ExpandMoreIcon className="ml-1 text-gray-500" fontSize="small" />
        </div>

        {langDropdownOpen && (
          <div className="absolute right-0 mt-1 w-32 bg-gray-200 border rounded shadow">
            <div
              className="px-4 py-2 hover:bg-gray-400 cursor-pointer"
              onClick={() => selectLanguage("en")}
            >
              {t("english")}
            </div>
            <div
              className="px-4 py-2 hover:bg-gray-400 cursor-pointer"
              onClick={() => selectLanguage("hi")}
            >
              {t("hindi")}
            </div>
          </div>
        )}
      </div>

      {/* LEFT PANEL (33%) */}
      <div className="w-1/3 flex flex-col justify-between bg-white p-15">
        <div>
          <h1 className="text-red-500 text-4xl m-0">{t("brand")}</h1>
          <p className="mt-2 ml-4 text-base text-gray-800">{t("console")}</p>

          <p className="mt-20 ml-4 text-3xl text-gray-900 leading-snug">
            {t("manageBookings")}
          </p>
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
        className="w-2/3 flex flex-col justify-center px-34"
        style={{ background: "#EAEAEA" }}
      >
        <h2 className="text-4xl font-bold mb-2 text-gray-700">{t("login")}</h2>
        <p className="text-gray-500 mb-10 ml-2">{t("enterCredentials")}</p>

        <div className="w-full max-w-md ml-2">
          <label className="block font-bold text-gray-700 mb-1">
            {t("usernameLabel")}
          </label>
          <TextField
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("usernamePlaceholder")}
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray",
                },
                "&:hover fieldset": {
                  borderColor: "gray",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#D32F2F",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              ),
            }}
          />

          <label className="block font-bold text-gray-700 mb-1 mt-6">
            {t("passwordLabel")}
          </label>
          <TextField
            fullWidth
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("passwordPlaceholder")}
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray",
                },
                "&:hover fieldset": {
                  borderColor: "gray",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#D32F2F",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon className="rotate-325" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePassword} edge="end">
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <div className="flex items-center justify-between mt-8">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FF523B",
                "&:hover": { backgroundColor: "#e04430" },
              }}
              color="error"
              style={{ padding: "8px 40px" }}
              onClick={handleLogin}
            >
              {t("login")}
            </Button>

            <span className="text-sm text-gray-600 cursor-pointer hover:underline">
              {t("forgotPassword")}
            </span>
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-8 ml-2">{t("privacyPolicy")}</p>
      </div>
    </div>
  );
}
