'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { ImEnlarge } from 'react-icons/im';
import { FaCloudUploadAlt } from 'react-icons/fa';

import styles from '@/app/(specialized layout)/specialized/image_ss/image_ss.module.css';
import metadata from '@/assets/metadata.png';
import ImageMagnifier from '@/components/magnifier/image_mag';

const inter = Inter({ subsets: ['latin'] });

const Specialized_SS = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result as string);
    
        setEnhancedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-full w-full bg-white">
      <div className={styles.helper_title}>
          <div
            className={`${inter.className} flex items-center h-fit w-fit p-2 rounded-full border-2 border-green-800 font-bold text-xl`}
          >
            <div className={`${styles.circle} mr-4`}>
              <ImEnlarge />
            </div>
            Image Super Resolution
          </div>
        </div>
        <div className='flex'>
      <div className={styles.home_first_half}>
        
        
        <div className={styles.image_container}>
          <div className={styles.change_image_section}>
            <label 
              htmlFor="image-upload" 
              className="flex flex-col items-center justify-center cursor-pointer p-4 border-2 border-dashed rounded-lg"
            >
              <FaCloudUploadAlt className="text-4xl text-gray-600 mb-2" />
              <span className="text-gray-600">
                {originalImage ? 'Change Image' : 'Upload Image'}
              </span>
              <input 
                type="file" 
                id="image-upload"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          
          <div className={styles.horizontal_line}></div>
          
          <div className={styles.show_container}>
            {originalImage && (
              <div className={styles.image_wrapper}>
                <Image 
                  src={originalImage} 
                  alt="Original Image" 
                  width={300} 
                  height={300} 
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Second Half - Image Magnification */}
      <div className={styles.home_second_half}>
        <div className={`${styles.helper_title} p-2 flex flex-col`}>
          <div className={`${inter.className}`}>Image Magnification</div>
          <div className={`${inter.className} text-sm font-semibold`}>
            Explore image details with our interactive magnification tool.
          </div>
        </div>

        <div className={styles.image_container}>
          <div className={styles.change_image_section}>
            Enhanced Image
          </div>
          
          <div className={styles.horizontal_line}></div>
          
          <div className={styles.show_container}>
            {enhancedImage ? (
              <>
                <div className={styles.image_wrapper}>
                  <Image 
                    src={enhancedImage} 
                    alt="Enhanced Image" 
                    width={300} 
                    height={300} 
                    className="object-contain"
                  />
                </div>
                <div className={styles.image_wrapper}>
                  <ImageMagnifier src={enhancedImage} />
                </div>
              </>
            ) : (
              <div className="text-gray-500 text-center p-4">
                Upload an image to enable magnification
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Specialized_SS;