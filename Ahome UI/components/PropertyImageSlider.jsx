"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import "swiper/css";
import "swiper/css/pagination";

// Componente para botones personalizados
function CustomNavButtons() {
  const swiper = useSwiper();
  
  return (
    <>
      <button
        className="custom-swiper-button-prev"
        onClick={() => swiper.slidePrev()}
        type="button"
        aria-label="Imagen anterior"
      >
        <IoChevronBack />
      </button>
      <button
        className="custom-swiper-button-next"
        onClick={() => swiper.slideNext()}
        type="button"
        aria-label="Imagen siguiente"
      >
        <IoChevronForward />
      </button>
    </>
  );
}

export default function PropertyImageSlider({ images = [], title = "", showCounter = false }) {
  const list = Array.isArray(images) ? images : [];
  const moved = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!list.length) {
    return (
      <div className="property-image">
        <div className="property-image-placeholder" />
      </div>
    );
  }

  return (
    <div
      className="property-image"
      onPointerDown={() => (moved.current = false)}
      onPointerMove={() => (moved.current = true)}
      onClickCapture={(e) => {
        if (moved.current) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      {showCounter && (
        <div className="property-slider-counter">
          {activeIndex + 1}/{list.length}
        </div>
      )}
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        navigation={false}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={list.length > 1}
        className="property-swiper"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        <CustomNavButtons />
        {list.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img.url}
              alt={img.alt || title || "Property image"}
              draggable={false}
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
