"use client";
import React, { useEffect, useState } from "react";
import "@/app/(main layout)/Upload/upload.css";
import { TbExchange } from "react-icons/tb";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { Montserrat, Inter } from "next/font/google";
import Method_Box from "./itemgrid";
import { FaAngleDown } from "react-icons/fa6";
import LoadingModal from "@/components/loading_modal";
import CompletionModal from "@/components/modal/complete_modal";
import Link from "next/link";
import { Buffer } from 'buffer';

const montserrat = Montserrat({
  subsets: ["latin"],
});
const inter = Inter({ subsets: ["latin"] });

const Upload = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [retrievedData, setretrievedData] = useState();
  
  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageSrc(URL.createObjectURL(file));
      setImageFile(file);
    }
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setImageSrc(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };
  const removeImg = () => {
    setImageSrc(null);
    setImageFile(null);
  };
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handleGoToResult = () => {
    // Logic to navigate to the result page
    router.push('/result'); // You may want to update this based on your routing
  };
  const handleMethodSelect = (id: string) => {
    setSelectedMethod(id); 
  };
  useEffect(() => {
    if (retrievedData) {
      console.log("Updated retrievedData:", retrievedData);
    }
  }, [retrievedData]);

  const handleSubmit = async () => {
    setLoading(true);
    if (!imageFile) {
      alert("Please select an image before submitting.");
      return;
    }

    if (!selectedMethod) {
      alert("Please select a scan method before submitting.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      const response = await fetch("https://fotoverifier-backend-chuong-les-projects.vercel.app/api/image/", {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Image uploaded successfully:", data);
      setretrievedData(data);
    } catch (error) {
      console.log("Error submitting image:", error);
      alert("There was an error submitting the image. Please try again.");
    } finally {
      console.log("Upload complete");
      setUploadComplete(true);
      setLoading(false);
    }
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
              <div className={`${inter.className} choice-container font-semibold`}>
               <Method_Box 
        id="normal" 
        label="Quick Scan" 
        isSelected={selectedMethod === "normal"}
        onSelect={handleMethodSelect}
        duration="< 1 minute"
      />
                 <Method_Box 
        id="deep" 
        label="Deep Scan" 
        isSelected={selectedMethod === "deep"}
        onSelect={handleMethodSelect}
        duration="> 1 minute"
      />
              </div>
              <div className="space"></div>
              <div className={`${inter.className} choice-container font-semibold`}>
              <Method_Box 
        id="specialized" 
        label="Scan the image by yourself" 
        isSelected={selectedMethod === "specialized"}
        onSelect={handleMethodSelect}
        duration="Specialized moed"
      />
              </div>
              <div className="space">  </div>
              <div className="word-container">
                
                   <div className={`${montserrat.className} word-container2`}> 
                    <FaAngleDown className="mr-5"></FaAngleDown>
                    For specialized mode, please consider checking our comprehensive tutorials and terminologies. 
                    </div>
                    </div>
               <div className="verify-agree-container ml-5">
                <div className="button" onClick={handleSubmit}> Verify </div>
               {loading && (
        <LoadingModal 
          message="Uploading image..."
        />
      )}
      {!loading && uploadComplete && (
        <Link   href={{
          pathname: '/result',
          query: {
            data:  Buffer.from(JSON.stringify(retrievedData)).toString('base64'),
            image: imageSrc,
          }
        }}>
        <CompletionModal 
          message="Upload Complete!"
          onGoToResult={handleGoToResult} ></CompletionModal>
          </Link>
      )}
                <div className="w-1/12"> </div>
                <div className={`${inter.className} agree-section`}>
                  {" "}
                  I agree to the terms and conditions.{" "}
                </div>
              </div>    
      </div>
    </div>
  );
};

export default Upload;
