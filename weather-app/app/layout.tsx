import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "天气 App - 简单实用的天气查询",
  description: "实时天气、未来预报，支持全球城市查询",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
