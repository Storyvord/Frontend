"use client";
import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      placeholder="Search articles..."
      value={query}
      onChange={handleInputChange}
      className="w-full p-2 border rounded-lg mb-4 text-gray-900"
    />
  );
};

export default SearchBar;
