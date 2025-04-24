import React from 'react';
import styles from '@/styles/loading_modal.module.css';

interface LoadingModalProps {
  message?: string;
}

const LoadingModal: React.FC<LoadingModalProps> = ({
  message = 'Loading...',
}) => {
  return (
    <div className={styles.modal}>
      <div className="w-fit h-fit bg-white p-5 rounded-md flex flex-col items-center z-50">
        <div className={styles.spinner}></div>
        <div className="text-black">{message}</div>
      </div>
    </div>
  );
};

export default LoadingModal;
