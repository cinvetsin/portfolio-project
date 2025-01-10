"use client";

import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";

interface NavbarProps {
  size?: "small" | "medium" | "large";
}

export default function Navbar({ size = "medium" }: NavbarProps) {
  // Determine size classes
  const sizeClasses = {
    small: {
      nav: "py-4",
      text: "text-base md:text-lg", // You can increase this value
      icon: "w-16 h-16", // Increase the icon size
      spacing: "space-x-6",
    },
    medium: {
      nav: "py-6",
      text: "text-lg md:text-xl", // Increase this to "text-xl md:text-2xl" or higher
      icon: "w-20 h-20", // Increase the icon size
      spacing: "space-x-8",
    },
    large: {
      nav: "py-8",
      text: "text-xl md:text-2xl", // Increase this to "text-2xl md:text-3xl" or higher
      icon: "w-24 h-24", // Increase the icon size
      spacing: "space-x-10",
    },
  };

  const { nav, text, icon, spacing } = sizeClasses[size];

  return (
    <nav
      className={`fixed top-0 z-50 w-full border-b-8 border-black bg-gray-100 font-grace shadow-lg ${nav}`} // Added thick bottom border
      style={{
        borderBottomStyle: "solid",
        borderBottomWidth: "4px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
      }} // Ensures a marker-like appearance
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
                className={`group flex items-center transition-all duration-200 hover:text-blue-500 ${text}`}
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

        {/* Right Side: Search Bar */}
        <SearchBar size={size} onSearch={(query) => console.log(query)} />
      </div>
    </nav>
  );
}
