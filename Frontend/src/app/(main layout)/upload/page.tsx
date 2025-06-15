'use client';
import React, { useState } from 'react';
import styles from '@/app/(main layout)/upload/upload.module.css';
import { TbExchange } from 'react-icons/tb';
import Image from 'next/image';
import { Montserrat, Inter, Poppins } from 'next/font/google';
import Method_Box from './itemgrid';
import { FaAngleDown } from 'react-icons/fa6';
import CompletionModal from '@/components/modal/complete_modal';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import { useLanguage } from '@/context/LanguageContext';
import LoadingModal from '@/components/modal/loading_modal';
import ImageRepository from '@/components/button/image_repo_button/image_repo_button';
import { useImageUpload } from '@/context/imageUploadContext';

const montserrat = Montserrat({
  subsets: ['latin'],
});
const inter = Montserrat({ subsets: ['latin'] });

const Upload = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [taskId, setTaskId] = useState<string>('');
  const [selectedMethod, setSelectedMethod] = useState<string>('normal');
  const { setFile } = useImageUpload();

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (
        file.type === 'image/png' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg'
      ) {
        const preview = URL.createObjectURL(file);
        setImageSrc(preview);
        setImageFile(file);
        setFile(file, preview);
      } else {
        toast.error('Please upload a valid image file (PNG, JPEG).', {
          theme: 'colored',
        });
      }
    }
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const fileType = file.type;
      if (fileType === 'image/png' || fileType === 'image/jpeg') {
        const preview = URL.createObjectURL(file);
        setImageSrc(preview);
        setImageFile(file);
        setFile(file, preview);
      } else {
        toast.error('Please upload a valid image file (PNG, JPEG).', {
          theme: 'colored',
        });
      }
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };
  const removeImg = () => {
    setImageSrc('');
    setImageFile(null);
    setFile(null, '');
    setImageUrl('');
  };

  const handleMethodSelect = (id: string) => {
    setSelectedMethod(id);
  };

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
        // Single API call wrapped in a Promise

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/quick-scan`,
          {
            method: 'POST',
            body: formData,
            headers: {
              Accept: 'application/json',
            },
          }
        );

        // Handle response
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const { task_id } = await response.json();
        setTaskId(task_id);
      } catch (error: any) {
        console.error('Error fetching data:', error);
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

  const handleImageUrlSubmit = async () => {
    if (!imageUrl) {
      removeImg();
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('Image could not be fetched');

      const blob = await response.blob();
      const fileType = blob.type;

      if (fileType === 'image/png' || fileType === 'image/jpeg') {
        const fileName = imageUrl.split('/').pop() || 'downloaded_image';
        const file = new File([blob], fileName, { type: fileType });
        const preview = URL.createObjectURL(file);
        setImageSrc(preview);
        setImageFile(file);
        setFile(file, preview);
      } else {
        toast.error('Please provide a valid image URL (PNG or JPEG).', {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.error('Invalid image URL:', error);
      toast.error('Unable to load image from URL.', {
        theme: 'colored',
      });
    } finally {
      setLoading(false); // ✅ Hide loading modal
    }
  };

  return (
    <div className={styles.main_up_container}>
      <div className={styles.seven_up_container}>
        <div className="w-full h-full ml-10">
          <div className={styles.helper_title}>
            <div className={`${inter.className} flex items-center`}>
              <div className={`${styles.circle} mr-4`}>1.</div>
              {t('upload_photo_input')}
            </div>

            <ImageRepository onImageSelect={handleImageSelect} />
          </div>
          <div className={styles.input_link}>
            <input
              type="text"
              placeholder={t('upload_input_link')}
              className={`ml-2 ${inter.className}`}
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              onBlur={handleImageUrlSubmit}
            />
          </div>
          <div className={styles.helper_title}>
            <div className={styles.spec_helper_2}>
              <div className={`${inter.className}`}>
                {t('upload_suitable_size')}{' '}
                <span style={{ color: 'red' }}>25MB</span>
              </div>
            </div>
            <div className={styles.spec_helper}>
              <div className={inter.className}>
                {t('upload_type')}{' '}
                <span style={{ color: 'red' }}>PNG, JPEG</span>
              </div>
            </div>
          </div>
          <div className={styles.input_image}>
            {!imageSrc ? (
              <div
                className={styles.viewer}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <input
                  type="file"
                  id="file-upload"
                  accept="image/*"
                  onChange={imageChange}
                  style={{ display: 'none' }}
                />
                <label
                  htmlFor="file-upload"
                  className={`${styles.custom_file_upload} ${inter.className}`}
                >
                  {t('upload_choose_files')}
                </label>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-end p-2 h-[10%]">
                  <span className={`mr-2 ${inter.className} font-bold`}>
                    {t('upload_change_image')}
                  </span>
                  <button onClick={removeImg} aria-label="Change image">
                    <TbExchange size={20} />
                  </button>
                </div>

                <hr className="separator" />

                <div className="flex items-center justify-center relative p-2 w-full h-[90%]">
                  <Image
                    src={imageSrc}
                    alt="Preview"
                    className="image-preview"
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
        </div>
      </div>
      <div className={styles.three_up_container}>
        <div className={styles.helper_title}>
          <div className={`${inter.className} flex items-center`}>
            <div className={`${styles.circle} mr-4`}>2.</div>
            {t('upload_scanning_mode')}
          </div>
        </div>
        <div className={`${styles.choice_container} font-semibold`}>
          <Method_Box
            id="normal"
            label={t('upload_quick_scan')}
            isSelected={selectedMethod === 'normal'}
            onSelect={handleMethodSelect}
            duration="< 1 minute"
          />
        </div>
        <div className={styles.space}></div>
        <div className={`${styles.choice_container} font-semibold`}>
          <Method_Box
            id="specialized"
            label={t('upload_scan_by_yourself')}
            isSelected={selectedMethod === 'specialized'}
            onSelect={handleMethodSelect}
            duration="Specialized mode"
          />
        </div>
        <div className={styles.space}></div>
        <div className={styles.word_container}>
          <div className={`${montserrat.className} ${styles.word_container2}`}>
            <FaAngleDown className="mr-5" />
            {t('upload_specialized_mode_note')}
          </div>
        </div>
        <div
          className={`${styles.verify_agree_container} ml-5 ${montserrat.className} font-bold mt-5`}
        >
          <div className={styles.button_2} onClick={handleSubmit}>
            {t('upload_verify')}
          </div>
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
      </div>
      <ToastContainer />
    </div>
  );
};

export default Upload;
