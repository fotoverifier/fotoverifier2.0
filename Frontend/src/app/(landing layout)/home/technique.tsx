"use client";
import React from "react";
import Image from "next/image";
import styles from "./technique.module.css";
import { Poppins } from "next/font/google";
import { motion } from "framer-motion";

const poppins = Poppins({
  subsets: ['latin'],
  weight: '700',
});
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const featureVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index: any) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: index * 0.2, ease: "easeOut" },
  }),
};


const LibraryPage = () => {
   const features = [
    {
      title: "Forensic Clarity for Everyone",
      description:
        "Designed for both experts and beginners, with a perfect balance of technical precision and easy-to-understand insights.",
      imgSrc: "/books/workspace.png",
    },
    {
      title: "Seamless & Smart Navigation",
      description:
        "Effortlessly explore forensic tools with our intuitive interface—fast, frustration-free, and designed for instant verification",
      imgSrc: "/books/handoff.png",
    },
    {
      title: "Your Forensic Knowledge Hub",
      description:
        "Instantly access a rich forensic glossary, ensuring every term is clear, precise, and easy to understand for all users.",
      imgSrc: "/books/design.png",
    },
  ];

  return (
    <>
    <div className={styles.container}>
          <motion.div
        className={styles.featureContainer}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ amount: 0.2 }} // Re-triggers when 20% of the element is visible
      >
        <div className={styles.hero}>
          <h1 className={`${styles.title} ${poppins.className}`}>
            Forensic Accuracy, Digital Trust <br />
            Powered by{" "}
            <span className={`text-red-300 ${styles.fotoverification}`}>
              Fotoverification
            </span>
          </h1>

          <div className={styles.badgeContainer}>
            <span className={`${styles.badge} ${styles.developer}`}>
              Developers
            </span>
            <span className={`${styles.badge} ${styles.designer}`}>
              Designers
            </span>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className={styles.featureContainer}
        initial="hidden"
        whileInView="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.3 } }, // Stagger animation for smooth effect
        }}
        viewport={{ amount: 0.2 }} // Re-trigger when scrolled back into view
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={styles.card}
            variants={featureVariants}
            custom={index} // Pass index for staggered animation
          >
            <div className={styles.imageContainer}>
              <Image
                src={feature.imgSrc}
                alt={feature.title}
                width={250}
                height={150}
              />
            </div>
            <h3 className={styles.cardTitle}>{feature.title}</h3>
            <p className={styles.cardDescription}>{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Call-to-Action Section */}
      <motion.div
        className={styles.ctaContainer}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        viewport={{ amount: 0.2 }} // Re-triggers when 20% of the element is in view
      >
        <button className={styles.ctaButton}>View all features</button>
      </motion.div>
    </div>
    </>
  );
};

export default LibraryPage;
