"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Button, CircularProgress } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

export default function ServicePage() {
  const t = useTranslations("Landing");
  const { data: session, status } = useSession();
  const router = useRouter();

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [signOutLoading, setSignOutLoading] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowProfileModal(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (status === "loading") return null;

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex h-screen font-sans relative">
      <div className="absolute top-6 right-12 z-50 flex items-center gap-4">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FF523B",
            "&:hover": { backgroundColor: "#e04430" },
            textTransform: "none",
            minWidth: 120,
          }}
          color="error"
          onClick={() => {
            setSignOutLoading(true);
            signOut({ callbackUrl: "/login" });
          }}
          style={{
            padding: "6px 20px",
            fontSize: "14px",
          }}
        >
          {signOutLoading && (
            <CircularProgress
              size={18}
              color="inherit"
              style={{ marginRight: 8 }}
            />
          )}
          {t("signOut")}
        </Button>

        {/* Profile Icon */}
        <div
          className="w-10 h-10 rounded-full overflow-hidden border relative border-gray-300 cursor-pointer"
          onClick={() => setShowProfileModal(true)}
          role="button"
          aria-label={t("profile")}
        >
          <Image
            src="/images/profile.jpg"
            alt={t("profile")}
            fill
            className="object-fit"
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
        className="w-2/3 flex flex-col px-24 py-35"
        style={{ background: "#EAEAEA" }}
      >
        <h2 className="text-2xl font-bold mb-2 text-gray-700">
          {t("selectService")}
        </h2>

        <div className="w-full max-w-2xl">
          <div className="mt-10">
            <div className="flex items-center justify-between w-full bg-[#F6E9E6] border border-[#E07A67] rounded-xl p-5 cursor-pointer hover:shadow-md transition all">
              <div className="flex items-center gap-8">
                <div className="w-14 h-14 rounded-xl bg-[#FF523B] flex items-center justify-center">
                  <span className="text-white text-2xl">
                    <HomeOutlinedIcon />
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {t("service1.title")}
                  </h3>
                  <p className="text-gray-600 text-sm w-72 leading-snug">
                    {t("service1.desc")}
                  </p>
                </div>
              </div>

              <div>
                <span className="text-[#E86F5E] text-2xl">➜</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Modal Preview */}
      {showProfileModal && (
        <div
          className="fixed inset-0 bg-[#EAEAEA] bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setShowProfileModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="rounded-lg p-6 max-w-[90%] max-h-[90%] flex items-center justify-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-80 h-80 sm:w-[420px] sm:h-[420px] relative rounded-md overflow-hidden">
              <Image
                src="/images/profile.jpg"
                alt={t("profile")}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
