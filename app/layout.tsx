import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { DemoProvider } from "@/components/demo/DemoProvider";
import { Ready } from "@/components/Ready";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Unica — Meet fewer, more meaningfully",
    template: "%s — Unica",
  },
  description: "Meet fewer people, more meaningfully. Membership is by application.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <Ready />
        <DemoProvider>{children}</DemoProvider>
      </body>
    </html>
  );
}
