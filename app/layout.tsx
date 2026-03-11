import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CanCAF - Cancer Capacity Building in Africa Foundation",
  description: "Strengthening Cancer Care Capacity Across Africa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The html/body tags are in app/[locale]/layout.tsx
  // This root layout just passes through to the locale layout
  return children as React.ReactElement;
}
