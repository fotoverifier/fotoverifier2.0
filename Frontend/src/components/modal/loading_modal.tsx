import React from 'react';
import styles from '@/styles/loading_modal.module.css';
import { useLanguage } from '@/context/LanguageContext';

interface LoadingModalProps {
  message?: string;
}

const LoadingModal: React.FC<LoadingModalProps> = ({
  message = 'Loading...',
}) => {
  const {t} = useLanguage();
  return (
    <div className={styles.modal}>
      <div className="w-fit h-fit bg-white p-5 rounded-md flex flex-col items-center">
        <div className={styles.spinner}></div>
        <div className="text-black">{t('upload_uploading')}</div>
      </div>
    </div>
  );
};

export default LoadingModal;
