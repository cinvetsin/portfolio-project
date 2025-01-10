"use client";

import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  size?: "small" | "medium" | "large";
}

export default function SearchBar({ onSearch, size = "medium" }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Trigger search on every keystroke
  useEffect(() => {
    onSearch(searchQuery.trim());
  }, [searchQuery, onSearch]);

  const handleClearSearch = () => {
    setSearchQuery(""); // Clear the search query
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch(searchQuery.trim()); // Trigger search on "Enter" key press
    }
  };

  // Define size classes
  const sizeClasses = {
    small: "w-32",
    medium: "w-full max-w-lg",
    large: "w-full max-w-2xl",
  };

  const sizeClass = sizeClasses[size];

  return (
    <div className="flex items-center justify-center relative">
      <div className={`relative ${sizeClass}`}>
        {/* Input Wrapper */}
        <div
          className="relative flex items-center bg-white rounded-full shadow-lg border border-gray-300 overflow-hidden"
          style={{
            outline: "4px solid black",
            outlineOffset: "2px",
          }}
        >
          <button
            type="button"
            onClick={() => onSearch(searchQuery.trim())} // Trigger search on button click
            className="pl-4 flex items-center"
          >
            <img
              src="/icons/search_icon.svg"
              alt="Search"
              className="h-5 w-5 object-contain" // Ensure full image display
            />
          </button>

          {/* Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on every keystroke
            onKeyDown={handleKeyDown}
            className="w-full h-10 bg-transparent pl-2 pr-12 text-gray-900 focus:outline-none font-grace text-sm"
            placeholder="Search..."
          />

          {/* Clear Icon */}
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-4"
            >
              <img
                src="/icons/x_icon.svg"
                alt="Clear"
                className="h-5 w-5 object-contain hover:text-gray-700 transition-all duration-200"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}