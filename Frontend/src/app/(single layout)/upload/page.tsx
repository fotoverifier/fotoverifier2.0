"use client";
import React, { useState } from "react";
import "@/app/(single layout)/Upload/upload.css";
import { TbExchange } from "react-icons/tb";
import { PiLineVertical } from "react-icons/pi";
import Image from "next/image";
import { Montserrat, Inter } from "next/font/google";
import ItemGrid from "./itemgrid";

const montserrat = Montserrat({
  subsets: ["latin"],
});
const inter = Inter({ subsets: ["latin"] });

const Upload = () => {
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

  return (
    <div className="main-up-container">
      <div className="seven-up-container">
        <div className="w-full h-full ml-10"> 
        <div className="helper-title">
          <div className={inter.className}> Photo Input</div>
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
                Choose your files |
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
              <div className="viewer flex align-middle justify-between items-center p-2">
                <Image
                  src={imageSrc}
                  alt="Preview"
                  className="image-preview ml-auto "
                  width="500"
                  height="500"
                />
                <button className="ml-auto ">
                  <div className={inter.className}>Analyse</div>
                </button>
              </div>
            </>
          )}
        </div>
        <div className="input-link-title">
          <div className={inter.className}> Search by link</div>{" "}
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
        </div>
      </div>
      <div className="vertical-separator -translate-x-16"> </div>
      <div className="three-up-container">
        <div className="description-title">
          <div className={inter.className}> What to expect?</div>{" "}
        </div>
        <div className="result-image"> abc</div>
        <div className="description">
          <div className={`${inter.className}`}>
            Our in-depth image assessment provides a comprehensive analysis to
            determine the authenticity and integrity of digital images.{" "}
            <span className="text-red-600 hover:text-red-800 cursor-pointer">
              Get familiar with these terms here{" "}
            </span>
          </div>
        </div>
        <div>
          <ItemGrid />
        </div>
      </div>
    </div>
  );
};

export default Upload;
