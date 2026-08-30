import { ServiceCard } from "@/components/brand/service-card";
import { services } from "@/lib/content";

export function ServicesDetailSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="grid gap-6 sm:grid-cols-2">
        {services.map((service, index) => (
          <ServiceCard
            key={service.slug}
            service={service}
            className={index === services.length - 1 ? "sm:col-span-2 lg:col-span-1 lg:col-start-1" : undefined}
          />
        ))}
      </div>
    </section>
  );
}
