import { Breadcrumbs } from "@/components/brand/breadcrumbs";
import { GridTexture } from "@/components/brand/grid-texture";
import { PillLabel } from "@/components/brand/pill-label";
import { cn } from "@/lib/utils";

type PageShellProps = {
  title: string;
  pill?: string;
  lede?: string;
  breadcrumbs?: { label: string; href?: string }[];
  className?: string;
  children: React.ReactNode;
};

/** Title band + breadcrumbs wrapper for inner pages. */
export function PageShell({
  title,
  pill,
  lede,
  breadcrumbs,
  className,
  children,
}: PageShellProps) {
  return (
    <>
      <GridTexture className="border-b border-border bg-cream-warm">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-12 sm:px-6 sm:py-16">
          {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
          <div className="flex flex-col items-start gap-3">
            {pill ? <PillLabel>{pill}</PillLabel> : null}
            <h1 className="text-3xl font-bold tracking-tight text-balance text-navy sm:text-5xl">
              {title}
            </h1>
            {lede ? (
              <p className="max-w-2xl text-lg text-pretty text-muted-foreground">
                {lede}
              </p>
            ) : null}
          </div>
        </div>
      </GridTexture>
      <div className={cn(className)}>{children}</div>
    </>
  );
}
