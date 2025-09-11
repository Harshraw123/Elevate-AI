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
  const [theme, setTheme] = useState("#3b82f6"); // Default to blue color instead of "light"

  // Load saved theme on mount and sync with context
  useEffect(() => {
    if (resumeInfo?.themeColor) {
      setTheme(resumeInfo.themeColor);
    } else {
      // Set default theme if none exists
      const defaultTheme = "#3b82f6";
      setTheme(defaultTheme);
      if (setResumeInfo && resumeInfo) {
        setResumeInfo(prev => ({
          ...prev,
          themeColor: defaultTheme 
        }));
      }
    }
  }, [resumeInfo?.themeColor, resumeInfo, setResumeInfo]);

  // Remove the second useEffect to prevent infinite loops

  const handleThemeChange = (themeColor) => {
    setTheme(themeColor);
    localStorage.setItem("theme", themeColor);
    
    // Update context with new theme
    if (resumeInfo && setResumeInfo) {
      setResumeInfo({
        ...resumeInfo,
        themeColor: themeColor
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
                theme === t.color ? "ring-2 ring-offset-2 ring-blue-500" : ""
              }`}
              style={{ backgroundColor: t.color }}
              onClick={() => handleThemeChange(t.color)}
              title={t.name}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
