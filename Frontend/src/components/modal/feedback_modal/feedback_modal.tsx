import React, { useState } from 'react';
import styles from './feedback_modal.module.css';
import { MdFeedback, MdLink } from 'react-icons/md';
import { IoIosCloseCircle } from 'react-icons/io';
import { MdOutlineDesignServices, MdOutlineVerifiedUser } from 'react-icons/md';
import { BiUser } from 'react-icons/bi';
import CircleRating from '@/components/Rating/rating_circle';

const predefinedFeedback = [
  'UI is sleek',
  'UI needs improvement',
  'Great UX',
  'UX is confusing',
  'Fast and responsive',
  'Bugs need fixing',
  'Love the design',
  'More features needed',
];

interface FeedBackModalProps {
  closeModal: () => void;
}

const FeedBackModal: React.FC<FeedBackModalProps> = ({ closeModal }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [rating, setRating] = useState<number | null>(null);
  const [uiRating, setUiRating] = useState<number | null>(null);
  const [uxRating, setUxRating] = useState<number | null>(null);
  const [verificationRating, setVerificationRating] = useState<number | null>(
    null
  );

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

      <div
        className={`${styles.modal} ${isExpanded ? styles.expandedModal : ''}`}
      >
        <div className={styles.modalLeft}>
          <div className={styles.modalHeader}>
            <MdFeedback size={30} />
            <div className={styles.title}>Feedback</div>
          
            <div className={styles.closeIcon} onClick={closeModal}>
              <IoIosCloseCircle size={30} />
            </div>
          </div>

          <div className={styles.dash}></div>

          <div className={styles.subHeader}>
            <MdOutlineDesignServices size={20} />
            How would you grade your experience?
          </div>
          <CircleRating onSelect={setRating} />


            <div className={styles.subHeader}>
            <MdLink size={20} />
              Thank you for using our app, please fill this google form
          </div>

          <div className="w-full p-4 bg-gray-100 border border-gray-200 rounded-lg mt-2 flex items-center justify-between">
            <span className="text-gray-700 text-sm">
              Click this link to get to Google Form
            </span>
            <a 
              href="https://forms.gle/yourGoogleFormLink" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium"
            >
              Open Form
            </a>
          </div>
          

          </div>
          </div>
    </>
  );
};

export default FeedBackModal;
