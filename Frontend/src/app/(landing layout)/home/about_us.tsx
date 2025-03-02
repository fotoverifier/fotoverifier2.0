"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./aboutus.module.css";
import { FaChevronRight, FaFacebook, FaGithub } from "react-icons/fa";
import Wave from "@/animation/wave";

const AboutUs = () => {
  return (
    <div
      className={styles.aboutUsContainer}
    >
      {/* Left - Text Content */}
      <div className={styles.textContainer}>
        <h2 className={styles.title}>   <FaChevronRight />
About <span className={styles.highlight}>US</span></h2>
       <div className={styles.description}>
            <span>Fotoverifier</span> provides users with a robust arsenal of tools to detect and analyze <span>image manipulation</span>, ensuring <span>authenticity</span> and <span>integrity</span> in digital content.  
Powered by <span>HCMUS Security Club</span>, we integrate <span>cutting-edge forensic techniques</span> with advanced detection tools to help users verify <span>the legitimacy of digital media</span>.
            </div> 
      </div>

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
        <FaFacebook size={60} color="white"/>
      </a>

         {/* Right Triangle (GitHub) */}
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.triangle} ${styles.right}`}
      >
        <FaGithub size={60}  color="white"/>
      </a>
    </motion.div>
    <Wave></Wave>
    </div>
  );
};

export default AboutUs;
