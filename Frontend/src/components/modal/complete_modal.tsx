// CompletionModal.tsx
import React from "react";
import styles from "@/styles/completion_modal.module.css";

interface CompletionModalProps {
  message?: string;
  onGoToResult: () => void;
}

const CompletionModal: React.FC<CompletionModalProps> = ({ 
  message = "Upload Complete!", 
  onGoToResult 
}) => {
  return (
    <div className={styles.modal}>
      <p>{message}</p>
      <button onClick={onGoToResult} className={styles.resultButton}>
        Go to result page
      </button>
    </div>
  );
};

export default CompletionModal;
