"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import API from "@/utils/API";
import { useAuth } from "@/contexts/AuthContext";

export interface HeaderProps {
  username?: string;
}

const Header: React.FC<HeaderProps> = ({ username }) => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("system");
    } else {
      setTheme("dark");
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "dark":
        return "🌙";
      case "light":
        return "☀️";
      case "system":
        return "🖥️";
      default:
        return "🌙";
    }
  };

  // useEffect(() => {
  //   if (isLoading) return;
  //   let auth = localStorage.getItem("authenticated");
  //   if (!auth) {
  //     router.push("/login");
  //   }
  // }, []);

  // const logout = () => {
  //   localStorage.removeItem("auth_token");
  //   API.get("/api/logout")
  //     .then(() => {
  //       console.log("Logout successful");
  //       router.push("/login");
  //     })
  //     .catch((error) => console.error("Logout failed", error));
  // };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[rgb(var(--color-card))]/95 backdrop-blur-md border-b border-[rgb(var(--color-border))] px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer group"
          onClick={() => router.push("/dashboard")}
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-accent))] rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-lg sm:text-xl">FS</span>
          </div>
          <span className="font-bold text-lg sm:text-xl text-[rgb(var(--color-primary))] group-hover:text-[rgb(var(--color-accent))] transition-colors">
            Fantasy Stocks
          </span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-8 h-8 sm:w-10 sm:h-10 hover:bg-[rgb(var(--color-primary))]/10"
            title={`Current: ${theme} theme`}
          >
            <span className="text-base sm:text-lg">{getThemeIcon()}</span>
          </Button>

          {/* User Menu */}
          {isAuthenticated ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 sm:w-10 sm:h-10 hover:bg-[rgb(var(--color-primary))]/10"
                  >
                    <span className="text-base sm:text-lg">👤</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={async () => {
                      let res = await logout();
                      console.log("logout", res);
                      router.push("/login");
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              onClick={() => router.push("/login")}
              className={`flex-1 p-4  w-[80px] rounded-lg text-sm
                bg-[rgb(var(--color-card))]
                 font-medium transition-colors cursor-pointer border  
                 border-[rgb(var(--color-primary))] text-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary))`}
              size="sm"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
