"use client";

import { 
  IoChevronBack, 
  IoChevronForward,
  IoArrowBack,
  IoArrowForward
} from "react-icons/io5";
import {
  FaChevronLeft,
  FaChevronRight,
  FaArrowLeft,
  FaArrowRight
} from "react-icons/fa";
import {
  MdChevronLeft,
  MdChevronRight
} from "react-icons/md";
import {
  HiChevronLeft,
  HiChevronRight,
  HiArrowLeft,
  HiArrowRight
} from "react-icons/hi";
import {
  BsChevronLeft,
  BsChevronRight
} from "react-icons/bs";
import {
  AiOutlineLeft,
  AiOutlineRight
} from "react-icons/ai";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine
} from "react-icons/ri";

export default function ButtonDemoPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          color: 'white', 
          textAlign: 'center', 
          marginBottom: '50px',
          fontSize: '36px',
          fontFamily: 'Playfair Display, serif'
        }}>
          Ejemplos de Botones de Navegación con React Icons
        </h1>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px'
        }}>
          {/* Ejemplo 1: Ionicons Chevron */}
          <ButtonExample 
            title="Ejemplo 1: Ionicons Chevron"
            PrevIcon={IoChevronBack}
            NextIcon={IoChevronForward}
            description="Iconos de Ionicons 5 - Chevron"
          />

          {/* Ejemplo 2: Ionicons Arrow */}
          <ButtonExample 
            title="Ejemplo 2: Ionicons Arrow"
            PrevIcon={IoArrowBack}
            NextIcon={IoArrowForward}
            description="Iconos de Ionicons 5 - Flechas"
          />

          {/* Ejemplo 3: Font Awesome Chevron */}
          <ButtonExample 
            title="Ejemplo 3: Font Awesome Chevron"
            PrevIcon={FaChevronLeft}
            NextIcon={FaChevronRight}
            description="Iconos de Font Awesome - Chevron"
          />

          {/* Ejemplo 4: Font Awesome Arrow */}
          <ButtonExample 
            title="Ejemplo 4: Font Awesome Arrow"
            PrevIcon={FaArrowLeft}
            NextIcon={FaArrowRight}
            description="Iconos de Font Awesome - Flechas"
          />

          {/* Ejemplo 5: Material Design Chevron */}
          <ButtonExample 
            title="Ejemplo 5: Material Design"
            PrevIcon={MdChevronLeft}
            NextIcon={MdChevronRight}
            description="Iconos de Material Design"
          />

          {/* Ejemplo 6: Heroicons Chevron */}
          <ButtonExample 
            title="Ejemplo 6: Heroicons Chevron"
            PrevIcon={HiChevronLeft}
            NextIcon={HiChevronRight}
            description="Iconos de Heroicons - Chevron"
          />

          {/* Ejemplo 7: Heroicons Arrow */}
          <ButtonExample 
            title="Ejemplo 7: Heroicons Arrow"
            PrevIcon={HiArrowLeft}
            NextIcon={HiArrowRight}
            description="Iconos de Heroicons - Flechas"
          />

          {/* Ejemplo 8: Bootstrap Icons */}
          <ButtonExample 
            title="Ejemplo 8: Bootstrap Icons"
            PrevIcon={BsChevronLeft}
            NextIcon={BsChevronRight}
            description="Iconos de Bootstrap Icons"
          />

          {/* Ejemplo 9: Ant Design */}
          <ButtonExample 
            title="Ejemplo 9: Ant Design"
            PrevIcon={AiOutlineLeft}
            NextIcon={AiOutlineRight}
            description="Iconos de Ant Design"
          />

          {/* Ejemplo 10: Remix Icon */}
          <ButtonExample 
            title="Ejemplo 10: Remix Icon"
            PrevIcon={RiArrowLeftSLine}
            NextIcon={RiArrowRightSLine}
            description="Iconos de Remix Icon"
          />
        </div>
      </div>
    </div>
  );
}

function ButtonExample({ title, PrevIcon, NextIcon, description }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '30px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
    }}>
      <h3 style={{ 
        marginBottom: '10px',
        color: '#2c3e50',
        fontSize: '20px'
      }}>
        {title}
      </h3>
      <p style={{ 
        color: '#7f8c8d',
        fontSize: '14px',
        marginBottom: '30px'
      }}>
        {description}
      </p>
      
      <div style={{
        position: 'relative',
        height: '300px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <img 
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop"
          alt="Demo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.7
          }}
        />
        
        {/* Botón Anterior */}
        <button
          className="demo-nav-button demo-nav-prev"
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0)',
            backdropFilter: 'blur(0px)',
            border: '1px solid rgba(255, 255, 255, 0)',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            opacity: 0,
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.7';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.backdropFilter = 'blur(12px) saturate(180%)';
            e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0)';
            e.currentTarget.style.backdropFilter = 'blur(0px)';
            e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {PrevIcon && <PrevIcon size={24} style={{ color: 'white' }} />}
        </button>

        {/* Botón Siguiente */}
        <button
          className="demo-nav-button demo-nav-next"
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0)',
            backdropFilter: 'blur(0px)',
            border: '1px solid rgba(255, 255, 255, 0)',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            opacity: 0,
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.7';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.backdropFilter = 'blur(12px) saturate(180%)';
            e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0)';
            e.currentTarget.style.backdropFilter = 'blur(0px)';
            e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {NextIcon && <NextIcon size={24} style={{ color: 'white' }} />}
        </button>

        {/* Hover container para mostrar botones */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 5
          }}
          onMouseEnter={(e) => {
            const prev = e.currentTarget.parentElement.querySelector('.demo-nav-prev');
            const next = e.currentTarget.parentElement.querySelector('.demo-nav-next');
            if (prev) prev.style.opacity = '0.7';
            if (next) next.style.opacity = '0.7';
          }}
          onMouseLeave={(e) => {
            const prev = e.currentTarget.parentElement.querySelector('.demo-nav-prev');
            const next = e.currentTarget.parentElement.querySelector('.demo-nav-next');
            if (prev) prev.style.opacity = '0';
            if (next) next.style.opacity = '0';
          }}
        />
      </div>
    </div>
  );
}
