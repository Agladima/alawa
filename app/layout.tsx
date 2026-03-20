import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: " Augustine Alawa — Full-Stack Developer",
  description:
    "Full-stack developer crafting end-to-end web experiences with precision, performance, and purpose.",
  icons: {
    icon: "/images/favicon.ico",
    shortcut: "/images/favicon.ico",
    apple: "/images/favicon.ico",
  },
  keywords: [
    "full-stack",
    "developer",
    "React",
    "Next.js",
    "Node.js",
    "portfolio",
  ],
  authors: [{ name: " Augustine Alawa" }],
  openGraph: {
    title: "  Augustine Alawa — Full-Stack Developer",
    description: "Building digital products that matter.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
