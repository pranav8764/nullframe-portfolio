import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pranav Singh Rajoria - Backend/Product Engineer",
  description:
    "Backend-focused engineer building scalable systems, realtime applications, AI workflows, and security-focused products.",
  keywords: [
    "Pranav Singh Rajoria",
    "backend engineer",
    "software engineer",
    "Spring Boot",
    "Go",
    "Next.js",
    "WebSockets",
    "AI workflows",
    "security",
    "portfolio"
  ],
  openGraph: {
    title: "Pranav Singh Rajoria - Backend/Product Engineer",
    description:
      "Backend-focused engineer building scalable systems, realtime applications, AI workflows, and security-focused products.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
