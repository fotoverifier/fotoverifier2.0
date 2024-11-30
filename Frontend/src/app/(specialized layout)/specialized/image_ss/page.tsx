import React from 'react'
import styles from "@/app/(specialized layout)/specialized/image_ss/image_ss.module.css"
import { Inter } from 'next/font/google'
import metadata from "@/assets/metadata.png"
import Image from 'next/image'
import ImageMagnifier from '@/components/image_mag'
import { ImEnlarge } from 'react-icons/im'

const inter = Inter({subsets: ["latin"]});
const Specialized_SS = () => {
  return (
    <div className='h-full w-full bg-white flex'>
     <div className={styles.home_first_half}>
        <div className={styles.helper_title}>
          <div className={`${inter.className} flex items-center`}> 
            <div className={`${styles.circle} mr-4 `}> <ImEnlarge /></div>
            Image Enhancement</div>
          </div>
      <div className={styles.image_container}>
        <div className={styles.change_image_section}>
          Input image
        </div>
        <div className={styles.horizontal_line}></div>
        <div className={styles.show_container}>

        </div>
      </div>
    </div>
    <div className={styles.home_second_half}>
        <div className={`${styles.helper_title} p-2 flex flex-col`}>
          <div className={`${inter.className}`}> Image Upscaling</div>
          <div className={`${inter.className} text-sm font-semibold`}>
            Upscaling resolution is the process of increasing an image`s dimensions and pixel density to improve its quality and clarity. </div>
          </div>

        <div className={styles.image_container}>
        <div className={styles.change_image_section}>
        </div>
        <div className={styles.horizontal_line}></div>
       <div className={styles.show_container}>
          <div className={styles.image_wrapper}>
            <Image src={metadata}  alt="" id="myimage" /> 
          </div>
        </div>
      <div className={styles.show_container}>
                  <div className={styles.image_wrapper}>
          <ImageMagnifier
        src= {metadata.src}
      />
      </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Specialized_SS