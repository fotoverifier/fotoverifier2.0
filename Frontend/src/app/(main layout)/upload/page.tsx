"use client";
import React, { useState } from "react";
import "@/app/(main layout)/Upload/upload.css";
import { TbExchange } from "react-icons/tb";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { Montserrat, Inter } from "next/font/google";
import Method_Box from "./itemgrid";
const montserrat = Montserrat({
  subsets: ["latin"],
});
const inter = Inter({ subsets: ["latin"] });

const Upload = () => {
  const router = useRouter();
  const [link, setLink] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  
  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileURL = URL.createObjectURL(file);
      setImageSrc(fileURL);
    }
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setImageSrc(URL.createObjectURL(e.dataTransfer.files[0]));
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };
  const removeImg = () => {
    setImageSrc("");
  };
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handleMethodSelect = (id: string) => {
    setSelectedMethod(id); 
  };
  const handleSubmit = () => {
  if (!imageSrc) {
    alert("Please select an image before submitting.");
    return;
  }

  if (!selectedMethod) {
    alert("Please select a scan method before submitting.");
    return;
  }

  console.log("Submitting with image:", imageSrc, "and method:", selectedMethod);
  router.push(`/result?imageSrc=${encodeURIComponent(imageSrc)}&selectedMethod=${selectedMethod}`);
};

  
  return (
    <div className="main-up-container">
      <div className="seven-up-container">
        <div className="w-full h-full ml-10"> 
         <div className="helper-title">
          <div className={`${inter.className} flex items-center`}> 
            <div className="circle mr-4 "> 1. </div>
            Photo Input</div>
          </div>
        <div className="input-link">
          <input
            type="text"
            placeholder="Input link"
            className={`ml-2 ${inter.className}`}
          />
          <button className="mr-2">
            {" "}
            <div className={inter.className}> Analyse </div>{" "}
          </button>
        </div>
         <div className="helper-title">
          <div className="spec-helper">
            <div className={inter.className}>
              Suitable Size: <span style={{ color: "red" }}>25MB</span>
            </div>
          </div>
          <div className="spec-helper">
            <div className={inter.className}>
              Type: <span style={{ color: "red" }}>PNG, SVG, JPEG</span>
            </div>
          </div>
        </div>
        <div className="input-image">
          {!imageSrc && (
            <div
              className="viewer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={imageChange}
                style={{ display: "none" }}
              />
              <label
                htmlFor="file-upload"
                className={`custom-file-upload  ${inter.className}`}
              >
                Choose your files 
              </label>
            </div>
          )}
          {imageSrc && (
            <>
              <div className="flex items-center align-middle p-2 justify-center ml-auto">
                <div className={`mr-2 ${inter.className} font-bold`}>
                  {" "}
                  Change your image{" "}
                </div>
                <button>
                  <TbExchange size={20} onClick={removeImg}></TbExchange>
                </button>
              </div>
              <hr className="separator" />
              <div className="viewer flex items-center justify-center p-2">
                <Image
                  src={imageSrc}
                  alt="Preview"
                  className="image-preview "
                  width="450"
                  height="450"
                />
              </div>
            </>
          )}
        </div>
        
        </div>
      </div>
      <div className="three-up-container">
        <div className="helper-title">
          <div className={`${inter.className} flex items-center`}> 
            <div className="circle mr-4 "> 2. </div>
            Scanning mode</div>
          </div>
              <div className="choice-container">
               <Method_Box 
        id="normal" 
        label="Normal Scan" 
        isSelected={selectedMethod === "normal"}
        onSelect={handleMethodSelect}
      />
                 <Method_Box 
        id="deep" 
        label="Deep Scan" 
        isSelected={selectedMethod === "deep"}
        onSelect={handleMethodSelect}
      />
              </div>
              <div className="space"></div>
              <div className="choice-container">
              <Method_Box 
        id="specialized" 
        label="Specialized Scan" 
        isSelected={selectedMethod === "specialized"}
        onSelect={handleMethodSelect}
      />
              </div>
              <div className="space">  </div>
              <div className="word-container">
                   <div className="word-container2"> For specialized mode, please consider checking our comprehensive tutorials and terminologies. </div>
                    </div>
               <div className="verify-agree-container">
                <div className="button" onClick={handleSubmit}> Verify </div>
                <div className="w-1/12"> </div>
                <div className="agree-section">
                  {" "}
                  I agree to the terms and conditions.{" "}
                </div>
              </div>    
      </div>
    </div>
  );
};

export default Upload;
