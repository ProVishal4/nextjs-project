
import Navbar from "@/components/ui/Navbar";
import "./globals.css";
import Sidebar from "@/components/ui/Sidebar";
import Footer from "@/components/ui/Footer";
import { ThemeProvider } from "next-themes";
import Navbar2 from "@/components/search/Navbar2";


//const WorkSans = Work_Sans({subsets:['latin']});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {/* <Navbar /> */}
        <Navbar2 />
        {children}
        <Footer />
        </ThemeProvider>
        </body>
    </html>
  );
}