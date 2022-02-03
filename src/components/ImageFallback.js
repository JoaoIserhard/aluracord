import { useState } from "react";
import { Image } from "@skynexui/components";

export function ImageFallback ({username, src, fallbackSrc, ...rest }) {
  const [imgSrc, setImgSrc] = useState(true);
  const [oldSrc, setOldSrc] = useState(src);

  if (oldSrc !== src) {
    setImgSrc(false)
    setOldSrc(src)
  }
  return (
    <Image
      {...rest}
      src={imgSrc ? fallbackSrc : src}
      onError={() => {
        setImgSrc(true);
      }}
    />
  );
};