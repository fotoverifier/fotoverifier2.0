import React from "react";
import "@/styles/landing_banner.css";
import { Inter, Inconsolata } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const incon = Inconsolata({subsets: ["latin"]});
const LandingBanner = () => {
  return (
    <div className={`banner ${incon.className}`}>A PRODUCT FROM HO CHI MINH UNIVERSITY OF SCIENCE </div>
  );
};

export default LandingBanner;
