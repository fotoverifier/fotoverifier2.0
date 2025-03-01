"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./aboutus.module.css";
import { FaFacebook, FaGithub } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div
      className={styles.aboutUsContainer}
    >
      {/* Left - Text Content */}
      <div className={styles.textContainer}>
        <h2 className={styles.title}>  About <span className={styles.highlight}>US</span></h2>
       <div className={styles.description}>
            <span>Fotoverification</span> is a <span>forensic AI platform</span> that detects and prevents <span>digital fraud</span>.  
            Powered by <span>HCMUS Security Club</span>, we merge <span>advanced AI</span> with forensic techniques to ensure <span>trust & authenticity</span> in digital content.
            </div> 
      </div>

      {/* Right - Image or Illustration */}
        <motion.div
      className={styles.imageContainer}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Left Triangle (Facebook) */}
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.triangle} ${styles.left}`}
      >
        <FaFacebook size={60} />
      </a>

         {/* Right Triangle (GitHub) */}
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.triangle} ${styles.right}`}
      >
        <FaGithub size={60} />
      </a>
    </motion.div>
    </div>
  );
};

export default AboutUs;
