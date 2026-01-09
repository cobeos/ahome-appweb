import PropertyImageSlider from "./PropertyImageSlider";

export default function PropertyCard({
  property,
  onClick,
  badge,
  images,
  image,
  title,
  location,
  details = [],
  price,
}) {
  const handleClick = () => {
    if (onClick && property) {
      onClick(property);
    }
  };

  return (
    <div className="property-card" onClick={handleClick}>
        {/* IMAGEN / SLIDER */}
        {images?.length ? (
          <>
            {badge ? <div className="property-badge">{badge}</div> : null}
            <PropertyImageSlider images={images} title={title} />
          </>
        ) : (
          <div className="property-image">
            {badge ? <div className="property-badge">{badge}</div> : null}
          {image ? <img src={image} alt={title} /> : null}
          </div>
        )}

        {/* CONTENIDO */}
        <div className="property-content">
          <h3>{title}</h3>
          <p className="property-location">📍 {location}</p>

          <div className="property-details">
            {details.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <div className="property-price">{price}</div>

        <button
          className="btn btn-outline"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
            Ver Detalles
          </button>
        </div>
      </div>
  );
}


