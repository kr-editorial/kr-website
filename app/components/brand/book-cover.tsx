import Image from "next/image";
import { cn } from "@/lib/utils";

type BookCoverProps = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

export function BookCover({
  src,
  alt,
  sizes = "(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 260px",
  priority = false,
  className,
}: BookCoverProps) {
  return (
    <div
      className={cn(
        "relative aspect-[2/3] overflow-hidden rounded-md shadow-lg ring-1 ring-navy/10",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
