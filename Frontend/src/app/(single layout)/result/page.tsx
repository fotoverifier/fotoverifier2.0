import React from 'react'
import "@/app/(single layout)/result/result.css"
import Image_Result from './image'
import MetaData_Result from './metadata'
const result = () => {
  return (
    <>
    <div className="Top-container"> 
        <div className='Confident-score-container'> The confident score: </div>
        <div className='vertical-space'></div>
        <div className='General-report-container'>xx</div>
         </div>
    <div className='Content-container'>
    <div className = "Half-content-container">
    <div className='Result-container'> 
        <Image_Result/>
    </div>
    <div className='Result-container'>  
        <MetaData_Result/> 
    </div>
    <div className='Result-container'> xxz</div>
    </div>
    <div className = "Half-content-container">
    <div className='Result-container'> abc</div>
    <div className='Result-container'> bab</div>
    <div className='Result-container'> xxz</div>


    </div>
    </div>
    </>
  )
}

export default result   