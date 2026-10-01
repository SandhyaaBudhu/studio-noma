import { useState } from "react";
import type { ImgHTMLAttributes } from "react";
export default function Image({
  src,
  alt,
  className = "",
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  const [failedSrc, setFailedSrc] = useState<string>();
  return (
    <img
      {...props}
      src={src === failedSrc ? `${import.meta.env.BASE_URL}fallback.svg` : src}
      alt={alt}
      className={className}
      onError={() => setFailedSrc(src)}
    />
  );
}
