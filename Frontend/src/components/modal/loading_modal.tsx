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
      <div className={styles.spinner}></div>
      <p>{message}</p>
    </div>
  );
};

export default LoadingModal;
