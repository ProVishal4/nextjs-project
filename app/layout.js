
import Navbar from "@/components/header/Navbar";
import "./globals.css";
//import Sidebar from "@/components/sidebar-menu/Sidebar";
import Footer from "@/components/ui/Footer";
import { ThemeProvider } from "next-themes";


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
       
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}