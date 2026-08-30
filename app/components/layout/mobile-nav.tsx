"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { CtaButton } from "@/components/brand/cta-button";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { label: "Início", href: "/" },
  { label: "Serviços", href: "/servicos" },
  { label: "Livros publicados", href: "/portfolio" },
  { label: "Quem Somos", href: "/quem-somos" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="text-cream hover:bg-cream/10 hover:text-cream md:hidden"
            aria-label="Abrir menu"
          />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-72 bg-cream">
        <SheetHeader className="border-b border-border">
          <SheetTitle>
            <Logo variant="dark" size="sm" />
          </SheetTitle>
        </SheetHeader>
        <nav aria-label="Navegação principal" className="flex flex-col gap-1 px-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-base font-medium text-navy transition-colors hover:bg-navy/5"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto border-t border-border p-4">
          <CtaButton href="/contato" className="w-full" size="lg">
            Solicitar orçamento
          </CtaButton>
        </div>
      </SheetContent>
    </Sheet>
  );
}
