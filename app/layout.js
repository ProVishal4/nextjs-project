
import Navbar from "@/components/ui/Navbar";
import "./globals.css";
import Sidebar from "@/components/ui/Sidebar";
import Footer from "@/components/ui/Footer";


//const WorkSans = Work_Sans({subsets:['latin']});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
      
        {children}
        <Footer />
        </body>
    </html>
  );
}