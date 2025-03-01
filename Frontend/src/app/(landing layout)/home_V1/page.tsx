'use client';
import React, { useState } from 'react';
import './home.css';
import LandingBanner from '@/components/landing_banner';
import { FaArrowRightLong, FaFileSignature, FaMagnifyingGlass } from 'react-icons/fa6';
import Link from 'next/link';
import Image from 'next/image';
import Detail from '@/assets/Group_29.svg';
import { Inter, Montserrat, Inconsolata, Poppins } from 'next/font/google';
import pattern from '@/assets/Group 12.svg';
import { TbExchange } from 'react-icons/tb';
import Card from '@/components/card/card';
import { BiMessageAltError } from 'react-icons/bi';
import ShinyButton from '@/components/button/shiny_button/shiny_button';
import FeedBackModal from '@/components/modal/feedback_modal/feedback_modal';
const poppins = Poppins({
  subsets: ['latin'],
  weight: '700',
});
const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'] });
const incon = Inconsolata({ subsets: ['latin'] });
const Home_V1 = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [imageSrc, setImageSrc] = React.useState('');
  const [openModal, setModalOpen] = React.useState(false);

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileURL = URL.createObjectURL(file);
      setImageSrc(fileURL);
    }
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setImageSrc(URL.createObjectURL(e.dataTransfer.files[0]));
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };
  const removeImg = () => {
    setImageSrc('');
  };

  return (
    <div className="w-full h-full">
      <div className="home-container">
        <div className="home-first-half flex-col">
          <div className="home-fh-container justify-between">
            <div className='w-full h-fit rounded-lg border-2 p-5 bg-white mb-10'>
            <div
              className={`home-fh-container-title ${montserrat.className} font-bold`}
            >
              A reliable multimedia verification tool{' '}
            </div>
            <div
              className={`home-fh-container-description  ${montserrat.className}`}
            >
              Quickly verify the integrity of photos or videos with a vast array
              of advanced algorithms and 5 steps approach
            </div>
             </div>
            <div
              className={`${incon.className}`}
            >
                  <ShinyButton title='For detail Assesment'></ShinyButton>
            </div>
        
            <div className={`flex w-full h-auto justify-between mt-14 ${incon.className}`}>
              <Card icon={FaMagnifyingGlass
              } description='Finding the potential source'></Card>
                        <Card icon={FaFileSignature } description='Leaked Signature? '></Card>
                                          <Card icon={BiMessageAltError
              } description='Is this image forgery? '></Card>

            </div>

           
              
          </div>
        </div>

        <div className="home-second-half">
          <div className="upload-fcontainer">
            <div className="upload-scontainer">
              <div className={`title-container flex`}>
                {' '}
                <div className={poppins.className}>
                  Is this image reliable?{' '}
                </div>
                <div className={`ml-4 ${incon.className}`}>
                  {' '}
                  How can we assess such image ?{' '}
                </div>
              </div>
              <div className={`findbyurl-container ${montserrat.className}`}>
                {' '}
                Find by URL
              </div>
              <div className="input-image">
                {!imageSrc && (
                  <div
                    className="viewer"
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
                      className={`custom-file-upload  ${montserrat.className}`}
                    >
                      Choose your file
                    </label>
                  </div>
                )}
                {imageSrc && (
                  <>
                    <div
                      className="flex items-center align-middle p-2 justify-center ml-auto"
                      style={{ height: '10%' }}
                    >
                      <div className={`mr-2 ${inter.className} font-bold`}>
                        Change your image
                      </div>
                      <button>
                        <TbExchange size={20} onClick={removeImg}></TbExchange>
                      </button>
                    </div>
                    <hr className="separator" />
                    <div
                      className="relative flex items-center justify-center p-2 w-full"
                      style={{ height: '90%' }}
                    >
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

              <div className={`verify-agree-container ${montserrat.className}`}>
                <Link href="/result2" className="button">
                  {' '}
                  Verify
                </Link>
                <div className="w-1/6"> </div>
                <div className="agree-section">
                  {' '}
                  I agree to the terms and conditions.{' '}
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home_V1;
