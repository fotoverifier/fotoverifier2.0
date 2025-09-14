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
import LoadingModal from '@/components/modal/loading_modal';
import CompletionModal from '@/components/modal/complete_modal';
import { toast } from 'react-toastify';
import { Montserrat } from 'next/font/google';
import ImageRepository from '@/components/button/image_repo_button/image_repo_button';
import { useImageUpload } from '@/context/imageUploadContext';

const montserrat = Montserrat({ subsets: ['latin'] });
const LandingPage2 = () => {
  const { t } = useLanguage();
  const [taskId, setTaskId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const { setFile } = useImageUpload();

  const [selectedMethod, setSelectedMethod] = useState<string>('normal'); // default method
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!imageFile) {
      alert('Please select an image before submitting.');
      return;
    }
    if (imageFile) {
      setLoading(true);
    }

    if (selectedMethod === 'normal') {
      try {
        const formData = new FormData();
        formData.append('file', imageFile);

        // Call the Next.js API route (runtime env resolved on server)
        const response = await fetch('/api/proxy/quick-scan', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const { task_id } = await response.json();
        setTaskId(task_id);
      } catch (error: any) {
        console.error('Error uploading:', error);
        alert(`Error: ${error.message}`);
      } finally {
        console.log('Upload complete');
        setUploadComplete(true);
        setLoading(false);
      }
    } else if (selectedMethod === 'deep') {
      try {
        const formData = new FormData();
        formData.append('image', imageFile);
        const response = await fetch('http://fotoverifier.eu:9001/api/image/', {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Image uploaded successfully:', data);
      } catch (error) {
        console.log('Error submitting image:', error);
        alert('There was an error submitting the image. Please try again.');
      } finally {
        console.log('Upload complete');
        setUploadComplete(true);
        setLoading(false);
      }
    } else if (selectedMethod === 'specialized') {
      alert('This method is currently in development.');
      setLoading(false);

      /*router.push(
        `/specialized/information?image=${encodeURIComponent(imageSrc)}`
      );
      try {
        const formData = new FormData();
        formData.append('image', imageFile);
        const urls = [
          'http://localhost:8000/api/exif-check/',
          'http://localhost:8000/api/recognize-objects/',
        ];

        const fetchPromises = urls.map((url) =>
          fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
              Accept: 'application/json',
            },
          })
        );

        const responses = await Promise.all(fetchPromises);

        const results = await Promise.all(
          responses.map((response) => response.json())
        );

        console.log('Results:', results);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        console.log('Upload complete');
        setUploadComplete(true);
        setLoading(false);
      }*/
    }
  };

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (
        file.type === 'image/png' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg'
      ) {
        setImageSrc(URL.createObjectURL(file));
        setImageFile(file);
      } else {
        toast.error('Please upload a valid image file (PNG, JPEG).', {
          theme: 'colored',
        });
      }
    }
  };

  const handleImageSelect = async (image: any) => {
    try {
      const response = await fetch(image.src);
      console.log('Response:', response);

      if (!response.ok) throw new Error('Image not found');

      const blob = await response.blob();
      const file = new File([blob], image.alt, { type: blob.type });
      const preview = URL.createObjectURL(file);
      setImageSrc(preview);
      setImageFile(file);
      setFile(file, preview);
    } catch (err) {
      console.error('Error converting image to file:', err);
    }
  };

  const removeImg = () => {
    setImageSrc(null);
    setImageFile(null);
  };

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
        className={`${styles.content} ${montserrat.className}}`}
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.3 } },
        }}
      >
        <motion.div
          className={` ${styles.text_section} ${montserrat.className}`}
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
            <Link href={'/dashboard'}>{t('explore_now')}</Link>
          </motion.div>
          <VerificationStepsAnimation className={styles.verification} />
        </motion.div>

        <motion.div
          className={`${styles.visual_section} ${montserrat.className}`}
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
                <ImageRepository onImageSelect={handleImageSelect} />
                {/*<div className={styles.subtext}>
                  {t('image_verification_subtext')}
                </div>*/}
              </motion.div>

              {/*{isEditing ? (
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
              )}*/}

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
                  <div className="h-full w-full border-2 border-dashed border-black rounded-lg p-4">
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
                        sizes="90vw"
                        style={{
                          width: 'auto',
                          maxWidth: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          position: 'relative',
                        }}
                      />
                    </div>
                    <hr className={styles.separator} />
                  </div>
                )}
              </div>

              <motion.div
                className={styles.verify_agree_container}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <div className={styles.verify_button} onClick={handleSubmit}>
                  {t('verify_now')}
                </div>
                {/*<div className={styles.agree_section}>
                  {t('terms_agreement_text')}
                </div>*/}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.main>
      {loading && <LoadingModal message={t('upload_uploading')} />}
      {!loading && uploadComplete && (
        <Link
          href={{
            pathname: '/result',
            query: {
              image: imageSrc,
              task_id: taskId,
            },
          }}
        >
          <CompletionModal message={t('upload_complete')} />
        </Link>
      )}
    </div>
  );
};

export default LandingPage2;
