import React from 'react';
import Image from 'next/image';
import { FaLayerGroup } from 'react-icons/fa';
import Result from '@/assets/Group 79.svg';
import styles from '@/app/(single layout)/result/categories.module.css';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';

interface ElaResultProp {
  img: string | undefined; // Accept the image as a prop
  loading: boolean;
}

const ElaResult: React.FC<ElaResultProp> = ({ img, loading }) => {
  return (
    <div className="w-full h-full p-5">
      <div className={styles.title_container}>
        <div className="flex justify-between">
          <div className="flex">
            <div className="circle_2">
              <FaLayerGroup />
            </div>
            <div className={styles.title}>Error Level Analysis</div>
          </div>
          {loading ? (
            <Flex align="center">
              <Spin indicator={<LoadingOutlined spin />} />
            </Flex>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className={styles.image_container}>
        {loading ? (
          <></>
        ) : img ? (
          <div
            className="flex items-center justify-center relative p-2 w-full"
            style={{ height: '90%' }}
          >
            <Image
              src={img}
              className="image-preview"
              alt={Result}
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
        ) : (
          <p>No image available</p> // Fallback message
        )}
      </div>
      <div className={styles.horizontal_line}> </div>
      <div>
        <span className="text-red-500">* </span>The tampered region is highlighted
        with dark color.
      </div>
    </div>
  );
};

export default ElaResult;
