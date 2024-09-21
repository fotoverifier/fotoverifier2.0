import React from "react";
import "@/styles/banner.css";
import Image from "next/image";
import { Inter, Montserrat, Poppins } from "next/font/google";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: "400" });
const montserrat = Montserrat({ subsets: ["latin"] });
import iconSrc from "@/assets/icon_main_white.svg";
const Banner = () => {
  return (
    <div className="banner-container">
      <div className={`icon-container ${inter.className} `}>
        <Link href="/home">
          <Image
            src={iconSrc}
            width={38}
            height={38}
            alt="Icon description"
            className="icon-image"
          />
        </Link>
        <div className="icon-text"> FotoVerifier </div>
      </div>
      <div className={`ml-10 mt-5 ${montserrat.className} `}>
        This is a tool for detecting image tampering using Digital Image
        Forensics techniques, along with the techniques are some other
        functionalities which further enhance the user&apos;s engagement. With
        the goals of creating an actual environment for interacting with
        different DIF methods, FotoVerifier was created.
      </div>
    </div>
  );
};

export default Banner;
