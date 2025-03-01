"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/(landing layout)/home/home.module.css";
import { TbExchange } from "react-icons/tb";
import { GoLink } from "react-icons/go";
import { IoImagesOutline } from "react-icons/io5";
import Card from "@/components/card/card";

const LandingPage2 = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [url, setUrl] = useState("");

  // Handle Image Upload
  const imageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Remove Image
  const removeImg = () => setImageSrc(null);

  return (
    <div className={styles.container}>
      <div className={styles.header}></div>
      <motion.main
      className={styles.content}
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.3 } }, // Stagger elements
      }}
    >
      {/* Left Section - Text */}
      <motion.div
        className={styles.text_section}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className={styles.headline}>
          <span className={styles.bold_text}>IMAGE VERIFICATION </span>
          IN A <span className={styles.highlight}>MORE ENGAGING</span> WAY
        </h1>
        <p className={styles.description}>
          Quickly verify the integrity of photos or videos with advanced algorithms and a 5-step approach.
        </p>
        <motion.button
          className={styles.cta_button}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          Verify Now →
        </motion.button>
      </motion.div>

      {/* Right Section - Floating Elements */}
      <motion.div
        className={styles.visual_section}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={styles.upload_fcontainer}>
          <div className={styles.upload_scontainer}>
            <motion.div
              className={styles.title_container}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div>Is this image reliable?</div>
              <div className={styles.subtext}>How can we assess it?</div>
            </motion.div>

            {/* URL Input Field */}
            {isEditing ? (
              <motion.input
                type="text"
                className={styles.findbyurl_input}
                placeholder="Enter image URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onBlur={() => setIsEditing(url.trim() !== "")}
                autoFocus
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              />
            ) : (
              <motion.div
                className={styles.findbyurl_container}
                onClick={() => setIsEditing(true)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all mr-5">
                  <GoLink className="w-4 h-4" />
                </div>
                Find by URL
              </motion.div>
            )}

            {/* Image Upload Section */}
            <div
              className={styles.input_image}
            >
              {!imageSrc ? (
                <div className={styles.viewer}>
                  <input type="file" id="file-upload" accept="image/*" onChange={imageChange} style={{ display: "none" }} />
                  <label htmlFor="file-upload" className={styles.custom_file_upload}>
                    <Card icon={IoImagesOutline} description="Choose your image" />
                  </label>
                </div>
              ) : (
                <>
                  {/* Image Preview & Change Option */}
                  <div className={styles.image_control}>
                    <div className={styles.change_text}>Change your image</div>
                    <button onClick={removeImg}>
                      <TbExchange size={20} />
                    </button>
                  </div>
                  <hr className={styles.separator} />
                  <div className={styles.image_preview_container}>
                    <Image
                      src={imageSrc}
                      alt="Preview"
                      className={styles.image_preview}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{
                        width: "auto",
                        maxWidth: "100%",
                        height: "100%",
                        objectFit: "contain",
                        position: "relative",
                      }}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Verify Button */}
            <motion.div
              className={styles.verify_agree_container}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Link href="/result2" className={styles.verify_button}>
                Verify
              </Link>
              <div className={styles.agree_section}>I agree to the terms and conditions.</div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.main>
    </div>
  );
};

export default LandingPage2;
