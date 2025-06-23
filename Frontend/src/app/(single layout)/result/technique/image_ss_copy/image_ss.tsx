'use client';
import React, { useState } from 'react';
import styles from './image_ss.module.css';
import { IoGitNetworkOutline, IoImage, IoImageSharp } from 'react-icons/io5';
import { Inter, Montserrat } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import MagnifierImage from './maginifier_image';
import { MdCameraEnhance } from 'react-icons/md';
import { FiImage } from 'react-icons/fi';
import NoImagePlaceholder from '@/components/exception_component/NoImagePlaceholder';
import Loadable from 'next/dist/shared/lib/loadable.shared-runtime';
import LoadingOverlay from '@/components/loading/loadinganimation';
import { GiDividedSquare, GiNoseSide } from 'react-icons/gi';
import { BsNoiseReduction } from 'react-icons/bs';
import { BiColor } from 'react-icons/bi';
import A from '@/assets/Frame 15.svg';
import B from '@/assets/Group 12.svg';
import C from '@/assets/Group 79.svg';
import D from '@/assets/Tutorial.svg';
import {
  CFAMethod,
  ComputerVisionAlgoResult,
  DenoiseMethod,
  EdgeMethod,
} from '@/interface/interface';
const montserrat = Montserrat({ subsets: ['latin'] });
interface ImageSuperResolutionProps {
  previewUrl: string | null;
  handleEnhance: (upscaleFactor: string) => Promise<void>;
  superResolutionResult: string | null;
  loading: boolean;
  cvaResult: ComputerVisionAlgoResult;
}
const ImageSuperResolution_2 = ({
  previewUrl,
  handleEnhance,
  superResolutionResult,
  loading,
  cvaResult,
}: ImageSuperResolutionProps) => {
  const { t } = useLanguage();
  const [upscaleFactor, setUpscaleFactor] = useState('4x');
  const [cfaMethod, setCFAMethod] = useState<CFAMethod>('Menon');
  const [edgeMethod, setEdgeMethod] = useState<EdgeMethod>('Canny');
  const [denoiseMethod, setDenoiseMethod] =
    useState<DenoiseMethod>('Bilateral');

  const [modelType, setModelType] = useState('ESRGAN');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const handleUpscaleFactorChange = (factor: string) => {
    setUpscaleFactor(factor);
  };

  const handleModelTypeChange = (type: string) => {
    setModelType(type);
  };

  const handleReset = () => {
    setUpscaleFactor('4x');
    setModelType('ESRGAN');
  };

  const [activeTab, setActiveTab] = useState<
    'Computer Vision Algorithm' | 'AI Upscale'
  >('Computer Vision Algorithm');

  return (
    <div className={`${styles.container} ${montserrat.className} font-bold`}>
      <div className="flex justify-between items-center mb-4 border-b border-gray-300">
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 font-semibold rounded-t-xl ${
              activeTab === 'Computer Vision Algorithm'
                ? 'border-b-2 border-teal-800 text-white bg-teal-600'
                : 'text-gray-500 bg-gray-100'
            }`}
            onClick={() => setActiveTab('Computer Vision Algorithm')}
          >
            {t('Computer_Vision_Algorithm')}
          </button>
          <button
            className={`px-4 py-2 font-semibold rounded-t-xl ${
              activeTab === 'AI Upscale'
                ? 'border-b-2 border-teal-800 text-white bg-teal-600'
                : 'text-gray-500 bg-gray-100'
            }`}
            onClick={() => setActiveTab('AI Upscale')}
          >
            {t('AI_Upscale')}
          </button>
        </div>

        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-t-lg w-fit border-yellow-800 border-b-2 text-right">
          {activeTab === 'Computer Vision Algorithm' ? (
            <p>
              Traditional computer vision methods provide consistent and
              interpretable results.
            </p>
          ) : (
            <p>
              AI upscaling leverages deep learning to intelligently restore and
              enhance image details.
            </p>
          )}
        </div>
      </div>
      {activeTab === 'Computer Vision Algorithm' && (
        <div className={styles.content_area}>
          <div id="SS_CFA" className={styles.section}>
            <div className={styles.section_header}>
              <div className={styles.circle_secondary}>
                <BiColor />
              </div>
              <h2 className={`${styles.section_title} ${montserrat.className}`}>
                Color Filter Array (CFA)
              </h2>
            </div>

            <MethodSelector
              title="Method"
              methods={['Menon', 'Malvar']}
              selectedMethod={cfaMethod}
              onChange={setCFAMethod}
            />

            <PreviewWithModal src={cvaResult.CFA[cfaMethod]} />
          </div>

          <div id="SS_Denoise" className={styles.section}>
            <div className={styles.section_header}>
              <div className={styles.circle_secondary}>
                <BsNoiseReduction />
              </div>
              <h2 className={`${styles.section_title} ${montserrat.className}`}>
                Salt and Pepper Denoise
              </h2>
            </div>

            <MethodSelector
              title="Method"
              methods={['Bilateral', 'Non-Local Means']}
              selectedMethod={denoiseMethod}
              onChange={setDenoiseMethod}
            />

            <PreviewWithModal src={cvaResult.Denoise[denoiseMethod]} />
          </div>

          <div id="SS_Edge" className={styles.section}>
            <div className={styles.section_header}>
              <div className={styles.circle_secondary}>
                <GiDividedSquare />
              </div>
              <h2 className={`${styles.section_title} ${montserrat.className}`}>
                Edge Detection
              </h2>
            </div>
            <MethodSelector
              title="Method"
              methods={['Canny', 'Marr-Hildreth']}
              selectedMethod={edgeMethod}
              onChange={setEdgeMethod}
            />

            <PreviewWithModal src={cvaResult.Edge[edgeMethod]} />
          </div>
          <div className="mt-3"></div>
        </div>
      )}
      {activeTab === 'AI Upscale' && (
        <div className={styles.content_area}>
          <div id="SS_ChangeFactor" className={styles.section}>
            <div className={styles.section_header}>
              <div className={styles.circle_secondary}>
                <IoGitNetworkOutline />
              </div>
              <h2 className={`${styles.section_title} ${montserrat.className}`}>
                {t('Resolution_Enhancement')}
              </h2>
            </div>

            <div className={styles.section_content}>
              <div className={styles.control_group_container}>
                <div className={`${styles.control_group} flex`}>
                  <label className={styles.control_label}>Upscale Factor</label>
                  <div className={styles.button_group}>
                    {['2x', '4x', '8x'].map((factor) => (
                      <button
                        key={factor}
                        className={`${styles.option_button} ${upscaleFactor === factor ? styles.active : ''}`}
                        onClick={() => handleUpscaleFactorChange(factor)}
                      >
                        {factor}
                      </button>
                    ))}
                    <button
                      onClick={handleReset}
                      className={styles.reset_button}
                    >
                      Reset All
                    </button>{' '}
                  </div>
                </div>

                <div className="my-4 border-t border-gray-300 w-full" />

                <div className={styles.control_group}>
                  <label className={styles.control_label}>Model Type</label>
                  <div className={styles.button_group}>
                    {['ESRGAN', 'SRCNN', 'EDSR ', 'RealESRGAN'].map((model) => (
                      <button
                        key={model}
                        className={`${styles.option_button} ${modelType === model ? styles.active : ''}`}
                        onClick={() => handleModelTypeChange(model)}
                      >
                        {model}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="my-4 border-t border-gray-300 w-full" />

                <div className="flex">
                  <button
                    className={styles.enhance_button}
                    onClick={() => handleEnhance(upscaleFactor)}
                  >
                    {t('Enhance_Image')}
                  </button>{' '}
                </div>
              </div>
            </div>
          </div>

          <div id="SS_Original" className={styles.section}>
            <div className={styles.section_header}>
              <div className={styles.circle_secondary}>
                <IoImage />
              </div>
              <h2 className={`${styles.section_title} ${montserrat.className}`}>
                {t('Original_Image')}
              </h2>
            </div>

            {previewUrl ? (
              <>
                <div
                  className="relative flex items-center justify-center p-2 w-full cursor-pointer group"
                  style={{ height: '90%' }}
                  onClick={() => setIsModalOpen(true)}
                >
                  <Image
                    src={previewUrl}
                    key={previewUrl}
                    alt="Result"
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

                  <div className="absolute bottom-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {t('Expand_Image_Note')}
                  </div>
                </div>

                {isModalOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 h-screen w-screen">
                    <div className="relative bg-white rounded-lg overflow-hidden flex items-center justify-center w-3/4 h-3/4">
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="absolute top-2 right-2 text-black text-xl font-bold z-10"
                      >
                        &times;
                      </button>

                      <div className="w-fit h-fit">
                        <MagnifierImage
                          src={previewUrl}
                          zoom={2}
                          width="100%"
                          height="100%"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <NoImagePlaceholder></NoImagePlaceholder>
            )}
          </div>

          <div id="SS_Enhance" className={styles.section}>
            <div className={styles.section_header}>
              <div className={styles.circle_secondary}>
                <MdCameraEnhance />
              </div>
              <h2 className={`${styles.section_title} ${montserrat.className}`}>
                {t('Enhance_Image')}
              </h2>
            </div>
            {loading ? (
              <div className="h-full w-full">
                <div className={styles.preview_placeholder}>
                  <div className={styles.placeholder_text}>
                    <LoadingOverlay message="Enhancing in progress" />
                  </div>
                </div>
              </div>
            ) : superResolutionResult ? (
              <>
                <div
                  className="flex items-center justify-center relative p-2 w-full"
                  style={{ height: '90%' }}
                  onClick={() => setIsModalOpen2(true)}
                >
                  <Image
                    src={superResolutionResult}
                    alt="Enhanced Result"
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
                  <div className="absolute bottom-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {t('Expand_Image_Note')}
                  </div>
                </div>
                {isModalOpen2 && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 h-screen w-screen">
                    <div className="relative bg-white rounded-lg overflow-hidden flex items-center justify-center w-3/4 h-3/4">
                      <button
                        onClick={() => setIsModalOpen2(false)}
                        className="absolute top-2 right-2 text-black text-xl font-bold z-10"
                      >
                        &times;
                      </button>
                      <div className="w-[90%] h-[90%]">
                        <MagnifierImage
                          src={superResolutionResult}
                          zoom={2}
                          width="100%"
                          height="100%"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <NoImagePlaceholder />
            )}
          </div>
          <div className="mt-3"></div>
        </div>
      )}
    </div>
  );
};
interface MethodSelectorProps<T extends string> {
  title?: string;
  methods: T[];
  selectedMethod: T;
  onChange: (method: T) => void;
}

function MethodSelector<T extends string>({
  title,
  methods,
  selectedMethod,
  onChange,
}: MethodSelectorProps<T>) {
  return (
    <div className="flex flex-col gap-2 p-2 border-b-slate-200 border-b-2">
      <div className="flex items-center gap-2">
        {title && <div className="font-semibold text-sm">{title}</div>}

        <div className={styles.button_group}>
          {methods.map((method) => (
            <button
              key={method}
              className={`${styles.option_button} ${
                selectedMethod === method ? styles.active : ''
              }`}
              onClick={() => onChange(method)}
            >
              {method}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
const PreviewWithModal: React.FC<{ src: string | null }> = ({ src }) => {
  if (!src) return <NoImagePlaceholder />;

  return (
    <>
      <div
        className="relative flex items-center justify-center p-2 w-full cursor-pointer group"
        style={{ height: '90%' }}
      >
        <Image
          src={src}
          alt="Result"
          className="image-preview"
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: 'auto',
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            position: 'relative',
          }}
        />
      </div>
    </>
  );
};
export default ImageSuperResolution_2;
