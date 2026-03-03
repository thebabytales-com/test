import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PickAI - 智能选品助手",
  description: "AI-powered product selection for e-commerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
