
import Navbar from "@/components/header/Navbar";
import "./globals.css";
//import Sidebar from "@/components/sidebar-menu/Sidebar";
import Footer from "@/components/ui/Footer";
import { ThemeProvider } from "next-themes";
import Footer2 from "@/components/ui/Footer2";
import { SessionProvider } from "next-auth/react";
import Providers from "@/components/eliments/providers";
//import { Inter } from "next/font/google"

// const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
// })

export default function RootLayout({ children }) {
  return (
    <html  lang="en" suppressHydrationWarning >
      <Providers>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* <Navbar /> */}
       
          {children}
          {/* <Footer2 /> */}
        </ThemeProvider>
      </body></Providers>
    </html>
  );
}