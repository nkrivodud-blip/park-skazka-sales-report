import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Парк Сказка — отчёт по продажам",
  description: "Интерактивный отчёт по лидам и сделкам B2B/B2C за апрель–июль 2026 года.",
  openGraph: {
    title: "Парк Сказка — отчёт по продажам",
    description: "33,67 млн ₽ выручки: интерактивная аналитика лидов и сделок B2B/B2C.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Парк Сказка — отчёт по продажам",
    description: "Интерактивная аналитика продаж B2B/B2C.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
