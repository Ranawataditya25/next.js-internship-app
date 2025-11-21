"use client";

import { useState, useRef, useEffect } from "react";
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
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const dropdownRef = useRef<HTMLDivElement>(null);

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

    // login success
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
      <div className="absolute top-8 right-12 z-50" ref={dropdownRef}>
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
              onClick={() => setLanguage("English")}
            >
              English
            </div>
            <div
              className="px-4 py-2 hover:bg-gray-400 cursor-pointer"
              onClick={() => setLanguage("Hindi")}
            >
              Hindi
            </div>
          </div>
        )}
      </div>

      {/* LEFT PANEL (33%) */}
      <div className="w-1/3 flex flex-col justify-between bg-white p-15">
        <div>
          <h1 className="text-red-500 text-4xl m-0">TRIPSAM</h1>
          <p className="mt-2 ml-4 text-base text-gray-800">Console</p>

          <p className="mt-20 ml-4 text-3xl text-gray-900 leading-snug">
            Manage you bookings and <br /> publish your service
          </p>
        </div>

        <p className="text-xl text-center">
          <span className="font-light text-black">Having Trouble? </span>
          <span className="font-bold underline cursor-pointer">Contact us</span>
        </p>
      </div>

      {/* RIGHT PANEL (67%) */}
      <div
        className="w-2/3 flex flex-col justify-center px-34"
        style={{ background: "#EAEAEA" }}
      >
        <h2 className="text-4xl font-bold mb-2 text-gray-700">Sign in</h2>
        <p className="text-gray-500 mb-10 ml-2">
          Enter your username and password below.
        </p>

        <div className="w-full max-w-md ml-2">
          <label className="block text-gray-700 mb-1">Username</label>
          <TextField
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your username"
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

          <label className="block text-gray-700 mb-1 mt-6">Password</label>
          <TextField
            fullWidth
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
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

          {/* Login + Forgot Password Row */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="contained"
              color="error"
              style={{ padding: "8px 40px" }}
              onClick={handleLogin}
            >
              Login
            </Button>

            <span className="text-sm text-gray-600 cursor-pointer hover:underline">
              Forgot Password?
            </span>
          </div>
        </div>

        <p className="text-gray-500 text-sm mt-8 ml-2">
          By continuing, you agree to our{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
