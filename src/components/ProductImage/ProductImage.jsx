const FALLBACK_IMAGE = "/images/productos/image-fallback.svg";

export default function ProductImage({ imagen, alt, className }) {
  function useFallback(event) {
    const image = event.currentTarget;
    if (image.dataset.fallbackApplied) return;

    image.dataset.fallbackApplied = "true";
    image.src = FALLBACK_IMAGE;
  }

  return (
    <img
      className={className}
      src={imagen}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={useFallback}
    />
  );
}
