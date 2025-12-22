
import Navbar from "@/components/header/Navbar";
import "../globals.css";
//miport Sidebar from "@/components/sidebar-menu/Sidebar";
import Footer from "@/components/ui/Footer";
import { ThemeProvider } from "next-themes";
import Footer2 from "@/components/ui/Footer2";
import { SessionProvider } from "next-auth/react";
import Providers from "@/components/eliments/providers";

export default function ClinetLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
    
      <body>
     
       
       
          {children}
   
    
      </body>
    </html>
  );
}