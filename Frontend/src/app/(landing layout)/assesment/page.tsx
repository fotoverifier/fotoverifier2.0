"use client"
import React, { useState } from 'react'
import "@/app/(landing layout)/assesment/assesment.css"

import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({subsets: ["latin"]});
const Assesment = () => {
 const [activeTab, setActiveTab] = useState('General');

  
  return (
    <div className='home-container'>
      <div className='home-first-half'>
        <div className='image-container'> 
            <div className='change-image-section'>  </div>
            <div className='horizontal-line'> </div>
            <div className='show-container'>

            </div>
                <div className='horizontal-line'> </div>
            <div className='show-container'>


            </div>
        </div>
      </div>
      <div className='home-first-half flex-col'>
          <div className= {`title-container  ${montserrat.className}`}> Assess by your self</div>
        <div className={`result-container ${montserrat.className}`}>
             <div className="tab-area font-bold">
                <button
                className={activeTab === 'General' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('General')}
                >
                General Result
                </button>
                <div className='vertical-line'></div>
                <button
                className={activeTab === 'Reversed' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('Reversed')}
                >
                Reversed Image
                </button>
            </div>

       <div className="content-area">
        {activeTab === 'General' ?
        <div className='w-full h-full flex flex-col justify-evenly'>
         <div className='show-container'>
            Classification
        </div>
        <div className='horizontal-line'></div>
        <div className='show-container'>
            Probability Breakdown
        </div>
        </div>
         :
            <div>Reversed Image Content
                
        </div>}
      </div>
        </div>
        </div>
    </div>
  );
};

export default Assesment