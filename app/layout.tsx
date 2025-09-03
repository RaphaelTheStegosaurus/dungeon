import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Dungeon Simulator",
  description: "Web App donde simulara a una dungeon de TLOZ para el navegador.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  );
}
