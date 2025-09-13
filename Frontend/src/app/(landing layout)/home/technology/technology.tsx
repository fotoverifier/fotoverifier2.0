'use client';
import { Montserrat } from 'next/font/google';
import styles from './technology.module.css';
import Smaple from '@/assets/exif.png';
import { useState } from 'react';
import Image from 'next/image';
const montserrat = Montserrat({ subsets: ['latin'] });

const Technology = () => {
  const [selectedTab, setSelectedTab] = useState<'Traditional' | 'AI'>(
    'Traditional'
  );

  const content = {
    Traditional: {
      title: 'Trắc Nghiệm An Toàn Số',
      features: [
        'Tăng cường hiểu biết về chống lừa đảo trên không gian số',
        'Nâng cao nhận thức về an toàn thông tin',
        'Phòng chống các nguy cơ trực tuyến',
      ],
      image: Smaple.src,
    },
    AI: {
      title: 'Ứng Dụng Trí Tuệ Nhân Tạo',
      features: [
        'Phân tích hành vi truy cập để phát hiện mối đe dọa',
        'Tự động hóa xử lý sự cố bảo mật',
        'Cải thiện độ chính xác trong phát hiện xâm nhập',
      ],
      image: Smaple.src,
    },
  };
  return (
    <div className={`${styles.TechnologyContainer} ${montserrat.className}`}>
      <div className="h-[80%] w-[90%] flex">
        {/* Left Tabs */}
        <div className="h-1/3 w-[10%] flex flex-col items-center justify-start py-2 gap-4">
          {(['Traditional', 'AI'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`h-1/2 w-full text-sm font-semibold rounded-tl-md rounded-bl-md transition
              ${selectedTab === tab ? 'bg-teal-700 text-white' : 'bg-teal-600 text-white hover:bg-teal-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Right Content Area */}
        <div className="h-full w-[90%] rounded-xl flex bg-white shadow-lg p-10 border-2">
          {/* Left Content */}
          <div className="w-1/2 flex flex-col justify-evenly">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white text-sm rounded-full mb-4 font-semibold w-fit">
              Tính năng nổi bật
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {content[selectedTab].title}
            </h2>
            <ul className="space-y-4">
              {content[selectedTab].features.map((item, index) => (
                <li key={index} className="flex items-start gap-3 items-center">
                  <div className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-800 text-sm">{item}</p>
                </li>
              ))}
            </ul>
            <button className="w-1/2 mt-6 px-6 py-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white text-sm font-semibold rounded-full shadow hover:opacity-90 transition">
              Tìm hiểu thêm →
            </button>
          </div>

          {/* Right Image */}
          <div className="w-1/2 flex items-center justify-center">
            <Image
              src={content[selectedTab].image}
              alt="Preview"
              className="rounded-2xl w-full h-auto max-w-[90%] shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technology;
