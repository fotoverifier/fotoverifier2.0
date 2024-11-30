import React from 'react'
import styles from "@/app/(specialized layout)/specialized/image_ss/image_ss.module.css"
import { Inter } from 'next/font/google'
import { ImEnlarge } from 'react-icons/im'
import { CiLight } from 'react-icons/ci'
const inter = Inter({subsets: ["latin"]})
const Specialized_Reflect = () => {
  return (
     <div className='h-full w-full bg-white flex'>
     <div className={styles.home_first_half}>
        <div className={styles.helper_title}>
          <div className={`${inter.className} flex items-center`}> 
            <div className={`${styles.circle} mr-4 `}> <CiLight /></div>
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
      </div>
      </div>
  )
}

export default Specialized_Reflect