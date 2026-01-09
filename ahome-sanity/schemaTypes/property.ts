import { defineType, defineField } from "sanity";

export default defineType({
  name: "property",
  title: "Property",
  type: "document",
  preview: {
    select: {
      title: "title",
      status: "status",
      propertyType: "propertyType",
    },
    prepare({ title, status, propertyType }) {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/6ef4c250-14e1-4b6c-84dc-8ddc47661f00',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'property.ts:preview.prepare',message:'Preview prepare called',data:{title,status,propertyType},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      
      // Mapeo de valores a títulos legibles
      const propertyTypeMap: Record<string, string> = {
        venta: "Venta",
        renta: "Renta",
      };
      
      const statusMap: Record<string, string> = {
        en_venta: "En Venta",
        en_proceso: "En Proceso de Venta",
        vendido: "Vendido",
        disponible: "Disponible",
        se_desocupa_pronto: "Se Desocupa Pronto",
        ocupado: "Ocupado",
      };
      
      const propertyTypeTitle = propertyType ? propertyTypeMap[propertyType] || propertyType : "";
      const statusTitle = status ? statusMap[status] || status : "";
      
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/6ef4c250-14e1-4b6c-84dc-8ddc47661f00',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'property.ts:preview.prepare',message:'Preview subtitle generated',data:{propertyTypeTitle,statusTitle,originalPropertyType:propertyType,originalStatus:status},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      
      const subtitle = propertyTypeTitle 
        ? statusTitle 
          ? `${propertyTypeTitle} - ${statusTitle}` 
          : propertyTypeTitle
        : statusTitle || "";
      
      return {
        title: title || "Untitled",
        subtitle,
      };
    },
  },
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),

    defineField({ name: "locationLabel", title: "Location label (e.g. playa del carmen)", type: "string" }),
    defineField({ name: "priceUsd", title: "Price (USD)", type: "number" }),

    defineField({
      name: "propertyType",
      type: "string",
      title: "Tipo de Propiedad",
      options: {
        list: [
          { title: "Venta", value: "venta" },
          { title: "Renta", value: "renta" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "status",
      type: "string",
      title: "Estado",
      options: {
        list: [
          // Estados para VENTA
          { title: "En Venta", value: "en_venta" },
          { title: "En Proceso de Venta", value: "en_proceso" },
          { title: "Vendido", value: "vendido" },
          // Estados para RENTA
          { title: "Disponible", value: "disponible" },
          { title: "Se Desocupa Pronto", value: "se_desocupa_pronto" },
          { title: "Ocupado", value: "ocupado" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "images",
      title: "Images (max 30)",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt text", type: "string" }],
        },
      ],
      options: {
        layout: "grid",
      },
      validation: (r) => r.max(30).error("Max 30 images per property"),
    }),

    

    defineField({ name: "bedrooms", title: "Bedrooms", type: "number" }),
    defineField({ name: "bathrooms", title: "Bathrooms", type: "number" }),
    defineField({ name: "areaM2", title: "Area (m²)", type: "number" }),

    defineField({ name: "description", title: "Description", type: "text" }),

    defineField({
      name: "details",
      title: "Details",
      type: "object",
      fields: [
        { name: "yearBuilt", title: "Year built", type: "number" },
        { name: "parkingSpaces", title: "Parking spaces", type: "number" },
        { name: "furnished", title: "Furnished", type: "boolean" },
        { name: "propertyType", title: "Property type", type: "string" },
      ],
    }),

    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "mapEmbedCode",
      title: "Google Maps Embed Code",
      type: "text",
      description: "Paste the iframe embed code from Google Maps here",
    }),
  ],
});
