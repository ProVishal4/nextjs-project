
import Navbar from "@/components/header/Navbar";
import "../globals.css";
import Footer2 from "@/components/ui/Footer2";


export const metadata = {
  title:{
    default: "CG Wild Explore" ,
    template: "%s | CG Wild Explore",
  },
  description: "chhattisgarh all best tourist places waterfall, temple ets. and chhattisgarh geography in one place know more",
  alternates: {
    canonical: "https://cgwildexplore.vercel.app/tourist-places",
  },
  openGraph: {
    siteName: "chhattisgarh wild explore",
    type: "website",
  }
};
export default function ClinetLayout({ children }) {
  return (
  
     <>
    
        <Navbar />
       
          {children}
          <Footer2 />
    </>

  );
}