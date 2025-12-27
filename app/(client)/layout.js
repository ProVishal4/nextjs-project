
import Navbar from "@/components/header/Navbar";
import "../globals.css";
//import Sidebar from "@/components/sidebar-menu/Sidebar";
import Footer from "@/components/ui/Footer";
import { ThemeProvider } from "next-themes";
import Footer2 from "@/components/ui/Footer2";
import { SessionProvider } from "next-auth/react";
import Providers from "@/components/eliments/providers";
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})
export const metadata = {
  title: "blog page",
  description: "Learn Next.js SEO with App Router",
  keywords: ["Next.js", "SEO", "React"],
  authors: [{ name: "Your Name" }],
  // icons: {
  //   icon: "/favicon.ico",
  //   shortcut: "/favicon.ico",
  //   apple: "/apple-touch-icon.png",
  // },
  openGraph: {
    title: "My Website blog page",
    description: "SEO friendly Next.js app in blh",
    url: "https://example.com",
    siteName: "My Website",
    images: [
      {
        url: "https://example.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};
export default function ClinetLayout({ children }) {
  return (
    <html className={inter.className} lang="en" suppressHydrationWarning >
    
      <body>
     
        <Navbar />
       
          {children}
          <Footer2 />
    
      </body>
    </html>
  );
}