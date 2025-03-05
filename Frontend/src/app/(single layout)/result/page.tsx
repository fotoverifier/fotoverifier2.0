'use client';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Res = dynamic(() => import('./resComponent'), { ssr: false });

export default function Page() {
  return (
    <Suspense
      fallback={
        <Flex align="center" gap="middle">
          <Spin indicator={<LoadingOutlined spin />} />
        </Flex>
      }
    >
      <Res />
    </Suspense>
  );
}
