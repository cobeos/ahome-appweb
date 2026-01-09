"use client";

import { useState, useEffect, useRef } from "react";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";

export default function SearchBar({ onSearchChange, placeholder = "Buscar propiedades..." }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // Debounce para evitar demasiadas actualizaciones
    const timer = setTimeout(() => {
      onSearchChange(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearchChange]);

  const handleClear = () => {
    setSearchQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className="search-bar-container">
      <div className={`search-bar ${isFocused ? "search-bar-focused" : ""}`}>
        <div className="search-bar-icon">
          <IoSearchOutline />
        </div>
        <input
          ref={inputRef}
          type="text"
          className="search-bar-input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {searchQuery && (
          <button
            type="button"
            className="search-bar-clear"
            onClick={handleClear}
            aria-label="Limpiar búsqueda"
          >
            <IoCloseOutline />
          </button>
        )}
      </div>
    </div>
  );
}
