import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Author } from "@/lib/types";

export function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

type AuthorAvatarProps = {
  name: string;
  author?: Author;
  className?: string;
  sizes?: string;
};

export function AuthorAvatar({
  name,
  author,
  className,
  sizes = "96px",
}: AuthorAvatarProps) {
  if (author?.image) {
    return (
      <span
        className={cn(
          "relative block size-12 shrink-0 overflow-hidden rounded-full bg-navy-deep ring-1 ring-navy/10",
          className,
        )}
      >
        <Image
          src={author.image}
          alt={`Retrato de ${name}`}
          fill
          sizes={sizes}
          quality={90}
          className="object-cover"
          style={{ objectPosition: author.imagePosition ?? "50% 18%" }}
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden
      className={cn(
        "flex size-12 shrink-0 items-center justify-center rounded-full bg-navy-deep text-sm font-bold text-cream",
        className,
      )}
    >
      {getInitials(name)}
    </span>
  );
}
