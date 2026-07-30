import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Парк Сказка — отчёт по продажам",
  description: "Интерактивный отчёт по лидам и сделкам B2B/B2C за апрель–июль 2026 года.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
