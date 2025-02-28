import React, { useState } from "react";
import styles from "./feedback_modal.module.css";
import { FcFeedback } from "react-icons/fc";
import Rating from "@/components/Rating/rating";
import { Inter, Montserrat } from "next/font/google";
import ShinyButton from "@/components/button/shiny_button/shiny_button";
import { IoIosCloseCircle } from "react-icons/io";

const montserrat = Montserrat({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

interface FeedBackModalProps {
  message?: string;
  closeModal: () => void;
}

const FeedBackModal: React.FC<FeedBackModalProps> = ({
  message = "Upload Complete!",
  closeModal,
}) => {
  const [feedback, setFeedback] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className={styles.backdrop} onClick={closeModal}></div>
  <div className={`${styles.modal} ${isExpanded ? styles.expandedModal : ""}`}>
    <div className={styles.modalHeader}>
      <FcFeedback size={30} />
      <div className={styles.title}>Feedback</div>
      <div className={styles.detailButton} onClick={toggleExpand}>
        {isExpanded ? "Less Details" : "More Details"}
      </div>
      <div className={styles.closeIcon} onClick={closeModal}>
        <IoIosCloseCircle size={30} />
      </div>
    </div>
    <div className={styles.dash}></div>
    <div className={styles.subHeader}>How would you grade your experience with our app</div>
    <Rating />
    {isExpanded && (
      <>
        <div className={styles.subHeader}>Rate UI</div>
        <Rating />
        <div className={styles.subHeader}>Rate UX</div>
        <Rating />
        <div className={styles.subHeader}>Verification Score</div>
        <Rating />
      </>
    )}
    <div className={styles.subHeader}>Your feedback</div>
    <textarea
      className={styles.textInput}
      placeholder="Write your feedback here..."
      value={feedback}
      onChange={(e) => setFeedback(e.target.value)}
    />
    <div className={styles.buttonContainer}>
      Send
    </div>
  </div>
    </>
  );
};

export default FeedBackModal;
