import type { Metadata } from "next";
import { Quicksand, Noto_Sans_Thai } from "next/font/google";
import NextTopLoader from 'nextjs-toploader';
import "@/styles/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Providers from "./providers";
import PageTransitionEffect from "./PageTransitionEffect";

const quicksandSans = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const notoSansThaiMono = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "โอสุ!",
  description: "Rhythm is just a *click* away!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="osu-theme">
      <body
        className={`${quicksandSans.variable} ${notoSansThaiMono.variable} antialiased`}
      >
        <NextTopLoader
          color="#ff8bae"
        />
        <Providers>
          <a className="notify notify-focus animation-wrapper !fixed top-[12vh] !z-[1001]" href="#head-of-main-content" tabIndex={1}>
            <div className="animation-container">
              <div className="osu-animate-background"></div>
            </div>
            Skip to main content
          </a>
          <div className="notify-container apply-transition" data-alignment="left" />
          <div className="notify-container apply-transition" data-alignment="right" />
          <Header />
          <main id="app" className="outline-0 relative" tabIndex={-1}>
            <PageTransitionEffect>
              {children}
            </PageTransitionEffect>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
