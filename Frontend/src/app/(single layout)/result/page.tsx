"use client";
import React, { use, useEffect, useState, useRef } from "react";
import "@/app/(single layout)/result/result.css";
import Image from "next/image";
import Image_Result from "./image";
import MetaData_Result from "./metadata";
import pattern from "@/assets/Frame 15.svg";
import { Inter } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { Buffer } from "buffer";
import Modification from "./modification";
import Map_Res from "./map";
import { clearInterval } from "timers";

interface Object {
  task_id: any;
}
interface ExifData {
  exif_data: any;
  software_modify?: string;
  modify_date?: string;
  original_date?: {
    original_date?: string;
    create_date?: string;
  };
  camera_information?: {
    make?: string;
    model?: string;
    exposure?: string;
    aperture?: string;
    focal_length?: string;
    iso_speed?: string;
    flash?: string;
  };
  gps_location?: string | null;
  author_copyright?: {
    author?: string | null;
    copyright_tag?: string | null;
    profile_copyright?: string | null;
  };
}
const inter = Inter({ subsets: ["latin"] });
const Result = () => {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const img = searchParams.get("image");

  const [taskData, setTaskData] = useState<Object | null>(null);
  const [exifData, setExifData] = useState<ExifData | null>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const [isFetching, setIsFetching] = useState<Boolean>(false);

  const [methodData, setmethodData] = useState(null);
  const [retrieve_img, setRetrieveImg] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      // Decode the data here
      const decodedData = JSON.parse(
        Buffer.from(data, "base64").toString("utf-8")
      );
      setTaskData(decodedData);
      console.log("Decoded Data:", decodedData);
      setIsFetching(true);
    }
  }, [data]);

  useEffect(() => {
    if (taskData && taskData.task_id && isFetching) {
      const fetchTaskStatus = async () => {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/task-status/${taskData?.task_id}/`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }

          const fetchedData = await response.json();

          if (fetchedData.status === "SUCCESS") {
            setmethodData(fetchedData); // Store the response data in the state
            setIsFetching(false);
            console.log("Fetching false");
            window.clearInterval(intervalIdRef.current!);
            intervalIdRef.current = null;
          }
        } catch (error) {
          console.error("Failed to fetch task status:", error);
        }
      };

      intervalIdRef.current = setInterval(fetchTaskStatus, 5000);

      return () => {
        if (intervalIdRef.current) {
          setIsFetching(false);
          console.log("Fetching false");
          window.clearInterval(intervalIdRef.current);
          intervalIdRef.current = null;
        }
      };
    }
  }, [taskData, isFetching]);

  useEffect(() => {
  if (methodData) {
    console.log("Updated methodData:", methodData);
  }
}, [methodData]);

  useEffect(() => {
    if (img) {
      // Set the retrieved image as base64
      setRetrieveImg(img);
    }
  }, [img]);
  
  useEffect(() => {
    if (data) {
      const decodedData = JSON.parse(
        Buffer.from(data, "base64").toString("utf-8")
      );
      setExifData(decodedData);
    }
  }, [data]);
  return (
    <>
      <div className={`Top-container ${inter.className}`}>
        <div className="Confident-score-container"> The confident score: </div>
        <div className="vertical-space"></div>
        <div className="General-report-container">
          <Image src={pattern} width={200} height={200} alt={""}></Image>
          <div className="font-bold text-4xl">GENERAL REPORT </div>
          <Image src={pattern} width={200} height={200} alt={""}></Image>
        </div>
      </div>
      <div className={`Content-container ${inter.className}`}>
        <div className="Half-content-container">
          <div className="Result-container">
            <Image_Result img={img} />
          </div>
          <div className="Result-container">
            <MetaData_Result
              cameraInformation={
                exifData?.exif_data?.camera_information || null
              } // Pass camera information as prop
            />
          </div>
          <div className="Result-container">
            {" "}
            <Modification
              original_date={exifData?.exif_data?.original_date || null}
              modify_date={exifData?.exif_data?.modify_date || null}
              software_modify={exifData?.exif_data?.software_modify || null}
              author_copyright={exifData?.exif_data?.author_copyright || null}
            />{" "}
          </div>
        </div>
        <div className="Half-content-container">
          <div className="Result-container">
            {" "}
            <Map_Res gps_location={exifData?.exif_data?.gps_location} />
          </div>
          <div className="Result-container"> Keyframe</div>
          <div className="Result-container"> OSM Tags</div>
        </div>
      </div>
      <div className="flex flex-col items-center"></div>
       <div>
      <h2>Task Status</h2>
      {methodData ? (
        <pre>{JSON.stringify(methodData, null, 2)}</pre>
      ) : (
        <p>Loading task status...</p>
      )}
    </div>
    </>
  );
};

export default Result;
