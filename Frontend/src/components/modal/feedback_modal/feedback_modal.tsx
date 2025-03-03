import React, { useState } from "react";
import styles from "./feedback_modal.module.css";
import { MdFeedback } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { MdOutlineDesignServices, MdOutlineVerifiedUser } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import CircleRating from "@/components/Rating/rating_circle";

const predefinedFeedback = [
  "UI is sleek",
  "UI needs improvement",
  "Great UX",
  "UX is confusing",
  "Fast and responsive",
  "Bugs need fixing",
  "Love the design",
  "More features needed",
];

interface FeedBackModalProps {
  closeModal: () => void;
}

const FeedBackModal: React.FC<FeedBackModalProps> = ({ closeModal }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [feedback, setFeedback] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [rating, setRating] = useState<number | null>(null);
  const [uiRating, setUiRating] = useState<number | null>(null);
  const [uxRating, setUxRating] = useState<number | null>(null);
  const [verificationRating, setVerificationRating] = useState<number | null>(null);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setUploadedImages((prev) => [...prev, ...filesArray]);
    }
  };

  return (
    <>
      <div className={styles.backdrop} onClick={closeModal}></div>

      <div className={`${styles.modal} ${isExpanded ? styles.expandedModal : ""}`}>
        <div className={styles.modalLeft}>
          <div className={styles.modalHeader}>
            <MdFeedback size={30} />
            <div className={styles.title}>Feedback</div>
            <div className={styles.detailButton} onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "Less Details" : "More Details"}
            </div>
            <div className={styles.closeIcon} onClick={closeModal}>
              <IoIosCloseCircle size={30} />
            </div>
          </div>

          <div className={styles.dash}></div>

          {/* Overall Experince */}
          <div className={styles.subHeader}>
            <MdFeedback size={20} />
            How would you grade your experience?
          </div>
          <CircleRating onSelect={setRating} />

          {isExpanded && (
            <>
              {/* UI Rating */}
              <div className={styles.subHeader}>
                <MdOutlineDesignServices size={20} />
                Rate UI
              </div>
              <CircleRating onSelect={setUiRating} />

              {/* UX Rating */}
              <div className={styles.subHeader}>
                <BiUser size={20} />
                Rate UX
              </div>
              <CircleRating onSelect={setUxRating} />

              {/* Verification Score */}
              <div className={styles.subHeader}>
                <MdOutlineVerifiedUser size={20} />
                Verification Score
              </div>
              <CircleRating onSelect={setVerificationRating} />
            </>
          )}

          {/* Predefined Feedback Tags */}
          <div className={styles.subHeader}>
            <MdFeedback size={20} />
            Your Feedback
          </div>

          <div className={styles.feedbackTags}>
            {predefinedFeedback.map((tag) => (
              <div
                key={tag}
                className={`${styles.feedbackTag} ${
                  selectedTags.includes(tag) ? styles.selected : ""
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </div>
            ))}
          </div>
          <div className={styles.resultButton}>
            Send
          </div>
        </div>

        {isExpanded && (
          <div className={styles.modalRight}>
            <div className={styles.modalHeader}>
            <div className={styles.title}> Fotoverifier</div>
       
            <div className={styles.closeIcon} onClick={closeModal}>
              <IoIosCloseCircle size={30} />
            </div>
          </div>

          <div className={styles.dash}></div>
            <textarea
              className={styles.textInput}
              placeholder="Write additional feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            {/* Image Upload Section */}
            <label htmlFor="imageUpload" className={styles.imageUpload}>
              Click to Upload Images
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                multiple
                hidden
                onChange={handleImageUpload}
              />
            </label>

            {/* Display Uploaded Images */}
            {uploadedImages.length > 0 && (
              <div className={styles.uploadedImages}>
                {uploadedImages.map((imgSrc, index) => (
                  <img key={index} src={imgSrc} alt="Uploaded" />
                ))}
              </div>
            )}
                      <div className={styles.resultButton}>
            Send
          </div>
          </div>
          
        )}
        
      </div>
    </>
  );
};

export default FeedBackModal;
