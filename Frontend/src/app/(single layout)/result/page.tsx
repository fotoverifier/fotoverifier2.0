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

interface Object {
  task_id: any;
}
interface ExifData {
  exif_data: any;
  software_modify: string | undefined;
  modify_date: string | undefined;
  original_date: {
    original_date: string | undefined;
    create_date: string | undefined;
  };
  camera_information: {
    make: string | undefined;
    model: string | undefined;
    exposure: string | undefined;
    aperture: string | undefined;
    focal_length: string | undefined;
    iso_speed: string | undefined;
    flash: string | undefined;
  };
  gps_location: string | undefined;
  author_copyright: {
    author: string | undefined;
    copyright_tag: string | undefined;
    profile_copyright: string | undefined;
  };
}

interface SearchResult {
  title: string | undefined;
  redirect_link: string | undefined;
}

interface Result {
  exif_data: any;
  jpeg_ghost_result: string;
  reverse_image_search_results: any;
  super_resolution_result: string;
}
const inter = Inter({ subsets: ["latin"] });
const Result = () => {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const img = searchParams.get("image");
  const wsRef = useRef<WebSocket | null>(null);

  const [taskData, setTaskData] = useState<Object | null>(null);
  const [exifData, setExifData] = useState<ExifData | null>(null);
  const [searchData, setSearchData] = useState<SearchResult[] | null>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const [isFetching, setIsFetching] = useState<Boolean>(false);

  const [methodData, setmethodData] = useState<Result | null>(null);
  const [retrieve_img, setRetrieveImg] = useState<string | null>(null);

  useEffect(() => {
    const fetchTaskStatus = async () => {
      try {
        wsRef.current = new WebSocket('ws://127.0.0.1:8000');

        wsRef.current.onopen = () => {
          console.log('WebSocket connection opened');
        };

        wsRef.current.onmessage = (event) => {
          const data = JSON.parse(event.data);
          setTaskData(data);
          if (data.status === 'SUCCESS') {
            setIsFetching(false);
            console.log('Fetching false');
            wsRef.current?.close();
          }
        };

        wsRef.current.onerror = (error) => {
          console.error('WebSocket error:', error);
        };

        wsRef.current.onclose = () => {
          console.log('WebSocket connection closed');
        };
      } catch (error) {
        console.error('Failed to fetch task status:', error);
      }
    };

    fetchTaskStatus();

    return () => {
      if (wsRef.current) {
        setIsFetching(false);
        console.log('Fetching false');
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (data) {
      // Decode the data here
      const decodedData = JSON.parse(
        Buffer.from(data, "base64").toString("utf-8")
      );
      setTaskData(decodedData);
      console.log("Decoded Data:", decodedData);
      setIsFetching(true);
      console.log("Fetching true");
    }
  }, [data]);

  useEffect(() => {
    if (taskData && taskData.task_id && isFetching) {
      const fetchTaskStatus = async () => {
        console.log("start");
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
          console.log("Response:", response);
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }

          const fetchedData = await response.json();

          if (fetchedData.status === "SUCCESS") {
            setmethodData(fetchedData.result); // Store the response data in the state
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
    if (methodData) {
      console.log(methodData.exif_data);
      setExifData(methodData.exif_data);
      setSearchData(methodData.reverse_image_search_results.image_results);
    }
  }, [methodData]);
  return (
    <>
      <div className={`Top-container ${inter.className}`}>
        <div
          className={`Confident-score-container ${inter.className} font-bold`}
        >
          {" "}
          The confident score:{" "}
        </div>
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
              cameraInformation={exifData?.camera_information || undefined} // Pass camera information as prop
            />
          </div>
          <div className="Result-container">
            {" "}
            <Modification
              original_date={exifData?.original_date || undefined}
              modify_date={exifData?.modify_date || undefined}
              software_modify={exifData?.software_modify || undefined}
              author_copyright={exifData?.author_copyright || undefined}
            />{" "}
          </div>
        </div>
        <div className="Half-content-container">
          <div className="Result-container">
            {" "}
            <Map_Res gps_location={exifData?.gps_location} />
          </div>
          <div className="Result-container">
            <div className="w-full h-full p-5">
              <div className="flex">
                <div className="circle_2"> 5. </div>
                <div className="font-bold text-lg ml-2 mb-5">JPEG Ghost</div>
              </div>
              {methodData?.jpeg_ghost_result && (
                <Image
                  src={`data:image/jpeg;base64,${methodData.jpeg_ghost_result}`}
                  alt=""
                  width={500}
                  height={500}
                />
              )}
            </div>
          </div>
          <div className="Result-container">
            {" "}
            <div className="w-full h-full p-5">
              <div className="flex">
                <div className="circle_2"> 6. </div>
                <div className="font-bold text-lg ml-2 mb-5">
                  Reversed Image Search
                </div>
              </div>
              {searchData?.map((result, index) => (
                <div key={index} >
                  <a href={result.redirect_link} className="hover: underline">{index+1}. {result.title}</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center"></div>
    </>
  );
};

export default Result;
