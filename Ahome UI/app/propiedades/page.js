import { sanityClient } from "../../src/sanity/client";
import Properties from "../../components/Properties";

const QUERY = `*[_type=="property"]|order(_createdAt desc)[0...50]{
  _id,
  title,
  "slug": slug.current,
  locationLabel,
  priceUsd,
  bedrooms,
  bathrooms,
  areaM2,
  description,
  details,
  amenities,
  maps,
  mapEmbedCode,
  "images": images[]{
    "url": asset->url,
    "alt": alt
  },
  "heroImageUrl": heroImage.asset->url,
  "heroImageAlt": coalesce(heroImage.alt, title)
}`;

export default async function PropiedadesPage() {
  const properties = await sanityClient.fetch(QUERY);
  return <Properties properties={properties} />;
}
