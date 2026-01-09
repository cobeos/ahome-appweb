import { sanityClient } from "../src/sanity/client";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Properties from "../components/Properties";
import About from "../components/About";
import Services from "../components/Services";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

const QUERY = `*[_type=="property"]|order(_createdAt desc)[0...6]{
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

export default async function HomePage() {
  const properties = await sanityClient.fetch(QUERY);
  
  return (
    <>
      <Navbar />
      <Hero />
      <Properties properties={properties} />
      <About />
      <Services />
      <ContactSection />
      <Footer />
    </>
  );
}



