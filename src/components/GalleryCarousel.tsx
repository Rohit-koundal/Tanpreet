import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper/modules";
import { X } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { galleryItems } from "../data/gallery";
import "swiper/css";
import "swiper/css/pagination";

type GalleryCarouselProps = {
  onOpenSection?: () => void;
};

export function GalleryCarousel({ onOpenSection }: GalleryCarouselProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [dragStartY, setDragStartY] = useState<number | null>(null);

  return (
    <section id="gallery" className="section-block">
      <SectionTitle eyebrow="Moments Worth Remembering" title="Luxury mobile swipe gallery" />
      <div className="gallery-counter">{lightbox === null ? `1 of ${galleryItems.length}` : `${lightbox + 1} of ${galleryItems.length}`}</div>
      <Swiper
        modules={[Pagination, FreeMode]}
        slidesPerView={1.08}
        spaceBetween={14}
        freeMode={{ enabled: false }}
        pagination={{ clickable: true }}
        centeredSlides
        className="gallery-swiper"
      >
        {galleryItems.map((item, index) => (
          <SwiperSlide key={item.caption}>
            <motion.button className="gallery-slide card" whileTap={{ scale: 0.985 }} onClick={() => { setLightbox(index); onOpenSection?.(); }}>
              <GalleryImage src={item.src} alt={item.caption} objectPosition={item.objectPosition} />
              <div className="gallery-slide-caption">
                <p>{item.caption}</p>
                <span>{index + 1} / {galleryItems.length}</span>
              </div>
            </motion.button>
          </SwiperSlide>
        ))}
      </Swiper>

      {lightbox !== null ? (
        <div
          className="gallery-lightbox"
          onTouchStart={(event) => setDragStartY(event.touches[0].clientY)}
          onTouchMove={(event) => {
            if (dragStartY === null) return;
            if (event.touches[0].clientY - dragStartY > 90) setLightbox(null);
          }}
          onTouchEnd={() => setDragStartY(null)}
        >
          <button className="story-close" onClick={() => setLightbox(null)} aria-label="Close gallery viewer">
            <X size={18} />
          </button>
          <img
            src={galleryItems[lightbox].src}
            alt={galleryItems[lightbox].caption}
            className="lightbox-image"
            style={{ objectPosition: galleryItems[lightbox].objectPosition }}
          />
          <p className="gallery-lightbox-caption">{galleryItems[lightbox].caption}</p>
        </div>
      ) : null}
    </section>
  );
}

function GalleryImage({ src, alt, objectPosition }: { src: string; alt: string; objectPosition: string }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div className="image-fallback">
      <span>Tanpreet</span>
    </div>
  ) : (
    <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} style={{ objectPosition }} />
  );
}
