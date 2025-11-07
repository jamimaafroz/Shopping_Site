"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import UpperNavbar from "@/Components/UpperNavbar";
import { usePathname } from "next/navigation";
import Navbar from "@/Components/Navbar";
import NextProviderAuth from "@/Providers/NextProviderAuth";
import Footer from "@/Components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function NavigationWrapper({ children }) {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboardRoute && (
        <>
          <UpperNavbar className="hidden md:block" />
          <Navbar />
        </>
      )}
      {children}
      {!isDashboardRoute && <Footer />}
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextProviderAuth>
          <NavigationWrapper>
            <main>{children}</main>
          </NavigationWrapper>
        </NextProviderAuth>
      </body>
    </html>
  );
}
