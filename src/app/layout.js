import { Cairo, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const geistCairo = Cairo({
  variable: "--font-geist-cairo",
  subsets: ["arabic", "latin"],
});

export const metadata = {
  title: "محافظة دمشق",
  description: "الموقع الرسمي لمحافظة دمشق",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${geistCairo.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
