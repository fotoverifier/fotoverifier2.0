// CompletionModal.tsx
import React from 'react';
import styles from '@/styles/completion_modal.module.css';

interface CompletionModalProps {
  message?: string;
}

const CompletionModal: React.FC<CompletionModalProps> = ({
  message = 'Upload Complete!',
}) => {
  return (
    <div className={styles.modal}>
      <div className="w-fit h-fit bg-white p-5 rounded-md flex flex-col items-center">
        <div className="text-black">{message}</div>
        <div className={styles.resultButton}>Go to result page</div>
      </div>
    </div>
  );
};

export default CompletionModal;
