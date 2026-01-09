"use client";

import { useEffect, useState, useMemo } from "react";
import PropertyCard from "./PropertyCard";
import PropertyImageSlider from "./PropertyImageSlider";
import SearchBar from "./SearchBar";
import { useLanguage } from "../src/contexts/LanguageContext";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Componente para botones personalizados del slider de propiedades
function PropertiesNavButtons() {
  const swiper = useSwiper();
  
  return (
    <>
      <button
        className="custom-swiper-button-prev properties-slider-nav"
        onClick={() => swiper.slidePrev()}
        type="button"
        aria-label="Propiedad anterior"
      >
        <IoChevronBack />
      </button>
      <button
        className="custom-swiper-button-next properties-slider-nav"
        onClick={() => swiper.slideNext()}
        type="button"
        aria-label="Propiedad siguiente"
      >
        <IoChevronForward />
      </button>
    </>
  );
}

// Función para parsear la búsqueda y extraer filtros específicos
function parseSearchQuery(query) {
  const parsed = {
    bedrooms: null,
    bathrooms: null,
    location: null,
    areaM2: null,
    textQuery: query,
  };

  if (!query || !query.trim()) {
    return parsed;
  }

  const lowerQuery = query.toLowerCase().trim();
  const words = lowerQuery.split(/\s+/);

  // Patrones para habitaciones/recámaras
  const bedroomPatterns = [
    /(\d+)\s*(?:habitaciones?|recamaras?|recámaras?|hab|bedrooms?|beds?)/i,
    /(?:habitaciones?|recamaras?|recámaras?|hab|bedrooms?|beds?)\s*:?\s*(\d+)/i,
  ];

  // Patrones para baños
  const bathroomPatterns = [
    /(\d+)\s*(?:baños?|bathrooms?|baths?)/i,
    /(?:baños?|bathrooms?|baths?)\s*:?\s*(\d+)/i,
  ];

  // Patrones para metros cuadrados
  const areaPatterns = [
    /(\d+(?:\.\d+)?)\s*m[²2]|m[²2]\s*:?\s*(\d+(?:\.\d+)?)/i,
    /(\d+(?:\.\d+)?)\s*(?:metros?\s*cuadrados?|m2|m²)/i,
  ];

  // Buscar habitaciones
  for (const pattern of bedroomPatterns) {
    const match = lowerQuery.match(pattern);
    if (match) {
      parsed.bedrooms = parseInt(match[1] || match[2]);
      break;
    }
  }

  // Buscar baños
  for (const pattern of bathroomPatterns) {
    const match = lowerQuery.match(pattern);
    if (match) {
      parsed.bathrooms = parseInt(match[1] || match[2]);
      break;
    }
  }

  // Buscar metros cuadrados
  for (const pattern of areaPatterns) {
    const match = lowerQuery.match(pattern);
    if (match) {
      parsed.areaM2 = parseFloat(match[1] || match[2]);
      break;
    }
  }

  // Extraer ubicación (buscar palabras que no sean números ni palabras clave)
  // Primero, remover las partes que ya identificamos
  let locationQuery = lowerQuery;
  
  // Remover patrones de habitaciones
  bedroomPatterns.forEach(pattern => {
    locationQuery = locationQuery.replace(pattern, '');
  });
  
  // Remover patrones de baños
  bathroomPatterns.forEach(pattern => {
    locationQuery = locationQuery.replace(pattern, '');
  });
  
  // Remover patrones de área
  areaPatterns.forEach(pattern => {
    locationQuery = locationQuery.replace(pattern, '');
  });

  // Limpiar espacios extra
  locationQuery = locationQuery.trim().replace(/\s+/g, ' ');
  
  // CRÍTICO: Si NO hay filtros numéricos, usar todo el texto para búsqueda general
  // NO asignarlo como ubicación específica
  if (!parsed.bedrooms && !parsed.bathrooms && !parsed.areaM2) {
    // Si solo es texto sin filtros numéricos, buscar en todo (nombre, ubicación, descripción)
    parsed.textQuery = query;
    parsed.location = null; // NO asignar como ubicación, dejar que se busque en todos los campos
  } else {
    // Si hay filtros numéricos, el texto restante puede ser ubicación o nombre
    if (locationQuery.length > 2) {
      parsed.textQuery = locationQuery;
      parsed.location = locationQuery;
    } else {
      parsed.textQuery = '';
    }
  }

  return parsed;
}

export default function Properties({ properties = [] }) {
  const { t } = useLanguage();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    bedrooms: "",
    bathrooms: "",
    minPrice: "",
    maxPrice: "",
    minArea: "",
    maxArea: "",
  });

  // Parsear la búsqueda para extraer filtros específicos
  const parsedSearch = useMemo(() => {
    return parseSearchQuery(searchQuery);
  }, [searchQuery]);

  // Filtrar propiedades y limitar a 20
  const filteredProperties = useMemo(() => {
    const filtered = properties.filter((property) => {
      // Filtro por habitaciones desde la búsqueda parseada
      // Si viene de la búsqueda parseada, buscar igualdad exacta
      // Si viene de filters, usar >= (mínimo)
      if (parsedSearch.bedrooms !== null) {
        const bedroomsValue = parsedSearch.bedrooms;
        if (bedroomsValue && (property.bedrooms ?? 0) !== bedroomsValue) {
          return false;
        }
      } else if (filters.bedrooms) {
        const bedroomsValue = parseInt(filters.bedrooms);
        if (bedroomsValue && (property.bedrooms ?? 0) < bedroomsValue) {
          return false;
        }
      }

      // Filtro por baños desde la búsqueda parseada
      // Si viene de la búsqueda parseada, buscar igualdad exacta
      // Si viene de filters, usar >= (mínimo)
      if (parsedSearch.bathrooms !== null) {
        const bathroomsValue = parsedSearch.bathrooms;
        if (bathroomsValue && (property.bathrooms ?? 0) !== bathroomsValue) {
          return false;
        }
      } else if (filters.bathrooms) {
        const bathroomsValue = parseInt(filters.bathrooms);
        if (bathroomsValue && (property.bathrooms ?? 0) < bathroomsValue) {
          return false;
        }
      }

      // Filtro por área desde la búsqueda parseada
      const areaFilter = parsedSearch.areaM2 ?? filters.minArea;
      if (areaFilter) {
        const areaValue = typeof areaFilter === 'string' ? parseFloat(areaFilter) : areaFilter;
        if (areaValue && (property.areaM2 ?? 0) < areaValue) {
          return false;
        }
      }

      // CRÍTICO: Filtro por texto de búsqueda debe ejecutarse PRIMERO
      // para buscar en nombre, descripción, ubicación, amenities
      if (parsedSearch.textQuery && parsedSearch.textQuery.trim()) {
        const query = parsedSearch.textQuery.toLowerCase().trim();
        const searchableText = [
          property.title || '',
          property.description || '',
          property.locationLabel || '',
          property.amenities?.join(" ") || '',
          property.details?.propertyType || '',
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        if (!searchableText.includes(query)) {
          return false;
        }
      }

      // Filtro por ubicación desde la búsqueda parseada
      // Solo aplicar si hay filtros numéricos Y hay location específica
      // Si no hay filtros numéricos, el texto ya se buscó arriba en textQuery
      const locationFilter = parsedSearch.location || filters.location;
      if (locationFilter && (parsedSearch.bedrooms || parsedSearch.bathrooms || parsedSearch.areaM2)) {
        const locationLower = locationFilter.toLowerCase().trim();
        const propertyLocation = property.locationLabel?.toLowerCase() || '';
        
        // Buscar coincidencia parcial o exacta
        if (!propertyLocation.includes(locationLower) && propertyLocation !== locationLower) {
          return false;
        }
      }

      // Filtros adicionales del estado filters (si no fueron sobrescritos por la búsqueda)
      if (!parsedSearch.bedrooms && filters.bedrooms) {
        if ((property.bedrooms ?? 0) < parseInt(filters.bedrooms)) {
          return false;
        }
      }

      if (!parsedSearch.bathrooms && filters.bathrooms) {
        if ((property.bathrooms ?? 0) < parseInt(filters.bathrooms)) {
          return false;
        }
      }

      // Filtro por precio mínimo
      if (
        filters.minPrice &&
        (property.priceUsd ?? 0) < parseFloat(filters.minPrice)
      ) {
        return false;
      }

      // Filtro por precio máximo
      if (
        filters.maxPrice &&
        (property.priceUsd ?? 0) > parseFloat(filters.maxPrice)
      ) {
        return false;
      }

      // Filtro por área mínima (si no fue especificada en la búsqueda)
      if (
        !parsedSearch.areaM2 &&
        filters.minArea &&
        (property.areaM2 ?? 0) < parseFloat(filters.minArea)
      ) {
        return false;
      }

      // Filtro por área máxima
      if (
        filters.maxArea &&
        (property.areaM2 ?? 0) > parseFloat(filters.maxArea)
      ) {
        return false;
      }

      return true;
    });
    return filtered.slice(0, 20);
  }, [properties, filters, parsedSearch]);

  // Bloquear scroll cuando modal está abierto
  useEffect(() => {
    if (!selectedProperty) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [selectedProperty]);

  // Cerrar con ESC
  useEffect(() => {
    if (!selectedProperty) return;
    const onKeyDown = (e) => e.key === "Escape" && setSelectedProperty(null);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedProperty]);

  return (
    <>
      <section id="propiedades" className="properties-section">
        <div className="container">
          <h1>{t("properties.title")}</h1>

          <SearchBar
            onSearchChange={setSearchQuery}
            placeholder={t("properties.searchPlaceholder") || "Buscar propiedades por título, ubicación, descripción..."}
          />

          <div className="properties-results">
            <p className="results-count">
              {t("properties.results", filteredProperties.length)}
            </p>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="properties-slider-wrapper">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation={false}
                pagination={{ clickable: true }}
                speed={800}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                loop={filteredProperties.length > 3}
                effect="slide"
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
                className="properties-swiper"
              >
                <PropertiesNavButtons />
                {filteredProperties.map((p) => (
                  <SwiperSlide key={p._id}>
                    <PropertyCard
                      property={p}
                      onClick={setSelectedProperty}
                      badge={p.badge}
                      title={p.title}
                      location={p.locationLabel}
                      details={[
                        `${p.bedrooms ?? 0} Hab`,
                        `${p.bathrooms ?? 0} Baños`,
                        `${p.areaM2 ?? 0} m²`,
                      ]}
                      price={
                        p.priceUsd
                          ? `$${Number(p.priceUsd).toLocaleString()} USD`
                          : "Precio a consultar"
                      }
                      images={p.images}
                      image={p.heroImageUrl}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div className="no-properties">
              <p>{t("properties.noResults")}</p>
            </div>
          )}
        </div>
      </section>

      {/* MODAL */}
      {selectedProperty && (
        <div
          className="property-modal-backdrop"
          onClick={() => setSelectedProperty(null)}
        >
          <div
            className="property-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="property-modal-close"
              onClick={() => setSelectedProperty(null)}
              type="button"
              aria-label={t("properties.modal.close")}
            >
              ✕
            </button>

            {/* Hero Image Slider */}
            <div className="property-modal-hero">
              {selectedProperty.images?.length ? (
                <PropertyImageSlider
                  images={selectedProperty.images}
                  title={selectedProperty.title}
                  showCounter={true}
                />
              ) : selectedProperty.heroImageUrl ? (
                <img
                  src={selectedProperty.heroImageUrl}
                  alt={selectedProperty.heroImageAlt || selectedProperty.title}
                />
              ) : (
                <div className="property-modal-hero-placeholder" />
              )}
              {selectedProperty.badge && (
                <div className="property-modal-badge">
                  {selectedProperty.badge}
                </div>
              )}
              {/* Price inside hero */}
              <div className="property-modal-price-hero">
                {selectedProperty.priceUsd
                  ? `$${Number(selectedProperty.priceUsd).toLocaleString()} USD`
                  : "Precio a consultar"}
              </div>
            </div>

            <div className="property-modal-content">
              {/* Location */}
              <div className="property-modal-location">
                {selectedProperty.locationLabel || t("properties.location")}
              </div>

              {/* Metrics */}
              <div className="property-modal-metrics">
                <div className="property-metric">
                  <div className="metric-icon-container">
                    <svg className="metric-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 22V12H15V22" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="metric-text-container">
                    <span className="metric-number">
                      {selectedProperty.bedrooms ?? "—"}
                    </span>
                    <span className="metric-label">{t("properties.metricBedrooms")}</span>
                  </div>
                </div>
                <div className="property-metric">
                  <div className="metric-icon-container">
                    <svg className="metric-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 8C4 6.89543 4.89543 6 6 6H18C19.1046 6 20 6.89543 20 8V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V8Z" stroke="#D4AF37" strokeWidth="2"/>
                      <path d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6" stroke="#D4AF37" strokeWidth="2"/>
                      <path d="M8 12H16" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="metric-text-container">
                    <span className="metric-number">
                      {selectedProperty.bathrooms ?? "—"}
                    </span>
                    <span className="metric-label">{t("properties.metricBathrooms")}</span>
                  </div>
                </div>
                <div className="property-metric">
                  <div className="metric-icon-container">
                    <svg className="metric-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="#D4AF37" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="metric-text-container">
                    <span className="metric-number">
                      {selectedProperty.areaM2 ?? "—"}
                    </span>
                    <span className="metric-label">{t("properties.metricArea")}</span>
                  </div>
                </div>
                <div className="property-metric">
                  <div className="metric-icon-container">
                    <svg className="metric-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#D4AF37" strokeWidth="2"/>
                      <circle cx="12" cy="10" r="3" stroke="#D4AF37" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="metric-text-container">
                    <span className="metric-number">
                      {selectedProperty.locationLabel || "—"}
                    </span>
                    <span className="metric-label">{t("properties.metricLocation")}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="property-modal-section">
                <h3 className="property-modal-section-title">{t("properties.modal.description")}</h3>
                <p className="property-modal-description">
                  {selectedProperty.description || 
                    `${selectedProperty.title || "This property"} is an exceptional property located in ${selectedProperty.locationLabel || "the Riviera Maya"}. Designed with the highest quality standards, this residence offers spacious and bright spaces with luxury finishes. Perfect for those looking to live or invest in the Riviera Maya with style and comfort.`}
                </p>
              </div>

              {/* Details and Amenities in two columns */}
              <div className="property-modal-details-amenities">
                {/* Details */}
                <div className="property-modal-section property-modal-details-column">
                  <h3 className="property-modal-section-title">{t("properties.modal.details")}</h3>
                  <div className="property-details-list">
                    {selectedProperty.details?.yearBuilt && (
                      <div className="property-detail-item">
                        <span className="detail-label">{t("properties.modal.yearBuilt")}</span>
                        <span className="detail-value">
                          {selectedProperty.details.yearBuilt}
                        </span>
                      </div>
                    )}
                    {selectedProperty.details?.parkingSpaces !== undefined && (
                      <div className="property-detail-item">
                        <span className="detail-label">{t("properties.modal.parkingSpaces")}</span>
                        <span className="detail-value">
                          {selectedProperty.details.parkingSpaces}
                        </span>
                      </div>
                    )}
                    {selectedProperty.details?.furnished !== undefined && (
                      <div className="property-detail-item">
                        <span className="detail-label">{t("properties.modal.furnished")}</span>
                        <span className="detail-value">
                          {selectedProperty.details.furnished ? t("properties.modal.yes") : t("properties.modal.no")}
                        </span>
                      </div>
                    )}
                    {selectedProperty.details?.propertyType && (
                      <div className="property-detail-item">
                        <span className="detail-label">{t("properties.modal.propertyType")}</span>
                        <span className="detail-value">
                          {selectedProperty.details.propertyType}
                        </span>
                      </div>
                    )}
                    {!selectedProperty.details && (
                      <>
                        <div className="property-detail-item">
                          <span className="detail-label">{t("properties.modal.yearBuilt")}</span>
                          <span className="detail-value">2023</span>
                        </div>
                        <div className="property-detail-item">
                          <span className="detail-label">{t("properties.modal.parkingSpaces")}</span>
                          <span className="detail-value">1</span>
                        </div>
                        <div className="property-detail-item">
                          <span className="detail-label">{t("properties.modal.furnished")}</span>
                          <span className="detail-value">{t("properties.modal.no")}</span>
                        </div>
                        <div className="property-detail-item">
                          <span className="detail-label">{t("properties.modal.propertyType")}</span>
                          <span className="detail-value">Residential</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Amenities */}
                <div className="property-modal-section property-modal-amenities-column">
                  <h3 className="property-modal-section-title">{t("properties.modal.amenities")}</h3>
                  <div className="property-amenities">
                    {selectedProperty.amenities?.length > 0 ? (
                      selectedProperty.amenities.map((amenity, idx) => (
                        <div key={idx} className="amenity-item">
                          <span className="amenity-square"></span>
                          <span className="amenity-text">{amenity}</span>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="amenity-item">
                          <span className="amenity-square"></span>
                          <span className="amenity-text">Pool</span>
                        </div>
                        <div className="amenity-item">
                          <span className="amenity-square"></span>
                          <span className="amenity-text">24/7 Security</span>
                        </div>
                        <div className="amenity-item">
                          <span className="amenity-square"></span>
                          <span className="amenity-text">Equipped kitchen</span>
                        </div>
                        <div className="amenity-item">
                          <span className="amenity-square"></span>
                          <span className="amenity-text">Gym</span>
                        </div>
                        <div className="amenity-item">
                          <span className="amenity-square"></span>
                          <span className="amenity-text">Terrace</span>
                        </div>
                        <div className="amenity-item">
                          <span className="amenity-square"></span>
                          <span className="amenity-text">Air conditioning</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Location Map */}
              {(selectedProperty.mapEmbedCode || selectedProperty.maps) && (
                <div className="property-modal-section">
                  <h3 className="property-modal-section-title">{t("properties.modal.location")}</h3>
                  {selectedProperty.mapEmbedCode ? (
                    <div 
                      className="property-map-container"
                      dangerouslySetInnerHTML={{ __html: selectedProperty.mapEmbedCode }}
                    />
                  ) : selectedProperty.maps?.embedUrl ? (
                    <div className="property-map-container">
                      <iframe
                        src={selectedProperty.maps.embedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  ) : null}
                  {selectedProperty.maps?.address && (
                    <div className="property-address">
                      <p>{selectedProperty.maps.address}</p>
                      {selectedProperty.maps.rating && (
                        <div className="property-rating">
                          <span className="rating-value">
                            {selectedProperty.maps.rating}
                          </span>
                          <span className="rating-stars">★★★★☆</span>
                          {selectedProperty.maps.reviews && (
                            <span className="rating-reviews">
                              {selectedProperty.maps.reviews} opiniones
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="property-modal-actions">
                <button className="btn btn-primary" type="button">
                  {t("properties.modal.schedule")}
                </button>
                <button className="btn btn-secondary" type="button">
                  {t("properties.modal.moreInfo")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
