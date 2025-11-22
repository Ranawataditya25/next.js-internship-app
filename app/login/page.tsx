"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
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
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);
    setLoginError(null);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/service",
    });

    if (res?.error) {
      setLoginError(t("invalidCredentials"));
      setLoading(false);
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
          <ExpandMoreIcon className="text-gray-600" />
        </div>

        {langDropdownOpen && (
          <div className="absolute right-0 mt-1 w-32 bg-gray-200 shadow z-50 border border-gray-300 rounded-md overflow-hidden">
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

          <p className="mt-20 ml-4 text-3xl text-gray-800 leading-snug">
            {t("manageBookings")}
          </p>
        </div>
        <p className="text-xl text-center">
          <span className="font-light text-gray-800">{t("trouble")} </span>
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
        <h2 className="text-4xl font-bold mb-2 text-[#5C5C5C]">
          {t("signIn")}
        </h2>
        <p className="text-gray-500 mb-10 ml-2">{t("enterCredentials")}</p>

        {loginError && (
          <div className="w-full max-w-md ml-2 mb-4">
            <div className="flex items-start gap-3 p-3 rounded-md bg-red-50 border border-red-200 text-red-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mt-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.68-1.36 3.444 0l5.516 9.8A1.75 1.75 0 0116.944 16H3.056a1.75 1.75 0 01-1.273-2.101l5.474-9.8zM9 7a1 1 0 112 0v3a1 1 0 11-2 0V7zm1 7a1.25 1.25 0 100-2.5A1.25 1.25 0 0010 14z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="text-sm">
                <div className="font-medium">{t("invalidCredentials")}</div>
                <div className="text-xs text-red-700 mt-0.5">
                  {t("pleaseCheck")}{" "}
                </div>
              </div>
              <button
                className="ml-auto text-red-600"
                onClick={() => setLoginError(null)}
              >
                {t("dismiss")}
              </button>
            </div>
          </div>
        )}

        <div className="w-full max-w-md ml-2">
          <label className="block font-bold text-gray-500 mb-1">
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
              "& input::placeholder": {
                color: "#6B7280",
                opacity: 1,
                fontSize: "0.875rem",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#6B7280",
                opacity: 1,
                fontSize: "0.875rem",
              },
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
                <InputAdornment position="start" sx={{ mr: 1.5 }}>
                  <PersonOutlineIcon />
                </InputAdornment>
              ),
            }}
          />

          <label className="block font-bold text-gray-500 mb-1 mt-6">
            {t("passwordLabel")}
          </label>
          <TextField
            fullWidth
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("passwordPlaceholder")}
            error={!!loginError}
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              "& input::placeholder": {
                color: "#6B7280",
                opacity: 1,
                fontSize: "0.875rem",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#6B7280",
                opacity: 1,
                fontSize: "0.875rem",
              },
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
                <InputAdornment position="start" sx={{ mr: 1.5 }}>
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
                textTransform: "none",
                minWidth: 160,
              }}
              color="error"
              style={{ padding: "8px 40px" }}
              onClick={handleLogin}
            >
              {loading && (
                <CircularProgress
                  size={18}
                  color="inherit"
                  style={{ marginRight: 8 }}
                />
              )}
              {t("login")}
            </Button>

            <span className="text-sm text-gray-500 cursor-pointer hover:underline">
              {t("forgotPassword")}
            </span>
          </div>
        </div>
        {(() => {
          const privacy = t("privacyPolicy");
          const privacyLink = t("privacyPolicyLink");
          const parts = privacy.includes(privacyLink)
            ? privacy.split(privacyLink)
            : [privacy, ""];

          return (
            <p className="text-gray-500 text-sm mt-8 ml-2">
              {parts[0]}
              {privacyLink ? (
                <span className="underline cursor-pointer text-gray-500">
                  {privacyLink}
                </span>
              ) : null}
              {parts[1]}
            </p>
          );
        })()}
      </div>
    </div>
  );
}
