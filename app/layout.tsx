import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Découvrez les Plus Beaux Sentiers de Randonnée au Monde",
  description:
    "Partez à l'aventure sur les plus beaux sentiers de thru-hiking au monde. Chaque kilomètre raconte une histoire, chaque sommet révèle un nouveau horizon.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
