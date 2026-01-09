"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function PropertyGallery({ images = [], title = "" }) {
  const list = Array.isArray(images) ? images : [];

  return (
    <div style={{ borderRadius: 18, overflow: "hidden", border: "1px solid #e5e7eb" }}>
      <Swiper
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation
        style={{ height: 420 }}
      >
        {list.length ? (
          list.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img.url}
                alt={img.alt || title || "Property image"}
                style={{ width: "100%", height: 420, objectFit: "cover" }}
                draggable={false}
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div style={{ width: "100%", height: 420, background: "#f3f4f6" }} />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}
