import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "./Image";
export default function Lightbox({
  images,
  index,
  setIndex,
  onClose,
  title,
}: {
  images: string[];
  index: number;
  setIndex: (n: number) => void;
  onClose: () => void;
  title: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const move = (direction: number) =>
    setIndex((index + direction + images.length) % images.length);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previous?.focus();
    };
  }, []);
  useEffect(() => {
    function key(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") setIndex((index + 1) % images.length);
      if (event.key === "ArrowLeft")
        setIndex((index - 1 + images.length) % images.length);
      if (event.key === "Tab") {
        const items = Array.from(
          document.querySelectorAll<HTMLButtonElement>(".lightbox button"),
        );
        const first = items[0],
          last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    }
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [index, images, setIndex, onClose]);
  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} image gallery`}
      onClick={onClose}
    >
      <div className="lightbox-top">
        <span>{title}</span>
        <button
          ref={closeRef}
          onClick={onClose}
          className="icon-button"
          aria-label="Close image gallery"
        >
          <X aria-hidden="true" />
        </button>
      </div>
      <button
        className="lightbox-prev icon-button"
        aria-label="Previous image"
        onClick={(e) => {
          e.stopPropagation();
          move(-1);
        }}
      >
        <ChevronLeft aria-hidden="true" />
      </button>
      <Image
        key={images[index]}
        src={images[index]}
        alt={`${title} — view ${index + 1}`}
        onClick={(e) => e.stopPropagation()}
      />
      <button
        className="lightbox-next icon-button"
        aria-label="Next image"
        onClick={(e) => {
          e.stopPropagation();
          move(1);
        }}
      >
        <ChevronRight aria-hidden="true" />
      </button>
      <div className="lightbox-bottom">
        {String(index + 1).padStart(2, "0")} /{" "}
        {String(images.length).padStart(2, "0")}
        <span>Use arrow keys to explore</span>
      </div>
    </div>,
    document.body,
  );
}
