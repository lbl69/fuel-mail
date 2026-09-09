import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mail fuel — service trafic",
  description: "Generateur du mail fuel quotidien (saisie en LBS, conversion automatique en KG).",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
