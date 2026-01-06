
import Navbar from "@/components/header/Navbar";
import "../globals.css";
import Footer2 from "@/components/ui/Footer2";
import NetworkListener from "@/components/eliments/NetworkListener";

export const metadata = {
  title: "CG Wild Explore",
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
    description: "chhattisgarh tourist loctions, places blog. Know more about blogs",
    url: "https://cgwildexplore.vercel.app",
    siteName: "chhattisgarh wild explore",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chhattisgarh tourist places"
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "chhattisgarh blog and tourist places",
    description: "know more about chhattisgarh tourist loctions, places ",
    images: ["/og-image.png"],
  },
};
export default function ClinetLayout({ children }) {
  return (
  
     <>
      <NetworkListener />
        <Navbar />
       
          {children}
          <Footer2 />
    </>

  );
}