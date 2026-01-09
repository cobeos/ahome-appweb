import { sanityClient } from "../../../src/sanity/client";
import PropertyImageSlider from "../../../components/PropertyImageSlider";

const QUERY = `*[_type=="property" && slug.current==$slug][0]{
  _id,
  title,
  "slug": slug.current,
  locationLabel,
  priceUsd,
  bedrooms,
  bathrooms,
  areaM2,
  description,
  "images": images[]{
    "url": asset->url,
    "alt": alt
  }
}`;

export default async function PropertyDetailPage({ params }) {
  const property = await sanityClient.fetch(QUERY, { slug: params.slug });

  if (!property) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Propiedad no encontrada</h1>
      </main>
    );
  }

  return (
    <main style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ fontSize: 34, marginBottom: 8 }}>{property.title}</h1>
      <p style={{ color: "#6b7280", marginTop: 0 }}>
        📍 {property.locationLabel || "Ubicación"}
      </p>

      <div style={{ marginTop: 16 }}>
        <PropertyImageSlider images={property.images} title={property.title} />
      </div>

      <div style={{ marginTop: 18, fontSize: 16 }}>
        {property.bedrooms ?? 0} Hab · {property.bathrooms ?? 0} Baños ·{" "}
        {property.areaM2 ?? 0} m²
      </div>

      <div style={{ marginTop: 14, fontSize: 24, fontWeight: 700 }}>
        {property.priceUsd
          ? `$${Number(property.priceUsd).toLocaleString()} USD`
          : "Precio a consultar"}
      </div>

      {property.description ? (
        <p style={{ marginTop: 18, lineHeight: 1.7, color: "#374151" }}>
          {property.description}
        </p>
      ) : null}
    </main>
  );
}
