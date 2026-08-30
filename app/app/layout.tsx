import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { site } from "@/lib/content";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "KR Editorial — Edições Literárias",
    template: "%s | KR Editorial",
  },
  description:
    "Editora especializada em editoração, diagramação, revisão textual e normalização ABNT. Do rascunho à publicação, com qualidade editorial.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "KR Editorial",
    images: [{ url: "/brand/kr-logo.jpg", width: 1080, height: 1080 }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
