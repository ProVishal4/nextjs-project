
import "./globals.css";


//const WorkSans = Work_Sans({subsets:['latin']});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}</body>
    </html>
  );
}