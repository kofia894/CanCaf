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
  return children;
}
