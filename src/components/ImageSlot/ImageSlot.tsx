import type { CSSProperties } from "react";
import type { ImageAsset } from "../../data/images";
import { revealRef } from "../../hooks/useReveal";
import styles from "./ImageSlot.module.css";

type Props = {
  image?: ImageAsset;
  /** Shown on the striped placeholder when there's no image; used as alt text when there is. */
  caption: string;
  alt?: string;
  /** Sets aspect-ratio (and any per-breakpoint swaps) from the parent's module. */
  className?: string;
  /** object-position for this crop, e.g. "50% 40%". */
  position?: string;
  sizes?: string;
  priority?: boolean;
  reveal?: boolean;
  captionSize?: "sm" | "md";
  /** Desktop only: crossfades in while the enclosing link is hovered. */
  hoverImage?: ImageAsset;
};

const DEFAULT_WIDTHS = [800, 1600];

export function ImageSlot({
  image,
  caption,
  alt,
  className,
  position,
  sizes = "(min-width: 900px) 50vw, 100vw",
  priority = false,
  reveal = true,
  captionSize = "sm",
  hoverImage,
}: Props) {
  const classes = [styles.slot, className].filter(Boolean).join(" ");
  const style = position ? ({ "--object-position": position } as CSSProperties) : undefined;

  if (!image) {
    return (
      <div className={classes} data-reveal={reveal ? "image" : undefined} ref={reveal ? revealRef : undefined}>
        <span className={styles.caption} data-size={captionSize}>
          {caption}
        </span>
      </div>
    );
  }

  return (
    <div className={classes} style={style} data-reveal={reveal ? "image" : undefined} ref={reveal ? revealRef : undefined}>
      <Picture image={image} alt={alt ?? caption} sizes={sizes} priority={priority} />
      {hoverImage && <Picture image={hoverImage} alt="" sizes={sizes} className={styles.second} />}
    </div>
  );
}

type PictureProps = { image: ImageAsset; alt: string; sizes: string; priority?: boolean; className?: string };

function Picture({ image, alt, sizes, priority = false, className }: PictureProps) {
  const widths = image.widths ?? DEFAULT_WIDTHS;
  const srcset = (ext: string) => widths.map((w) => `/images/${image.name}-${w}.${ext} ${w}w`).join(", ");
  const fallback = `/images/${image.name}-${widths[widths.length - 1]}.webp`;

  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcset("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcset("webp")} sizes={sizes} />
      <img
        className={styles.img}
        src={fallback}
        alt={alt}
        width={image.width}
        height={image.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </picture>
  );
}
