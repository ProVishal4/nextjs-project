
import Navbar from "@/components/header/Navbar";
import "./globals.css";
//import Sidebar from "@/components/sidebar-menu/Sidebar";
import Footer from "@/components/ui/Footer";
import { ThemeProvider } from "next-themes";
import Footer2 from "@/components/ui/Footer2";
import { SessionProvider } from "next-auth/react";
import Providers from "@/components/eliments/providers";
import NetworkListener from "@/components/eliments/NetworkListener";
//import { Inter } from "next/font/google"

// const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
// })
export const metadata = {
  title: "chhattisgarh wild explore",
  description: "chhattisgarh all best tourist places waterfall, temple ets. in one place know more",
  keywords: ["chhattisgarh", "cg-tourist-places", "waterfall"],
  authors: [{ name: "vishal" }],
  
  metadataBase: new URL('https://cgwildexplore.vercel.app'),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/web-app-manifest-192x192.png",

  },

  openGraph: {
    title: "chhattisgarh tourist places",
    description: "SEO friendly Next.js app in blh",
    url: "https://cgwildexplore.vercel.app",
    siteName: "chhattisgarh wild explore",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Chhattisgarh tourist places"
      },
    ],
    type: "website",
  },
  verification:{
    google: 'Swu1UG94mTULEbLI7ua4Z__1MFDDl7J30RxKS5HQxFY'
  },
  twitter: {
    card: "summary_large_image",
    site: "cg_wild_explore",
    title: "chhattisgarh tourist places",
    description: "Explore the best tourist places in Chhattisgarh",
    image: "/og-image.png"
  }
};
export default function RootLayout({ children }) {
  return (
    <html  lang="en" suppressHydrationWarning >
     
      <Providers>
      <body>
          <NetworkListener />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* <Navbar /> */}
       
          {children}
          {/* <Footer2 /> */}
        </ThemeProvider>
      </body></Providers>
    </html>
  );
}