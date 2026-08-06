import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Продажи · Август 2026 · Парк Сказка",
  description: "Управленческий отчёт по pipeline отдела продаж Парка Сказка за август 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
