"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

interface NavbarProps {
  size?: "small" | "medium" | "large";
}

export default function Navbar({ size = "medium" }: NavbarProps) {
  const [darkMode, setDarkMode] = useState(false);

  // Determine size classes
  const sizeClasses = {
    small: {
      nav: "py-4",
      text: "text-base md:text-lg",
      icon: "w-16 h-16",
      spacing: "space-x-6",
    },
    medium: {
      nav: "py-6",
      text: "text-lg md:text-xl",
      icon: "w-20 h-20",
      spacing: "space-x-8",
    },
    large: {
      nav: "py-8",
      text: "text-xl md:text-2xl",
      icon: "w-24 h-24",
      spacing: "space-x-10",
    },
  };

  const { nav, text, icon, spacing } = sizeClasses[size];

  // Effect to apply dark mode to the entire document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav
      className={`fixed top-0 z-50 w-full border-b-8 font-grace shadow-lg ${
        darkMode ? "dark:bg-gray-800 dark:text-white" : "bg-white text-black"
      } ${nav}`}
      style={{
        borderBottomStyle: "solid",
        borderBottomWidth: "4px",
        borderBottomColor: darkMode ? "white" : "black", // Dynamic border color
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Left Side: Logo or Brand Name */}
        <div className={`font-bold ${text}`}>Sasha Nabila Fortuna</div>

        {/* Middle: Navigation Links */}
        <ul className={`flex ${spacing}`}>
          {[
            { href: "#home", label: "Home", icon: "/icons/home.svg" },
            {
              href: "#projects",
              label: "Projects",
              icon: "/icons/projects.svg",
            },
            {
              href: "#experiences",
              label: "Experience",
              icon: "/icons/experiences.svg",
            },
            {
              href: "#education",
              label: "Education",
              icon: "/icons/educations.svg",
            },
            {
              href: "#honors",
              label: "Honors & Awards",
              icon: "/icons/honors.svg",
            },
          ].map(({ href, label, icon }) => (
            <li key={href}>
              <Link
                href={href}
                className={`group flex items-center transition-all duration-200 hover:text-blue-500 dark:hover:text-blue-300 ${text}`}
              >
                {/* Text (visible by default) */}
                <span className="group-hover:hidden group-focus:hidden">
                  {label}
                </span>

                {/* Icon (visible on hover or focus) */}
                <Image
                  src={icon}
                  alt={label}
                  width={128}
                  height={128}
                  className={`hidden group-hover:block group-focus:block ${icon}`}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side: Dark/Light Mode Toggle Switch with Emojis Inside */}
        <label className="inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="peer sr-only"
          />
          <div className="peer relative h-8 w-14 rounded-full bg-gray-200 after:absolute after:start-1 after:top-1 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800">
            {/* Emojis inside the toggle */}
            <span className="absolute left-1 top-1/2 -translate-y-1/2 transform text-sm">
              🌞
            </span>
            <span className="absolute right-1 top-1/2 -translate-y-1/2 transform text-sm">
              🌙
            </span>
          </div>
        </label>
      </div>
    </nav>
  );
}
