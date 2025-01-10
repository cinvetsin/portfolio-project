import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Covered_By_Your_Grace, Inter, Roboto, Coming_Soon, Single_Day } from "next/font/google";

export const metadata: Metadata = {
  title: "Sasha Nabila Fortuna - Portfolio",
  description: "Data Science & Software Engineer Enthusiast",
  icons: [{ rel: "icon", url: "/icons/logo.svg" }],
};

// Configure the "Covered By Your Grace" font
const coveredByYourGrace = Covered_By_Your_Grace({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-covered-by-your-grace",
});

// Configure the "Inter" font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Configure the "Roboto" font
const roboto = Roboto({
  weight: ["400", "700"], // Load multiple weights
  subsets: ["latin"],
  variable: "--font-roboto",
});

// Configure the "Coming Soon" font
const comingSoon = Coming_Soon({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-coming-soon",
});

// Configure the "Single Day" font
const singleDay = Single_Day({
  weight: "400",
  variable: "--font-single-day",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${coveredByYourGrace.variable} ${inter.variable} ${roboto.variable} ${comingSoon.variable} ${singleDay.variable}`}
    >
      <body className={inter.className}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}