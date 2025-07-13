// CompletionModal.tsx
import React from 'react';
import styles from '@/styles/completion_modal.module.css';
import { useLanguage } from '@/context/LanguageContext';

interface CompletionModalProps {
  message?: string;
}

const CompletionModal: React.FC<CompletionModalProps> = ({
  message = 'Upload Complete!',
}) => {
  const {t} = useLanguage();
  return (
    <div className={styles.modal}>
      <div className="w-fit h-fit bg-white p-5 rounded-md flex flex-col items-center">
        <div className="text-black">{t('upload_complete')}</div>
        <div className={styles.resultButton}>{t('go_to_result_page')}</div>
      </div>
    </div>
  );
};

export default CompletionModal;
