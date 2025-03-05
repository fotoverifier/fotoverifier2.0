'use client';
import React, { useState } from 'react';
import styles from '@/app/(specialized layout)/specialized/dif-methods/Jpeg-ghost/jpeg.module.css';
import Image from 'next/image';
import jpg1 from '@/assets/jpg1.jpg';
import jpg2 from '@/assets/jpg2.jpg';
import { Inter } from 'next/font/google';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import { VscSymbolMethod } from 'react-icons/vsc';

interface Reference {
  title: string;
  url: string;
}

const inter = Inter({ subsets: ['latin'] });
const Specialized_DLA = () => {
  const [showExample, setShowExample] = useState(false);

  const toggleContent = () => {
    setShowExample((prevShowExample) => !prevShowExample);
  };

  const references: Reference[] = [
    { title: 'JPEG Ghost Analysis', url: 'https://example.com/jpeg-ghost' },
    {
      title: 'Image Forensics Techniques',
      url: 'https://example.com/image-forensics',
    },
    {
      title: 'Detecting Spliced Images',
      url: 'https://example.com/spliced-images',
    },
  ];

  return (
    <div className="h-full w-full">
      <div className={styles.tutorial_container}>
        <div className={styles.helper_title}>
          <div className={`${inter.className} flex items-center`}>
            <div className={`${styles.circle} mr-4 `}>
              {' '}
              <VscSymbolMethod></VscSymbolMethod>{' '}
            </div>
            JPEG Ghost
          </div>
        </div>
        <div className={`flex w-full h-full p-3 ${inter.className}`}>
          <button onClick={toggleContent} className={styles.custom_button}>
            {showExample ? (
              <>
                Show Definition <FaCaretLeft />
              </>
            ) : (
              <>
                Show Example <FaCaretRight />
              </>
            )}
          </button>
          {showExample ? (
            <div className={styles.tutorial_area}>
              <div className={styles.tutorial_image}>
                Input Picture
                <Image src={jpg1} alt="" />
              </div>
              <div className={styles.tutorial_image}>
                Output Picture
                <Image src={jpg2} alt="" />
              </div>
              <div className={styles.note}>
                Comment: A square in the middle of the image was cropped and
                saved with lower quality.
              </div>
            </div>
          ) : (
            <div className={styles.definition_area}>
              <div className="p-2 flex">
                {' '}
                <div className="font-bold mr-1 ">JPEG Ghost:</div> Detect
                spliced images based on the differences between several areas of
                the Color Filter Array{' '}
              </div>
              <div className={styles.horizontal_line}> </div>
              <div className="p-2 flex">
                {' '}
                <div className="font-bold "> Reference</div>{' '}
              </div>
              <ul className={styles.reference_list}>
                {references.map((ref, index) => (
                  <li key={index} className={styles.reference_item}>
                    <span className={styles.reference_number}>
                      {index + 1}.
                    </span>{' '}
                    {/* Adding the number */}
                    <a href={ref.url} target="_blank" rel="noopener noreferrer">
                      {ref.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className={styles.jpeghost_container}>
        <div className="w-1/2 h-full ml-5 flex items-center">
          <div className={styles.image_container}>
            <div className={styles.change_image_section}>Input image</div>
            <div className={styles.horizontal_line}></div>
            <div className={styles.show_container}></div>
          </div>
        </div>
        <div className="w-1/2 h-full flex items-center">
          <div className={styles.image_container}>
            <div className={styles.change_image_section}>JPEG Ghost</div>
            <div className={styles.horizontal_line}></div>
            <div className={styles.show_container}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specialized_DLA;
