import type { Metadata } from "next";
import { Anton, Oswald, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-heading",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "THE FINAL MATCH — Minh Khoa & Thanh Vy | 18.04.2026",
  description:
    "Bạn được mời tham dự trận chung kết cuộc đời của Minh Khoa & Thanh Vy. Ngày 18 tháng 04 năm 2026.",
  openGraph: {
    title: "THE FINAL MATCH — Minh Khoa & Thanh Vy",
    description: "Lễ Cưới 18.04.2026 — White Palace Convention Center",
    images: ["/1.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${anton.variable} ${oswald.variable} ${inter.variable} ${ibmPlexMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
