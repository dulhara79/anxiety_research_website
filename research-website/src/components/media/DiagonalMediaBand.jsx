export default function DiagonalMediaBand({
  variant = "default",
  className = "",
  imageSrc,
  children,
}) {
  const classes = [
    "diagonal-media-band",
    `diagonal-media-band--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} data-diagonal-media={variant} aria-hidden="true">
      <div className="diagonal-media-band__surface">
        {imageSrc ? (
          <img
            className="diagonal-media-band__image"
            src={imageSrc}
            alt=""
            loading={variant === "context" ? "eager" : "lazy"}
            decoding="async"
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
}
