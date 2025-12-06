import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Therapy App",
  description: "Interactive therapy app for kids, parents, and clinicians",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
