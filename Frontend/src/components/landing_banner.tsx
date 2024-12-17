import React from "react";
import "@/styles/landing_banner.css";
import { Inter, Inconsolata } from "next/font/google";
import HCMUS_Logo from "@/assets/Logo chinh.png"
import Image from "next/image";
const inter = Inter({ subsets: ["latin"] });
const incon = Inconsolata({subsets: ["latin"]});
const LandingBanner = () => {
  return (
    <div className={`banner ${incon.className} flex`}>
      <Image alt="HCMUS Logo" src={HCMUS_Logo} />
    <div className="ml-5"> A PRODUCT FROM HO CHI MINH UNIVERSITY OF SCIENCE</div>
    
     </div>
  );
};

export default LandingBanner;
