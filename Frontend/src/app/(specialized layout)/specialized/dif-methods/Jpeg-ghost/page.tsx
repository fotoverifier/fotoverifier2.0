import React from 'react'
import styles from "@/app/(specialized layout)/specialized/dif-methods/Jpeg-ghost/jpeg.module.css"
import Image from 'next/image'
import metadata from "@/assets/metadata.png"
import ImageMagnifier from '@/components/image_mag'
import jpg1 from "@/assets/jpg1.jpg"
import jpg2 from "@/assets/jpg2.jpg"
const Specialized_dif_ghost = () => {
  return (
    <div className='h-screen w-full'>
      <div className={styles.tutorial_container}> 
        <div> JPEG Ghost: Detect spliced images based on the differences between several areas of the Color Filter Array </div>
        <div className={styles.tutorial_area}>
         <div>Example </div>
         <div className={styles.tutorial_image}> 
          <Image src={jpg1} alt ='' />
           </div>
         <div className={styles.tutorial_image}> 
            <Image src={jpg2} alt='' /> </div>
            <div className= {styles.note}> A square in the middle of the image was cropped and resave with a lower quality, although the image is visually identical, this technique can clearly show the tampered region.</div>
          </div>
      </div>
      
      <div className={styles.jpeghost_container}>
        <div className='w-1/2 h-full ml-5'>
     <div className={styles.image_container}>
        <div className={styles.change_image_section}>
          Input image
        </div>
        <div className={styles.horizontal_line}></div>
        <div className={styles.show_container}>

        </div>
      </div>
      </div>
      <div className='w-1/2 h-full'>
     <div className={styles.image_container}>
        <div className={styles.change_image_section}>
          JPEG Ghost
        </div>
        <div className={styles.horizontal_line}></div>
        <div className={styles.show_container}>

        </div>
      </div>
      </div>
      </div>
    </div>
  )
}

export default Specialized_dif_ghost