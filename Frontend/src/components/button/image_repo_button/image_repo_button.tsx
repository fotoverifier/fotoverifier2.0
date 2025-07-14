import { useLanguage } from '@/context/LanguageContext';
import { Montserrat } from 'next/font/google';
import React, { useState } from 'react';
import { FaImage } from 'react-icons/fa';
const montserrat = Montserrat({
  subsets: ['latin'],
});
type ImageType = {
  id: number;
  src: string;
  alt: string;
};

type Props = {
  onImageSelect: (image: ImageType) => void;
};

const ImageRepository: React.FC<Props> = ({ onImageSelect }) => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);

  const sampleImages: ImageType[] = [
    { id: 1, src: '/sample_img_repo/demo.jpg', alt: 'Sample 1' },
    { id: 2, src: '/sample_img_repo/demo2.jpg', alt: 'Sample 2' },
    { id: 3, src: '/sample_img_repo/exif1.jpg', alt: 'Sample 3' },
    { id: 4, src: '/sample_img_repo/demo4.jpg', alt: 'Sample 4' },

    //{ id: 5, src: '/sample_img_repo/exif1.jpg', alt: 'Sample 4' },
    //{ id: 6, src: '/sample_img_repo/demo5.jpg', alt: 'Sample 4' },
    //{ id: 7, src: '/sample_img_repo/exif_4.jpg', alt: 'Sample 4' },
    //{ id: 8, src: '/sample_img_repo/exif5.jpg', alt: 'Sample 4' },

    //{ id: 9, src: '/sample_img_repo/fog_1.png', alt: 'Sample 9' },
    //{ id: 10, src: '/sample_img_repo/fog_2.png', alt: 'Sample 10' },
    //{ id: 11, src: '/sample_img_repo/fog_3.png', alt: 'Sample 11' },
    //{ id: 12, src: '/sample_img_repo/fog_4.png', alt: 'Sample 12' },

  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleImageSelect = (image: ImageType) => {
    setSelectedImage(image);
    onImageSelect(image);
    closeModal();
  };

  return (
    <>
      <div className={`ml-auto font-medium ${montserrat.className}`}>
        <button
          className="text-base flex items-center gap-2 bg-gradient-to-r bg-[#01584b] text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0.5"
          onClick={openModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4V5h12v10z"
              clipRule="evenodd"
            />
            <path d="M8 7a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
          </svg>
          {t('Sample_Image_Repo')}
        </button>
      </div>

      {isModalOpen && (
        <div
          className={`${montserrat.className} fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}
        >
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 border-2 p-2 rounded-xl gap-4 flex items-center font-bold">
                <FaImage />

                {t('Select_image')}
              </h3>
              <button
                onClick={closeModal}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {sampleImages.map((image) => (
                <div
                  key={image.id}
                  className={`relative cursor-pointer rounded-lg overflow-hidden group hover:ring-2 hover:ring-[#01584b] transition-all ${
                    selectedImage?.id === image.id
                      ? 'ring-2 ring-[#01584b]'
                      : ''
                  }`}
                  onClick={() => handleImageSelect(image)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="bg-[#01584b] text-white px-3 py-1 rounded-md text-sm">
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageRepository;
