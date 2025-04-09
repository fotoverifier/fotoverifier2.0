'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/(landing layout)/home/home.module.css';
import { TbExchange } from 'react-icons/tb';
import { GoLink } from 'react-icons/go';
import { IoImagesOutline } from 'react-icons/io5';
import Card from '@/components/card/card';
import { useLanguage } from '@/context/LanguageContext';
import VerificationStepsAnimation from '@/components/5steps/VerificationStepsAnimation';
import FloatingFlippingImage from '@/components/flipping_img/flipping_img';

const LandingPage2 = () => {
  const { t } = useLanguage();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [url, setUrl] = useState('');

  const imageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImg = () => setImageSrc(null);

  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let isMounted = true;
    setDisplayedText('');

    t('quickly_verify')
      .split('')
      .forEach((char, index) => {
        setTimeout(() => {
          if (isMounted) {
            setDisplayedText((prev) => prev + char);
          }
        }, index * 50);
      });

    return () => {
      isMounted = false;
    };
  }, [t]);

  return (
    <div className={styles.container}>
      <div className={styles.header}></div>
      <motion.main
        className={styles.content}
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.3 } },
        }}
      >
        <motion.div
          className={styles.text_section}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className={styles.headline}>
            <span className={styles.bold_text}>{t('image_verification')} </span>
            {t('engaging_way')}
          </h1>
          <p className={`${styles.description}`}>{displayedText}</p>
          <motion.div
            className={styles.cta_button}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            {t('verify_now')}
          </motion.div>
          <VerificationStepsAnimation className={styles.verification} />
        </motion.div>

        <motion.div
          className={styles.visual_section}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className={styles.upload_fcontainer}>
            <div className={styles.upload_scontainer}>
              <motion.div
                className={styles.title_container}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div>{t('image_reliability_question')}</div>
                <div className={styles.subtext}>
                  {t('image_verification_subtext')}
                </div>
              </motion.div>

              {isEditing ? (
                <textarea
                  className={styles.findbyurl_input}
                  placeholder={t('image_url_placeholder')}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onBlur={() => setIsEditing(url.trim() !== '')}
                  autoFocus
                />
              ) : (
                <div
                  className={styles.findbyurl_container}
                  onClick={() => setIsEditing(true)}
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all mr-5">
                    <GoLink className="w-4 h-4" />
                  </div>
                  {t('find_by_url_button')}
                </div>
              )}

              <div className={styles.input_image}>
                {!imageSrc ? (
                  <div className={styles.viewer}>
                    <input
                      type="file"
                      id="file-upload"
                      accept="image/*"
                      onChange={imageChange}
                      style={{ display: 'none' }}
                    />
                    <label
                      htmlFor="file-upload"
                      className={styles.custom_file_upload}
                    >
                      <Card
                        icon={IoImagesOutline}
                        description={t('Choose your image')}
                      />
                    </label>
                  </div>
                ) : (
                  <>
                    <div className={styles.image_control}>
                      <div className={styles.change_text}>
                        Change your image
                      </div>
                      <div onClick={removeImg}>
                        <TbExchange size={20} />
                      </div>
                    </div>
                    <hr className={styles.separator} />
                    <div className={styles.image_preview_container}>
                      <Image
                        src={imageSrc}
                        alt="Preview"
                        className={styles.image_preview}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{
                          width: 'auto',
                          maxWidth: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          position: 'relative',
                        }}
                      />
                    </div>
                  </>
                )}
              </div>

              <motion.div
                className={styles.verify_agree_container}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <Link href="/result" className={styles.verify_button}>
                  {t('verify_now')}
                </Link>
                <div className={styles.agree_section}>
                  {t('terms_agreement_text')}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default LandingPage2;
