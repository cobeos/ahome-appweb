"use client";

import { useState, useEffect } from "react";

export default function PropertyFilters({ properties = [], onFilterChange }) {
  const [filters, setFilters] = useState({
    location: "",
    bedrooms: "",
    bathrooms: "",
    minPrice: "",
    maxPrice: "",
    minArea: "",
    maxArea: "",
  });

  // Obtener ubicaciones únicas
  const locations = [
    ...new Set(properties.map((p) => p.locationLabel).filter(Boolean)),
  ].sort();

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      location: "",
      bedrooms: "",
      bathrooms: "",
      minPrice: "",
      maxPrice: "",
      minArea: "",
      maxArea: "",
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  return (
    <div className="property-filters">
      <div className="filters-header">
        <h3>Filtrar Propiedades</h3>
        <button
          type="button"
          className="clear-filters-btn"
          onClick={clearFilters}
        >
          Limpiar
        </button>
      </div>

      <div className="filters-grid">
        {/* Ubicación */}
        <div className="filter-group">
          <label htmlFor="location">📍 Ubicación</label>
          <select
            id="location"
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
          >
            <option value="">Todas las ubicaciones</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Recámaras */}
        <div className="filter-group">
          <label htmlFor="bedrooms">🛏️ Recámaras</label>
          <select
            id="bedrooms"
            value={filters.bedrooms}
            onChange={(e) => handleFilterChange("bedrooms", e.target.value)}
          >
            <option value="">Cualquier cantidad</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>

        {/* Baños */}
        <div className="filter-group">
          <label htmlFor="bathrooms">🚿 Baños</label>
          <select
            id="bathrooms"
            value={filters.bathrooms}
            onChange={(e) => handleFilterChange("bathrooms", e.target.value)}
          >
            <option value="">Cualquier cantidad</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>

        {/* Precio Mínimo */}
        <div className="filter-group">
          <label htmlFor="minPrice">💰 Precio Mínimo (USD)</label>
          <input
            type="number"
            id="minPrice"
            placeholder="Mínimo"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange("minPrice", e.target.value)}
          />
        </div>

        {/* Precio Máximo */}
        <div className="filter-group">
          <label htmlFor="maxPrice">💰 Precio Máximo (USD)</label>
          <input
            type="number"
            id="maxPrice"
            placeholder="Máximo"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
          />
        </div>

        {/* Área Mínima */}
        <div className="filter-group">
          <label htmlFor="minArea">📐 Área Mínima (m²)</label>
          <input
            type="number"
            id="minArea"
            placeholder="Mínimo"
            value={filters.minArea}
            onChange={(e) => handleFilterChange("minArea", e.target.value)}
          />
        </div>

        {/* Área Máxima */}
        <div className="filter-group">
          <label htmlFor="maxArea">📐 Área Máxima (m²)</label>
          <input
            type="number"
            id="maxArea"
            placeholder="Máximo"
            value={filters.maxArea}
            onChange={(e) => handleFilterChange("maxArea", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

