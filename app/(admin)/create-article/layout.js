import NavbarAdmin from "@/components/header/NavbarAdmin";
import "../../globals.css";
//import { ThemeProvider } from "next-themes";

export default function AdminLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
       
       
        <NavbarAdmin />
          {children}
      </body>
    </html>
  );
}

