// CompletionModal.tsx
import React from "react";
import styles from "@/styles/completion_modal.module.css";

interface CompletionModalProps {
  message?: string;
}

const CompletionModal: React.FC<CompletionModalProps> = ({ 
  message = "Upload Complete!"
}) => {
  return (
    <div className={styles.modal}>
      <p>{message}</p>
      <button className={styles.resultButton}>
        Go to result page
      </button>
    </div>
  );
};

export default CompletionModal;
