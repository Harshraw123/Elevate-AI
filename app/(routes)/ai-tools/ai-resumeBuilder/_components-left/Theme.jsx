"use client";
import React, { useState, useEffect, useContext } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { LayoutGrid } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

const themes = [
  
  { name: "blue", color: "#3b82f6" },   
  { name: "green", color: "#22c55e" },  
  { name: "purple", color: "#a855f7" }, 
  { name: "orange", color: "#f97316" }, 
  { name: "red", color: "#ef4444" },    
  { name: "teal", color: "#14b8a6" },   
  { name: "pink", color: "#ec4899" },   

  { name: "indigo", color: "#6366f1" }, 
  { name: "cyan", color: "#06b6d4" },   
  { name: "lime", color: "#84cc16" }    
];



export default function ThemeButton() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [theme, setTheme] = useState("light");

  // Load saved theme on mount and sync with context
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
//override kr rha hoon themeColor
      if (resumeInfo) {
        setResumeInfo({
          ...resumeInfo,
          themeColor: savedTheme 
        });
      }
    } else if (resumeInfo?.themeColor) {
      // If no saved theme but context has theme, use context theme
      setTheme(resumeInfo.themeColor);
      localStorage.setItem("theme", resumeInfo.themeColor);
    }
  }, []);

  // Sync local state with context theme changes
  useEffect(() => {
    if (resumeInfo?.themeColor && resumeInfo.themeColor !== theme) {
      setTheme(resumeInfo.themeColor);
      localStorage.setItem("theme", resumeInfo.themeColor);
    }
  }, [resumeInfo?.themeColor]);

  const handleThemeChange = (themeName) => {
    setTheme(themeName);
    localStorage.setItem("theme", themeName);
    
    // Update context with new theme
    if (resumeInfo) {
      setResumeInfo({
        ...resumeInfo,
        themeColor: themeName
      });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
          <LayoutGrid className="w-5 h-5" />
          Theme
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-48 bg-white">
        <div className="grid grid-cols-5 gap-3">
          {themes.map((t) => (
            <button
              key={t.name}
              className={`w-5 h-5 rounded-full border ${
                theme === t.name ? "ring-2 ring-offset-2 ring-blue-500" : ""
              }`}
              style={{ backgroundColor: t.color }}
              onClick={() => handleThemeChange(t.name)}
              title={t.name}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
