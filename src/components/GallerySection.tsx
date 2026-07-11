import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";

type GalleryItem = {
  src: string;
  caption: string;
};

type GalleryLightboxItem = GalleryItem & {
  index: number;
};

type GallerySectionProps = {
  items: GalleryItem[];
  onOpen: (item: GalleryLightboxItem) => void;
};

export function GallerySection({ items, onOpen }: GallerySectionProps) {
  return (
    <section id="gallery" className="section">
      <div className="container">
        <div className="section-heading centered">
          <p className="eyebrow">Moments Worth Remembering</p>
          <h2>Elegant memories in a soft, swipeable gallery</h2>
        </div>

        <div className="gallery-grid">
          {items.map((item, index) => (
            <motion.button
              key={`${item.caption}-${index}`}
              className="gallery-card"
              onClick={() => onOpen({ ...item, index })}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <GalleryImage src={item.src} alt={item.caption} />
              <div className="gallery-caption">
                <p>{item.caption}</p>
                <span className="gallery-meta">
                  <Download size={14} />
                  Download disabled
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="gallery-swipe-note">
          <ChevronLeft size={16} />
          <span>Swipe on mobile or tap any image to open it larger.</span>
          <ChevronRight size={16} />
        </div>
      </div>
    </section>
  );
}

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="gallery-fallback">
        <span>Tanpreet</span>
      </div>
    );
  }

  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />;
}
